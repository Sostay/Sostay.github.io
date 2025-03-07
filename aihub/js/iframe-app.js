document.addEventListener('DOMContentLoaded', () => {
    const contentFrame = document.getElementById('content-frame');
    const tabContainer = document.getElementById('tab-container');
    const tabScrollContainer = document.getElementById('tab-scroll-container');
    const tabs = document.querySelectorAll('.tab');
    const themeColorMeta = document.getElementById('theme-color');
    const contentContainer = document.querySelector('.content-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorContainer = document.getElementById('error-container');
    const directVisitBtn = document.getElementById('direct-visit-btn');
    
    let lastScrollY = 0;
    let isTabHidden = false;
    let touchStartX = 0;
    let touchEndX = 0;
    let currentTabIndex = 0;
    let isScrolling = false;
    let currentUrl = '';
    let loadTimeout = null;
    let tabColors = {
        '豆包': '#0066FF',
        'DeepSeek': '#000000',
        'Perplexity': '#5436DA',
        'Claude': '#7C3AED',
        'ChatGPT': '#19C37D',
        'Grok': '#FF0000',
        'Copilot': '#0078D4',
        'HuggingChat': '#FFBD59',
        'Chatbox': '#4285F4',
        'Pi': '#8E44AD',
        '通义': '#FF6A00'
    };
    
    // 从localStorage获取上次访问的网站
    const lastVisitedSite = localStorage.getItem('lastVisitedSite');
    
    // 初始化时隐藏错误容器
    errorContainer.style.display = 'none';
    
    // 更新主题色
    function updateThemeColor() {
        const activeTab = document.querySelector('.tab.active');
        const siteName = activeTab.getAttribute('data-name');
        
        if (tabColors[siteName]) {
            themeColorMeta.content = tabColors[siteName];
        } else {
            themeColorMeta.content = '#ffffff';
        }
    }

    // 切换标签页
    function switchTab(tab) {
        if (tab.classList.contains('active')) return;
        
        // 显示加载指示器
        loadingIndicator.style.display = 'block';
        
        // 隐藏错误容器
        errorContainer.style.display = 'none';
        
        // 更新活动标签
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        
        // 获取网站URL和名称
        const url = tab.getAttribute('data-url');
        currentUrl = url;
        
        // 保存到localStorage
        const siteName = tab.getAttribute('data-name');
        localStorage.setItem('lastVisitedSite', siteName);
        
        // 更新iframe URL
        contentFrame.src = url;
        
        // 设置加载超时
        if (loadTimeout) {
            clearTimeout(loadTimeout);
        }
        
        loadTimeout = setTimeout(() => {
            // 如果10秒后仍在加载，可能是跨域问题
            if (loadingIndicator.style.display !== 'none') {
                showErrorMessage();
            }
        }, 10000);
        
        // 滚动到选中的标签
        const tabRect = tab.getBoundingClientRect();
        const containerRect = tabScrollContainer.getBoundingClientRect();
        
        const scrollLeft = tabScrollContainer.scrollLeft + tabRect.left - containerRect.left - (containerRect.width / 2) + (tabRect.width / 2);
        
        tabScrollContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
        
        // 更新当前标签索引
        tabs.forEach((t, index) => {
            if (t === tab) {
                currentTabIndex = index;
            }
        });
        
        // 更新主题色
        updateThemeColor();
    }
    
    // 显示错误信息
    function showErrorMessage() {
        loadingIndicator.style.display = 'none';
        errorContainer.style.display = 'flex';
        
        // 更新直接访问按钮的链接
        directVisitBtn.onclick = () => {
            window.open(currentUrl, '_blank');
        };
    }

    // 为每个标签添加点击事件
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab);
        });
    });

    // 监听iframe加载完成事件
    contentFrame.addEventListener('load', () => {
        loadingIndicator.style.display = 'none';
        
        if (loadTimeout) {
            clearTimeout(loadTimeout);
            loadTimeout = null;
        }
        
        // 尝试访问iframe内容
        try {
            // 测试是否可以访问iframe内容
            const frameDocument = contentFrame.contentDocument || contentFrame.contentWindow.document;
            const frameTitle = frameDocument.title;
            
            // 如果能够访问，则隐藏错误容器
            errorContainer.style.display = 'none';
            
            // 监听iframe内部的滚动事件
            try {
                frameDocument.addEventListener('scroll', handleScroll);
            } catch (e) {
                console.warn('无法监听iframe滚动事件:', e);
            }
            
            // 监听iframe内部的点击事件
            try {
                frameDocument.addEventListener('click', () => {
                    if (!isTabHidden) {
                        hideTabBar();
                    }
                });
            } catch (e) {
                console.warn('无法监听iframe点击事件:', e);
            }
        } catch (error) {
            // 如果无法访问iframe内容，显示错误信息
            console.error('无法访问iframe内容:', error);
            showErrorMessage();
        }
    });
    
    // 监听iframe加载错误
    contentFrame.addEventListener('error', () => {
        showErrorMessage();
    });

    // 直接监听主窗口的点击和滚动事件
    document.addEventListener('click', (e) => {
        // 如果点击的不是标签栏和错误容器，则隐藏标签栏
        if (!tabContainer.contains(e.target) && !errorContainer.contains(e.target) && !isTabHidden) {
            hideTabBar();
        }
    });
    
    // 监听主窗口的滚动事件
    window.addEventListener('scroll', handleScroll);

    // 处理滚动事件
    function handleScroll() {
        if (isScrolling) return;
        
        isScrolling = true;
        
        try {
            // 获取当前滚动位置
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;
            
            // 如果向下滚动超过50px且标签栏未隐藏，则隐藏标签栏
            if (currentScrollY > lastScrollY && currentScrollY > 50 && !isTabHidden) {
                hideTabBar();
            } 
            // 如果向上滚动且标签栏已隐藏，则显示标签栏
            else if (currentScrollY < lastScrollY && isTabHidden) {
                showTabBar();
            }
            
            lastScrollY = currentScrollY;
        } catch (error) {
            console.error('处理滚动事件时出错:', error);
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }

    // 隐藏标签栏
    function hideTabBar() {
        tabContainer.classList.add('hidden');
        isTabHidden = true;
        
        // 调整内容区域高度
        contentContainer.style.height = '100%';
    }

    // 显示标签栏
    function showTabBar() {
        tabContainer.classList.remove('hidden');
        isTabHidden = false;
        
        // 恢复内容区域高度
        contentContainer.style.height = `calc(100% - var(--tab-height))`;
    }

    // 监听触摸事件，实现左右滑动切换标签
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, false);

    // 处理滑动手势
    function handleSwipe() {
        const swipeThreshold = 100; // 滑动阈值
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < swipeThreshold) return;
        
        if (swipeDistance > 0 && currentTabIndex > 0) {
            // 向右滑动，切换到上一个标签
            switchTab(tabs[currentTabIndex - 1]);
        } else if (swipeDistance < 0 && currentTabIndex < tabs.length - 1) {
            // 向左滑动，切换到下一个标签
            switchTab(tabs[currentTabIndex + 1]);
        }
        
        // 显示标签栏
        showTabBar();
    }

    // 双击显示/隐藏标签栏
    let lastTap = 0;
    document.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
            // 双击
            if (isTabHidden) {
                showTabBar();
            } else {
                hideTabBar();
            }
            e.preventDefault();
        }
        
        lastTap = currentTime;
    });

    // 监听方向键，实现键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentTabIndex > 0) {
            switchTab(tabs[currentTabIndex - 1]);
            showTabBar();
        } else if (e.key === 'ArrowRight' && currentTabIndex < tabs.length - 1) {
            switchTab(tabs[currentTabIndex + 1]);
            showTabBar();
        } else if (e.key === 'Escape') {
            if (isTabHidden) {
                showTabBar();
            } else {
                hideTabBar();
            }
        }
    });
    
    // 添加上滑手势显示标签栏
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        
        // 检测上滑手势
        const swipeDistance = touchStartY - touchEndY;
        const swipeThreshold = 50;
        
        if (swipeDistance < -swipeThreshold && isTabHidden) {
            // 向上滑动，显示标签栏
            showTabBar();
        }
    }, false);
    
    // 处理URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const siteParam = urlParams.get('site');
    
    if (siteParam) {
        // 映射参数到网站名称
        const siteMap = {
            'doubao': '豆包',
            'deepseek': 'DeepSeek',
            'perplexity': 'Perplexity',
            'claude': 'Claude',
            'chatgpt': 'ChatGPT',
            'grok': 'Grok',
            'copilot': 'Copilot',
            'huggingchat': 'HuggingChat',
            'chatbox': 'Chatbox',
            'pi': 'Pi',
            'tongyi': '通义'
        };
        
        // 如果参数有效，找到对应的标签并点击
        if (siteMap[siteParam]) {
            const siteName = siteMap[siteParam];
            tabs.forEach(tab => {
                if (tab.getAttribute('data-name') === siteName) {
                    // 模拟点击标签
                    setTimeout(() => {
                        switchTab(tab);
                    }, 100);
                }
            });
        }
    } else if (lastVisitedSite) {
        // 如果没有URL参数但有上次访问记录，则恢复上次的选择
        tabs.forEach(tab => {
            if (tab.getAttribute('data-name') === lastVisitedSite) {
                // 模拟点击标签
                setTimeout(() => {
                    switchTab(tab);
                }, 100);
            }
        });
    }
});