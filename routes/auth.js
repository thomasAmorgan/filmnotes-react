const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const authenticater = require('../authenticator');
const keys = require('../config/keys');
const User = require('../models/User');

// @route POST api/auth/register
// @desc register a new user
// @access public
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({
    email,
    password
  });

  User.find({ email })
    .then((user) => {
      if (user.length > 0) {
        res.status(401).json({ success: false, message: 'user already exists' });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt)
            .then((hash) => {
              newUser.password = hash;
              newUser.save()
                .then(() => { res.status(201).json({ success: true }) })
                .catch((err) => { res.status(500).json(err) });
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

// @route POST api/auth/authenticate
// @desc authenticate existing user
// @access public
router.post('/authenticate', (req, res) => {
  const { email, password } = req.body;

  try {
    authenticater.authenticate(email, password)
      .then((user) => {
        const token = jwt.sign(user.toJSON(), keys.JWT_SECRET, { expiresIn: '1 days' });

        const { iat, exp } = jwt.decode(token);

        res.status(200).json({ iat, exp, token, email });
      })
      .catch((err) => {
        res.status(401).json({ message: 'unable to authenticate', error: err });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;