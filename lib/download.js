'use strict';

// Utility to fetch a Telegram file URL and return a Buffer (default) or write to a temp file
// Uses global fetch in Node >=18; falls back to node-fetch if needed.

const fs = require('fs');
const path = require('path');
const os = require('os');

let _fetch = global.fetch;
const https = require('https');

async function fetchToBufferOrFile(urlOrBuffer, opts = {}) {
  const { mode = 'buffer', ext = '.bin' } = opts;

  if (Buffer.isBuffer(urlOrBuffer)) {
    if (mode === 'buffer') {
      return { buffer: urlOrBuffer, contentType: 'application/octet-stream' };
    }
    const tmpPath = path.join(os.tmpdir(), `tg_${Date.now()}${ext}`);
    await fs.promises.writeFile(tmpPath, urlOrBuffer);
    return { path: tmpPath, contentType: 'application/octet-stream' };
  }

  if (typeof urlOrBuffer === 'string') {
    if (typeof _fetch === 'function') {
      const res = await _fetch(urlOrBuffer);
      if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`);
      const contentType = res.headers.get('content-type') || 'application/octet-stream';

      if (mode === 'buffer') {
        const arrayBuf = await res.arrayBuffer();
        return { buffer: Buffer.from(arrayBuf), contentType };
      } else {
        const tmpPath = path.join(os.tmpdir(), `tg_${Date.now()}${ext}`);
        const fileStream = fs.createWriteStream(tmpPath);
        await new Promise((resolve, reject) => {
          res.body.pipe(fileStream);
          res.body.on('error', reject);
          fileStream.on('finish', resolve);
        });
        return { path: tmpPath, contentType };
      }
    } else {
      // Fallback to https module
      const tmpPath = path.join(os.tmpdir(), `tg_${Date.now()}${ext}`);
      await new Promise((resolve, reject) => {
        https.get(urlOrBuffer, (res) => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Download failed: ${res.statusCode}`));
            return;
          }
          const fileStream = fs.createWriteStream(tmpPath);
          res.pipe(fileStream);
          res.on('error', reject);
          fileStream.on('finish', resolve);
        }).on('error', reject);
      });
      return { path: tmpPath, contentType: 'application/octet-stream' };
    }
  }

  throw new Error('fetchToBufferOrFile: unsupported input. Provide URL string or Buffer');
}

module.exports = { fetchToBufferOrFile };
