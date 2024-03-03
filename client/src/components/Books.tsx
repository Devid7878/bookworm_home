import React, { useEffect, useState } from 'react';
import server from '../server';
import BookItem from './BookItem';
import Pagination from './Pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooks } from '../redux/features/bookSlice';
import { AppDispatch } from '../redux/store';

function Books() {
	// const [books, setBooks] = useState<any[]>([]);
	const [isBooksLoading, setIsBooksLoading] = useState(false);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchBooks = async () => {
			const data = await fetch(`${server}/books`);
			const res = await data.json();
			// console.log(res);
			// setBooks(res.data.books);
			dispatch(getAllBooks(res.data.books));
		};
		setIsBooksLoading(true);
		fetchBooks();
		setIsBooksLoading(false);
	}, [dispatch]);

	return (
		<div>
			<Pagination />
		</div>
	);
}

export default Books;
