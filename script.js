// نظام الترجمة
class Translator {
    constructor() {
        this.translations = {};
        this.currentLang = 'ar';
        this.init();
    }
    
    async init() {
        try {
            const response = await fetch('translations.json');
            this.translations = await response.json();
            this.setupEventListeners();
            this.setLanguage(this.currentLang);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }
    
    setupEventListeners() {
        // أزرار تبديل اللغة
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
                
                // تحديث الأزرار النشطة
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            });
        });
    }
    
    setLanguage(lang) {
        this.currentLang = lang;
        
        // تغيير اتجاه الصفحة
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // تغيير عنوان الصفحة
        document.title = lang === 'ar' 
            ? 'مسلسلات أجنبية | أفلام كورية | كيدراما | نتفلكس'
            : 'Foreign Series | Korean Movies | Kdrama | Netflix';
        
        // تحديث جميع النصوص
        this.updateTexts();
        
        // حفظ اللغة المفضلة
        localStorage.setItem('preferred-language', lang);
    }
    
    updateTexts() {
        const texts = this.translations[this.currentLang];
        
        // تحديث جميع العناصر التي تحتوي على data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (texts && texts[key]) {
                element.textContent = texts[key];
                
                // إذا كان عنصر placeholder
                if (element.placeholder !== undefined) {
                    element.placeholder = texts[key];
                }
            }
        });
        
        // تحديث عدد المشتركين
        const subscriberCount = document.getElementById('subscriberCount');
        if (subscriberCount) {
            subscriberCount.textContent = this.currentLang === 'ar' ? '230,000' : '230K';
        }
    }
}

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const translator = new Translator();
    
    // استعادة اللغة المفضلة من الذاكرة
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && document.querySelector(`[data-lang="${savedLang}"]`)) {
        translator.setLanguage(savedLang);
        
        // تحديث الأزرار النشطة
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === savedLang);
        });
    }
    
    // تأثيرات التمرير السلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تحديث شريط التنقل عند التمرير
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'white';
        }
    });
    
    console.log('🚀 موقع G_E_8 Channel جاهز للعمل!');
    console.log('📞 للدعم: aalx09009@gmail.com');
});