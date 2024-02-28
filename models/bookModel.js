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
  shortDescription: {
    type: String,
    required: [true, 'A book must have a short description'],
    trim: true,
    // minlength: [
    //   5,
    //   'A book short description must be at least 5 characters long',
    // ],
  },
  longDescription: {
    type: String,
    required: [true, 'A book must have a description'],
    trim: true,
    // minlength: [5, 'A book description must be at least 5 characters long'],
  },
  thumbnailUrl: String,
  authors: [String],
  categories: [String],
  genre: String,
  active: {
    type: Boolean,
    default: false,
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
