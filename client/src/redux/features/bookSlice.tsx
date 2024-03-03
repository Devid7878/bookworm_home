import { createSlice } from '@reduxjs/toolkit';

export interface BookState {
	books: {
		_id: string;
		title: string;
		description: string;
		image: string;
		isbn: string;
		price: number;
		rating: number;
		numReviews: number;
		coverPhoto: string;
		summary: string;
		authors: string[];
		genre: string;
		publishedDate: string;
	}[];
	book: {
		_id: string;
		title: string;
		description: string;
		image: string;
		isbn: string;
		price: number;
		rating: number;
		numReviews: number;
		coverPhoto: string;
		summary: string;
		authors: string[];
		genre: string;
		pageCount: 0;
		publishedDate: string;
	};
	loading: boolean;
	selectedGenres: string[];
	selectedAuthors: string[];
}

const initialState: BookState = {
	books: [],
	book: {
		_id: '',
		title: '',
		description: '',
		image: '',
		isbn: '',
		price: 0,
		rating: 0,
		numReviews: 0,
		coverPhoto: '',
		summary: '',
		authors: [],
		genre: '',
		publishedDate: '',
		pageCount: 0,
	},
	loading: false,
	selectedGenres: [],
	selectedAuthors: [],
};

export const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		getAllBooks: (state, action) => {
			state.books = action.payload;
		},
		getABook: (state, action) => {
			state.book = action.payload;
		},
		loading: (state, action) => {
			state.loading = action.payload;
		},
		setSelectedGenres: (state, action) => {
			state.selectedGenres = action.payload;
		},
		setSelectedAuthors: (state, action) => {
			state.selectedGenres = action.payload;
		},
	},
});
export const {
	getAllBooks,
	getABook,
	loading,
	setSelectedGenres,
	setSelectedAuthors,
} = bookSlice.actions;
export default bookSlice.reducer;
