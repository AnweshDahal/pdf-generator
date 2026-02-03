const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const verifyToken = require('./src/middleware/verify-token');
const helmet = require('helmet');
const compress = require('compress');

require('dotenv').config({ path: path.join(__dirname, '.env') });
const app = express();
app.use(cors());
app.set('port', process.env.PORT);

app.use(helmet());

app.use(compress());
app.listen();
