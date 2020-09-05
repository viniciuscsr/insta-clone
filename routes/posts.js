const express = require('express');
const router = express.Router();

const middleware = require('../middleware/index');
const postsController = require('../controllers/postsController');

// -----------------
// MUTLER - IMAGE UPLOAD
// -----------------

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

// /posts

// -----------------
// NEWSFEED
// -----------------

router.get('/', middleware.isLoggedIn, postsController.newsfeed);

// -----------------
// NEW POST
// -----------------

router.get('/new', middleware.isLoggedIn, postsController.getNewPost);

router.post(
  '/',
  middleware.isLoggedIn,
  upload.single('image'),
  postsController.postNewPost
);

// -----------------
// SHOW POST
// -----------------

router.get('/:postId', postsController.postsShowPage);

// -----------------
// DELETE POST
// -----------------

router.delete('/:postId', middleware.postOwnership, postsController.deletePost);

// -----------------
// UPDATE POST
// -----------------

router.get(
  '/:postId/edit',
  middleware.postOwnership,
  postsController.getUpdatePost
);

router.patch(
  '/:postId',
  middleware.postOwnership,
  postsController.patchUpdatePost
);

// -----------------
// LIKE
// -----------------

router.get('/:postId/like', middleware.isLoggedIn, postsController.likePost);

router.get(
  '/:postId/unlike',
  middleware.isLoggedIn,
  postsController.unlikePost
);

module.exports = router;
