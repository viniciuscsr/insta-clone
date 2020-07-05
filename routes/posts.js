const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
    //Add an error message. File is not being stored but user is not getting a message
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const Post = require('../models/post');
const User = require('../models/user');
const middleware = require('../middleware/index');

// GETS BACK ALL POSTS
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.render('pages/main_posts', { posts: posts });
  } catch (err) {
    res.json({ message: err });
  }
});

// CREATES A NEW POST
router.post(
  '/',
  middleware.isLoggedIn,
  upload.single('image'),
  async (req, res) => {
    console.log(req.file);
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

    res.json({ newPost: newPost });
  }
);

//SPECIFIC POST
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE POST
router.delete('/:postId', middleware.postOwnership, async (req, res) => {
  let post;

  try {
    post = await Post.findById(req.params.postId)
      .populate('user')
      .populate('comments');
  } catch (err) {
    res.json({ message: err });
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    post.comments.pull(post);

    // DELETE COMMENTS FROM DB WHEN USER DELETES POSTS
    // await post.comments.save({ session: sess });
    // await post.remove({ session: sess });
    // post.user.posts.pull(post);
    // await post.user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return res.json({ message: err });
  }

  res.json({ message: 'Post was deleted' });
});

//UPDATE POST
router.patch('/:postId', middleware.postOwnership, async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json({ updated_post: updatedPost });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
