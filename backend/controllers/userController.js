const userController = {};

const User = require('../models/user');
const HttpError = require('../models/httpError');

const passport = require('passport');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ----------------
// SIGNUP
// ----------------

userController.getSignup = (req, res) => {
  res.render('users/signup');
};

userController.postSignup = async (req, res) => {
  console.log('here');
  //data validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError('Sign up failed', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Could not create user, try again.', 500);
    return next(error);
  }

  const newUser = new User({
    name,
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      'secretsecret',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Sign up failed, please try again.', 500);
    return next(error);
  }

  res
    .status('201')
    .json({ userId: newUser._id, username: newUser.username, token: token });
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

userController.postLogin = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('Invalid credentials', 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Invalid credentials', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid credentials', 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser._id, username: existingUser.username },
      'secretsecret',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Log in failed, please try again.', 500);
    return next(error);
  }

  res.json({
    userId: existingUser._id,
    username: existingUser.username,
    token: token,
  });
};

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
