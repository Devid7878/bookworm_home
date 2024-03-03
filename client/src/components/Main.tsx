// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import heroimg from './../static/imgs/hero-img.png';
import { Link } from 'react-router-dom';

export default function Main() {
	return (
		<div className='mt-[2rem]'>
			<div className='flex justify-between gap-4 items-center'>
				<div className=' text-6xl font-sans font-black flex-1'>
					<span className='block'>The Best way for your Learning</span>
					<Link
						to='#'
						role='button'
						className='bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2  border rounded-full'>
						Create Event
					</Link>
				</div>

				<div className='h-[600px] flex-1 '>
					<img
						src={heroimg}
						alt='book-ad-3'
						className='h-full w-full object-contain scale-x-[-1]'
					/>
				</div>
			</div>
		</div>
	);
}
