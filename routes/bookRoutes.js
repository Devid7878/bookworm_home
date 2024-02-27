const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(
    authController.protect,
    authController.restrictTo('seller'),
    bookController.createBook
  );

router
  .route('/:id')
  .get(bookController.getABook)
  .patch(
    authController.protect,
    authController.restrictTo('seller'),
    bookController.updateBook
  )
  .delete(
    authController.protect,
    authController.restrictTo('seller'),
    bookController.deleteBook
  );

module.exports = router;
