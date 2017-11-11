const express = require('express');
global.app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const APP_CONFIG = require('./config');
const User = require('./models/user');

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 3000;
mongoose.connect(APP_CONFIG.MONGO_URL, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
app.set('superSecret', APP_CONFIG.API_SECRET);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// =======================
// route =================
// =======================
app.use(require('./routes'));

app.listen(port, () => {
  console.log(`Start the server at http://localhost:${port}`);
});