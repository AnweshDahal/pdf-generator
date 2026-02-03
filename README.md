# PDF Generator

This is a small service to separate `puppeteer` from your base code and integrate a flexible pdf generation feature without hoarding resources of your main app

## Requirement

1. Node v22
2. Chromium (Headless)

## Setup Guide (Development)

1. Install npm packages
2. Run `npm run genEnv` to generate staretr environment file or add new keys
3. Install Chromium (Headless) with the following command (for Debian/Ubuntu)

```bash
sudo apt install # TODO: Look into required packages
```

4. Run `npm run doctor` to check for missing data
5. Run `npm start` to start dev server

## Setup Guide (Production)

TODO: Add setup guide with image and container generation
