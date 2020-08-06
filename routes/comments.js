const express = require('express');
const router = express.Router({ mergeParams: true });

const middleware = require('../middleware/index');
const commentsController = require('../controllers/commentsController');

// POST A NEW COMMENT

router.post('/', middleware.isLoggedIn, commentsController.postNewComment);

// DELETE A COMMENT

router.delete(
  '/:commentId',
  middleware.commentOwnership,
  commentsController.deleteComment
);

module.exports = router;
