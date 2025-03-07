const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS
app.use(cors());

// 静态文件服务
app.use(express.static(path.join(__dirname)));

// 代理中间件配置
const createProxy = (target) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    onProxyRes: function(proxyRes, req, res) {
      // 移除安全限制
      proxyRes.headers['x-frame-options'] = '';
      delete proxyRes.headers['x-frame-options'];
      
      proxyRes.headers['content-security-policy'] = '';
      delete proxyRes.headers['content-security-policy'];
      
      // 允许跨域
      proxyRes.headers['access-control-allow-origin'] = '*';
      
      // 处理重定向
      if (proxyRes.headers['location']) {
        const location = proxyRes.headers['location'];
        // 将重定向URL转换为通过我们的代理
        if (location.startsWith('http')) {
          const url = new URL(location);
          proxyRes.headers['location'] = `/proxy/${url.host}${url.pathname}${url.search}`;
        }
      }
    }
  });
};

// 动态代理路由
app.use('/proxy/:host/*', (req, res, next) => {
  const host = req.params.host;
  const pathValue = req.params[0] || '';
  const protocol = req.query.protocol || 'https';
  const target = `${protocol}://${host}`;
  
  console.log(`代理请求: ${target}/${pathValue}`);
  
  // 为每个请求创建新的代理
  const proxy = createProxy(target);
  
  // 修改请求路径
  req.url = `/${pathValue}`;
  
  // 应用代理
  proxy(req, res, next);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`代理服务器运行在端口 ${PORT}`);
  console.log(`访问 http://localhost:${PORT} 来使用应用`);
}); 