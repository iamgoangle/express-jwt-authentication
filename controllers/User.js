const CustomerRoute = require('express').Router();
const User = require('../models/user');

CustomerRoute.get('/setup', (req, res, next) => {
  const demo = new User({
    username: 'golf',
    password: 'golf',
    admin: true
  });

  return demo.save((err) => {
    if (err) throw err;

    console.log('User saved successfully');

    res.status(200).json({ success: true });
  });
});

CustomerRoute.get('/getUsers', (req, res, next) => {
  User.find({}, { __v: 0 }, (err, users) => {
    res.status(200).json({
      success: true,
      data: users
    });
  });
});


module.exports = CustomerRoute;