const commentsController = {};

const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

commentsController.postNewComment = async (req, res, next) => {
  const newComment = new Comment({
    text: req.body.text,
    date: Date.now(),
    user: {
      id: req.user._id,
      username: req.user.username,
    },
    post: req.params.postId,
  });

  let user;

  try {
    user = await User.findById(newComment.user.id);
  } catch (err) {
    return res.json({ message: err });
  }

  let post;

  try {
    post = await Post.findById(newComment.post);
  } catch (err) {
    return res.json({ message: err });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newComment.save({ session: session });
    user.comments.push(newComment);
    await user.save({ session: session });
    post.comments.push(newComment);
    await post.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    throw err;
  } finally {
    res.redirect('/posts/' + newComment.post);
  }
};

commentsController.deleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.commentId });
  } catch (error) {
    res.json({ message: 'Could not delete the comment' });
  }
  res.redirect('/posts/' + req.params.postId);
};

module.exports = commentsController;
