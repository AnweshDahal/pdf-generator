FROM node:22-slim

# Environment Setup
RUN apt-get update && apt-get install -y \
  chromium \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Set environment variable for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create user early so we can set permissions
RUN groupadd -r appuser && useradd -r -g appuser appuser \
  && mkdir -p /tmp/chromium-data \
  && mkdir -p /tmp/chromium-home \
  && chmod -R 777 /tmp/chromium-data \
  && chmod -R 777 /tmp/chromium-home

# App Setup
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN chown -R appuser:appuser /usr/src/app

USER appuser

# Set home dir for appuser to avoid chromium home dir issues
ENV HOME=/tmp/chromium-home \
  XDG_CONFIG_HOME=/tmp/chromium-home \
  XDG_CACHE_HOME=/tmp/chromium-data

EXPOSE 3673

# Running the app
CMD ["node", "./index.js"]
