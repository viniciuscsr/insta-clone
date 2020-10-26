const middlewareObj = {};

const Post = require('../models/post');
const Comment = require('../models/comment');
const HttpError = require('../models/httpError');
const jwt = require('jsonwebtoken');

middlewareObj.isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Failed Authentication');
    }
    const decodedToken = jwt.verify(token, 'secretsecret');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Failed Authentication', 401);
    return next(error);
  }
};

middlewareObj.postOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Post.findById(req.params.postId, (err, foundPost) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        if (foundPost.user.equals(req.user.id)) {
          next();
        } else {
          res.json({
            message: "You don't have permission to modify this post",
          });
        }
      }
    });
  } else {
    res.redirect('/users/login');
  }
};

middlewareObj.commentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.commentId, (err, foundComment) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        if (foundComment.user.id.equals(req.user.id)) {
          next();
        } else {
          res.json({
            message: "You don't have permission to modify this comment",
          });
        }
      }
    });
  } else {
    res.redirect('/users/login');
  }
};

module.exports = middlewareObj;
