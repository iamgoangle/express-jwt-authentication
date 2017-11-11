const AuthenticationRoute = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const mwAuthenticate = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      if (user.password !== req.body.password) {
        res.status(401).json({
          success: false,
          message: 'Bad credentials.'
        });
      } else {
        const payload = {
          username: user.username,
          admin: user.admin
        };

        const token = jwt.sign(payload, app.get('superSecret'), {
          algorithm: 'HS256',
          expiresIn: '8h'
        });

        res.json({
          success: true,
          message: 'Create new token',
          token: token
        });
      }
    }
  });
};

AuthenticationRoute.post('/', mwAuthenticate);

module.exports = AuthenticationRoute;