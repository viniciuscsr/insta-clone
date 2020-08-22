const userController = {};

const User = require('../models/user');
const passport = require('passport');
const { validationResult } = require('express-validator');

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

userController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

//-------------------------

class FollowingProfile {
  constructor(newFollowerId, userBeingFollowedId) {
    this.newFollower = newFollowerId;
    this.userBeingFollowed = userBeingFollowedId;
  }
  async follow() {
    let foundUser;
    try {
      foundUser = await User.findById(this.userBeingFollowed);
      for (let i = 0; i < foundUser.followers.length; i++) {
        if (foundUser.followers[i] == this.newFollower) {
          return console.log('You already follow this profile');
        }
      }
      foundUser.followers.push(this.newFollower);
      await foundUser.save();
    } catch (err) {
      console.log(err);
    }
  }
}

const newFollowerProcess = new FollowingProfile(
  '5f01e80ad04de70efc7ff5c4',
  '5eaf07b75abd260c72e08813'
);
newFollowerProcess.follow();

module.exports = userController;
