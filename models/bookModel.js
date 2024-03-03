const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'A book must have a title'],
		trim: true,
		unique: true,
		// minlength: [3, 'A book title must be at least 3 characters long'],
	},
	pageCount: Number,
	isbn: {
		type: String,
		unique: true,
		required: [true, 'A book must have an ISBN'],
	},
	publishedDate: Date,
	summary: {
		type: String,
		required: [true, 'A book must have a summary'],
		trim: true,
		// minlength: [
		//   5,
		//   'A book short description must be at least 5 characters long',
		// ],
	},
	description: {
		type: String,
		required: [true, 'A book must have a description'],
		trim: true,
		// minlength: [5, 'A book description must be at least 5 characters long'],
	},
	coverPhoto: String,
	authors: [String],
	categories: [String],
	genre: String,
	active: {
		type: Boolean,
		default: false,
	},
	price: {
		type: Number,
		required: [true, 'A book price must have a price'],
	},
	condition: {
		type: String,
		default: 'new',
		enum: ['new', 'old'],
	},
	ratingsQuantity: Number,
	ratingsAverage: Number,
	review: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Review',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

// bookSchema.pre(/^find/, async function (next) {
//   this.populate({
//     path: 'review',
//     select: '-__v',
//   });

//   next();
// });

bookSchema.pre('save', function (next) {
	this.genre = this.genre.toLowerCase();
	this.authors = this.authors.map((author) =>
		author.replace(/\s/g, '').toLowerCase(),
	);
	next();
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
