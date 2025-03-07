// 定义标签页视图组件
class TabView extends HTMLElement {
    constructor() {
        super();
        this.url = '';
        this.title = '';
        this.isLoading = false;
        this.hasError = false;
        this.proxyUrl = '';
    }

    connectedCallback() {
        // 设置基本属性
        this.classList.add('tab-view');
        
        // 创建标签页头部
        this.header = document.createElement('div');
        this.header.className = 'tab-view-header';
        
        // 创建标题
        this.titleElement = document.createElement('div');
        this.titleElement.className = 'tab-view-title';
        this.titleElement.textContent = this.title || '加载中...';
        this.header.appendChild(this.titleElement);
        
        // 创建操作按钮
        const actions = document.createElement('div');
        actions.className = 'tab-view-actions';
        
        // 刷新按钮
        const refreshButton = document.createElement('button');
        refreshButton.className = 'tab-view-action';
        refreshButton.innerHTML = '&#8635;'; // 刷新图标
        refreshButton.title = '刷新';
        refreshButton.addEventListener('click', () => this.refresh());
        actions.appendChild(refreshButton);
        
        // 在新窗口打开按钮
        const openButton = document.createElement('button');
        openButton.className = 'tab-view-action';
        openButton.innerHTML = '&#8599;'; // 外部链接图标
        openButton.title = '在新窗口打开';
        openButton.addEventListener('click', () => this.openInNewWindow());
        actions.appendChild(openButton);
        
        this.header.appendChild(actions);
        this.appendChild(this.header);
        
        // 创建内容容器
        this.content = document.createElement('div');
        this.content.className = 'tab-view-content';
        this.appendChild(this.content);
        
        // 创建iframe
        this.iframe = document.createElement('iframe');
        this.iframe.className = 'tab-view-iframe';
        this.iframe.setAttribute('allowfullscreen', '');
        this.iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms allow-modals');
        this.content.appendChild(this.iframe);
        
        // 创建加载指示器
        this.loadingIndicator = document.createElement('div');
        this.loadingIndicator.className = 'loading';
        this.loadingIndicator.style.display = 'none';
        this.content.appendChild(this.loadingIndicator);
        
        // 创建错误信息
        this.errorMessage = document.createElement('div');
        this.errorMessage.className = 'error-message';
        this.errorMessage.style.display = 'none';
        
        const errorContent = document.createElement('div');
        errorContent.className = 'error-content';
        
        const errorTitle = document.createElement('h2');
        errorTitle.textContent = '无法加载网站';
        errorContent.appendChild(errorTitle);
        
        const errorText1 = document.createElement('p');
        errorText1.textContent = '由于安全限制，部分网站可能无法在应用内加载。';
        errorContent.appendChild(errorText1);
        
        const errorText2 = document.createElement('p');
        errorText2.textContent = '您可以尝试以下操作：';
        errorContent.appendChild(errorText2);
        
        // 重试按钮
        this.retryButton = document.createElement('button');
        this.retryButton.className = 'retry-button';
        this.retryButton.textContent = '重试';
        this.retryButton.addEventListener('click', () => this.retry());
        errorContent.appendChild(this.retryButton);
        
        // 直接访问按钮
        this.directVisitButton = document.createElement('button');
        this.directVisitButton.className = 'retry-button';
        this.directVisitButton.style.marginLeft = '10px';
        this.directVisitButton.textContent = '直接访问';
        this.directVisitButton.addEventListener('click', () => this.openInNewWindow());
        errorContent.appendChild(this.directVisitButton);
        
        this.errorMessage.appendChild(errorContent);
        this.content.appendChild(this.errorMessage);
        
        // 如果有URL，加载它
        if (this.url) {
            this.loadUrl(this.url);
        }
    }
    
    // 加载URL
    loadUrl(url) {
        this.url = url;
        this.isLoading = true;
        this.hasError = false;
        
        // 显示加载指示器
        this.loadingIndicator.style.display = 'block';
        this.errorMessage.style.display = 'none';
        
        // 解析URL
        const urlObj = new URL(url);
        const host = urlObj.host;
        const path = urlObj.pathname + urlObj.search + urlObj.hash;
        const protocol = urlObj.protocol.replace(':', '');
        
        // 构建代理URL
        this.proxyUrl = `/proxy/${host}${path}?protocol=${protocol}`;
        
        // 更新标题
        this.titleElement.textContent = host;
        
        // 加载iframe
        this.iframe.src = this.proxyUrl;
        
        // 监听iframe加载事件
        this.iframe.onload = () => this.handleIframeLoad();
        this.iframe.onerror = () => this.handleIframeError();
        
        // 设置超时
        this.loadTimeout = setTimeout(() => {
            if (this.isLoading) {
                this.handleIframeError();
            }
        }, 15000); // 15秒超时
    }
    
    // 处理iframe加载完成
    handleIframeLoad() {
        this.isLoading = false;
        this.loadingIndicator.style.display = 'none';
        
        if (this.loadTimeout) {
            clearTimeout(this.loadTimeout);
            this.loadTimeout = null;
        }
        
        try {
            // 尝试访问iframe内容
            const frameDocument = this.iframe.contentDocument || this.iframe.contentWindow.document;
            const frameTitle = frameDocument.title;
            
            // 更新标题
            if (frameTitle) {
                this.titleElement.textContent = frameTitle;
            }
            
            // 隐藏错误信息
            this.errorMessage.style.display = 'none';
            this.iframe.style.display = 'block';
        } catch (error) {
            console.error('无法访问iframe内容:', error);
            this.handleIframeError();
        }
    }
    
    // 处理iframe加载错误
    handleIframeError() {
        this.isLoading = false;
        this.hasError = true;
        this.loadingIndicator.style.display = 'none';
        
        if (this.loadTimeout) {
            clearTimeout(this.loadTimeout);
            this.loadTimeout = null;
        }
        
        // 显示错误信息
        this.errorMessage.style.display = 'flex';
        this.iframe.style.display = 'none';
    }
    
    // 刷新页面
    refresh() {
        if (this.url) {
            this.loadUrl(this.url);
        }
    }
    
    // 重试加载
    retry() {
        this.refresh();
    }
    
    // 在新窗口打开
    openInNewWindow() {
        if (this.url) {
            window.open(this.url, '_blank');
        }
    }
    
    // 激活标签页
    activate() {
        this.classList.add('active');
    }
    
    // 停用标签页
    deactivate() {
        this.classList.remove('active');
    }
}

// 注册自定义元素
customElements.define('tab-view', TabView); 