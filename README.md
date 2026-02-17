# PDF Generator

This is a small service to separate `puppeteer` from your base code and integrate a flexible pdf generation feature without hoarding resources of your main app

## Requirement

1. Node v22
2. Chromium (Headless)

## Setup Guide

1. Install npm packages
2. Run `npm run genEnv` to generate staretr environment file or add new keys
3. Install Chromium (Headless) with the following command (for Debian/Ubuntu)

```bash
sudo apt-get update && apt-get install -y chromium fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils
```

4. Run `npm run doctor` to check for missing data
5. Run `npm start` to start dev server
