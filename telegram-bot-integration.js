// ===== TELEGRAM BOT INTEGRATION SYSTEM =====
class TelegramBotSearch {
    constructor() {
        this.botUsername = 'Cimakingbot'; // @Cimakingbot
        this.searchHistory = [];
        this.init();
    }
    
    init() {
        console.log('🤖 Telegram Bot Search System Ready');
        this.loadSearchHistory();
        this.setupSearchRedirect();
    }
    
    // البحث عبر البوت
    async searchWithBot(query, userData = {}) {
        try {
            const searchData = {
                query: query,
                timestamp: Date.now(),
                user: userData,
                searchId: this.generateSearchId()
            };
            
            // حفظ في السجل
            this.saveToHistory(searchData);
            
            // إنشاء رابط البوت
            const botLink = this.createBotSearchLink(query);
            
            // عرض النتائج
            return {
                success: true,
                botLink: botLink,
                searchId: searchData.searchId,
                message: this.getSearchMessage(query),
                results: await this.getQuickResults(query) // نتائج سريعة
            };
            
        } catch (error) {
            console.error('Bot search error:', error);
            return this.getFallbackResponse(query);
        }
    }
    
    // إنشاء رابط بحث البوت الذكي
    createBotSearchLink(query) {
        // طريقة 1: رابط مباشر مع start parameter
        const encodedQuery = encodeURIComponent(query);
        return `https://t.me/${this.botUsername}?start=search_${encodedQuery}`;
        
        // طريقة 2: رابط مع text parameter (يظهر مباشرة في شات البوت)
        // return `https://t.me/${this.botUsername}?text=${encodedQuery}`;
    }
    
    // الحصول على نتائج سريعة
    async getQuickResults(query) {
        // يمكنك إضافة API call هنا للحصول على نتائج فورية
        return [
            {
                type: 'quick_result',
                title: `نتائج عن: ${query}`,
                description: 'انقر للبحث المفصل في البوت',
                action: 'bot_search'
            }
        ];
    }
    
    // رسالة البحث
    getSearchMessage(query) {
        return `
            <div class="bot-search-message">
                <div class="bot-header">
                    <i class="fab fa-telegram"></i>
                    <h4>🤖 تم إرسال طلبك إلى @Cimakingbot</h4>
                </div>
                
                <div class="search-details">
                    <p><strong>بحثك:</strong> "${query}"</p>
                    <p><strong>الخطوات التالية:</strong></p>
                    <ol class="steps-list">
                        <li>انقر على زر "🔍 ابحث في البوت" بالأسفل</li>
                        <li>انتقل لمحادثة البوت على تليجرام</li>
                        <li>سيقوم البوت بالبحث تلقائياً</li>
                        <li>اختر من النتائج المعروضة</li>
                        <li>احصل على روابط مباشرة من قناة G_E_8</li>
                    </ol>
                </div>
                
                <div class="bot-features">
                    <h5>🎯 مميزات بوت البحث:</h5>
                    <ul>
                        <li><i class="fas fa-search"></i> بحث في مكتبة 5,000+ فيلم ومسلسل</li>
                        <li><i class="fas fa-bolt"></i> نتائج فورية خلال ثواني</li>
                        <li><i class="fas fa-link"></i> روابط مباشرة من قناة G_E_8</li>
                        <li><i class="fas fa-filter"></i> تصفية حسب النوع، السنة، الجودة</li>
                        <li><i class="fas fa-star"></i> توصيات ذكية بناءً على بحثك</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    // واجهة رسالة البحث
    displaySearchInterface(query, containerId = 'searchResults') {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const searchResult = this.searchWithBot(query);
        
        container.innerHTML = `
            <div class="telegram-bot-search-result">
                <div class="bot-search-card">
                    <div class="bot-search-header">
                        <div class="bot-avatar">
                            <i class="fab fa-telegram"></i>
                        </div>
                        <div class="bot-info">
                            <h3>@Cimakingbot</h3>
                            <p>بوت البحث الذكي لقناة G_E_8</p>
                        </div>
                    </div>
                    
                    <div class="search-query-display">
                        <i class="fas fa-search"></i>
                        <span class="query-text">${query}</span>
                    </div>
                    
                    <div class="search-action">
                        <a href="${searchResult.botLink}" 
                           target="_blank" 
                           class="bot-search-btn"
                           onclick="trackBotSearch('${query}')">
                            <i class="fab fa-telegram"></i>
                            🔍 ابحث في البوت الآن
                        </a>
                        
                        <div class="alternative-actions">
                            <p>أو جرب:</p>
                            <button class="alt-btn" onclick="searchInChannel('${query}')">
                                <i class="fab fa-telegram"></i> بحث في القناة مباشرة
                            </button>
                            <button class="alt-btn" onclick="showSimilarSearches('${query}')">
                                <i class="fas fa-random"></i> بحث مشابه
                            </button>
                        </div>
                    </div>
                    
                    <div class="search-tips">
                        <h5>💡 نصائح بحث أفضل:</h5>
                        <ul>
                            <li>اكتب اسم الفيلم/المسلسل كاملاً</li>
                            <li>اضف السنة للنتائج الأحدث (مثال: "2024")</li>
                            <li>حدد النوع (أكشن، رومانسي، كوميدي)</li>
                            <li>استخدم اللغة الإنجليزية للنتائج العالمية</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        container.style.display = 'block';
    }
    
    // حفظ سجل البحث
    saveToHistory(searchData) {
        this.searchHistory.unshift(searchData);
        if (this.searchHistory.length > 50) {
            this.searchHistory = this.searchHistory.slice(0, 50);
        }
        localStorage.setItem('telegram_bot_searches', JSON.stringify(this.searchHistory));
    }
    
    // تحميل سجل البحث
    loadSearchHistory() {
        try {
            const saved = localStorage.getItem('telegram_bot_searches');
            if (saved) {
                this.searchHistory = JSON.parse(saved);
            }
        } catch (e) {
            this.searchHistory = [];
        }
    }
    
    // توليد ID للبحث
    generateSearchId() {
        return 'search_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // رد افتراضي عند الخطأ
    getFallbackResponse(query) {
        return {
            success: false,
            botLink: `https://t.me/${this.botUsername}`,
            message: `يمكنك البحث مباشرة في البوت عن: "${query}"`,
            fallback: true
        };
    }
    
    // إعداد إعادة التوجيه التلقائي
    setupSearchRedirect() {
        // إعادة توجيه مباشرة بعد 5 ثواني
        window.autoRedirectToBot = function(query) {
            setTimeout(() => {
                const botLink = `https://t.me/Cimakingbot?start=search_${encodeURIComponent(query)}`;
                window.open(botLink, '_blank');
            }, 5000);
        };
    }
}

// دوال مساعدة عامة
function trackBotSearch(query) {
    console.log('🔍 Bot search tracked:', query);
    // إرسال بيانات للتحليلات
    if (typeof gtag !== 'undefined') {
        gtag('event', 'bot_search', {
            'search_query': query,
            'event_category': 'Search',
            'event_label': 'Telegram Bot Search'
        });
    }
}

function searchInChannel(query) {
    window.open(`https://t.me/G_E_8?q=${encodeURIComponent(query)}`, '_blank');
}

function showSimilarSearches(query) {
    // عرض عمليات بحث مشابهة
    const similar = ['أفلام أكشن', 'مسلسلات Netflix', 'كيدراما رومانسية'];
    alert(`عمليات بحث مشابهة:\n${similar.join('\n')}`);
}

// تصدير للاستخدام
window.TelegramBotSearch = TelegramBotSearch;