document.addEventListener('DOMContentLoaded', () => {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const siteParam = urlParams.get('site');
    
    if (siteParam) {
        // 映射参数到URL
        const siteMap = {
            'doubao': 'https://www.doubao.com/chat/',
            'deepseek': 'https://chat.deepseek.com',
            'perplexity': 'https://perplexity.ai/',
            'claude': 'https://claude.ai/',
            'chatgpt': 'https://chat.openai.com',
            'grok': 'https://grok.com',
            'copilot': 'https://copilot.microsoft.com/?dpwa=1',
            'huggingchat': 'https://huggingface.co/chat/',
            'chatbox': 'https://web.chatboxai.app/',
            'pi': 'https://pi.ai',
            'tongyi': 'https://tongyi.aliyun.com'
        };
        
        // 如果参数有效，找到对应的标签并点击
        if (siteMap[siteParam]) {
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                if (tab.getAttribute('data-url') === siteMap[siteParam]) {
                    // 模拟点击标签
                    setTimeout(() => {
                        tab.click();
                    }, 100);
                }
            });
        }
    }
}); 