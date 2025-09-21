'use strict';

// Adapter to normalize analysis and OCR calls for the Telegram bot
// Uses classes exported from backend.js without refactoring the app code.

const { promisify } = require('util');
const path = require('path');
const os = require('os');
const fs = require('fs');

let GeminiService, OCRService;
try {
  ({ GeminiService, OCRService } = require('./backend.js'));
} catch (e) {
  // Fallback if module resolution differs
  try {
    const be = require(path.resolve(__dirname, 'backend.js'));
    GeminiService = be.GeminiService;
    OCRService = be.OCRService;
  } catch (err) {
    console.error('Failed to import services from backend.js', err);
  }
}

if (!GeminiService) {
  console.warn('[bot-adapter] GeminiService not found. analyzeTextNormalized will return a helpful error.');
}
if (!OCRService) {
  console.warn('[bot-adapter] OCRService not found. ocrFromImageUrlOrBuffer will return a helpful error.');
}

const { fetchToBufferOrFile } = require('./lib/download');

function withTimeout(promise, ms, err = new Error('Operation timed out')) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(err), ms).unref?.();
  });
  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    timeout,
  ]);
}

// Analyze text using GeminiService (or other available pipeline in the future)
async function analyzeTextNormalized(text, options = {}) {
  if (!GeminiService) {
    throw new Error('Text analysis function not available. Please ensure backend.js exports GeminiService.');
  }
  const service = new GeminiService();
  const timeoutMs = Number(process.env.BOT_OPERATION_TIMEOUT_MS || 120000);
  const result = await withTimeout(service.analyzeContent(String(text || ''), 'text'), timeoutMs);
  return result;
}

// Run OCR from a Telegram file URL or Buffer, returning extracted text (string)
async function ocrFromImageUrlOrBuffer(urlOrBuffer, options = {}) {
  if (!OCRService) {
    throw new Error('OCR function not available. Please ensure backend.js exports OCRService.');
  }
  const timeoutMs = Number(process.env.BOT_OPERATION_TIMEOUT_MS || 120000);

  const { mode = 'buffer' } = options; // 'buffer' preferred for FormData in Node
  const fetchRes = await withTimeout(fetchToBufferOrFile(urlOrBuffer, { mode }), timeoutMs);

  // OCRService.extractTextFromImage expects a File/Blob-like object; in Node 18+, Blob is available
  const imageBlob = new Blob([fetchRes.buffer], { type: fetchRes.contentType || 'application/octet-stream' });

  const ocr = new OCRService();
  const ocrResult = await withTimeout(ocr.extractTextFromImage(imageBlob), timeoutMs);
  if (ocrResult && ocrResult.success && typeof ocrResult.text === 'string') {
    return ocrResult.text;
  }
  return '';
}

module.exports = {
  analyzeTextNormalized,
  ocrFromImageUrlOrBuffer,
};
