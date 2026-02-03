const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const verifyToken = require('./src/middleware/verify-token');
const helmet = require('helmet');
const fs = require('fs');
const generatePdf = require('./src/utils/pdf/generate');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const app = express();
app.use(cors());
app.set('port', process.env.PORT);

app.use(helmet());

app.use(verifyToken);

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'tiny'));

app.get('/debug', (req, res, next) => {
  try {
    res.status(200).json({
      message: 'PDF Generator is Running Properly',
      data: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An Error Occured',
      data: error,
    });
  }
});

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
      error: 'Too many requests',
      retryAfter: '15 minutes',
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: 'Rate limit exceeded',

        message: 'Too many requests from this IP, please try again later',
      });
    },
  }),
);

app.post('/pdf/generate', async (req, res, next) => {
  try {
    const pdfFileName = await generatePdf({
      html: `<h1 style="font-family: Inter">Hello</h1>`,
      config: {
        name: req.query.filename,
      },
    });

    const pdfFilePath = path.join(__dirname, 'src/storage', pdfFileName);
    if (!fs.existsSync(pdfFilePath)) {
      res
        .status(500)
        .json({ message: 'Could not generate pdf please try again' });
    }

    res.download(pdfFilePath, pdfFileName);
  } catch (error) {
    res.status(500).json({ message: 'An Error Occured', data: error });
  }
});

app.listen(app.get('port'), () => {
  console.log(
    `PDF Generator is running in ${process.env.NODE_ENV} mode on ${process.env.HOST}${process.env.NODE_ENV === 'development' && ':'.concat(app.get('port'))}`,
  );
});
