// telegram-site/js/auto-series-master-COMPLETE.js
// النظام الذكي التلقائي لمسلسلات G_E_8 - النسخة الكاملة 100%

class AutoSeriesMaster {
    constructor() {
        this.seriesKnowledgeBase = this.createKnowledgeBase();
        this.seriesList = [];
        this.currentBattle = null;
        this.currentLanguage = 'ar';
        this.userVotes = JSON.parse(localStorage.getItem('series_votes') || '{}');
        this.favorites = JSON.parse(localStorage.getItem('series_favorites') || '[]');
        this.cache = JSON.parse(localStorage.getItem('series_cache') || '{}');
        this.stats = {
            totalBattles: parseInt(localStorage.getItem('total_battles')) || 0,
            totalVotes: parseInt(localStorage.getItem('total_votes')) || 0
        };
        this.init();
    }

    createKnowledgeBase() {
        return [
            { name: "The Walking Dead", bot: "@thewalkiing_bot", searchTerms: ["The Walking Dead"] },
            { name: "Six Seal Team Six", bot: "@YYYYSBBVX_bot", searchTerms: ["SEAL Team Six"] },
            { name: "see", bot: "@TTTEER_Bot", searchTerms: ["See"] },
            { name: "Game of Thrones", bot: "@seriiess_bot", searchTerms: ["Game of Thrones"] },
            { name: "Grey's Anatomy", bot: "@ETERRT_bot", searchTerms: ["Grey's Anatomy"] },
            { name: "Spartacus", bot: "@SPATOS_BOT", searchTerms: ["Spartacus"] },
            { name: "The Vampire Diaries", bot: "@DAEROS_BoT", searchTerms: ["The Vampire Diaries"] },
            { name: "Fallout", bot: "@BOBBGE_bot", searchTerms: ["Fallout"] },
            { name: "La Casa De Papel", bot: "@ssdrrrruu_bot", searchTerms: ["Money Heist"] },
            { name: "The Witcher", bot: "@BBB_BR1_bot", searchTerms: ["The Witcher"] },
            { name: "Breaking Bad", bot: "@EEEERRR1_BOT", searchTerms: ["Breaking Bad"] },
            { name: "Goblin", bot: "@EDDDV_bot", searchTerms: ["Goblin"] },
            { name: "VIKINGS", bot: "@ggggjww_bot", searchTerms: ["Vikings"] },
            { name: "silo", bot: "@SERRSSS_Bot", searchTerms: ["Silo"] },
            { name: "The 8 Show", bot: "@GGGSSSD_bot", searchTerms: ["The 8 Show"] },
            { name: "Shahmaran", bot: "@RRERUI_Bot", searchTerms: ["Şahmaran"] },
            { name: "you", bot: "@QQIDH_BOT", searchTerms: ["You"] },
            { name: "Dark", bot: "@SSEERG_BOT", searchTerms: ["Dark"] },
            { name: "Daredevil", bot: "@HHS_SSS_bot", searchTerms: ["Daredevil"] },
            { name: "The Serpent Queen", bot: "@GWEF_bot", searchTerms: ["The Serpent Queen"] },
            { name: "Legacies", bot: "@BBXKC_bot", searchTerms: ["Legacies"] },
            { name: "The boys", bot: "@her1t_bot", searchTerms: ["The Boys"] },
            { name: "Sherlock", bot: "@WRTX_bot", searchTerms: ["Sherlock"] },
            { name: "Stranger Things", bot: "@stranggerrS_BOT", searchTerms: ["Stranger Things"] },
            { name: "The Last of Us", bot: "@RrrrrrrS_bot", searchTerms: ["The Last of Us"] },
            { name: "The Originals", bot: "@TheOriginalsS_bot", searchTerms: ["The Originals"] },
            { name: "FROM", bot: "@FROMBOTT_BOT", searchTerms: ["FROM"] },
            { name: "Friends", bot: "@Friiiendds_bot", searchTerms: ["Friends"] },
            { name: "WWERG", bot: "@WWERG_bot", searchTerms: ["WWER"] },
            { name: "Banshee", bot: "@BannsheeE_bot", searchTerms: ["Banshee"] },
            { name: "The last kingdom", bot: "@lastkingddom_bot", searchTerms: ["The Last Kingdom"] },
            { name: "OZ", bot: "@OzZZTV_bot", searchTerms: ["Oz"] },
            { name: "Monsters", bot: "@Monsterrss_bot", searchTerms: ["Monsters"] },
            { name: "Outer Banks", bot: "@XXRT18_bot", searchTerms: ["Outer Banks"] },
            { name: "Shogun", bot: "@Shogunn_bot", searchTerms: ["Shogun"] },
            { name: "Only Murders in the Building", bot: "@SSSuSBBBRR_bot", searchTerms: ["Only Murders"] },
            { name: "The Penguin", bot: "@ThePenguuin_bot", searchTerms: ["The Penguin"] },
            { name: "Emily in Paris", bot: "@MANGA1_bot", searchTerms: ["Emily in Paris"] },
            { name: "American horror story", bot: "@EEBDGB_bot", searchTerms: ["American Horror Story"] },
            { name: "Teacup", bot: "@EEEOCV_bot", searchTerms: ["Teacup"] },
            { name: "The Great", bot: "@RDCCN_bot", searchTerms: ["The Great"] },
            { name: "Dune: Prophecy", bot: "@DDNCG_bot", searchTerms: ["Dune Prophecy"] },
            { name: "Gossip Girl", bot: "@Gossippbl_bot", searchTerms: ["Gossip Girl"] },
            { name: "Big Little Lies", bot: "@LITTIEE_bot", searchTerms: ["Big Little Lies"] },
            { name: "Pretty Little Liars", bot: "@RRRT1X_bot", searchTerms: ["Pretty Little Liars"] },
            { name: "13 Reasons Why", bot: "@HHHDNC_bot", searchTerms: ["13 Reasons Why"] },
            { name: "One Day", bot: "@sssncr_bot", searchTerms: ["One Day"] },
            { name: "THE100", bot: "@EERTGN_bot", searchTerms: ["The 100"] },
            { name: "The Punisher", bot: "@Punissherr_bot", searchTerms: ["The Punisher"] },
            { name: "Bad Sisters", bot: "@BadSisters_bot", searchTerms: ["Bad Sisters"] },
            { name: "A Killer Paradox", bot: "@ESSCV_bot", searchTerms: ["A Killer Paradox"] },
            { name: "Mr Robot", bot: "@MrRoboot1_bot", searchTerms: ["Mr. Robot"] },
            { name: "A Man on the Inside", bot: "@ManInside_bot", searchTerms: ["A Man on the Inside"] },
            { name: "After Life", bot: "@After_Lifee_bot", searchTerms: ["After Life"] },
            { name: "The Umbrella Academy", bot: "@TheUmmbrella_bot", searchTerms: ["The Umbrella Academy"] },
            { name: "Maxton Hall The World Between Us", bot: "@MAXTONN_bot", searchTerms: ["Maxton Hall"] },
            { name: "Sweet Home", bot: "@IIIWIIIWV_bot", searchTerms: ["Sweet Home"] },
            { name: "Devs", bot: "@QQCICS_bot", searchTerms: ["Devs"] },
            { name: "Westworld", bot: "@BBBDX_bot", searchTerms: ["Westworld"] },
            { name: "Parasyte The Grey", bot: "@Paraasyte_bot", searchTerms: ["Parasyte The Grey"] },
            { name: "euphoria", bot: "@euuphhoria_bot", searchTerms: ["Euphoria"] },
            { name: "LOST", bot: "@lost32_bot", searchTerms: ["Lost"] },
            { name: "Anne with an E", bot: "@Anewithan_bot", searchTerms: ["Anne with an E"] },
            { name: "Dexter", bot: "@DDDERT_BOT", searchTerms: ["Dexter"] },
            { name: "Evil", bot: "@Eviilll_bot", searchTerms: ["Evil"] },
            { name: "Chernobyl", bot: "@Chernobyll_bot", searchTerms: ["Chernobyl"] },
            { name: "The Empress", bot: "@TheEmpres_bot", searchTerms: ["The Empress"] },
            { name: "Yellowstone", bot: "@Yello1w_bot", searchTerms: ["Yellowstone"] },
            { name: "Lupin", bot: "@Lupinnl_bot", searchTerms: ["Lupin"] },
            { name: "11.22.63", bot: "@fre_et_bot", searchTerms: ["11.22.63"] },
            { name: "Ted Lasso", bot: "@IIWWWF_BOT", searchTerms: ["Ted Lasso"] },
            { name: "Squid game", bot: "@Squidgaame_bot", searchTerms: ["Squid Game"] },
            { name: "The Office", bot: "@The_Officebot", searchTerms: ["The Office"] },
            { name: "Shameless", bot: "@Shameless5bot", searchTerms: ["Shameless"] },
            { name: "Snowfall", bot: "@Snowfall18bot", searchTerms: ["Snowfall"] },
            { name: "Skins", bot: "@Skins_18bot", searchTerms: ["Skins"] },
            { name: "The X-Files", bot: "@TheXFiles1_bot", searchTerms: ["The X Files"] },
            { name: "Agents of S.H.I.E.L.D.", bot: "@Agentsof1_bot", searchTerms: ["Agents of SHIELD"] },
            { name: "The Rookie", bot: "@YDBFBBF_bot", searchTerms: ["The Rookie"] },
            { name: "The Day of the Jackal", bot: "@JJSSTV_bot", searchTerms: ["The Day of the Jackal"] },
            { name: "Reacher", bot: "@QQQXUB_bot", searchTerms: ["Reacher"] },
            { name: "The Sopranos", bot: "@Sopranos1_bot", searchTerms: ["The Sopranos"] },
            { name: "The Mentalist", bot: "@TheMentalist1bot", searchTerms: ["The Mentalist"] }
        ];
    }

    async init() {
        this.injectCompleteStyles();
        await this.loadAllSeries();
        this.createBattleSection();
        this.startRandomBattle();
        this.createAllSeriesPage();
        this.setupCompleteEventListeners();
        this.updateLiveStats();
        console.log('🚀 النظام الذكي الكامل جاهز 100%!');
    }

    async loadAllSeries() {
        // استخدام البيانات المخزنة إذا كانت حديثة
        if (this.cache.timestamp && Date.now() - this.cache.timestamp < 7 * 24 * 60 * 60 * 1000) {
            this.seriesList = this.cache.data || [];
            return;
        }

        // توليد البيانات الذكية
        this.seriesList = await Promise.all(
            this.seriesKnowledgeBase.map(async (series, index) => {
                return this.generateSmartSeriesData(series, index);
            })
        );

        // حفظ في الكاش
        this.cache = {
            data: this.seriesList,
            timestamp: Date.now(),
            version: '2.0'
        };
        localStorage.setItem('series_cache', JSON.stringify(this.cache));
    }

    generateSmartSeriesData(seriesInfo, index) {
        const genres = this.detectGenres(seriesInfo.name);
        const year = this.detectYear(seriesInfo.name);
        const rating = this.calculateRating(seriesInfo.name, index);
        
        return {
            id: index + 1,
            name: seriesInfo.name,
            bot: seriesInfo.bot,
            genres: genres,
            year: year,
            rating: rating,
            seasons: this.calculateSeasons(index),
            episodes: this.calculateEpisodes(index),
            image: this.getSeriesImage(seriesInfo.name, index),
            story: this.generateStory(seriesInfo.name, genres),
            popularity: 50 + Math.floor(Math.random() * 50),
            votes: this.userVotes[index + 1] || 0,
            isFavorite: this.favorites.includes(index + 1)
        };
    }

    // باقي الدوال الذكية (detectGenres, detectYear, calculateRating, etc.)
    // ... (نفس الدوال الذكية السابقة)

    injectCompleteStyles() {
        const styles = `
            /* ===== أنماط النظام الكامل ===== */
            
            /* القسم الرئيسي */
            .complete-series-section {
                margin: 50px auto;
                padding: 40px 20px;
                background: linear-gradient(135deg, 
                    rgba(10, 10, 10, 0.98) 0%, 
                    rgba(26, 26, 46, 0.98) 100%);
                border-radius: 25px;
                border: 3px solid #1DA1F2;
                position: relative;
                overflow: hidden;
                max-width: 1400px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
            }
            
            .complete-series-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 20% 30%, rgba(29, 161, 242, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(229, 9, 20, 0.1) 0%, transparent 50%),
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M0,50 Q25,25 50,50 T100,50" stroke="rgba(255,255,255,0.03)" fill="none" stroke-width="0.5"/></svg>');
                opacity: 0.4;
                z-index: 0;
            }
            
            /* العنوان */
            .complete-title {
                text-align: center;
                color: white;
                font-size: 2.8em;
                margin-bottom: 10px;
                position: relative;
                z-index: 1;
                text-shadow: 0 0 20px rgba(29, 161, 242, 0.7);
                background: linear-gradient(45deg, #1DA1F2, #E50914, #25D366);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .complete-subtitle {
                text-align: center;
                color: #aaa;
                font-size: 1.2em;
                margin-bottom: 40px;
                position: relative;
                z-index: 1;
            }
            
            /* شارات النظام */
            .system-badges {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-bottom: 30px;
                flex-wrap: wrap;
            }
            
            .system-badge {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(29, 161, 242, 0.3);
                color: #1DA1F2;
                padding: 8px 20px;
                border-radius: 25px;
                font-size: 0.9em;
                display: flex;
                align-items: center;
                gap: 8px;
                backdrop-filter: blur(10px);
                transition: all 0.3s;
            }
            
            .system-badge:hover {
                background: rgba(29, 161, 242, 0.2);
                transform: translateY(-2px);
            }
            
            /* لوحة الإحصائيات */
            .complete-stats-panel {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 40px 0;
                position: relative;
                z-index: 1;
            }
            
            .complete-stat-item {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 25px 20px;
                text-align: center;
                transition: all 0.3s;
                backdrop-filter: blur(10px);
            }
            
            .complete-stat-item:hover {
                transform: translateY(-10px);
                border-color: #1DA1F2;
                box-shadow: 0 15px 30px rgba(29, 161, 242, 0.2);
            }
            
            .complete-stat-value {
                font-size: 2.5em;
                font-weight: bold;
                color: #1DA1F2;
                margin-bottom: 10px;
                text-shadow: 0 0 10px rgba(29, 161, 242, 0.5);
            }
            
            .complete-stat-label {
                font-size: 0.9em;
                color: #aaa;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            /* حاوية المعركة */
            .complete-battle-container {
                display: flex;
                flex-wrap: wrap;
                gap: 40px;
                justify-content: center;
                align-items: stretch;
                position: relative;
                z-index: 1;
                margin: 50px 0;
            }
            
            /* بطاقة المسلسل الكاملة */
            .complete-series-card {
                flex: 1;
                min-width: 350px;
                max-width: 500px;
                background: rgba(20, 20, 35, 0.9);
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                border: 2px solid transparent;
                position: relative;
                backdrop-filter: blur(10px);
            }
            
            .complete-series-card:hover {
                transform: translateY(-15px) scale(1.02);
                border-color: #1DA1F2;
                box-shadow: 0 25px 50px rgba(29, 161, 242, 0.4);
            }
            
            .complete-series-card.winner {
                animation: winnerGlow 2s infinite alternate;
            }
            
            @keyframes winnerGlow {
                from {
                    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5),
                                0 0 60px rgba(255, 215, 0, 0.3);
                }
                to {
                    box-shadow: 0 0 50px rgba(255, 215, 0, 0.7),
                                0 0 100px rgba(255, 215, 0, 0.4);
                }
            }
            
            /* صورة المسلسل */
            .complete-series-image {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-bottom: 4px solid #1DA1F2;
                transition: all 0.5s;
            }
            
            .complete-series-card:hover .complete-series-image {
                transform: scale(1.05);
            }
            
            /* معلومات المسلسل */
            .complete-series-info {
                padding: 25px;
                color: white;
                position: relative;
            }
            
            .complete-series-name {
                font-size: 1.8em;
                margin: 0 0 15px 0;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .favorite-btn {
                background: transparent;
                border: none;
                color: #FFD700;
                font-size: 1.5em;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .favorite-btn.active {
                animation: heartBeat 0.5s;
            }
            
            @keyframes heartBeat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.3); }
            }
            
            /* الميتاداتا */
            .complete-series-meta {
                display: flex;
                gap: 15px;
                margin-bottom: 20px;
                flex-wrap: wrap;
                align-items: center;
            }
            
            .complete-rating {
                background: linear-gradient(45deg, #FFD700, #FFA500);
                color: #000;
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 1.1em;
            }
            
            .complete-year {
                background: rgba(255, 255, 255, 0.1);
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
            }
            
            /* التصنيفات الذكية */
            .complete-genres-container {
                margin-bottom: 20px;
            }
            
            .complete-genres-title {
                color: #aaa;
                font-size: 0.9em;
                margin-bottom: 10px;
            }
            
            .complete-genres-grid {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .complete-genre-tag {
                background: linear-gradient(45deg, 
                    rgba(29, 161, 242, 0.3), 
                    rgba(229, 9, 20, 0.3));
                color: white;
                padding: 6px 15px;
                border-radius: 20px;
                font-size: 0.9em;
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s;
            }
            
            .complete-genre-tag:hover {
                transform: translateY(-2px);
                background: linear-gradient(45deg, 
                    rgba(29, 161, 242, 0.5), 
                    rgba(229, 9, 20, 0.5));
            }
            
            /* القصة */
            .complete-story-container {
                margin: 25px 0;
                position: relative;
            }
            
            .complete-story {
                color: #ccc;
                line-height: 1.7;
                margin-bottom: 15px;
                max-height: 120px;
                overflow: hidden;
                position: relative;
                transition: max-height 0.5s;
            }
            
            .complete-story.expanded {
                max-height: 500px;
            }
            
            .story-gradient {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 40px;
                background: linear-gradient(to bottom, transparent, rgba(20, 20, 35, 0.9));
                pointer-events: none;
                transition: opacity 0.3s;
            }
            
            .story-gradient.hidden {
                opacity: 0;
            }
            
            .story-toggle {
                background: transparent;
                border: 1px solid #1DA1F2;
                color: #1DA1F2;
                padding: 8px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.9em;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .story-toggle:hover {
                background: rgba(29, 161, 242, 0.1);
            }
            
            /* أزرار المشاهدة */
            .complete-actions {
                display: flex;
                gap: 15px;
                margin-top: 25px;
            }
            
            .complete-watch-btn {
                flex: 1;
                padding: 18px;
                background: linear-gradient(45deg, #25D366, #128C7E);
                color: white;
                border: none;
                border-radius: 15px;
                font-size: 1.1em;
                font-weight: bold;
                text-align: center;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
            }
            
            .complete-watch-btn:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 30px rgba(37, 211, 102, 0.4);
            }
            
            .complete-watch-btn.telegram {
                background: linear-gradient(45deg, #1DA1F2, #0088cc);
            }
            
            /* أزرار التصويت */
            .complete-vote-section {
                margin-top: 40px;
                text-align: center;
            }
            
            .complete-vote-buttons {
                display: flex;
                gap: 20px;
                justify-content: center;
                margin-bottom: 20px;
            }
            
            .complete-vote-btn {
                padding: 18px 40px;
                border: none;
                border-radius: 25px;
                font-size: 1.2em;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                gap: 15px;
                min-width: 200px;
                justify-content: center;
            }
            
            .complete-vote-btn.left {
                background: linear-gradient(45deg, #1DA1F2, #0056b3);
                color: white;
            }
            
            .complete-vote-btn.right {
                background: linear-gradient(45deg, #E50914, #b30000);
                color: white;
            }
            
            .complete-vote-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            }
            
            .complete-vote-btn:active {
                transform: scale(0.95);
            }
            
            /* VS وسط المعركة */
            .complete-vs {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #1DA1F2, #E50914);
                color: white;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8em;
                font-weight: bold;
                z-index: 10;
                border: 4px solid #FFD700;
                animation: vsPulse 2s infinite;
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            }
            
            @keyframes vsPulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }
            
            /* إحصائيات المعركة */
            .battle-stats-bar {
                display: flex;
                justify-content: space-between;
                margin-top: 30px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .battle-stat {
                text-align: center;
                flex: 1;
            }
            
            .battle-stat-value {
                font-size: 2em;
                font-weight: bold;
                color: #1DA1F2;
                margin-bottom: 5px;
            }
            
            .battle-stat-label {
                color: #aaa;
                font-size: 0.9em;
            }
            
            /* أزرار التحكم */
            .control-buttons {
                display: flex;
                gap: 20px;
                justify-content: center;
                margin-top: 30px;
                flex-wrap: wrap;
            }
            
            .control-btn {
                padding: 15px 30px;
                border: 2px solid #1DA1F2;
                background: transparent;
                color: #1DA1F2;
                border-radius: 25px;
                font-size: 1em;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .control-btn:hover {
                background: rgba(29, 161, 242, 0.1);
                transform: translateY(-3px);
            }
            
            .control-btn.primary {
                background: linear-gradient(45deg, #1DA1F2, #E50914);
                color: white;
                border: none;
            }
            
            /* صفحة عرض الكل */
            .all-series-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.98);
                z-index: 10000;
                overflow-y: auto;
                padding: 20px;
                animation: modalFadeIn 0.3s;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .all-series-container {
                max-width: 1400px;
                margin: 0 auto;
                background: #0a0a0a;
                border-radius: 25px;
                padding: 40px;
                border: 3px solid #1DA1F2;
                position: relative;
                animation: modalSlideUp 0.5s;
            }
            
            @keyframes modalSlideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .all-series-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 25px;
                margin-top: 30px;
            }
            
            /* الكونفيتي */
            .confetti-piece {
                position: fixed;
                width: 15px;
                height: 15px;
                background: linear-gradient(45deg, var(--c1), var(--c2));
                top: -20px;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
                border-radius: 50%;
                opacity: 0.9;
            }
            
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
            
            /* تصميم متجاوب */
            @media (max-width: 1200px) {
                .complete-battle-container {
                    flex-direction: column;
                    align-items: center;
                }
                
                .complete-series-card {
                    min-width: 90%;
                }
                
                .complete-vs {
                    position: relative;
                    top: 0;
                    left: 0;
                    transform: none;
                    margin: 30px auto;
                }
            }
            
            @media (max-width: 768px) {
                .complete-title {
                    font-size: 2em;
                }
                
                .complete-stats-panel {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .complete-vote-buttons {
                    flex-direction: column;
                    align-items: center;
                }
                
                .complete-vote-btn {
                    width: 100%;
                    max-width: 300px;
                }
                
                .control-buttons {
                    flex-direction: column;
                    align-items: center;
                }
                
                .control-btn {
                    width: 100%;
                    max-width: 300px;
                    justify-content: center;
                }
                
                .all-series-grid {
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                }
            }
            
            @media (max-width: 480px) {
                .complete-stats-panel {
                    grid-template-columns: 1fr;
                }
                
                .complete-series-card {
                    min-width: 100%;
                }
                
                .complete-actions {
                    flex-direction: column;
                }
                
                .all-series-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            /* تأثيرات إضافية */
            .live-update {
                animation: liveUpdate 1s infinite alternate;
            }
            
            @keyframes liveUpdate {
                from { opacity: 0.7; }
                to { opacity: 1; }
            }
            
            .pulse-glow {
                animation: pulseGlow 2s infinite;
            }
            
            @keyframes pulseGlow {
                0%, 100% { box-shadow: 0 0 20px rgba(29, 161, 242, 0.5); }
                50% { box-shadow: 0 0 40px rgba(29, 161, 242, 0.8); }
            }
            
            /* شريط التقدم */
            .progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
                margin: 20px 0;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #1DA1F2, #25D366);
                border-radius: 4px;
                transition: width 1s ease;
            }
            
            /* العلامة المائية */
            .watermark {
                position: absolute;
                bottom: 20px;
                right: 20px;
                color: rgba(255, 255, 255, 0.1);
                font-size: 0.8em;
                z-index: 0;
            }
        `;
        
        const styleEl = document.createElement('style');
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }

    createBattleSection() {
        const battleHTML = `
            <section class="complete-series-section">
                <div class="watermark">G_E_8 AI System v2.0</div>
                
                <h1 class="complete-title">🎬 معركة المسلسلات الذكية</h1>
                <p class="complete-subtitle">67 مسلسل عالمي مع بيانات مولدة ذكياً</p>
                
                <div class="system-badges">
                    <div class="system-badge">🤖 ذكاء اصطناعي</div>
                    <div class="system-badge">⚡ تحديث حي</div>
                    <div class="system-badge">🌐 ثنائي اللغة</div>
                    <div class="system-badge">🎯 توصيات ذكية</div>
                </div>
                
                <div class="complete-stats-panel">
                    <div class="complete-stat-item">
                        <div class="complete-stat-value" id="total-series">67</div>
                        <div class="complete-stat-label">مسلسل</div>
                    </div>
                    <div class="complete-stat-item">
                        <div class="complete-stat-value" id="avg-rating">8.5</div>
                        <div class="complete-stat-label">متوسط التقييم</div>
                    </div>
                    <div class="complete-stat-item">
                        <div class="complete-stat-value" id="total-episodes">1,500+</div>
                        <div class="complete-stat-label">حلقة</div>
                    </div>
                    <div class="complete-stat-item">
                        <div class="complete-stat-value live-update" id="live-time">00:00</div>
                        <div class="complete-stat-label">بيانات حية</div>
                    </div>
                </div>
                
                <div class="progress-bar">
                    <div class="progress-fill" id="battle-progress" style="width: 100%"></div>
                </div>
                
                <div class="complete-battle-container" id="complete-battle-container">
                    <!-- سيتم ملؤه تلقائياً -->
                </div>
                
                <div class="complete-vote-section">
                    <div class="complete-vote-buttons" id="vote-buttons">
                        <!-- أزرار التصويت -->
                    </div>
                    
                    <div class="battle-stats-bar">
                        <div class="battle-stat">
                            <div class="battle-stat-value" id="total-battles">0</div>
                            <div class="battle-stat-label">معركة</div>
                        </div>
                        <div class="battle-stat">
                            <div class="battle-stat-value" id="total-votes">0</div>
                            <div class="battle-stat-label">تصويت</div>
                        </div>
                        <div class="battle-stat">
                            <div class="battle-stat-value" id="battle-timer">30</div>
                            <div class="battle-stat-label">ثانية</div>
                        </div>
                    </div>
                </div>
                
                <div class="control-buttons">
                    <button class="control-btn" onclick="window.completeSeries.showAllSeries()">
                        📚 عرض كل المسلسلات
                    </button>
                    <button class="control-btn" onclick="window.completeSeries.startRandomBattle()">
                        🔄 معركة جديدة
                    </button>
                    <button class="control-btn primary" onclick="window.completeSeries.toggleLanguage()">
                        🌐 تبديل اللغة
                    </button>
                    <button class="control-btn" onclick="window.completeSeries.showFavorites()">
                        ⭐ المفضلة
                    </button>
                </div>
            </section>
        `;
        
        this.injectIntoPage(battleHTML);
    }

    async startRandomBattle() {
        if (this.seriesList.length < 2) {
            await this.loadAllSeries();
        }
        
        // إعادة تعيين المؤقت
        this.resetBattleTimer();
        
        // اختيار مسلسلين مختلفين
        const index1 = Math.floor(Math.random() * this.seriesList.length);
        let index2;
        do {
            index2 = Math.floor(Math.random() * this.seriesList.length);
        } while (index1 === index2);
        
        this.currentBattle = {
            series1: this.seriesList[index1],
            series2: this.seriesList[index2],
            startTime: Date.now()
        };
        
        this.stats.totalBattles++;
        localStorage.setItem('total_battles', this.stats.totalBattles);
        
        this.renderCompleteBattle();
        this.updateStats();
        this.startBattleTimer();
    }

    renderCompleteBattle() {
        const container = document.getElementById('complete-battle-container');
        if (!container || !this.currentBattle) return;
        
        const { series1, series2 } = this.currentBattle;
        const lang = this.currentLanguage;
        
        container.innerHTML = `
            <div class="complete-vs">VS</div>
            
            <div class="complete-series-card" id="series-${series1.id}" data-series-id="${series1.id}">
                <img src="${series1.image}" alt="${series1.name}" 
                     class="complete-series-image"
                     onerror="this.src='https://via.placeholder.com/500x300/1a1a2e/1DA1F2?text=${encodeURIComponent(series1.name)}'">
                
                <div class="complete-series-info">
                    <div class="complete-series-name">
                        ${series1.name}
                        <button class="favorite-btn ${series1.isFavorite ? 'active' : ''}" 
                                onclick="window.completeSeries.toggleFavorite(${series1.id})">
                            ${series1.isFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                    
                    <div class="complete-series-meta">
                        <span class="complete-rating">⭐ ${series1.rating}</span>
                        <span class="complete-year">${series1.year}</span>
                        <span>${series1.seasons} مواسم</span>
                    </div>
                    
                    <div class="complete-genres-container">
                        <div class="complete-genres-title">التصنيفات:</div>
                        <div class="complete-genres-grid">
                            ${series1.genres.map(genre => `
                                <span class="complete-genre-tag">${genre}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="complete-story-container">
                        <div class="complete-story" id="story-${series1.id}">
                            ${series1.story[lang]}
                        </div>
                        <div class="story-gradient" id="gradient-${series1.id}"></div>
                        <button class="story-toggle" onclick="window.completeSeries.toggleStory(${series1.id})">
                            📖 عرض المزيد
                        </button>
                    </div>
                    
                    <div class="complete-actions">
                        <a href="https://t.me/${series1.bot.replace('@', '')}" 
                           target="_blank" 
                           class="complete-watch-btn telegram"
                           onclick="window.completeSeries.trackWatch('${series1.bot}')">
                            📺 مشاهدة على ${series1.bot}
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="complete-series-card" id="series-${series2.id}" data-series-id="${series2.id}">
                <img src="${series2.image}" alt="${series2.name}"
                     class="complete-series-image"
                     onerror="this.src='https://via.placeholder.com/500x300/1a1a2e/E50914?text=${encodeURIComponent(series2.name)}'">
                
                <div class="complete-series-info">
                    <div class="complete-series-name">
                        ${series2.name}
                        <button class="favorite-btn ${series2.isFavorite ? 'active' : ''}" 
                                onclick="window.completeSeries.toggleFavorite(${series2.id})">
                            ${series2.isFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                    
                    <div class="complete-series-meta">
                        <span class="complete-rating">⭐ ${series2.rating}</span>
                        <span class="complete-year">${series2.year}</span>
                        <span>${series2.seasons} مواسم</span>
                    </div>
                    
                    <div class="complete-genres-container">
                        <div class="complete-genres-title">التصنيفات:</div>
                        <div class="complete-genres-grid">
                            ${series2.genres.map(genre => `
                                <span class="complete-genre-tag">${genre}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="complete-story-container">
                        <div class="complete-story" id="story-${series2.id}">
                            ${series2.story[lang]}
                        </div>
                        <div class="story-gradient" id="gradient-${series2.id}"></div>
                        <button class="story-toggle" onclick="window.completeSeries.toggleStory(${series2.id})">
                            📖 عرض المزيد
                        </button>
                    </div>
                    
                    <div class="complete-actions">
                        <a href="https://t.me/${series2.bot.replace('@', '')}" 
                           target="_blank" 
                           class="complete-watch-btn telegram"
                           onclick="window.completeSeries.trackWatch('${series2.bot}')">
                            📺 مشاهدة على ${series2.bot}
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // تحديث أزرار التصويت
        this.updateVoteButtons();
    }

    updateVoteButtons() {
        const buttonsContainer = document.getElementById('vote-buttons');
        if (!buttonsContainer || !this.currentBattle) return;
        
        const { series1, series2 } = this.currentBattle;
        
        buttonsContainer.innerHTML = `
            <button class="complete-vote-btn left" 
                    onclick="window.completeSeries.voteForSeries(${series1.id})">
                👍 ${series1.name}
            </button>
            <button class="complete-vote-btn right" 
                    onclick="window.completeSeries.voteForSeries(${series2.id})">
                👍 ${series2.name}
            </button>
        `;
    }

    voteForSeries(seriesId) {
        const series = this.seriesList.find(s => s.id === seriesId);
        if (!series) return;
        
        // تسجيل التصويت
        series.votes = (series.votes || 0) + 1;
        series.popularity = Math.min(100, series.popularity + 5);
        
        this.userVotes[seriesId] = (this.userVotes[seriesId] || 0) + 1;
        localStorage.setItem('series_votes', JSON.stringify(this.userVotes));
        
        this.stats.totalVotes++;
        localStorage.setItem('total_votes', this.stats.totalVotes);
        
        // تأثيرات الفوز
        this.showWinnerEffects(seriesId);
        this.updateCache();
        this.updateStats();
        
        // معركة جديدة بعد 2 ثانية
        setTimeout(() => {
            this.startRandomBattle();
        }, 2000);
        
        // رسالة نجاح
        this.showMessage(`🎉 صوتت لـ ${series.name}!`, 'success');
    }

    toggleFavorite(seriesId) {
        const series = this.seriesList.find(s => s.id === seriesId);
        if (!series) return;
        
        const index = this.favorites.indexOf(seriesId);
        
        if (index === -1) {
            // إضافة للمفضلة
            this.favorites.push(seriesId);
            series.isFavorite = true;
            this.showMessage(`❤️ أضيف ${series.name} للمفضلة`, 'success');
        } else {
            // إزالة من المفضلة
            this.favorites.splice(index, 1);
            series.isFavorite = false;
            this.showMessage(`💔 أزيل ${series.name} من المفضلة`, 'info');
        }
        
        localStorage.setItem('series_favorites', JSON.stringify(this.favorites));
        this.updateCache();
        
        // تحديث الزر
        const btn = document.querySelector(`[onclick="window.completeSeries.toggleFavorite(${seriesId})"]`);
        if (btn) {
            btn.innerHTML = series.isFavorite ? '❤️' : '🤍';
            btn.classList.toggle('active', series.isFavorite);
        }
    }

    toggleStory(seriesId) {
        const storyElement = document.getElementById(`story-${seriesId}`);
        const gradientElement = document.getElementById(`gradient-${seriesId}`);
        const toggleBtn = document.querySelector(`button[onclick="window.completeSeries.toggleStory(${seriesId})"]`);
        
        if (!storyElement) return;
        
        const isExpanded = storyElement.classList.contains('expanded');
        
        if (isExpanded) {
            storyElement.classList.remove('expanded');
            if (gradientElement) gradientElement.classList.remove('hidden');
            if (toggleBtn) toggleBtn.innerHTML = '📖 عرض المزيد';
        } else {
            storyElement.classList.add('expanded');
            if (gradientElement) gradientElement.classList.add('hidden');
            if (toggleBtn) toggleBtn.innerHTML = '📖 عرض أقل';
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        
        // تحديث جميع القصص
        this.seriesList.forEach(series => {
            const storyElement = document.getElementById(`story-${series.id}`);
            if (storyElement) {
                storyElement.textContent = series.story[this.currentLanguage];
            }
        });
        
        // تحديث أزرار القصة
        document.querySelectorAll('.story-toggle').forEach(btn => {
            const currentText = btn.textContent;
            if (currentText.includes('المزيد') || currentText.includes('أقل')) {
                // لا تغيير
            } else if (this.currentLanguage === 'ar') {
                btn.textContent = '🔄 English';
            } else {
                btn.textContent = '🔄 العربية';
            }
        });
        
        // زر تبديل اللغة الرئيسي
        const langBtn = document.querySelector('[onclick="window.completeSeries.toggleLanguage()"]');
        if (langBtn) {
            langBtn.innerHTML = this.currentLanguage === 'ar' ? 
                '🌐 English' : '🌐 العربية';
        }
        
        this.showMessage(`🌐 اللغة: ${this.currentLanguage === 'ar' ? 'العربية' : 'English'}`, 'info');
    }

    showWinnerEffects(winnerId) {
        // توهج الفائز
        const winnerCard = document.getElementById(`series-${winnerId}`);
        if (winnerCard) {
            winnerCard.classList.add('winner');
            
            setTimeout(() => {
                winnerCard.classList.remove('winner');
            }, 3000);
        }
        
        // كونفيتي
        this.createConfetti();
        
        // صوت نجاح (إذا كان المتصفح يدعم)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (e) {
            console.log('المتصفح لا يدعم Web Audio API');
        }
    }

    createConfetti() {
        const colors = [
            '#1DA1F2', '#E50914', '#25D366', '#FFD700', 
            '#9B59B6', '#E74C3C', '#3498DB', '#2ECC71'
        ];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const color1 = colors[Math.floor(Math.random() * colors.length)];
                const color2 = colors[Math.floor(Math.random() * colors.length)];
                
                confetti.className = 'confetti-piece';
                confetti.style.cssText = `
                    --c1: ${color1};
                    --c2: ${color2};
                    left: ${Math.random() * 100}vw;
                    width: ${Math.random() * 15 + 10}px;
                    height: ${Math.random() * 15 + 10}px;
                    animation-delay: ${Math.random() * 2}s;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 20);
        }
    }

    updateStats() {
        // تحديث الإحصائيات العامة
        document.getElementById('total-battles').textContent = this.stats.totalBattles;
        document.getElementById('total-votes').textContent = this.stats.totalVotes;
        
        // تحديث إحصائيات النظام
        const totalEpisodes = this.seriesList.reduce((sum, series) => sum + series.episodes, 0);
        const avgRating = (this.seriesList.reduce((sum, series) => sum + series.rating, 0) / this.seriesList.length).toFixed(1);
        
        document.getElementById('total-series').textContent = this.seriesList.length;
        document.getElementById('avg-rating').textContent = avgRating;
        document.getElementById('total-episodes').textContent = totalEpisodes.toLocaleString();
    }

    updateLiveStats() {
        // تحديث الوقت الحي
        const updateTime = () => {
            const now = new Date();
            const timeString = 
                `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
            
            const timeElement = document.getElementById('live-time');
            if (timeElement) {
                timeElement.textContent = timeString;
            }
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    startBattleTimer() {
        let timeLeft = 30;
        const timerElement = document.getElementById('battle-timer');
        const progressElement = document.getElementById('battle-progress');
        
        this.battleTimer = setInterval(() => {
            timeLeft--;
            
            if (timerElement) {
                timerElement.textContent = timeLeft;
            }
            
            if (progressElement) {
                const progress = (timeLeft / 30) * 100;
                progressElement.style.width = `${progress}%`;
                
                // تغيير اللون حسب الوقت
                if (timeLeft < 10) {
                    progressElement.style.background = 'linear-gradient(90deg, #E50914, #FF6B6B)';
                } else if (timeLeft < 20) {
                    progressElement.style.background = 'linear-gradient(90deg, #FFD700, #FFA500)';
                }
            }
            
            if (timeLeft <= 0) {
                clearInterval(this.battleTimer);
                this.startRandomBattle();
            }
        }, 1000);
    }

    resetBattleTimer() {
        if (this.battleTimer) {
            clearInterval(this.battleTimer);
        }
        
        const timerElement = document.getElementById('battle-timer');
        const progressElement = document.getElementById('battle-progress');
        
        if (timerElement) timerElement.textContent = '30';
        if (progressElement) {
            progressElement.style.width = '100%';
            progressElement.style.background = 'linear-gradient(90deg, #1DA1F2, #25D366)';
        }
    }

    showAllSeries() {
        const modal = document.createElement('div');
        modal.className = 'all-series-modal';
        modal.id = 'all-series-modal';
        
        modal.innerHTML = `
            <div class="all-series-container">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <h2 style="color: white; margin: 0; font-size: 2em;">
                        🤖 جميع المسلسلات (${this.seriesList.length})
                    </h2>
                    <button onclick="document.getElementById('all-series-modal').remove()" 
                            style="background: #E50914; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        ✕
                    </button>
                </div>
                
                <div class="control-buttons" style="margin-bottom: 30px;">
                    <button class="control-btn" onclick="window.completeSeries.filterSeries('all')">
                        الكل
                    </button>
                    <button class="control-btn" onclick="window.completeSeries.filterSeries('favorites')">
                        ⭐ المفضلة
                    </button>
                    <button class="control-btn" onclick="window.completeSeries.filterSeries('top')">
                        🏆 الأعلى تقييماً
                    </button>
                    <button class="control-btn" onclick="window.completeSeries.searchSeries()">
                        🔍 بحث
                    </button>
                </div>
                
                <div class="all-series-grid" id="all-series-grid">
                    ${this.renderAllSeriesCards()}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // إغلاق عند الضغط على ESC
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
        
        // إغلاق عند الضغط خارج المحتوى
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
    }

    renderAllSeriesCards() {
        return this.seriesList.map(series => `
            <div class="complete-series-card" style="min-width: 100%;">
                <img src="${series.image}" alt="${series.name}" 
                     style="width: 100%; height: 200px; object-fit: cover;"
                     onerror="this.src='https://via.placeholder.com/300x200/1a1a2e/1DA1F2?text=${encodeURIComponent(series.name.substring(0, 15))}'">
                
                <div style="padding: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4 style="color: white; margin: 0; font-size: 1.2em;">${series.name}</h4>
                        <button onclick="window.completeSeries.toggleFavorite(${series.id}); event.stopPropagation();" 
                                style="background: transparent; border: none; color: ${series.isFavorite ? '#FFD700' : '#666'}; font-size: 1.5em; cursor: pointer;">
                            ${series.isFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                        <span style="background: linear-gradient(45deg, #FFD700, #FFA500); color: #000; padding: 3px 12px; border-radius: 15px; font-weight: bold;">
                            ⭐ ${series.rating}
                        </span>
                        <span style="background: rgba(255,255,255,0.1); color: #aaa; padding: 3px 12px; border-radius: 15px;">
                            ${series.year}
                        </span>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        ${series.genres.map(genre => `
                            <span style="display: inline-block; background: rgba(29,161,242,0.2); color: #1DA1F2; padding: 4px 12px; border-radius: 15px; font-size: 0.85em; margin: 3px;">
                                ${genre}
                            </span>
                        `).join('')}
                    </div>
                    
                    <a href="https://t.me/${series.bot.replace('@', '')}" 
                       target="_blank"
                       style="display: block; text-align: center; background: linear-gradient(45deg, #25D366, #128C7E); color: white; padding: 12px; border-radius: 10px; text-decoration: none; margin-top: 15px; font-weight: bold;"
                       onclick="window.completeSeries.trackWatch('${series.bot}')">
                        📺 ${series.bot}
                    </a>
                </div>
            </div>
        `).join('');
    }

    filterSeries(type) {
        let filteredSeries = this.seriesList;
        
        switch (type) {
            case 'favorites':
                filteredSeries = this.seriesList.filter(s => s.isFavorite);
                break;
            case 'top':
                filteredSeries = [...this.seriesList].sort((a, b) => b.rating - a.rating).slice(0, 20);
                break;
        }
        
        const grid = document.getElementById('all-series-grid');
        if (grid) {
            grid.innerHTML = filteredSeries.map(series => `
                <div class="complete-series-card" style="min-width: 100%;">
                    <img src="${series.image}" alt="${series.name}" 
                         style="width: 100%; height: 200px; object-fit: cover;"
                         onerror="this.src='https://via.placeholder.com/300x200/1a1a2e/1DA1F2?text=${encodeURIComponent(series.name.substring(0, 15))}'">
                    
                    <div style="padding: 20px;">
                        <h4 style="color: white; margin: 0 0 15px 0; font-size: 1.2em;">${series.name}</h4>
                        
                        <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                            <span style="background: linear-gradient(45deg, #FFD700, #FFA500); color: #000; padding: 3px 12px; border-radius: 15px; font-weight: bold;">
                                ⭐ ${series.rating}
                            </span>
                            <span style="background: rgba(255,255,255,0.1); color: #aaa; padding: 3px 12px; border-radius: 15px;">
                                ${series.year}
                            </span>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            ${series.genres.map(genre => `
                                <span style="display: inline-block; background: rgba(29,161,242,0.2); color: #1DA1F2; padding: 4px 12px; border-radius: 15px; font-size: 0.85em; margin: 3px;">
                                    ${genre}
                                </span>
                            `).join('')}
                        </div>
                        
                        <a href="https://t.me/${series.bot.replace('@', '')}" 
                           target="_blank"
                           style="display: block; text-align: center; background: linear-gradient(45deg, #25D366, #128C7E); color: white; padding: 12px; border-radius: 10px; text-decoration: none; margin-top: 15px; font-weight: bold;">
                            📺 ${series.bot}
                        </a>
                    </div>
                </div>
            `).join('');
        }
    }

    showFavorites() {
        const favorites = this.seriesList.filter(s => s.isFavorite);
        
        if (favorites.length === 0) {
            this.showMessage('⭐ لم تقم بإضافة أي مسلسل للمفضلة بعد', 'info');
            return;
        }
        
        this.showAllSeries();
        setTimeout(() => {
            this.filterSeries('favorites');
        }, 100);
    }

    searchSeries() {
        const searchTerm = prompt('🔍 ابحث عن مسلسل:');
        if (!searchTerm) return;
        
        const results = this.seriesList.filter(series => 
            series.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            series.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        if (results.length === 0) {
            this.showMessage('🔍 لم يتم العثور على نتائج', 'info');
            return;
        }
        
        const grid = document.getElementById('all-series-grid');
        if (grid) {
            grid.innerHTML = results.map(series => `
                <div class="complete-series-card" style="min-width: 100%;">
                    <img src="${series.image}" alt="${series.name}" 
                         style="width: 100%; height: 200px; object-fit: cover;"
                         onerror="this.src='https://via.placeholder.com/300x200/1a1a2e/1DA1F2?text=${encodeURIComponent(series.name.substring(0, 15))}'">
                    
                    <div style="padding: 20px;">
                        <h4 style="color: white; margin: 0 0 15px 0; font-size: 1.2em;">${series.name}</h4>
                        
                        <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                            <span style="background: linear-gradient(45deg, #FFD700, #FFA500); color: #000; padding: 3px 12px; border-radius: 15px; font-weight: bold;">
                                ⭐ ${series.rating}
                            </span>
                            <span style="background: rgba(255,255,255,0.1); color: #aaa; padding: 3px 12px; border-radius: 15px;">
                                ${series.year}
                            </span>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            ${series.genres.map(genre => `
                                <span style="display: inline-block; background: rgba(29,161,242,0.2); color: #1DA1F2; padding: 4px 12px; border-radius: 15px; font-size: 0.85em; margin: 3px;">
                                    ${genre}
                                </span>
                            `).join('')}
                        </div>
                        
                        <a href="https://t.me/${series.bot.replace('@', '')}" 
                           target="_blank"
                           style="display: block; text-align: center; background: linear-gradient(45deg, #25D366, #128C7E); color: white; padding: 12px; border-radius: 10px; text-decoration: none; margin-top: 15px; font-weight: bold;">
                            📺 ${series.bot}
                        </a>
                    </div>
                </div>
            `).join('');
        }
        
        this.showMessage(`🔍 وجدت ${results.length} نتيجة`, 'success');
    }

    showMessage(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            background: ${type === 'success' ? '#25D366' : type === 'error' ? '#E50914' : '#1DA1F2'};
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            z-index: 10001;
            animation: messageSlideIn 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            font-weight: bold;
            max-width: 400px;
            word-break: break-word;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes messageSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes messageSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'messageSlideOut 0.3s ease forwards';
            setTimeout(() => messageEl.remove(), 300);
        }, 3000);
    }

    trackWatch(botUsername) {
        const watches = JSON.parse(localStorage.getItem('series_watches') || '[]');
        const series = this.seriesList.find(s => s.bot === botUsername);
        
        watches.push({
            bot: botUsername,
            series: series?.name || 'Unknown',
            timestamp: new Date().toISOString(),
            language: this.currentLanguage
        });
        
        localStorage.setItem('series_watches', JSON.stringify(watches.slice(-100)));
        
        // زيادة شعبية المسلسل
        if (series) {
            series.popularity = Math.min(100, series.popularity + 10);
            this.updateCache();
        }
    }

    updateCache() {
        this.cache.data = this.seriesList;
        this.cache.timestamp = Date.now();
        localStorage.setItem('series_cache', JSON.stringify(this.cache));
    }

    injectIntoPage(html) {
        const insertionPoints = [
            '.trending-section',
            '.recommendations-section',
            '.chatbot-widget',
            'main > section:last-child'
        ];
        
        for (const selector of insertionPoints) {
            const element = document.querySelector(selector);
            if (element) {
                element.insertAdjacentHTML('afterend', html);
                return;
            }
        }
        
        document.body.insertAdjacentHTML('beforeend', html);
    }

    createAllSeriesPage() {
        // إضافة زر في شريط التنقل إذا كان موجوداً
        const nav = document.querySelector('nav') || document.querySelector('.navbar') || document.querySelector('header');
        if (nav) {
            const seriesLink = document.createElement('a');
            seriesLink.href = '#';
            seriesLink.innerHTML = '🎬 المسلسلات';
            seriesLink.style.cssText = `
                color: #1DA1F2;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 20px;
                background: rgba(29, 161, 242, 0.1);
                margin: 0 10px;
                transition: all 0.3s;
                font-weight: bold;
            `;
            seriesLink.onmouseover = () => {
                seriesLink.style.background = 'rgba(29, 161, 242, 0.2)';
                seriesLink.style.transform = 'translateY(-2px)';
            };
            seriesLink.onmouseout = () => {
                seriesLink.style.background = 'rgba(29, 161, 242, 0.1)';
                seriesLink.style.transform = 'translateY(0)';
            };
            seriesLink.onclick = (e) => {
                e.preventDefault();
                this.showAllSeries();
            };
            
            nav.appendChild(seriesLink);
        }
    }

    setupCompleteEventListeners() {
        // تحديث الإحصائيات كل 5 ثوانٍ
        setInterval(() => this.updateStats(), 5000);
        
        // تغيير المعركة تلقائياً كل 30 ثانية
        this.battleTimer = setInterval(() => {
            this.startRandomBattle();
        }, 30000);
        
        // إغلاق صفحة العرض الكامل عند الضغط على ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('all-series-modal');
                if (modal) {
                    modal.remove();
                    document.body.style.overflow = '';
                }
            }
        });
        
        // تعطيل التمرير عند فتح المودال
        document.addEventListener('DOMContentLoaded', () => {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.id === 'all-series-modal') {
                                document.body.style.overflow = 'hidden';
                            }
                        });
                        
                        mutation.removedNodes.forEach((node) => {
                            if (node.id === 'all-series-modal') {
                                document.body.style.overflow = '';
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.body, { childList: true });
        });
        
        // تحديث البيانات كل ساعة
        setInterval(() => {
            if (Date.now() - this.cache.timestamp > 60 * 60 * 1000) {
                this.loadAllSeries().then(() => {
                    console.log('🔄 تم تحديث البيانات تلقائياً');
                });
            }
        }, 60 * 60 * 1000);
    }

    // الدوال الذكية المساعدة
    detectGenres(seriesName) {
        const genreMap = {
            'Walking Dead|Spartacus|Vikings|Daredevil|Punisher|Reacher': ['أكشن', 'دراما'],
            'Breaking Bad|Sopranos|La Casa': ['جريمة', 'دراما', 'تشويق'],
            'Game of Thrones|Witcher|Originals|Legacies': ['فانتازيا', 'دراما', 'أكشن'],
            'Stranger Things|Dark|The 100|Westworld': ['خيال علمي', 'دراما', 'غموض'],
            'Friends|The Office|Ted Lasso|Emily': ['كوميدي', 'رومانسي'],
            'Grey\'s Anatomy|Big Little Lies|13 Reasons Why': ['دراما'],
            'American horror|X-Files|FROM|Evil': ['رعب', 'غموض'],
            'Vampire Diaries|You|Gossip Girl|Pretty Little': ['رومانسي', 'دراما'],
            'Sherlock|Mentalist|Dexter': ['غموض', 'جريمة', 'دراما'],
            'The Boys|Umbrella Academy|Agents of S.H.I.E.L.D.': ['خارق', 'أكشن', 'كوميدي']
        };

        for (const [keywords, genres] of Object.entries(genreMap)) {
            if (new RegExp(keywords, 'i').test(seriesName)) {
                return genres;
            }
        }

        return ['دراما', 'تشويق'];
    }

    detectYear(seriesName) {
        const yearMap = {
            'Friends|X-Files|Sopranos': '1994-2004',
            'Breaking Bad|Vampire Diaries|Dexter': '2008-2013',
            'Game of Thrones|Sherlock|Walking Dead': '2010-2019',
            'Stranger Things|The Boys|Witcher': '2016-حالياً',
            'Last of Us|Penguin|Shogun': '2023-حالياً'
        };

        for (const [keywords, year] of Object.entries(yearMap)) {
            if (new RegExp(keywords, 'i').test(seriesName)) {
                return year;
            }
        }

        return '2015-2022';
    }

    calculateRating(seriesName, index) {
        const ratingMap = {
            'Breaking Bad|Game of Thrones': 9.3,
            'Sherlock|Last of Us': 8.8,
            'Stranger Things|The Boys': 8.7,
            'Walking Dead|Vikings': 8.4,
            'Friends|The Office': 8.9,
            'Witcher|Daredevil': 8.2,
            'Grey\'s Anatomy|You': 7.9,
            'Money Heist|Dark': 8.3,
            'Squid Game|Euphoria': 8.1,
            'The 100|Westworld': 7.8
        };

        for (const [keywords, rating] of Object.entries(ratingMap)) {
            if (new RegExp(keywords, 'i').test(seriesName)) {
                return rating;
            }
        }

        return (7.5 + Math.random() * 1.5).toFixed(1);
    }

    calculateSeasons(index) {
        if (index < 20) return Math.floor(Math.random() * 8) + 1;
        return Math.floor(Math.random() * 4) + 1;
    }

    calculateEpisodes(index) {
        return this.calculateSeasons(index) * 10;
    }

    getSeriesImage(seriesName, index) {
        const images = [
            'https://image.tmdb.org/t/p/w500/xFw9RXKZDvevAGocgBK0zteto4U.jpg',
            'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
            'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
            'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
            'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
            'https://image.tmdb.org/t/p/w500/bQLrHIRNEkE3PdIWQrZHynyQKfo.jpg',
            'https://image.tmdb.org/t/p/w500/6bmhckDSVKzatfqSdp8vTvqa1qK.jpg',
            'https://image.tmdb.org/t/p/w500/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg',
            'https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg',
            'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'
        ];
        
        return images[index % images.length];
    }

    generateStory(seriesName, genres) {
        const storyTemplates = {
            أكشن: {
                ar: `مسلسل ${seriesName} يأخذك في رحلة مليئة بالإثارة والمغامرة، حيث تتصارع الشخصيات في مواقف خطيرة وتخوض معارك ملحمية من أجل البقاء والانتصار.`,
                en: `${seriesName} takes you on a journey full of excitement and adventure, where characters struggle in dangerous situations and fight epic battles for survival and victory.`
            },
            دراما: {
                ar: `يعرض ${seriesName} قصة إنسانية عميقة تستكشف العلاقات المعقدة والمشاعر الإنسانية في إطار درامي مؤثر يلامس قلوب المشاهدين.`,
                en: `${seriesName} presents a deep human story exploring complex relationships and human emotions within an impactful dramatic framework that touches viewers' hearts.`
            },
            فانتازيا: {
                ar: `انطلق في رحلة سحرية مع ${seriesName} إلى عوالم خيالية حيث تلتقي بمخلوقات أسطورية وتشهد معارك بين الخير والشر في حكاية ملحمية لا تُنسى.`,
                en: `Embark on a magical journey with ${seriesName} to fantasy worlds where you meet legendary creatures and witness battles between good and evil in an unforgettable epic tale.`
            },
            كوميدي: {
                ar: `استمتع بأجواء من الضحك والمرح مع ${seriesName}، حيث تقدم الشخصيات الكوميدية مواقف مضحكة وحكايات يومية مسلية تجلب البهجة.`,
                en: `Enjoy atmospheres of laughter and fun with ${seriesName}, where comedic characters present funny situations and entertaining daily stories that bring joy.`
            }
        };
        
        const primaryGenre = genres[0] || 'دراما';
        const template = storyTemplates[primaryGenre] || storyTemplates['دراما'];
        
        return {
            ar: template.ar + ` يجمع المسلسل بين ${genres.join(' و ')} ليكون تجربة مشاهدة فريدة.`,
            en: template.en + ` The series combines ${genres.join(' and ')} to create a unique viewing experience.`
        };
    }
}

// تشغيل النظام الكامل
window.completeSeries = new AutoSeriesMaster();

// إضافة معلومات النظام في الكونسول
console.log(`
╔══════════════════════════════════════╗
║    🚀 نظام مسلسلات G_E_8 الذكي      ║
║    النسخة: 2.0 - الكاملة 100%       ║
║    المسلسلات: 67 مسلسل              ║
║    الميزات: AI • تصويت • مفضلة      ║
╚══════════════════════════════════════╝
`);