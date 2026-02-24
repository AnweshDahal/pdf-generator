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
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-zygote',
      '--disable-crash-reporter',
      '--single-process',
      '--tmp=/tmp',
      '--user-data-dir=/tmp/chromium-data',
    ],

    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
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
