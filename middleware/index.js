const middlewareObj = {};

const Post = require('../models/post');
const Comment = require('../models/comment');

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
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
