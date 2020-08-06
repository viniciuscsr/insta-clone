const postsController = {};
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

postsController.newsfeed = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.render('posts/newsfeed', { post: posts });
  } catch (err) {
    res.json({ message: err });
  }
};

postsController.getNewPost = (req, res) => {
  res.render('posts/new');
};

postsController.postNewPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const newPost = new Post({
    title: req.body.title,
    image: req.file.path,
    caption: req.body.caption,
    date: Date.now(),
    user: req.user._id,
  });

  let user;

  try {
    user = await User.findById(newPost.user);
  } catch (err) {
    return res.json({ message: err });
  }

  // PUSH NEW POSTS INTO THE USER MODEL
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newPost.save({ session: sess });
    user.posts.push(newPost);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return res.json({ message: err });
  }

  res.redirect('/posts/');
};

postsController.postsShowPage = async (req, res) => {
  let post;
  try {
    post = await Post.findById(req.params.postId)
      .populate('user')
      .populate('comments')
      .populate('comments.user');
  } catch (err) {
    res.json({ message: err });
  }
  res.render('posts/show', { post: post });
};

postsController.deletePost = async (req, res) => {
  // Finding and populating the post
  let post;
  try {
    post = await Post.findById(req.params.postId)
      .populate('user')
      .populate('comments');
  } catch (err) {
    res.json({ message: err });
  }
  // Deleting the comments of the post and
  try {
    for (let i = 0; i < post.comments.length; i++) {
      await Comment.findByIdAndDelete(post.comments[i]._id);
    }
  } catch (err) {
    return res.json({ message: err });
  }
  // Deleting the post
  try {
    await Post.findByIdAndDelete(req.params.postId);
  } catch (err) {
    return res.json({ message: err });
  }

  res.redirect('/posts/');
};

postsController.getUpdatePost = async (req, res) => {
  let updatePost;
  try {
    updatePost = await Post.findById(req.params.postId);
  } catch (err) {
    res.json({ message: err });
  }
  res.render('posts/edit', { updatePost: updatePost });
};

postsController.patchUpdatePost = async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title, caption: req.body.caption } }
    );
  } catch (err) {
    res.json({ message: err });
  }
  res.redirect('/posts/');
};

module.exports = postsController;
