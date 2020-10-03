const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

//HOMEPAGE

router.get('/', (req, res) => {
  res.render('home');
});

// SEARCH

router.get('/search', async (req, res) => {
  const q = req.query.q;
  let queryResult;
  try {
    queryResult = await User.find({
      username: { $regex: `${q}`, $options: 'i' },
    });
  } catch (err) {
    console.log(err);
  }
  res.render('search', { results: queryResult });
});

module.exports = router;
