const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(userController.getAllUsers);

// Admin get all users for approve or reject
router.get(
  '/getAllUsers',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getAllUsers
);

module.exports = router;
