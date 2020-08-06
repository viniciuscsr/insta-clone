const express = require('express');
const router = express.Router();

const { check, body } = require('express-validator');

const userController = require('../controllers/userController');

//SIGNUP

router.get('/signup', userController.getSignup);

router.post(
  '/signup',
  [
    check('password').isLength({ min: 6 }),
    check('name').notEmpty(),
    body('email').isEmail().normalizeEmail(),
  ],
  userController.postSignup
);

//LOGIN

router.get('/login', userController.getLogin);

router.post('/login', userController.postLogin);

//LOGOUT

router.get('/logout', userController.logout);

module.exports = router;
