import React from 'react';
import { useNavigate } from 'react-router-dom';

function Genres() {
	const navigate = useNavigate();

	const genreFilter = (genre: string) => navigate(`books?genre=${genre}`);

	return (
		<>
			<h1 className='text-2xl'>Genres</h1>
			<div className='grid grid-cols-4 bg-red-50 p-10 rounded-r-md gap-4'>
				<div
					className='bg-slate-500 text-white p-5 text-center rounded-md'
					onClick={() => genreFilter('horror')}>
					Horror
				</div>
				<div
					className='bg-slate-500 text-white p-5 text-center rounded-md'
					onClick={() => genreFilter('educational')}>
					Educational
				</div>
				<div
					className='bg-slate-500 text-white p-5 text-center rounded-md'
					onClick={() => genreFilter('fiction')}>
					Fiction
				</div>
				<div
					className='bg-slate-500 text-white p-5 text-center rounded-md'
					onClick={() => genreFilter('thriller')}>
					Thriller
				</div>
			</div>
		</>
	);
}

export default Genres;
