const express = require('express');
const mongoose = require('mongoose');

const router = express.Router({ mergeParams: true });

const Comment = require('../models/comment');
const middleware = require('../middleware/index');
const Post = require('../models/post');
const User = require('../models/user');

// POST A NEW COMMENT

router.post('/', middleware.isLoggedIn, async (req, res, next) => {
  const newComment = new Comment({
    text: req.body.text,
    date: Date.now(),
    user: {
      id: req.user._id,
      username: req.user.username,
    },
    post: req.params.postId,
  });

  console.log(newComment);

  let user;

  try {
    user = await User.findById(newComment.user.id);
  } catch (err) {
    return res.json({ message: err });
  }

  console.log(user);

  let post;

  try {
    post = await Post.findById(newComment.post);
  } catch (err) {
    return res.json({ message: err });
  }

  // try {
  //   await newComment.save();
  // } catch (error) {
  //   res.json({ message: 'Something went wrong' });
  // }

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
});

// DELETE A COMMENT

router.delete('/:commentId', middleware.commentOwnership, async (req, res) => {
  try {
    await Comment.remove({ _id: req.params.commentId });
  } catch (error) {
    res.json({ message: 'Could not delete the comment' });
  }
  res.json({ message: 'Comment deleted' });
});

module.exports = router;
