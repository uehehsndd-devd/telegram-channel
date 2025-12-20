// ===== INTELLIGENT CHAT HELP WIDGET =====
class ChatHelpWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }
    
    init() {
        this.createWidget();
        this.setupEventListeners();
        this.loadGreeting();
    }
    
    createWidget() {
        // إنشاء زر الدردشة العائم
        const chatButton = document.createElement('button');
        chatButton.id = 'chatHelpButton';
        chatButton.className = 'chat-help-button';
        chatButton.innerHTML = '<i class="fas fa-comment-dots"></i>';
        chatButton.setAttribute('aria-label', 'فتح دردشة المساعدة');
        
        // إنشاء نافذة الدردشة
        const chatWindow = document.createElement('div');
        chatWindow.id = 'chatHelpWindow';
        chatWindow.className = 'chat-help-window';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <div class="chat-title">
                    <i class="fas fa-robot"></i>
                    <h4>مساعد G_E_8</h4>
                    <span class="status-dot"></span>
                </div>
                <button class="close-chat"><i class="fas fa-times"></i></button>
            </div>
            
            <div class="chat-messages" id="chatHelpMessages">
                <!-- الرسائل تظهر هنا -->
            </div>
            
            <div class="chat-input-container">
                <input type="text" id="chatHelpInput" placeholder="كيف يمكنني مساعدتك؟" />
                <button id="sendChatMessage"><i class="fas fa-paper-plane"></i></button>
            </div>
            
            <div class="quick-questions">
                <button class="quick-question" data-question="كيف أشاهد الأفلام؟">كيف أشاهد الأفلام؟</button>
                <button class="quick-question" data-question="أحدث الأفلام الكورية">أحدث الأفلام الكورية</button>
                <button class="quick-question" data-question="تواصل مع الإدارة">تواصل مع الإدارة</button>
            </div>
        `;
        
        // إضافة العناصر للصفحة
        document.body.appendChild(chatButton);
        document.body.appendChild(chatWindow);
    }
    
    setupEventListeners() {
        // زر فتح/إغلاق الدردشة
        document.getElementById('chatHelpButton').addEventListener('click', () => {
            this.toggleChat();
        });
        
        // زر الإغلاق
        document.querySelector('.close-chat').addEventListener('click', () => {
            this.closeChat();
        });
        
        // إرسال رسالة
        document.getElementById('sendChatMessage').addEventListener('click', () => {
            this.sendMessage();
        });
        
        // إرسال بالإنتر
        document.getElementById('chatHelpInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // أسئلة سريعة
        document.querySelectorAll('.quick-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                this.addMessage(question, 'user');
                this.processQuestion(question);
            });
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatHelpWindow');
        
        if (this.isOpen) {
            chatWindow.classList.add('open');
            document.getElementById('chatHelpInput').focus();
        } else {
            chatWindow.classList.remove('open');
        }
    }
    
    closeChat() {
        this.isOpen = false;
        document.getElementById('chatHelpWindow').classList.remove('open');
    }
    
    loadGreeting() {
        const hour = new Date().getHours();
        let greeting;
        
        if (hour < 12) greeting = "صباح الخير! 🌅";
        else if (hour < 18) greeting = "مساء الخير! ☀️";
        else greeting = "مساء الخير! 🌙";
        
        const messages = [
            `${greeting} أنا مساعد G_E_8، كيف يمكنني مساعدتك اليوم؟`,
            "يمكنني مساعدتك في:",
            "• البحث عن أفلام ومسلسلات",
            "• تقديم توصيات مخصصة",
            "• الإجابة على استفساراتك",
            "• ربطك بالمحتوى المناسب"
        ];
        
        setTimeout(() => {
            messages.forEach((msg, index) => {
                setTimeout(() => {
                    this.addMessage(msg, 'bot');
                }, index * 800);
            });
        }, 500);
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatHelpMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        // معالجة النص ليكون أكثر جاذبية
        const processedText = this.processText(text);
        
        messageDiv.innerHTML = `
            <div class="message-bubble">
                ${processedText}
                <span class="message-time">${this.getCurrentTime()}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // حفظ الرسالة
        this.messages.push({ text, sender, timestamp: Date.now() });
    }
    
    processText(text) {
        // تحويل الروابط
        text = text.replace(/https:\/\/t\.me\/([^\s]+)/g, 
            '<a href="https://t.me/$1" target="_blank" class="chat-link">@$1</a>');
        
        // تحويل الهاشتاجات
        text = text.replace(/#([^\s]+)/g, 
            '<span class="chat-hashtag">#$1</span>');
        
        // إضافة إيموجيز
        const emojiMap = {
            'صباح الخير': '🌅',
            'مساء الخير': '🌙',
            'شكراً': '🙏',
            'فيلم': '🎬',
            'مسلسل': '📺',
            'Netflix': '🍿',
            'كوري': '🇰🇷'
        };
        
        Object.keys(emojiMap).forEach(key => {
            if (text.includes(key)) {
                text = text.replace(key, `${key} ${emojiMap[key]}`);
            }
        });
        
        return text;
    }
    
    async sendMessage() {
        const input = document.getElementById('chatHelpInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // إضافة رسالة المستخدم
        this.addMessage(message, 'user');
        input.value = '';
        
        // محاكاة الكتابة
        this.showTypingIndicator();
        
        // معالجة السؤال
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processQuestion(message);
        }, 1000);
    }
    
    processQuestion(question) {
        const q = question.toLowerCase();
        let response;
        
        // قاعدة معرفة ذكية
        if (q.includes('كيف أشاهد') || q.includes('طريقة المشاهدة') || q.includes('شاهد')) {
            response = `🎬 للمشاهدة أو التحميل:
1. انضم إلى القناة: <a href="https://t.me/G_E_8" target="_blank">@G_E_8</a>
2. ابحث عن الفيلم المطلوب
3. اضغط على الرابط
4. استمتع بالمشاهدة!

هل تبحث عن فيلم معين؟`;
            
        } else if (q.includes('أحدث') || q.includes('جديد') || q.includes('2024')) {
            response = `🎯 أحدث الإضافات على القناة:
• أفلام كورية 2024 (تم تحديثها اليوم)
• مسلسلات Netflix الأصلية
• كيدراما جديدة كاملة

🔍 يمكنك استخدام البحث في الأعلى للعثور على محتوى محدد.`;

        } else if (q.includes('توصية') || q.includes('اقترح')) {
            response = `🤖 بناءً على ذوق المشاهدين، أنصحك بـ:
1. <strong>فيلم الأكشن الكوري 2024</strong> - ⭐ 9.0
2. <strong>مسلسل Netflix الجديد</strong> - ⭐ 8.8
3. <strong>كيدراما رومانسية</strong> - ⭐ 8.5

📊 هل تفضل نوعاً معيناً؟`;

        } else if (q.includes('تواصل') || q.includes('إدارة') || q.includes('ماركو')) {
            response = `👑 للإدارة والاستفسارات المهمة:
المالك: <a href="https://t.me/TOB1_M1" target="_blank">@TOB1_M1</a>

📧 للدعم الفني: اضغط على زر "الدعم" في الموقع.

💬 هل لديك استفسار محدد؟`;

        } else if (q.includes('شكراً') || q.includes('thank you') || q.includes('ممتاز')) {
            response = `🙏 العفو! يسعدني مساعدتك.

🎬 تذكر أن القناة يتم تحديثها يومياً، فاحرص على متابعتها:
<a href="https://t.me/G_E_8" target="_blank">@G_E_8</a>

هل تحتاج مساعدة أخرى؟`;

        } else {
            // استخدام AI بسيط للرد
            response = this.generateAIResponse(q);
        }
        
        // إضافة الرد
        setTimeout(() => {
            this.addMessage(response, 'bot');
            
            // إذا كان السؤال عن فيلم معين، إضافة زر بحث
            if (q.includes('فيلم') || q.includes('مسلسل')) {
                this.addSearchButton(q);
            }
        }, 500);
    }
    
    generateAIResponse(question) {
        // نظام بسيط لفهم النية
        const intents = {
            'greeting': ['مرحبا', 'اهلا', 'السلام', 'hello', 'hi'],
            'help': ['مساعدة', 'help', 'مساعدة', 'ساعدني'],
            'search': ['ابحث', 'بحث', 'أريد', 'عندي'],
            'channel': ['قناة', 'تليجرام', 'telegram', 'channel'],
            'thanks': ['شكرا', 'thank', 'ممتاز', 'رائع']
        };
        
        // تحديد النية
        let intent = 'general';
        for (const [key, words] of Object.entries(intents)) {
            if (words.some(word => question.includes(word))) {
                intent = key;
                break;
            }
        }
        
        // توليد رد بناءً على النية
        const responses = {
            greeting: "أهلاً وسهلاً! 😊 كيف يمكنني مساعدتك اليوم؟",
            help: "يمكنني مساعدتك في البحث عن الأفلام، التوصيات، والإجابة على استفساراتك حول القناة. ما الذي تبحث عنه بالتحديد؟",
            search: "🔍 استخدم مربع البحث في أعلى الموقع للعثور على أفلام محددة، أو اكتب لي اسم الفيلم الذي تبحث عنه.",
            channel: "📢 القناة الرسمية: <a href='https://t.me/G_E_8' target='_blank'>@G_E_8</a> | المالك: <a href='https://t.me/TOB1_M1' target='_blank'>@TOB1_M1</a>",
            thanks: "العفو! 😊 يسعدني مساعدتك. هل تحتاج إلى أي شيء آخر؟",
            general: "أفهم أنك تبحث عن: <strong>" + question + "</strong><br><br>يمكنني مساعدتك في:<br>1. البحث في مكتبة القناة<br>2. التوصيات المخصصة<br>3. إرشادات المشاهدة<br><br>أي من هذه تفضل؟"
        };
        
        return responses[intent];
    }
    
    addSearchButton(query) {
        const messagesContainer = document.getElementById('chatHelpMessages');
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'chat-action-buttons';
        
        buttonDiv.innerHTML = `
            <button class="search-action-btn" data-query="${query}">
                <i class="fas fa-search"></i> بحث عن "${query}"
            </button>
            <button class="channel-action-btn">
                <i class="fab fa-telegram"></i> الانتقال للقناة
            </button>
        `;
        
        messagesContainer.appendChild(buttonDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // إضافة مستمعي الأحداث
        buttonDiv.querySelector('.search-action-btn').addEventListener('click', () => {
            // تنشيط البحث الرئيسي
            if (window.smartSearch) {
                const searchInput = document.querySelector('#searchInput');
                if (searchInput) {
                    searchInput.value = query;
                    searchInput.focus();
                    window.smartSearch.performSearch(query);
                }
            }
            
            this.addMessage(`🔍 جاري البحث عن: "${query}"`, 'bot');
        });
        
        buttonDiv.querySelector('.channel-action-btn').addEventListener('click', () => {
            window.open('https://t.me/G_E_8', '_blank');
        });
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatHelpMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span class="typing-text">يكتب...</span>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }
}

// تهيئة واجهة الدردشة
document.addEventListener('DOMContentLoaded', () => {
    window.chatHelpWidget = new ChatHelpWidget();
});