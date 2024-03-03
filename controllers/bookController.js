const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Book = require('./../models/bookModel');

exports.getAllBooks = catchAsync(async (req, res) => {
	const features = new APIFeatures(Book.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate();

	const books = await features.query;
	// const books = await Book.find({
	//   categories: ['Java'],
	// });

	res.status(200).json({
		status: 'success',
		results: books.length,
		data: {
			books,
		},
	});
});

exports.createBook = catchAsync(async (req, res) => {
	const newBook = await Book.create({
		title: req.body.title,
		isbn: req.body.isbn,
		summary: req.body.summary,
		description: req.body.description,
		price: req.body.price,
	});
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
