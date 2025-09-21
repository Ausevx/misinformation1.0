/*
  Translation system for Factify
  - Hardcoded dictionary for English (en) and Hindi (hi)
  - Elements to translate must have:
      - data-i18n="key" for textContent
      - data-i18n-placeholder="key" for placeholder attributes on inputs/textarea
  - Default language is English on first load. Persist choice in localStorage.
*/

(function () {
  const STORAGE_KEY = 'factify_lang';
  const DEFAULT_LANG = 'en';

  const TRANSLATIONS = {
    // Header / Nav / Branding
    'logo.title': { en: 'Factify', hi: 'फैक्टिफाई' },
    'nav.home': { en: 'Home', hi: 'होम' },
    'nav.verifyImage': { en: 'Verify Image', hi: 'इमेज सत्यापन' },
    'nav.news': { en: 'Digital Literacy News', hi: 'डिजिटल साक्षरता समाचार' },
    'nav.mobileBot': { en: 'Mobile Bot', hi: 'मोबाइल बॉट' },
    'btn.lang': { en: 'EN / हिं', hi: 'हिं / EN' },
    'btn.getStarted': { en: 'Get Started', hi: 'शुरू करें' },

    // Hero
    'badge.new': { en: 'New', hi: 'नया' },
    'badge.tagline': { en: 'AI-Powered Misinformation Detection', hi: 'एआई-संचालित भ्रामक सूचना पहचान' },
    'hero.title': {
      en: 'Verify content. Build trust. Stay informed.',
      hi: 'सामग्री सत्यापित करें। भरोसा बनाएं। सूचित रहें।'
    },
    'hero.subtitle': {
      en: 'Advanced AI-powered platform for detecting misinformation, scams, and false information across digital channels with 99.8% accuracy.',
      hi: 'उन्नत एआई-संचालित प्लेटफ़ॉर्म जो डिजिटल चैनलों पर भ्रामक जानकारी, घोटालों और झूठी जानकारी का 99.8% सटीकता के साथ पता लगाता है।'
    },
    'btn.startVerification': { en: 'Start Verification', hi: 'सत्यापन शुरू करें' },
    'btn.exploreLearning': { en: 'Explore Learning Center', hi: 'लर्निंग सेंटर देखें' },

    // Stats
    'stats.title': { en: 'Real-Time Impact', hi: 'रियल-टाइम प्रभाव' },
    'stats.subtitle': { en: 'Live statistics from our global misinformation detection network', hi: 'हमारे वैश्विक भ्रामक सूचना पहचान नेटवर्क से लाइव आँकड़े' },
    'stats.totalVerifications': { en: 'Total Verifications', hi: 'कुल सत्यापन' },
    'stats.trendVerifications': { en: '+12% this week', hi: 'इस सप्ताह +12%' },
    'stats.scamsDetected': { en: 'Scams Detected', hi: 'पता लगाए गए घोटाले' },
    'stats.trendScams': { en: '+8% this week', hi: 'इस सप्ताह +8%' },
    'stats.usersEducated': { en: 'Users Educated', hi: 'शिक्षित उपयोगकर्ता' },
    'stats.trendUsers': { en: '+15% this week', hi: 'इस सप्ताह +15%' },
    'stats.accuracyRate': { en: 'Accuracy Rate', hi: 'सटीकता दर' },
    'stats.trendAccuracy': { en: '+0.2% this month', hi: 'इस महीने +0.2%' },
    'stats.liveFeed': { en: 'Live Verification Feed', hi: 'लाइव सत्यापन फीड' },
    'stats.sampleFeed': { en: 'Health claim verified from WHO source', hi: 'डब्ल्यूएचओ स्रोत से स्वास्थ्य दावा सत्यापित' },
    'stats.sampleTime': { en: '2s ago', hi: '2 सेकंड पहले' },

    // Verify Section
    'verify.title': { en: 'Image Verification', hi: 'इमेज सत्यापन' },
    'verify.subtitle': { en: 'Upload an image to check for misinformation, AI generation, and extract text', hi: 'भ्रामक जानकारी, एआई जनरेशन की जाँच और पाठ निकालने के लिए छवि अपलोड करें' },
    'upload.click': { en: 'Click to upload', hi: 'अपलोड करने के लिए क्लिक करें' },
    'upload.or': { en: ' or drag and drop your image here', hi: ' या अपनी छवि यहाँ खींचकर छोड़ें' },
    'upload.hint': { en: 'PNG, JPG, JPEG up to 10MB', hi: 'PNG, JPG, JPEG 10MB तक' },

    // OCR
    'ocr.title': { en: '📝 Extracted Text (OCR)', hi: '📝 निकाला गया पाठ (ओसीआर)' },
    'ocr.placeholder': { en: 'No text detected in image...', hi: 'छवि में कोई पाठ नहीं मिला...' },
    'ocr.copy': { en: 'Copy Text', hi: 'पाठ कॉपी करें' },
    'ocr.analyze': { en: 'Analyze Extracted Text', hi: 'निकाले गए पाठ का विश्लेषण करें' },

    // AI Detection
    'ai.title': { en: '🤖 AI Generation Analysis', hi: '🤖 एआई जनरेशन विश्लेषण' },

    // Input actions
    'verify.analyzeNow': { en: 'Analyze Now', hi: 'अभी विश्लेषण करें' },
    'verify.clear': { en: 'Clear', hi: 'हटाएँ' },
    'verify.processing': { en: 'Analyzing Content...', hi: 'सामग्री का विश्लेषण हो रहा है...' },

    // Results
    'results.title': { en: 'Verification Results', hi: 'सत्यापन परिणाम' },
    'results.confidenceLabel': { en: 'Confidence Level', hi: 'विश्वास स्तर' },
    'results.analysisComplete': { en: 'Analysis Complete', hi: 'विश्लेषण पूर्ण' },
    'results.recommendations': { en: 'Recommendations', hi: 'सिफारिशें' },

    // Chat
    'chat.title': { en: 'AI Fact-Check Assistant', hi: 'एआई फैक्ट-चेक सहायक' },
    'chat.online': { en: 'Online', hi: 'ऑनलाइन' },
    'chat.welcome': {
      en: "Hi! I'm your AI fact-checking assistant. I can help you verify information, check sources, and provide detailed analysis. What would you like to fact-check today?",
      hi: 'नमस्ते! मैं आपका एआई फैक्ट-चेकिंग सहायक हूँ। मैं जानकारी सत्यापित करने, स्रोत जांचने और विस्तृत विश्लेषण में मदद कर सकता हूँ। आज आप क्या तथ्य-जाँच करना चाहेंगे?'
    },
    'chat.suggest1': { en: 'Is this news article credible?', hi: 'क्या यह समाचार लेख विश्वसनीय है?' },
    'chat.suggest2': { en: 'Check this health claim', hi: 'इस स्वास्थ्य दावे की जाँच करें' },
    'chat.suggest3': { en: 'Verify this social media post', hi: 'इस सोशल मीडिया पोस्ट को सत्यापित करें' },
    'chat.suggest4': { en: 'Is this a scam?', hi: 'क्या यह एक घोटाला है?' },
    'chat.placeholder': { en: 'Ask me to fact-check anything...', hi: 'मुझसे कुछ भी तथ्य-जाँच करने के लिए कहें...' },
    'chat.send': { en: 'Send', hi: 'भेजें' },
    'chat.clear': { en: 'Clear', hi: 'हटाएँ' },

    // API Status
    'api.title': { en: '🔧 API Services Status', hi: '🔧 एपीआई सेवाओं की स्थिति' },
    'api.subtitle': { en: 'Check if all backend services are working properly', hi: 'जाँचें कि सभी बैकएंड सेवाएँ सही से कार्य कर रही हैं या नहीं' },
    'api.check': { en: 'Check Status', hi: 'स्थिति जाँचें' },
    'api.gemini.title': { en: 'Gemini AI', hi: 'जेमिनी एआई' },
    'api.gemini.desc': { en: 'Advanced fact-checking and content analysis', hi: 'उन्नत फैक्ट-चेकिंग और सामग्री विश्लेषण' },
    'api.hf.title': { en: 'Hugging Face', hi: 'हगिंग फेस' },
    'api.hf.desc': { en: 'Sentiment analysis and text classification', hi: 'भाव विश्लेषण और पाठ वर्गीकरण' },
    'api.ocr.title': { en: 'OCR.space', hi: 'OCR.space' },
    'api.ocr.desc': { en: 'Text extraction from images', hi: 'छवियों से पाठ निकालना' },
    'api.se.title': { en: 'SightEngine', hi: 'साइटइंजन' },
    'api.se.desc': { en: 'Content moderation and image analysis', hi: 'सामग्री संयम और छवि विश्लेषण' },
    'api.checking': { en: 'Checking...', hi: 'जाँच हो रही है...' },
    'api.testing': { en: 'Testing connection...', hi: 'कनेक्शन परीक्षण...' },
    'api.lastNever': { en: 'Last tested: Never', hi: 'अंतिम परीक्षण: कभी नहीं' },
    'api.overall': { en: 'Overall Status', hi: 'समग्र स्थिति' },
    'api.summary': { en: 'Click "Check Status" to test all services', hi: 'सभी सेवाओं का परीक्षण करने के लिए "स्थिति जाँचें" पर क्लिक करें' },

    // News
    'news.title': { en: 'Digital Literacy News Center', hi: 'डिजिटल साक्षरता न्यूज़ सेंटर' },
    'news.subtitle': { en: 'Stay informed about the latest in misinformation detection, digital literacy, and cybersecurity', hi: 'भ्रामक सूचना पहचान, डिजिटल साक्षरता और साइबर सुरक्षा में नवीनतम के बारे में जानकारी रखें' },
    'news.cat.all': { en: 'All Articles', hi: 'सभी लेख' },
    'news.cat.health': { en: 'Health', hi: 'स्वास्थ्य' },
    'news.cat.politics': { en: 'Politics', hi: 'राजनीति' },
    'news.cat.financial': { en: 'Financial', hi: 'वित्त' },
    'news.cat.technology': { en: 'Technology', hi: 'प्रौद्योगिकी' },
    'news.cat.education': { en: 'Education', hi: 'शिक्षा' },
    'news.cat.ai': { en: 'AI & Deepfakes', hi: 'एआई और डीपफेक्स' },
    'news.featured': { en: 'Featured Articles', hi: 'विशेष लेख' },
    'news.searchTitle': { en: 'Search Articles', hi: 'लेख खोजें' },
    'news.searchPlaceholder': { en: 'Search articles...', hi: 'लेख खोजें...' },
    'news.sort.newest': { en: 'Newest First', hi: 'नए पहले' },
    'news.sort.oldest': { en: 'Oldest First', hi: 'पुराने पहले' },
    'news.sort.relevance': { en: 'Most Relevant', hi: 'सबसे प्रासंगिक' },
    'news.sort.trending': { en: 'Trending', hi: 'ट्रेंडिंग' },
    'news.source.all': { en: 'All Sources', hi: 'सभी स्रोत' },
    'news.source.reuters': { en: 'Reuters', hi: 'रॉयटर्स' },
    'news.source.bbc': { en: 'BBC', hi: 'बीबीसी' },
    'news.source.guardian': { en: 'The Guardian', hi: 'द गार्जियन' },
    'news.source.who': { en: 'WHO', hi: 'डब्ल्यूएचओ' },
    'news.source.cdc': { en: 'CDC', hi: 'सीडीसी' },
    'news.recent': { en: 'Recent Articles', hi: 'हाल के लेख' },
    'news.trusted': { en: 'Trusted Sources', hi: 'विश्वसनीय स्रोत' },

    // Bot
    'bot.title': { en: 'Continue on Mobile', hi: 'मोबाइल पर जारी रखें' },
    'bot.subtitle': { en: 'Access Factify verification tools directly from your messaging apps', hi: 'अपने मैसेजिंग ऐप से सीधे फैक्टिफाई सत्यापन टूल का उपयोग करें' },
    'bot.whatsapp.title': { en: 'WhatsApp Verification', hi: 'व्हाट्सऐप सत्यापन' },
    'bot.whatsapp.desc': { en: 'Send suspicious messages directly to our WhatsApp bot for instant verification', hi: 'तत्काल सत्यापन के लिए संदिग्ध संदेश सीधे हमारे व्हाट्सऐप बॉट को भेजें' },
    'bot.whatsapp.cta': { en: 'Start WhatsApp Chat', hi: 'व्हाट्सऐप चैट शुरू करें' },
    'bot.telegram.title': { en: 'Telegram Bot', hi: 'टेलीग्राम बॉट' },
    'bot.telegram.desc': { en: 'Use our Telegram bot for quick content verification and educational resources', hi: 'त्वरित सामग्री सत्यापन और शैक्षिक संसाधनों के लिए हमारे टेलीग्राम बॉट का उपयोग करें' },
    'bot.telegram.cta': { en: 'Open Telegram Bot', hi: 'टेलीग्राम बॉट खोलें' },

    // Footer
    'footer.about': { en: 'About Factify', hi: 'फैक्टिफाई के बारे में' },
    'footer.mission': { en: 'Our Mission', hi: 'हमारा मिशन' },
    'footer.howItWorks': { en: 'How It Works', hi: 'यह कैसे काम करता है' },
    'footer.trustSafety': { en: 'Trust & Safety', hi: 'विश्वास और सुरक्षा' },
    'footer.helpSupport': { en: 'Help & Support', hi: 'मदद और सहायता' },
    'footer.faqs': { en: 'FAQs', hi: 'अक्सर पूछे जाने वाले प्रश्न' },
    'footer.contact': { en: 'Contact Support', hi: 'सपोर्ट से संपर्क करें' },
    'footer.report': { en: 'Report Misinformation', hi: 'भ्रामक जानकारी की रिपोर्ट करें' },
    'footer.resources': { en: 'Resources', hi: 'संसाधन' },
    'footer.learningCenter': { en: 'Learning Center', hi: 'लर्निंग सेंटर' },
    'footer.guides': { en: 'Digital Literacy Guides', hi: 'डिजिटल साक्षरता गाइड' },
    'footer.trustedSources': { en: 'Trusted Sources', hi: 'विश्वसनीय स्रोत' },
    'footer.legal': { en: 'Legal', hi: 'कानूनी' },
    'footer.privacy': { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
    'footer.terms': { en: 'Terms of Use', hi: 'उपयोग की शर्तें' },
    'footer.accessibility': { en: 'Accessibility', hi: 'सुलभता' },
    'footer.tagline': { en: 'Made for safer, informed digital experiences', hi: 'सुरक्षित और सूचित डिजिटल अनुभवों के लिए बनाया गया' }
  };

  function getCurrentLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'en' || saved === 'hi' ? saved : DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  }

  function setCurrentLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }

  function translateElement(el, lang) {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const entry = TRANSLATIONS[key];
    if (!entry) return;
    el.textContent = entry[lang] ?? entry[DEFAULT_LANG] ?? '';
  }

  function translatePlaceholder(el, lang) {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const entry = TRANSLATIONS[key];
    if (!entry) return;
    el.setAttribute('placeholder', entry[lang] ?? entry[DEFAULT_LANG] ?? '');
  }

  function applyTranslations(lang) {
    // Update html lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Translate text nodes
    document.querySelectorAll('[data-i18n]').forEach((el) => translateElement(el, lang));

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => translatePlaceholder(el, lang));

    // Apply convention-based translations for live feed and news articles
    applyLiveFeedTranslations(lang);
    applyNewsArticleTranslations(lang);
  }

  function toggleLanguage() {
    const current = getCurrentLang();
    const next = current === 'en' ? 'hi' : 'en';
    setCurrentLang(next);
    applyTranslations(next);
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    const lang = getCurrentLang(); // defaults to en if none
    applyTranslations(lang);

    const toggleBtn = document.getElementById('languageToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleLanguage);
    }

    // Observe and auto-translate dynamically added nodes carrying data-i18n attributes
    initMutationObserver();
  });
  
  // ----------------------
  // Dynamic content support
  // ----------------------
  // Convention-based keys for dynamic sections:
  // - Live feed items: use container with attribute data-feed-id="<id>"
  //   and child parts with data-i18n-part="text" | "time" | "status"
  //   Keys resolved as: stats.feed.<id>.<part>
  // - News articles: use container with attribute data-article-id="<id>"
  //   and child parts with data-i18n-part="title" | "desc" | "body" | "author" | "cta"
  //   Keys resolved as: news.article.<id>.<part>

  // Example entries (can be removed/extended by your data):
  Object.assign(TRANSLATIONS, {
    // Live feed example
    'stats.feed.sample1.text': {
      en: 'Vaccination update verified via Reuters',
      hi: 'रॉयटर्स के माध्यम से टीकाकरण अपडेट सत्यापित'
    },
    'stats.feed.sample1.time': { en: '5s ago', hi: '5 सेकंड पहले' },
    'stats.feed.sample1.status': { en: 'Verified', hi: 'सत्यापित' },

    // News article examples
    'news.article.sample1.title': { en: 'How to Spot Deepfakes', hi: 'डीपफेक्स को पहचानें कैसे' },
    'news.article.sample1.desc': { en: 'A quick guide to identifying synthetic media online.', hi: 'ऑनलाइन सिंथेटिक मीडिया की पहचान करने के लिए त्वरित मार्गदर्शिका।' },
    'news.article.sample1.body': {
      en: 'Deepfakes use AI techniques to create realistic fake audio or video. Check for visual artifacts, inconsistent lighting, and verify sources.',
      hi: 'डीपफेक्स एआई तकनीकों का उपयोग करके यथार्थवादी नकली ऑडियो या वीडियो बनाते हैं। दृश्य खामियों, असंगत रोशनी की जाँच करें और स्रोतों का सत्यापन करें।'
    },
    'news.article.sample1.author': { en: 'By Factify Team', hi: 'फैक्टिफाई टीम द्वारा' },
    'news.article.sample1.cta': { en: 'Read More', hi: 'और पढ़ें' }
  });

  // Add translations for static sample articles embedded in index.html
  Object.assign(TRANSLATIONS, {
    // Featured Article a1
    'news.article.a1.title': { en: 'How to Spot Deepfakes', hi: 'डीपफेक्स को पहचानें कैसे' },
    'news.article.a1.desc': { en: 'A quick guide to identifying synthetic media online.', hi: 'ऑनलाइन सिंथेटिक मीडिया की पहचान करने के लिए त्वरित मार्गदर्शिका।' },
    'news.article.a1.body': {
      en: 'Deepfakes use AI techniques to create realistic fake audio or video. Check for visual artifacts, inconsistent lighting, and verify sources.',
      hi: 'डीपफेक्स एआई तकनीकों का उपयोग करके यथार्थवादी नकली ऑडियो या वीडियो बनाते हैं। दृश्य खामियों, असंगत रोशनी की जाँच करें और स्रोतों का सत्यापन करें।'
    },
    'news.article.a1.author': { en: 'By Factify Team', hi: 'फैक्टिफाई टीम द्वारा' },
    'news.article.a1.cta': { en: 'Read More', hi: 'और पढ़ें' },

    // Article a2
    'news.article.a2.title': { en: 'Debunking Viral Health Myths', hi: 'वायरल स्वास्थ्य मिथकों का भंडाफोड़' },
    'news.article.a2.desc': { en: 'Separate facts from fiction in trending health posts.', hi: 'ट्रेंडिंग स्वास्थ्य पोस्ट में तथ्यों और कल्पना को अलग करें।' },
    'news.article.a2.body': {
      en: 'Verify claims with trusted sources like WHO or CDC. Watch for miracle cures, absolute statements, and missing citations.',
      hi: 'डब्ल्यूएचओ या सीडीसी जैसे विश्वसनीय स्रोतों से दावों की पुष्टि करें। चमत्कारी इलाज, पूर्ण कथन और गायब संदर्भों से सावधान रहें।'
    },
    'news.article.a2.author': { en: 'By Factify Team', hi: 'फैक्टिफाई टीम द्वारा' },
    'news.article.a2.cta': { en: 'Read More', hi: 'और पढ़ें' },

    // Article a3
    'news.article.a3.title': { en: 'Check Before You Share', hi: 'शेयर करने से पहले जाँचें' },
    'news.article.a3.desc': { en: 'Quick steps to verify political claims on social media.', hi: 'सोशल मीडिया पर राजनीतिक दावों की पुष्टि करने के त्वरित कदम।' },
    'news.article.a3.body': {
      en: 'Look for original source links, cross-check with reputable outlets, and beware of edited screenshots lacking context.',
      hi: 'मूल स्रोत लिंक देखें, प्रतिष्ठित आउटलेट्स के साथ क्रॉस-चेक करें, और संदर्भहीन संपादित स्क्रीनशॉट से सावधान रहें।'
    },
    'news.article.a3.author': { en: 'By Factify Team', hi: 'फैक्टिफाई टीम द्वारा' },
    'news.article.a3.cta': { en: 'Read More', hi: 'और पढ़ें' }
  });

  function applyLiveFeedTranslations(lang) {
    const items = document.querySelectorAll('[data-feed-id]');
    items.forEach((item) => {
      const id = item.getAttribute('data-feed-id');
      if (!id) return;

      const parts = [];
      // Preferred: explicit parts
      item.querySelectorAll('[data-i18n-part]').forEach((el) => parts.push(el));
      // Fallback: infer by common class names if explicit parts missing
      if (parts.length === 0) {
        const text = item.querySelector('.feed-text');
        const time = item.querySelector('.feed-time');
        const status = item.querySelector('.feed-status');
        if (text) parts.push(text);
        if (time) parts.push(time);
        if (status) parts.push(status);
      }

      parts.forEach((partEl) => {
        let part = partEl.getAttribute('data-i18n-part');
        if (!part) {
          if (partEl.classList.contains('feed-text')) part = 'text';
          else if (partEl.classList.contains('feed-time')) part = 'time';
          else if (partEl.classList.contains('feed-status')) part = 'status';
        }
        if (!part) return;
        const key = `stats.feed.${id}.${part}`;
        const entry = TRANSLATIONS[key];
        if (!entry) return;
        partEl.textContent = entry[lang] ?? entry[DEFAULT_LANG] ?? '';
      });
    });
  }

  function applyNewsArticleTranslations(lang, root = document) {
    const articles = root.querySelectorAll('[data-article-id]');
    articles.forEach((article) => {
      const id = article.getAttribute('data-article-id');
      if (!id) return;

      const parts = [];
      // Preferred: explicit parts
      article.querySelectorAll('[data-i18n-part]').forEach((el) => parts.push(el));
      // Fallback: infer by common class names
      if (parts.length === 0) {
        const title = article.querySelector('.article-title, h2, h3, h4');
        const desc = article.querySelector('.article-desc, .article-excerpt');
        const body = article.querySelector('.article-body, .content, p');
        const author = article.querySelector('.article-author');
        const cta = article.querySelector('.article-cta, .read-more');
        if (title) parts.push(title);
        if (desc) parts.push(desc);
        if (body) parts.push(body);
        if (author) parts.push(author);
        if (cta) parts.push(cta);
      }

      parts.forEach((partEl) => {
        let part = partEl.getAttribute('data-i18n-part');
        if (!part) {
          if (partEl.classList.contains('article-title')) part = 'title';
          else if (partEl.classList.contains('article-desc') || partEl.classList.contains('article-excerpt')) part = 'desc';
          else if (partEl.classList.contains('article-body') || partEl.classList.contains('content')) part = 'body';
          else if (partEl.classList.contains('article-author')) part = 'author';
          else if (partEl.classList.contains('article-cta') || partEl.classList.contains('read-more')) part = 'cta';
          // heuristic for headings and paragraphs when no specific class is present
          else if (/^H[2-4]$/.test(partEl.tagName)) part = 'title';
          else if (partEl.tagName === 'P') part = 'body';
        }
        if (!part) return;
        const key = `news.article.${id}.${part}`;
        const entry = TRANSLATIONS[key];
        if (!entry) return;
        partEl.textContent = entry[lang] ?? entry[DEFAULT_LANG] ?? '';
      });
    });
  }

  function initMutationObserver() {
    let scheduled = null;
    const scheduleApply = () => {
      if (scheduled) return;
      scheduled = setTimeout(() => {
        scheduled = null;
        applyTranslations(getCurrentLang());
      }, 50);
    };

    const observer = new MutationObserver((mutations) => {
      let needsApply = false;
      const lang = getCurrentLang();
      for (const m of mutations) {
        if (m.type === 'childList') {
          // Newly added nodes
          m.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            // Translate any elements with data-i18n / data-i18n-placeholder
            if (node.hasAttribute && node.hasAttribute('data-i18n')) {
              translateElement(node, lang);
              needsApply = true;
            }
            if (node.hasAttribute && node.hasAttribute('data-i18n-placeholder')) {
              translatePlaceholder(node, lang);
              needsApply = true;
            }
            // Also process descendants
            node.querySelectorAll?.('[data-i18n]').forEach((el) => translateElement(el, lang));
            node.querySelectorAll?.('[data-i18n-placeholder]').forEach((el) => translatePlaceholder(el, lang));

            // Convention-based dynamic sections
            if (node.matches?.('[data-feed-id]')) needsApply = true;
            if (node.matches?.('[data-article-id]')) needsApply = true;
            if (node.querySelector?.('[data-feed-id]')) needsApply = true;
            if (node.querySelector?.('[data-article-id]')) needsApply = true;
          });
        } else if (m.type === 'attributes') {
          // If a data-i18n key changed, re-apply
          if (m.attributeName === 'data-i18n' || m.attributeName === 'data-i18n-placeholder') {
            needsApply = true;
          }
        } else if (m.type === 'characterData') {
          // Text content changed in place; schedule re-apply to keep consistent
          needsApply = true;
        }
      }
      if (needsApply) scheduleApply();
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true, attributeFilter: ['data-i18n', 'data-i18n-placeholder'] });

    // Expose in case other scripts want to disconnect
    window.I18NObserver = observer;
  }

  // Expose a minimal API for other scripts (e.g., app.js) to use
  window.I18N = {
    t: (key, lang) => {
      const k = TRANSLATIONS[key];
      const l = lang || getCurrentLang();
      return k ? (k[l] ?? k[DEFAULT_LANG] ?? '') : '';
    },
    apply: () => applyTranslations(getCurrentLang()),
    setLang: (lang) => { setCurrentLang(lang); applyTranslations(lang); },
    getLang: getCurrentLang,
    translateElement: (el) => translateElement(el, getCurrentLang()),
    translatePlaceholder: (el) => translatePlaceholder(el, getCurrentLang()),
    applyLiveFeed: () => applyLiveFeedTranslations(getCurrentLang()),
    applyArticles: (root) => applyNewsArticleTranslations(getCurrentLang(), root || document),
    addTranslations: (obj) => Object.assign(TRANSLATIONS, obj)
  };
})();
