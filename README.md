# MisinfoGuard - AI-Powered Misinformation Detection Platform

A comprehensive web application for detecting misinformation, fact-checking content, and promoting digital literacy with a VS Code-inspired interface and advanced AI capabilities.

## 🚀 Features

### ✨ New Features Added
- **VS Code-like Animated Background**: Matrix-style code rain and heat map visualization
- **AI Fact-Check Chatbot**: Interactive chatbot for real-time fact-checking assistance
- **Backend API Integration**: Support for multiple AI services (Gemini, OCR.space, SightEngine, Hugging Face)
- **API Status Checker**: Real-time monitoring of all backend services
- **Dark Theme**: VS Code-inspired dark theme with animated elements

### 🔍 Core Features
- **Content Verification**: Analyze text and images for misinformation
- **Real-time Analysis**: AI-powered fact-checking with confidence scores
- **News Center**: Curated fact-checked news from trusted sources
- **Mobile Integration**: WhatsApp and Telegram bot support
- **Accessibility**: Full keyboard navigation and screen reader support

## 🛠 Setup Instructions

### 1. Clone or Download
Download the project files to your local machine.

### 2. API Configuration
1. Copy `config.example.js` to `config.js`
2. Add your API keys to `config.js`:

```javascript
const API_KEYS = {
    GEMINI_API_KEY: 'your_actual_gemini_api_key',
    OCR_SPACE_API_KEY: 'your_actual_ocr_space_api_key',
    SIGHTENGINE_API_USER: 'your_sightengine_user',
    SIGHTENGINE_API_SECRET: 'your_sightengine_secret',
    HUGGING_FACE_API_KEY: 'your_hugging_face_api_key'
};
```

### 3. Get API Keys

#### Gemini AI API
- Visit: https://makersuite.google.com/app/apikey
- Sign in with Google account
- Create new API key
- Copy key to config.js

#### OCR.space API
- Visit: https://ocr.space/ocrapi
- Register for free account
- Get API key from dashboard
- Free tier: 25,000 requests/month

#### SightEngine API
- Visit: https://sightengine.com/
- Sign up for account
- Get API user and secret from dashboard
- Free tier: 2,000 operations/month

#### Hugging Face API
- Visit: https://huggingface.co/settings/tokens
- Sign up for free account
- Create new token with read access
- Free tier: 30,000 requests/month

### 4. Local Development

#### Option A: Simple HTTP Server (Python)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option B: Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

#### Option C: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### 5. Access Application
Open your browser and navigate to:
- `http://localhost:8000` (or your chosen port)

## 🎨 VS Code Background Features

The animated background includes:
- **Matrix Code Rain**: Falling code snippets related to misinformation detection
- **Heat Map Grid**: Animated cells that pulse with different colors
- **Dynamic Content**: Code snippets refresh every 10 seconds
- **Performance Optimized**: Uses CSS animations and requestAnimationFrame

## 🤖 Chatbot Features

The AI Fact-Check Assistant can help with:
- **Content Analysis**: Analyze text for credibility and bias
- **Sentiment Analysis**: Understand emotional tone using Hugging Face models
- **Text Classification**: Categorize content as factual, opinion, or misleading
- **Source Verification**: Check reliability of news sources
- **Scam Detection**: Identify common fraud patterns
- **Health Claims**: Verify medical information
- **Social Media Posts**: Analyze viral content

## 🔧 API Status Checker

Monitor all backend services in real-time:
- **Service Health**: Check if APIs are responding
- **Configuration Status**: Verify API keys are properly set
- **Connection Testing**: Test actual API connections
- **Real-time Updates**: Live status indicators with timestamps
- **Error Reporting**: Detailed error messages for troubleshooting

### Chatbot Commands
- "Is this news article credible?"
- "Check this health claim"
- "Verify this social media post"
- "Is this a scam?"

## 📁 File Structure

```
misinformation_check-extension-frontend/
├── index.html              # Main HTML file
├── app.js                  # Frontend JavaScript logic
├── backend.js              # Backend API services
├── style.css               # Styles with VS Code theme
├── config.example.js       # API configuration template
├── config.js               # Your API keys (create this)
└── README.md              # This file
```

## 🔧 Configuration Options

### Rate Limiting
Adjust request limits in `config.js`:
```javascript
const CONFIG = {
    MAX_REQUESTS_PER_HOUR: 100,
    CACHE_EXPIRY_MINUTES: 30,
    DEBUG_MODE: false
};
```

### Theme Customization
The VS Code theme can be customized in `style.css`:
- Background colors: `--color-background`, `--color-surface`
- Text colors: `--color-text`, `--color-text-secondary`
- Animation speeds: Modify keyframe durations

## 🚨 Troubleshooting

### Common Issues

1. **API Keys Not Working**
   - Verify keys are correctly copied to `config.js`
   - Check API quotas and billing status
   - Ensure CORS is properly configured

2. **Background Animation Not Showing**
   - Check browser console for JavaScript errors
   - Ensure `data-color-scheme="dark"` is set
   - Verify CSS animations are enabled

3. **Chatbot Not Responding**
   - Check network connectivity
   - Verify backend.js is loaded
   - Check browser console for errors

### Debug Mode
Enable debug mode in `config.js`:
```javascript
const CONFIG = {
    DEBUG_MODE: true
};
```

## 🔒 Security Notes

- Never commit `config.js` with real API keys to version control
- Use environment variables in production
- Implement proper rate limiting for production use
- Validate all user inputs on the backend

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interactions
- Optimized animations for mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source. Please check the license file for details.

## 🆘 Support

For issues and questions:
1. Check this README first
2. Search existing issues
3. Create a new issue with detailed information
4. Include browser version and error messages

## 🔮 Future Enhancements

- Real-time collaboration features
- Advanced AI model integration
- Multi-language support
- Browser extension version
- Mobile app development

---

**Made with ❤️ for safer, informed digital experiences**

---

## 🤖 Telegram Bot (Polling) Setup

This repo now includes a Telegram polling bot that can verify text and images via your existing analysis/OCR pipeline.

### Files
- `bot.js` — Telegram bot entry (CommonJS)
- `bot-adapter.js` — Adapts existing services into a normalized API for the bot
- `lib/download.js` — Downloads Telegram files as Buffer/temp file
- `.env.example` — Environment variables template (do not commit `.env`)

### Prerequisites
- Node.js 18+ (for global `fetch`, `Blob` and FormData support)
- A Telegram Bot Token from [@BotFather](https://t.me/BotFather)

### Configure
1. Copy `.env.example` to `.env` and set:
```
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
# Optional timeout override
BOT_OPERATION_TIMEOUT_MS=120000

# Backend keys if needed by your services
GEMINI_API_KEY=
OCR_SPACE_API_KEY=
SIGHTENGINE_API_USER=
SIGHTENGINE_API_SECRET=
HUGGING_FACE_API_KEY=
```
2. Install dependencies:
```
npm install
```

### Run
```
npm run start:bot
```
Send `/start` to your bot and use the buttons:
- Verify text → send text, bot returns analysis.
- Verify image → send image/photo, bot runs OCR then analyzes the extracted text.

### Troubleshooting
- If you see `Text analysis function not available` or `OCR function not available`, ensure `backend.js` exports `GeminiService` and `OCRService` (this repo appends minimal CommonJS exports).
- Use Node 18+ so `fetch`/`Blob` exist. Otherwise, extend `lib/download.js` to use a fetch polyfill.
- Large images may take longer; increase `BOT_OPERATION_TIMEOUT_MS` in `.env`.
