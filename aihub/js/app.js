document.addEventListener('DOMContentLoaded', () => {
    const contentFrame = document.getElementById('content-frame');
    const tabContainer = document.getElementById('tab-container');
    const tabScrollContainer = document.getElementById('tab-scroll-container');
    const tabs = document.querySelectorAll('.tab');
    const themeColorMeta = document.getElementById('theme-color');
    
    let lastScrollY = 0;
    let isTabHidden = false;
    let touchStartX = 0;
    let touchEndX = 0;
    let currentTabIndex = 0;
    let isScrolling = false;
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

    // 初始化加载动画
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    contentFrame.parentNode.appendChild(loadingElement);

    // 监听iframe加载完成事件
    contentFrame.addEventListener('load', () => {
        loadingElement.style.display = 'none';
        
        // 尝试获取iframe内容的主题色
        try {
            setTimeout(() => {
                updateThemeColor();
            }, 1000);
        } catch (error) {
            console.error('无法获取iframe主题色:', error);
        }
    });

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
        
        // 显示加载动画
        loadingElement.style.display = 'block';
        
        // 更新活动标签
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        
        // 更新iframe URL
        const url = tab.getAttribute('data-url');
        contentFrame.src = url;
        
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

    // 为每个标签添加点击事件
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab);
        });
    });

    // 监听滚动事件，自动隐藏标签栏
    contentFrame.addEventListener('load', () => {
        try {
            const frameDocument = contentFrame.contentDocument || contentFrame.contentWindow.document;
            
            frameDocument.addEventListener('scroll', handleScroll);
            frameDocument.addEventListener('touchstart', () => {
                if (!isTabHidden) {
                    hideTabBar();
                }
            });
        } catch (error) {
            console.error('无法访问iframe内容:', error);
            
            // 如果无法访问iframe内容，则监听主窗口的点击事件
            window.addEventListener('click', (e) => {
                if (e.target !== tabContainer && !tabContainer.contains(e.target) && !isTabHidden) {
                    hideTabBar();
                }
            });
        }
    });

    // 处理滚动事件
    function handleScroll() {
        if (isScrolling) return;
        
        isScrolling = true;
        
        try {
            const frameDocument = contentFrame.contentDocument || contentFrame.contentWindow.document;
            const currentScrollY = frameDocument.documentElement.scrollTop || frameDocument.body.scrollTop;
            
            if (currentScrollY > lastScrollY && currentScrollY > 50 && !isTabHidden) {
                hideTabBar();
            } else if (currentScrollY < lastScrollY && isTabHidden) {
                showTabBar();
            }
            
            lastScrollY = currentScrollY;
        } catch (error) {
            console.error('无法访问iframe滚动位置:', error);
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }

    // 隐藏标签栏
    function hideTabBar() {
        tabContainer.classList.add('hidden');
        isTabHidden = true;
    }

    // 显示标签栏
    function showTabBar() {
        tabContainer.classList.remove('hidden');
        isTabHidden = false;
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
}); 