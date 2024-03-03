import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

type bookPropTypes = {
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
	};
};

function BookItem({ book }: bookPropTypes) {
	return (
		<div className='w-full h-full grid justify-center'>
			<Link to={`/books/${book?._id}`}>
				<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 max-h-[22rem]'>
					<img
						src={book?.coverPhoto}
						alt={book?.title}
						className='cursor-pointer lg:w-[15vw] object-cover border border-black'
					/>
					<div className='p-1'>
						<p className='text-l font-bold tracking-tight text-gray-900 dark:text-white max-h-6 overflow-hidden'>
							{book?.title}
						</p>
						<div className='mb-3 font-normal text-gray-700 dark:text-gray-400 min-h-12'>
							{book?.authors.map((author, i) => (
								<ul key={i}>
									<li className='text-xs font-semibold'>{author}</li>
								</ul>
							))}
						</div>
						<p>${book?.price}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}






export default BookItem;
