const express = require('express');
const router = express.Router();

const { check, body, validationResult } = require('express-validator');
const passport = require('passport');

const User = require('../models/user');

//SIGNUP

router.post(
  '/signup',
  [
    check('password').isLength({ min: 6 }),
    check('name').notEmpty(),
    body('email').isEmail().normalizeEmail(),
    check('photo').isURL(),
  ],
  async (req, res, next) => {
    //data validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const newUser = {
      name: req.body.name,
      username: req.body.username,
      photo: req.body.photo,
      email: req.body.email,
    };

    try {
      const passportUser = await User.register(
        new User(newUser),
        req.body.password
      );
    } catch (err) {
      res.json({ message: err });
    }

    res.status(201).json({ message: 'Successfully signed up' });
  }
);

//LOGIN

router.get('/login', async (req, res, next) => {
  try {
    res.render('pages/login');
  } catch (err) {
    res.json({ message: err });
  }
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/posts/',
    failureRedirect: '/users/login',
  }),
  function (req, res) {
    // res.send('Login Post Route');
  }
  // async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }
  // const { email, password } = req.body;
  // //finding the user in the DB
  // let existingUser;
  // try {
  //   existingUser = await User.findOne({ email: email });
  // } catch (err) {
  //   return res.send({ message: 'Login Failed' });
  // }
  // //does the email match the password? Is this a valid user?
  // if (!existingUser) {
  //   return res.send({ message: 'User does not exist' });
  // } else if (existingUser.password !== password) {
  //   return res.send({ message: 'Password Incorrect' });
  // }
  // res.send({ message: 'You are logged in' });
  // }
);

//LOGOUT

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//PROFILE PAGE

router.get('/:userId', async (req, res, next) => {
  res.send('User Profile');
});

module.exports = router;
