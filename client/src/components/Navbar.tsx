import { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookItem from './BookItem';
import SearchBarBookItem from './SearchBarBookItem';

export default function Navbar() {
	return (
		<div className='flex justify-between items-center py-[1rem]'>
			<div className='font-bold text-5xl font-serif'>LOGO</div>

			<SearchBar />

			<div className=' bg-red-600 w-10 aspect-square rounded-md'>d</div>
		</div>
	);
}

{
	/* <div className='flex justify-between items-center py-[1rem]'>
			<div className='font-bold text-5xl font-serif'>LOGO</div>

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
			<div className=' bg-red-600 w-10 aspect-square rounded-md'></div>
		</div> */
}
