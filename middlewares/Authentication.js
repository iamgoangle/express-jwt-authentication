const jwt = require('jsonwebtoken');

// ==============================
// Authentication Middleware ====
// ==============================

/**
 * @author  Teerapong, Singthong
 * @description A custom middleware to verify the token that send from a user
 * 
 */

 const mwAuthenticate = (req, res, next) => {
  const userToken = req.headers['x-access-token'];

  if (userToken) {
    jwt.verify(userToken, app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'No token provided or token expired.'
    });
  }
 };

 module.exports = mwAuthenticate;