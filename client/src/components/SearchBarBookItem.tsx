import React from 'react';
import { Link } from 'react-router-dom';

type searchBooksTypes = {
	searchedBooks: {
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
	}[];
};

function SearchBarBookItem({ searchedBooks }: searchBooksTypes) {
	return (
		<div className='flex gap-4 bg-gray-50 px-4 rounded-md'>
			{searchedBooks?.map((book) => (
				<Link
					to={`${book._id}`}
					key={book._id}
					className='flex items-center cursor-pointer'>
					<li>
						<img
							src={book.coverPhoto}
							alt={book.title}
							className='max-h-8 max-w-10'
						/>
					</li>
					<li className='text-xs min-w-5'>{book.title}</li>
				</Link>
			))}
		</div>
	);
}

export default SearchBarBookItem;
