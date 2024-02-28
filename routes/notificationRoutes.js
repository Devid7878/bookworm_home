const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/:userId/approveUser',
  authController.protect,
  authController.restrictTo('admin'),
  notificationController.approveUser
);

router.get(
  '/:userId/rejectUser',
  authController.protect,
  authController.restrictTo('admin'),
  notificationController.rejectUser
);

module.exports = router;
