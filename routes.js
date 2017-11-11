const express = require('express');
const Route = express.Router();

// =======================
// middlewares ===========
// =======================
const mwAuthenticate = require('./middlewares/Authentication');

// =======================
// controllers ===========
// =======================
const UserController = require('./controllers/User');
const Authentication = require('./controllers/Authentication');

// =======================
// no-authen route =======
// =======================
Route.use('/api/authentication', Authentication);

// =======================
// authen routes =========
// =======================
Route.use(mwAuthenticate);
Route.use('/api/user', UserController);

module.exports = Route;