# AI Hub

AI Hub是一个PWA（渐进式Web应用），集成了多种流行的AI聊天工具，让您可以在一个应用中方便地访问不同的AI聊天服务。

## 功能特点

- **一站式访问**：集成豆包、ChatGPT、Claude、Perplexity等多种AI聊天工具
- **底部标签栏**：可左右滑动的底部标签栏，方便切换不同的AI服务
- **自适应主题**：状态栏颜色会根据当前访问的AI服务自动调整
- **手势操作**：
  - 左右滑动屏幕可切换不同的AI服务
  - 点击页面空白处或向下滚动时，底部标签栏会自动隐藏
  - 双击屏幕可显示/隐藏底部标签栏
- **键盘导航**：支持使用方向键切换标签，Esc键显示/隐藏标签栏
- **离线支持**：作为PWA应用，支持添加到主屏幕，并提供基本的离线访问能力
- **响应式设计**：适配各种屏幕尺寸的设备

## 使用方法

1. 在浏览器中访问应用
2. 点击底部标签栏中的图标切换不同的AI聊天服务
3. 左右滑动屏幕也可以切换服务
4. 点击页面或向下滚动时，底部标签栏会自动隐藏
5. 向上滑动或双击屏幕可以重新显示标签栏
6. 在支持的浏览器中，可以将应用添加到主屏幕，获得更好的体验

## 支持的AI服务

- 豆包 (https://www.doubao.com/chat/)
- DeepSeek (https://chat.deepseek.com)
- Perplexity (https://perplexity.ai/)
- Claude (https://claude.ai/)
- ChatGPT (https://chat.openai.com)
- Grok (https://grok.com)
- Copilot (https://copilot.microsoft.com/)
- HuggingChat (https://huggingface.co/chat/)
- Chatbox (https://web.chatboxai.app/)
- Pi (https://pi.ai)
- 通义 (https://tongyi.aliyun.com)

## 注意事项

- 部分AI服务可能需要登录才能使用
- 由于跨域限制，某些服务可能无法正常加载或功能受限
- 建议使用最新版本的Chrome、Safari或Firefox浏览器获得最佳体验

## 技术实现

- HTML5, CSS3, JavaScript
- PWA (Progressive Web App)
- Service Worker 用于离线缓存
- Web App Manifest 用于添加到主屏幕 