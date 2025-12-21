// ===== SMART SEARCH SYSTEM =====
class SmartSearch {
    constructor() {
        this.searchInput = document.querySelector('#searchInput');
        this.searchResults = document.querySelector('#searchResults');
        this.moviesData = [];
        this.init();
    }
    
    async init() {
        // تحميل بيانات الأفلام
        await this.loadMoviesData();
        
        // إعداد البحث
        this.setupSearch();
        
        // إعداد التوصيات التلقائية
        this.setupAutoSuggest();
    }
    
    async loadMoviesData() {
        try {
            // يمكنك استبدال هذا بAPI حقيقي
            this.moviesData = [
                { id: 1, title: "فيلم أكشن كوري 2024", category: "action", year: "2024", rating: 8.5 },
                { id: 2, title: "فيلم رومانسي كوري", category: "romance", year: "2024", rating: 8.2 },
                { id: 3, title: "مسلسل Netflix أكشن", category: "series", year: "2024", rating: 9.0 },
                { id: 4, title: "كيدراما رومانسية", category: "kdrama", year: "2024", rating: 8.8 }
            ];
        } catch (error) {
            console.error('Error loading movies data:', error);
        }
    }
    
    setupSearch() {
        if (!this.searchInput) return;
        
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 1) {
                this.performSearch(query);
            } else {
                this.hideResults();
            }
        });
    }
    
    setupAutoSuggest() {
        // اقتراحات تلقائية بناءً على الوقت والموسم
        const hour = new Date().getHours();
        const suggestions = this.getTimeBasedSuggestions(hour);
        
        // عرض الاقتراحات
        this.displaySuggestions(suggestions);
    }
    
    getTimeBasedSuggestions(hour) {
        if (hour >= 20 || hour < 6) {
            return ["أفلام رعب", "أفلام تشويق", "دراما غامضة"];
        } else if (hour >= 6 && hour < 12) {
            return ["أفكوميدية", "دراما خفيفة", "رومانسية"];
        } else if (hour >= 12 && hour < 17) {
            return ["أفلام أكشن", "مغامرات", "خيال علمي"];
        } else {
            return ["أفلام عائلية", "دراما", "رومانسية"];
        }
    }
    
  performSearch(query) {
    const q = query.trim();
    
    if (q.length === 0) {
        this.hideResults();
        return;
    }
    
    // البحث المحلي أولاً
    const localResults = this.searchMovies(q);
    
    // إذا كانت نتائج البحث المحلي قليلة أو فارغة، توجيه للبوت
    if (localResults.length === 0 || q.length > 3) {
        // تحقق إذا كان نظام البوت متاحاً
        if (window.telegramBotSearch && typeof window.telegramBotSearch.displaySearchInterface === 'function') {
            console.log('🤖 Redirecting to Telegram bot search:', q);
            window.telegramBotSearch.displaySearchInterface(q, 'searchResults');
            return;
        }
    }
    
    // إذا كان هناك نتائج محلية جيدة، عرضها
    if (localResults.length > 0) {
        this.displayResults(localResults);
    } else {
        // إذا لا توجد نتائج محلية ولا بوت، عرض رسالة
        this.displayNoResults(q);
    }
}
    
    // إذا كان البحث فارغاً أو قليل النتائج، توجيه للبوت
    if (results.length === 0 || query.length > 2) {
        // استخدم نظام البوت
        if (window.telegramBotSearch) {
            window.telegramBotSearch.displaySearchInterface(query, 'searchResults');
            return;
        }
    }
    
    this.displayResults(results);
}
        const results = this.searchMovies(query);
        this.displayResults(results);
    }
    
    searchMovies(query) {
        const searchTerms = query.toLowerCase().split(' ');
        
        return this.moviesData.filter(movie => {
            const title = movie.title.toLowerCase();
            const category = movie.category.toLowerCase();
            const year = movie.year.toString();
            
            // بحث ذكي بالوزن
            let score = 0;
            
            // تطابق كامل
            if (title.includes(query.toLowerCase())) score += 10;
            
            // تطابق جزئي
            searchTerms.forEach(term => {
                if (title.includes(term)) score += 5;
                if (category.includes(term)) score += 3;
                if (year.includes(term)) score += 2;
            });
            
            return score > 0;
        }).sort((a, b) => b.rating - a.rating);
    }
    
    displayResults(results) {
        if (!this.searchResults) return;
        
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>لا توجد نتائج. جرب كلمات أخرى أو:</p>
                    <a href="https://t.me/G_E_8" target="_blank">🔍 ابحث في القناة مباشرة</a>
                </div>
            `;
        } else {
            this.searchResults.innerHTML = results.map(movie => `
                <div class="search-result-item" data-id="${movie.id}">
                    <div class="result-info">
                        <h4>${movie.title}</h4>
                        <div class="result-meta">
                            <span class="category">${this.getCategoryName(movie.category)}</span>
                            <span class="year">${movie.year}</span>
                            <span class="rating">⭐ ${movie.rating}</span>
                        </div>
                    </div>
                    <a href="https://t.me/G_E_8" target="_blank" class="view-btn">
                        <i class="fab fa-telegram"></i> عرض
                    </a>
                </div>
            `).join('');
        }
        
        this.searchResults.style.display = 'block';
    }
    
    displaySuggestions(suggestions) {
        const suggestionsContainer = document.querySelector('#searchSuggestions');
        if (!suggestionsContainer) return;
        
        suggestionsContainer.innerHTML = suggestions.map(suggestion => `
            <button class="suggestion-tag" data-query="${suggestion}">
                ${suggestion}
            </button>
        `).join('');
        
        // إضافة مستمعين للأزرار
        document.querySelectorAll('.suggestion-tag').forEach(btn => {
            btn.addEventListener('click', () => {
                this.searchInput.value = btn.dataset.query;
                this.performSearch(btn.dataset.query);
            });
        });
    }
    
    getCategoryName(category) {
        const categories = {
            'action': 'أكشن',
            'romance': 'رومانسي',
            'series': 'مسلسل',
            'kdrama': 'كيدراما',
            'comedy': 'كوميدي',
            'horror': 'رعب'
        };
        
        return categories[category] || category;
    }
    
    hideResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'none';
        }
    }
}

// تهيئة البحث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.smartSearch = new SmartSearch();
});displayNoResults(query) {
    if (!this.searchResults) return;
    
    const noResultsHTML = `
        <div class="no-local-results">
            <div class="no-results-icon">
                <i class="fas fa-search"></i>
            </div>
            <h4>لا توجد نتائج محلية لـ "${query}"</h4>
            <p>يمكننا البحث في قاعدة بيانات البوت الذكي:</p>
            
            <div class="bot-search-suggestion">
                <div class="suggestion-card">
                    <i class="fab fa-telegram"></i>
                    <div class="suggestion-content">
                        <h5>🔍 استخدم بوت البحث @Cimakingbot</h5>
                        <p>يبحث في مكتبة 5,000+ فيلم ومسلسل</p>
                    </div>
                    <button onclick="searchWithTelegramBot('${query}')" class="bot-search-btn">
                        <i class="fab fa-telegram"></i>
                        بحث في البوت
                    </button>
                </div>
            </div>
            
            <div class="alternative-options">
                <p>أو جرب:</p>
                <button onclick="document.getElementById('searchInput').value = 'أفلام ${query}'; performSearch('أفلام ${query}')">
                    🔍 بحث بـ "أفلام ${query}"
                </button>
                <button onclick="document.getElementById('searchInput').value = '${query} 2024'; performSearch('${query} 2024')">
                    🆕 بحث بـ "${query} 2024"
                </button>
                <a href="https://t.me/G_E_8" target="_blank" class="channel-link">
                    📢 تصفح القناة مباشرة
                </a>
            </div>
        </div>
    `;
    
    this.searchResults.innerHTML = noResultsHTML;
    this.searchResults.style.display = 'block';
}// دالة مساعدة للبحث عبر البوت
function searchWithTelegramBot(query) {
    if (window.telegramBotSearch && typeof window.telegramBotSearch.displaySearchInterface === 'function') {
        window.telegramBotSearch.displaySearchInterface(query, 'searchResults');
    } else {
        // رابط احتياطي
        const botLink = `https://t.me/Cimakingbot?start=search_${encodeURIComponent(query)}`;
        window.open(botLink, '_blank');
    }
}

// دالة للبحث في القناة مباشرة
function searchInTelegramChannel(query) {
    const channelLink = `https://t.me/G_E_8?q=${encodeURIComponent(query)}`;
    window.open(channelLink, '_blank');
}