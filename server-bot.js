// Blockcraft bot host: a headless browser that stays "in" your world as a player and keeps the room open 24/7.
// Run it on any computer that stays on (a spare PC, a Raspberry Pi, a cheap VPS):
//   npm install playwright && npx playwright install chromium
//   node server-bot.js https://YOUR-SITE.vercel.app ABCDE
// ABCDE = the room code you want (5 letters/numbers). Friends join with Multiplayer -> that code.
const { chromium } = require('playwright');
const [url, code] = process.argv.slice(2);
if (!url || !/^[A-Za-z0-9]{5}$/.test(code || '')) { console.log('Usage: node server-bot.js <site url> <5-char room code>'); process.exit(1); }
(async () => {
  const ctx = await chromium.launchPersistentContext('./bot-data', { headless: true, args: ['--no-sandbox', '--use-gl=swiftshader', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
  const page = ctx.pages()[0] || await ctx.newPage();
  page.on('console', m => { const t = m.text(); if (/room|host|join|Network/i.test(t)) console.log('[game]', t); });
  page.on('crash', () => { console.log('page crashed, restarting'); process.exit(1); });
  await page.goto(url.replace(/\/$/, '') + '/?server=' + code.toUpperCase());
  console.log('Bot host started. Room code:', code.toUpperCase(), '(world is saved in ./bot-data)');
  setInterval(() => {}, 1 << 30);
})();
