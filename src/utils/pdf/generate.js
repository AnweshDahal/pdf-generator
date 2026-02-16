const { createId } = require('@paralleldrive/cuid2');
const puppeteer = require('puppeteer');
const path = require('path');
module.exports = async ({ html, config = null }) => {
  const pdfConfig = {
    orientation: config?.orientation ?? 'landscape',
    name: config?.name ?? `${createId()}.pdf`,
  };

  // ? code below was restructured and optimized using AI
  const browser = await puppeteer.launch({
    headless: 'shell',
    args: [
      // Essential Docker flags
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',

      // Performance optimizations
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-sync',

      // Memory optimizations
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-site-isolation-trials',
      '--disable-features=AudioServiceOutOfProcess',

      // Reduce resource usage
      '--disable-default-apps',
      '--disable-component-update',
      '--disable-domain-reliability',
      '--disable-breakpad',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-client-side-phishing-detection',

      // UI/UX (not needed in headless)
      '--disable-notifications',
      '--disable-popup-blocking',
      '--disable-print-preview',
      '--disable-prompt-on-repost',
      '--hide-scrollbars',
      '--mute-audio',
      '--no-first-run',
      '--no-default-browser-check',
      '--no-pings',

      // Security/privacy
      '--autoplay-policy=user-gesture-required',
      '--disable-offer-store-unmasked-wallet-cards',
      '--disable-speech-api',
      '--password-store=basic',
      '--use-mock-keychain',

      // Rendering
      '--use-gl=swiftshader',
      '--ignore-gpu-blacklist',
      '--metrics-recording-only',

      // Additional Docker-specific optimizations
      '--single-process', // Use only if you have memory constraints
      '--disable-blink-features=AutomationControlled', // Avoid detection
    ],

    // Additional Docker optimizations
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
    timeout: 30000,
    dumpio: false, // Set to true for debugging
    protocolTimeout: 180000,
  });
  // ? up until here

  const page = await browser.newPage();

  await page.setContent(html);
  await page.emulateMediaType('screen');

  await page.pdf({
    path: path.join(__dirname, '../../storage', pdfConfig.name),
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  return pdfConfig.name;
};
