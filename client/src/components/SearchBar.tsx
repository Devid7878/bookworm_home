import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TERipple } from 'tw-elements-react';
import { RootState } from '../redux/store';
import SearchBarBookItem from './SearchBarBookItem';

type propTypes = {
	searchHandler: () => void;
	inputSearch: string;
};

export default function SearchBar({}): JSX.Element {
	const [inputSearch, setInputSearch] = useState('');
	const [seachedBooks, setSearchedBooks] = useState<
		{
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
		}[]
	>([]);

	const books = useSelector((state: RootState) => state.books.books);

	const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setInputSearch(event.currentTarget.value);
	};

	useEffect(() => {
		const filteredBooks = books?.filter((book) => {
			if (inputSearch.trim() === '') return null;
			if (
				book.title.toLowerCase().startsWith(inputSearch.toLowerCase()) &&
				inputSearch.trim() !== ''
			) {
				return book;
			}
		});

		console.log(filteredBooks);
		setSearchedBooks(filteredBooks);
	}, [books, inputSearch]);

	return (
		<div className='bg-slate-500 p-5'>
			<div className='flex gap-4 bg-gray-50 px-4 rounded-md'>
				<div className='py-[0.5rem] h-10'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 512 512'
						className='h-full fill-slate-500'>
						<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
					</svg>
				</div>
				<input
					type='text'
					placeholder='Search'
					className='py-2 px-4 rounded-md bg-transparent focus:ring-none'
					onChange={searchHandler}
					value={inputSearch}
				/>
			</div>
			{seachedBooks.length > 0 && (
				<div>
					<ul className='bg-red-50 h-10 p-5 flex items-center justify-between'>
						<SearchBarBookItem searchedBooks={seachedBooks} />
					</ul>
				</div>
			)}
		</div>
	);
}
