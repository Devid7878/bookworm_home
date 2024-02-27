const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Book = require('./../models/bookModel');

exports.getAllBooks = catchAsync(async (req, res) => {
  const books = await Book.find();

  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
});

exports.createBook = catchAsync(async (req, res) => {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      book: newBook,
    },
  });
});

exports.getABook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) return next(new AppError('Book not found', 404));

  res.status(201).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.updateBook = catchAsync(async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
  if (!updatedBook) return next(new AppError('Book not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      book: updatedBook,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return next(new AppError('Book no found', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
