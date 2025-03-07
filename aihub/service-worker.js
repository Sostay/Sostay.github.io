const CACHE_NAME = 'aihub-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/manifest.json',
    '/favicon.ico',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/icons/doubao.png',
    '/icons/deepseek.png',
    '/icons/perplexity.png',
    '/icons/claude.png',
    '/icons/chatgpt.png',
    '/icons/grok.png',
    '/icons/copilot.png',
    '/icons/huggingchat.png',
    '/icons/chatbox.png',
    '/icons/pi.png',
    '/icons/tongyi.png'
];

// 安装Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('缓存打开');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// 激活Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
    // 只缓存同源请求
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // 如果在缓存中找到响应，则返回缓存的响应
                    if (response) {
                        return response;
                    }
                    
                    // 否则发起网络请求
                    return fetch(event.request).then(
                        networkResponse => {
                            // 检查是否收到有效的响应
                            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                                return networkResponse;
                            }
                            
                            // 克隆响应，因为响应是流，只能使用一次
                            const responseToCache = networkResponse.clone();
                            
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });
                                
                            return networkResponse;
                        }
                    );
                })
                .catch(() => {
                    // 如果请求失败且是HTML页面请求，返回离线页面
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/index.html');
                    }
                })
        );
    }
}); 