// ===== INTELLIGENT MOVIE RECOMMENDER =====
class MovieRecommender {
    constructor() {
        this.userPreferences = this.getUserPreferences();
        this.recommendations = [];
        this.init();
    }
    
    init() {
        this.loadRecommendations();
        this.setupPreferenceButtons();
        this.setupRecommendationEngine();
    }
    
    getUserPreferences() {
        const saved = localStorage.getItem('ge8_user_prefs');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // تفضيلات افتراضية
        return {
            likedGenres: [],
            watchedMovies: [],
            ratingPattern: [],
            preferredLanguages: ['korean'],
            watchTime: 'evening',
            mood: 'neutral'
        };
    }
    
    saveUserPreferences() {
        localStorage.setItem('ge8_user_prefs', JSON.stringify(this.userPreferences));
    }
    
    setupPreferenceButtons() {
        // أزرار التفضيل السريع
        const preferenceButtons = document.querySelectorAll('.preference-btn');
        
        preferenceButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const preference = btn.dataset.pref;
                this.updatePreference(preference);
                btn.classList.toggle('active');
                this.generateRecommendations();
            });
        });
        
        // متتبع المزاج
        this.setupMoodTracker();
    }
    
    setupMoodTracker() {
        const moodButtons = document.querySelectorAll('.mood-btn');
        
        moodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mood = btn.dataset.mood;
                this.userPreferences.mood = mood;
                this.saveUserPreferences();
                
                // تحديث الواجهة
                moodButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // توليد توصيات جديدة بناءً على المزاج
                this.generateMoodBasedRecommendations(mood);
            });
        });
    }
    
    updatePreference(preference) {
        const [type, value] = preference.split(':');
        
        switch(type) {
            case 'genre':
                if (this.userPreferences.likedGenres.includes(value)) {
                    this.userPreferences.likedGenres = this.userPreferences.likedGenres.filter(g => g !== value);
                } else {
                    this.userPreferences.likedGenres.push(value);
                }
                break;
                
            case 'language':
                if (this.userPreferences.preferredLanguages.includes(value)) {
                    this.userPreferences.preferredLanguages = this.userPreferences.preferredLanguages.filter(l => l !== value);
                } else {
                    this.userPreferences.preferredLanguages.push(value);
                }
                break;
                
            case 'time':
                this.userPreferences.watchTime = value;
                break;
        }
        
        this.saveUserPreferences();
    }
    
    async loadRecommendations() {
        try {
            // محاكاة API (يمكن استبدالها ببيانات حقيقية)
            this.recommendations = [
                {
                    id: 1,
                    title: "توصية خاصة بك",
                    reason: "بناءً على تفضيلاتك للأكشن والرومانسية",
                    movies: [
                        { title: "فيلم أكشن رومانسي 2024", match: "95%" },
                        { title: "مسلسل Netflix أكشن", match: "88%" }
                    ]
                },
                {
                    id: 2,
                    title: "الأكثر مشاهدة هذا الأسبوع",
                    reason: "230,000 مشترك شاهدوها",
                    movies: [
                        { title: "أقوى فيلم كوري 2024", match: "🔥" },
                        { title: "مسلسل Netflix الأكثر تداولاً", match: "🔥" }
                    ]
                },
                {
                    id: 3,
                    title: "مفاجأة خاصة",
                    reason: "قد يعجبك بناءً على ذوقك",
                    movies: [
                        { title: "فيلم غير متوقع رائع", match: "🤔" },
                        { title: "دراما مخفية رائعة", match: "💎" }
                    ]
                }
            ];
            
            this.displayRecommendations();
            
        } catch (error) {
            console.error('Error loading recommendations:', error);
        }
    }
    
    displayRecommendations() {
        const container = document.querySelector('#recommendationsContainer');
        if (!container) return;
        
        container.innerHTML = this.recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="recommendation-header">
                    <h4>${rec.title}</h4>
                    <span class="recommendation-badge">${rec.reason}</span>
                </div>
                <div class="recommendation-movies">
                    ${rec.movies.map(movie => `
                        <div class="recommended-movie">
                            <div class="movie-info">
                                <h5>${movie.title}</h5>
                                <span class="match-score">${movie.match}</span>
                            </div>
                            <a href="https://t.me/G_E_8" target="_blank" class="watch-btn">
                                <i class="fas fa-play"></i> شاهد الآن
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
    
    generateRecommendations() {
        // محاكاة توليد توصيات ذكية
        console.log('Generating recommendations based on:', this.userPreferences);
        
        // في الواقع، هنا ستكون استدعاء API أو معالجة بيانات
        setTimeout(() => {
            this.loadRecommendations();
        }, 500);
    }
    
    generateMoodBasedRecommendations(mood) {
        const moodRecommendations = {
            happy: ["أفلام كوميدية", "رومانسية خفيفة", "دراما مرحة"],
            sad: ["دراما عاطفية", "قصص ملهمة", "رومانسية"],
            excited: ["أفلام أكشن", "مغامرات", "خيال علمي"],
            relaxed: ["دراما خفيفة", "وثائقية", "رومانسية هادئة"],
            neutral: ["الأكثر مشاهدة", "الأفضل تقييماً", "جديد القناة"]
        };
        
        const recommendations = moodRecommendations[mood] || moodRecommendations.neutral;
        
        // تحديث واجهة المستخدم
        const moodContainer = document.querySelector('#moodRecommendations');
        if (moodContainer) {
            moodContainer.innerHTML = `
                <h4>توصيات للشعور: <span class="mood-text">${this.getMoodText(mood)}</span></h4>
                <div class="mood-tags">
                    ${recommendations.map(rec => `
                        <a href="https://t.me/G_E_8" target="_blank" class="mood-tag">
                            ${rec}
                        </a>
                    `).join('')}
                </div>
            `;
        }
    }
    
    getMoodText(mood) {
        const moods = {
            happy: "😊 سعيد",
            sad: "😢 حزين",
            excited: "🎉 متحمس",
            relaxed: "😌 مسترخي",
            neutral: "😐 محايد"
        };
        
        return moods[mood] || moods.neutral;
    }
    
    setupRecommendationEngine() {
        // محرك التعلم الآلي البسيط
        this.setupLearningEngine();
        
        // تحديث التوصيات كل 30 دقيقة
        setInterval(() => {
            this.generateRecommendations();
        }, 30 * 60 * 1000);
    }
    
    setupLearningEngine() {
        // تتبع النقرات والمشاهدات
        document.addEventListener('click', (e) => {
            if (e.target.closest('.watch-btn') || e.target.closest('.movie-card')) {
                this.trackUserInteraction('click', e.target);
            }
        });
        
        // تتبع وقت المشاهدة
        window.addEventListener('beforeunload', () => {
            this.trackSessionTime();
        });
    }
    
    trackUserInteraction(type, element) {
        // تخزين بيانات تفاعل المستخدم
        const interaction = {
            type,
            timestamp: Date.now(),
            element: element.tagName,
            url: window.location.href
        };
        
        // حفظ في localStorage
        const interactions = JSON.parse(localStorage.getItem('ge8_interactions') || '[]');
        interactions.push(interaction);
        localStorage.setItem('ge8_interactions', JSON.stringify(interactions.slice(-100))); // حفظ آخر 100 تفاعل
    }
    
    trackSessionTime() {
        const sessionStart = parseInt(localStorage.getItem('ge8_session_start') || Date.now());
        const sessionDuration = Date.now() - sessionStart;
        
        // حفظ مدة الجلسة
        const sessions = JSON.parse(localStorage.getItem('ge8_sessions') || '[]');
        sessions.push({
            duration: sessionDuration,
            date: new Date().toISOString()
        });
        localStorage.setItem('ge8_sessions', JSON.stringify(sessions.slice(-50))); // حفظ آخر 50 جلسة
    }
}

// تهيئة النظام
document.addEventListener('DOMContentLoaded', () => {
    window.movieRecommender = new MovieRecommender();
});