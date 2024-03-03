import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import server from './../server';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getABook } from './../redux/features/bookSlice';
import { RootState } from '../redux/store';

interface BookFieldsType {
	_id: string;
	title: string;
	// other fields...
}

function BookDetailsPage() {
	// const [eachBook, setEachBook] = useState<any>();
	const [reviews, setReviews] = useState();
	const { id } = useParams();

	const dispatch = useDispatch();
	const eachBook = useSelector((state: RootState) => state.books.book);

	useEffect(() => {
		const fetchBook = async () => {
			const data = await fetch(`${server}/books/${id}`);
			const res = await data.json();
			// console.log(res.data);
			dispatch(getABook(res.data.book));
			// setEachBook(res.data.book);
			console.log(res.data.book);
		};

		fetchBook();
	}, [id, dispatch]);

	return (
		<div className='font-[sans-serif] bg-white'>
			<div className='p-6 lg:max-w-7xl max-w-4xl mx-auto'>
				<div className='grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_8px_-3px_rgba(6,81,237,0.3)] p-6'>
					<div className='lg:col-span-3 w-full top-0 text-center'>
						<div className='px-4 py-10 rounded-xs shadow-[0_2px_8px_-3px_rgba(6,81,237,0.3)] relative flex justify-center'>
							{/* Main image of the book should be here */}
							<img
								src={eachBook?.coverPhoto}
								alt={eachBook?.title}
								className='h-full w-1/5 rounded object-cover'
							/>

							{/* Wishlist icon */}
							<button type='button' className='absolute top-4 right-4'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20px'
									fill='#ccc'
									className='mr-1 hover:fill-[#333]'
									viewBox='0 0 64 64'>
									<path
										d='M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z'
										data-original='#000000'></path>
								</svg>
							</button>
						</div>
					</div>
					<div className='lg:col-span-2'>
						<h2 className='text-2xl font-extrabold text-[#333]'>
							{eachBook?.title}
						</h2>
						<div className='flex flex-wrap gap-4 mt-6'>
							<p className='text-[#333] text-4xl font-bold'>
								${eachBook?.price}
							</p>
							<p className='text-gray-400 text-xl'>
								<span>${eachBook?.price + eachBook?.price * (18 / 100)}</span>{' '}
								<span className='text-sm ml-1'>Tax included</span>
							</p>
						</div>

						{/* Reviews */}
						{/* <div className="flex space-x-2 mt-4">
              <svg
                className="w-5 fill-[#333]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-[#CED5D8]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <h4 className="text-[#333] text-base">500 Reviews</h4>
            </div> */}

						<div className='flex justify-center space-x-5'>
							<Button text='Buy Now' />
							<Link to='/cart'>
								<Button text='Add to Cart' />
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-8 m-20'>
				<h3 className='text-lg font-bold text-[#333]'>Product information</h3>
				<ul className='mt-6 space-y-2 text-[#333] max-w-[50%]'>
					<li className='flex justify-between items-start'>
						<span>Type</span>
						<span>Book</span>
					</li>
					<li className='flex justify-between items-start'>
						<span>Title</span>
						<span>{eachBook?.title}</span>
					</li>
					<li className='flex justify-between items-start'>
						<span>Page Count</span>
						<span>{eachBook?.pageCount}</span>
					</li>
					<li className='flex justify-between items-start'>
						<span>Authors</span>
						<span>
							{eachBook?.authors.map((author: string, index: number) => (
								<span key={index}>{author}</span>
							))}
						</span>
					</li>
					<li className='flex justify-between items-start'>
						<span>Genre</span>
						<span>{eachBook?.genre.toUpperCase()}</span>
					</li>
				</ul>
			</div>
			<div className='mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6'>
				<h3 className='text-lg font-bold text-[#333]'>Reviews(10)</h3>
				<div className='grid md:grid-cols-2 gap-12 mt-6'>
					<div>
						<div className='space-y-3'>
							<div className='flex items-center'>
								<p className='text-sm text-[#333] font-bold'>5.0</p>
								<svg
									className='w-5 fill-[#333] ml-1'
									viewBox='0 0 14 13'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
								</svg>
								<div className='bg-gray-400 rounded w-full h-2 ml-3'>
									<div className='w-2/3 h-full rounded bg-[#333]'></div>
								</div>
								<p className='text-sm text-[#333] font-bold ml-3'>66%</p>
							</div>
							<div className='flex items-center'>
								<p className='text-sm text-[#333] font-bold'>4.0</p>
								<svg
									className='w-5 fill-[#333] ml-1'
									viewBox='0 0 14 13'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
								</svg>
								<div className='bg-gray-400 rounded w-full h-2 ml-3'>
									<div className='w-1/3 h-full rounded bg-[#333]'></div>
								</div>
								<p className='text-sm text-[#333] font-bold ml-3'>33%</p>
							</div>
							<div className='flex items-center'>
								<p className='text-sm text-[#333] font-bold'>3.0</p>
								<svg
									className='w-5 fill-[#333] ml-1'
									viewBox='0 0 14 13'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
								</svg>
								<div className='bg-gray-400 rounded w-full h-2 ml-3'>
									<div className='w-1/6 h-full rounded bg-[#333]'></div>
								</div>
								<p className='text-sm text-[#333] font-bold ml-3'>16%</p>
							</div>
							<div className='flex items-center'>
								<p className='text-sm text-[#333] font-bold'>2.0</p>
								<svg
									className='w-5 fill-[#333] ml-1'
									viewBox='0 0 14 13'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
								</svg>
								<div className='bg-gray-400 rounded w-full h-2 ml-3'>
									<div className='w-1/12 h-full rounded bg-[#333]'></div>
								</div>
								<p className='text-sm text-[#333] font-bold ml-3'>8%</p>
							</div>
							<div className='flex items-center'>
								<p className='text-sm text-[#333] font-bold'>1.0</p>
								<svg
									className='w-5 fill-[#333] ml-1'
									viewBox='0 0 14 13'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
								</svg>
								<div className='bg-gray-400 rounded w-full h-2 ml-3'>
									<div className='w-[6%] h-full rounded bg-[#333]'></div>
								</div>
								<p className='text-sm text-[#333] font-bold ml-3'>6%</p>
							</div>
						</div>
					</div>
					<div className=''>
						<div className='flex items-start'>
							<img
								src='https://readymadeui.com/team-2.webp'
								className='w-12 h-12 rounded-full border-2 border-white'
							/>
							<div className='ml-3'>
								<h4 className='text-sm font-bold text-[#333]'>John Doe</h4>
								<div className='flex space-x-1 mt-1'>
									<svg
										className='w-4 fill-[#333]'
										viewBox='0 0 14 13'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
									</svg>
									<svg
										className='w-4 fill-[#333]'
										viewBox='0 0 14 13'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
									</svg>
									<svg
										className='w-4 fill-[#333]'
										viewBox='0 0 14 13'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
									</svg>
									<svg
										className='w-4 fill-[#CED5D8]'
										viewBox='0 0 14 13'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
									</svg>
									<svg
										className='w-4 fill-[#CED5D8]'
										viewBox='0 0 14 13'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
									</svg>
									<p className='text-xs !ml-2 font-semibold text-[#333]'>
										2 mins ago
									</p>
								</div>
								<p className='text-sm mt-4 text-[#333]'>
									Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
									eiusmod tempor incidunt ut labore et dolore magna aliqua.
								</p>
							</div>
						</div>
						<button
							type='button'
							className='w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-[#333] text-[#333] font-bold rounded'>
							Read all reviews
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookDetailsPage;
