const express = require('express');
const router = express.Router();

const followController = require('../controllers/followController');
const middleware = require('../middleware/index');

router.get('/follow', function (req, res) {
  res.send('follow routes');
});

router.get(
  '/users/:userId/follow',
  middleware.isLoggedIn,
  followController.follow
);

router.get(
  '/users/:userId/unfollow',
  middleware.isLoggedIn,
  followController.unfollow
);

module.exports = router;
