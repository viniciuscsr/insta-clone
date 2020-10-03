const userController = {};

const User = require('../models/user');
const passport = require('passport');
const { validationResult } = require('express-validator');

// ----------------
// SIGNUP
// ----------------

userController.getSignup = (req, res) => {
  res.render('users/signup');
};

userController.postSignup = async (req, res) => {
  //data validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const newUser = {
    name: req.body.name,
    username: req.body.username,
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

  res.redirect('/posts/');
};

// ----------------
// LOGIN
// ----------------

userController.getLogin = (req, res) => {
  try {
    res.render('users/login');
  } catch (err) {
    res.json({ message: err });
  }
};

userController.postLogin = passport.authenticate('local', {
  successRedirect: '/posts/',
  failureRedirect: '/users/login',
});

// ----------------
// LOGOUT
// ----------------

userController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

// ----------------
// PROFILE
// ----------------

userController.profile = async (req, res) => {
  const userId = req.params.userId;
  let foundUser;
  try {
    foundUser = await User.findById(userId).populate('posts');
  } catch (err) {
    console.log(err);
  }
  res.render('users/profile', { user: foundUser });
};

module.exports = userController;
