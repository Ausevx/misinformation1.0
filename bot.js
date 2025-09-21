'use strict';

// Telegram Bot (Polling)
// CommonJS implementation based on current repo setup

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { analyzeTextNormalized, ocrFromImageUrlOrBuffer } = require('./bot-adapter');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) {
  console.error('Missing TELEGRAM_BOT_TOKEN. Set it in your environment or .env file.');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });
const chatState = new Map(); // chatId -> 'awaiting_text' | 'awaiting_image' | null

const BUTTONS = {
  verifyText: 'Verify text',
  verifyImage: 'Verify image',
};

function mainMenuKeyboard() {
  return {
    reply_markup: {
      keyboard: [[{ text: BUTTONS.verifyText }], [{ text: BUTTONS.verifyImage }], [{ text: '/cancel' }]],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };
}

function sendStart(chatId) {
  const msg = 'Welcome to Factify Bot! Choose an option:';
  return bot.sendMessage(chatId, msg, mainMenuKeyboard());
}

function setTyping(chatId, on = true) {
  if (on) return bot.sendChatAction(chatId, 'typing');
}

bot.onText(/\/start|\/help/, async (msg) => {
  await sendStart(msg.chat.id);
});

bot.onText(/\/cancel/, async (msg) => {
  chatState.delete(msg.chat.id);
  await bot.sendMessage(msg.chat.id, 'Cancelled. What would you like to do next?', mainMenuKeyboard());
});

// Handle button presses
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text) return; // other handlers will take images

  const text = msg.text.trim();
  if (text === BUTTONS.verifyText) {
    chatState.set(chatId, 'awaiting_text');
    return bot.sendMessage(chatId, 'Send the text you want to verify.');
  }
  if (text === BUTTONS.verifyImage) {
    chatState.set(chatId, 'awaiting_image');
    return bot.sendMessage(chatId, 'Send the image (photo or file).');
  }

  const state = chatState.get(chatId);
  if (state === 'awaiting_text') {
    await handleTextVerification(chatId, text);
    chatState.delete(chatId);
    return;
  }
});

// Handle images (photos or image documents)
bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  const state = chatState.get(chatId);
  if (state !== 'awaiting_image') return; // ignore if not requested

  // Choose highest resolution photo
  const photos = msg.photo || [];
  const best = photos[photos.length - 1];
  if (!best) return bot.sendMessage(chatId, 'No photo detected.');

  try {
    setTyping(chatId, true);
    const fileLink = await bot.getFileLink(best.file_id);
    await handleImageVerification(chatId, fileLink);
  } catch (err) {
    console.error('Photo handling error:', err);
    await bot.sendMessage(chatId, `Failed to process image: ${err.message}`);
  } finally {
    chatState.delete(chatId);
  }
});

bot.on('document', async (msg) => {
  const chatId = msg.chat.id;
  const state = chatState.get(chatId);
  if (state !== 'awaiting_image') return; // ignore if not requested

  const doc = msg.document;
  if (!doc || !doc.mime_type || !doc.mime_type.startsWith('image/')) {
    return bot.sendMessage(chatId, 'Please send an image file.');
  }

  try {
    setTyping(chatId, true);
    const fileLink = await bot.getFileLink(doc.file_id);
    await handleImageVerification(chatId, fileLink);
  } catch (err) {
    console.error('Document handling error:', err);
    await bot.sendMessage(chatId, `Failed to process image: ${err.message}`);
  } finally {
    chatState.delete(chatId);
  }
});

async function handleTextVerification(chatId, text) {
  try {
    await setTyping(chatId, true);
    const res = await analyzeTextNormalized(text);
    const reply = formatAnalysisResult(res);
    await bot.sendMessage(chatId, reply, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('Text verification error:', err);
    await bot.sendMessage(chatId, `Error verifying text: ${err.message}`);
  }
}

async function handleImageVerification(chatId, fileUrl) {
  try {
    await setTyping(chatId, true);
    const ocrText = await ocrFromImageUrlOrBuffer(fileUrl);
    if (!ocrText || !ocrText.trim()) {
      await bot.sendMessage(chatId, 'Could not extract text from this image.');
      return;
    }

    let reply = `OCR result: ${ocrText.slice(0, 800)}${ocrText.length > 800 ? '…' : ''}\n`;
    if (ocrText && ocrText.trim()) {
      await setTyping(chatId, true);
      const analysis = await analyzeTextNormalized(ocrText);
      reply += '\n' + formatAnalysisResult(analysis);
    }
    await bot.sendMessage(chatId, reply, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('Image verification error:', err);
    await bot.sendMessage(chatId, 'Error analyzing this image. Please try again.');
  }
}

function formatAnalysisResult(result) {
  try {
    if (!result) return 'No result.';

    // Support both backend.js style JSON and api-manager style structured results
    if (result.verdict || result.credibilityScore) {
      const score = result.credibilityScore ?? (result.score ?? 'N/A');
      const verdict = result.verdict ?? (result.finalVerdict?.verdict || 'N/A');
      const explanation = result.explanation || result.briefExplanation || '';
      return `*Verdict:* ${verdict}\n*Score:* ${score}\n${explanation ? `\n*Summary:* ${explanation}` : ''}`.trim();
    }

    if (result.analysis || result.finalVerdict) {
      const score = result.finalVerdict?.score ?? 'N/A';
      const verdict = result.finalVerdict?.verdict ?? 'N/A';
      return `*Verdict:* ${verdict}\n*Score:* ${score}`;
    }

    // Fallback stringify
    return 'Result:\n' + '```\n' + JSON.stringify(result, null, 2) + '\n```';
  } catch (e) {
    return 'Result (raw):\n' + '```\n' + JSON.stringify(result, null, 2) + '\n```';
  }
}

console.log('🤖 Telegram bot is running. Press Ctrl+C to stop.');
