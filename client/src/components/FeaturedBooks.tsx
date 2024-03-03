import server from './../../src/server';

// import required modules
import { useEffect, useState } from 'react';
import BookItem from './BookItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllBooks, loading } from '../redux/features/bookSlice';

export default function FeaturedBooks() {
	// const [books, setBooks] = useState<any[]>([]);

	const dispatch = useDispatch();
	const { books, loading: loadingFeaturedBooks } = useSelector(
		(state: RootState) => state.books,
	);

	// console.log(books);
	useEffect(() => {
		const fetchBooks = async () => {
			dispatch(loading(true));
			const data = await fetch(`${server}/books`);
			const res = await data.json();
			// console.log(res);
			// setBooks(res.data.books);
			dispatch(getAllBooks(res.data.books));
			dispatch(loading(false));
		};
		fetchBooks();
	}, [dispatch]);

	if (loadingFeaturedBooks || books.length === 0) return <h1>Loading...</h1>;
	return (
		<div className='grid grid-cols-5'>
			{books.map((book, index) => {
				if (index < 5) {
					return <BookItem book={book} key={book._id} />;
				}
			})}
		</div>
	);

	// <div className="mx-4">
	//     <Swiper
	//       watchSlidesProgress={true}
	//       slidesPerView={5}
	//       spaceBetween={30}
	//       className="mySwiper"
	//     >
	//       {books.map((book) => (
	//         <SwiperSlide key={book._id}>
	//           <BookItem book={book} />
	//         </SwiperSlide>
	//       ))}
	//     </Swiper>
	//   </div>
}
