import React, {
	useEffect,
	useState,
	Fragment,
	ChangeEvent,
	MouseEventHandler,
} from 'react';
import BookItem from './BookItem';
import server from '../server';
import { RootState } from '../redux/store';
// import { Filter } from '@google/model-viewer/lib/three-components/gltf-instance/gltf-2.0';
import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline';
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
	// Squares2X2Icon,
} from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
	setSelectedAuthors,
	setSelectedGenres,
} from '../redux/features/bookSlice';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import Navbar from './Navbar';

type bookPropType = {
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
	}[];
};

const sortOptions = [
	{ name: 'Most Popular', href: '#', current: true },
	{ name: 'Best Rating', href: '#', current: false },
	{ name: 'Newest', href: '#', current: false },
	{ name: 'Price: Low to High', href: '#', current: false },
	{ name: 'Price: High to Low', href: '#', current: false },
];

const filters = [
	{
		id: '0',
		name: 'Genre',
		options: [
			{ value: 'educational', label: 'Educational', checked: false },
			{ value: 'fiction', label: 'Fiction', checked: false },
			{ value: 'nonfiction', label: 'Non Fiction', checked: false },
			{ value: 'mystery', label: 'Mystery', checked: false },
			{ value: 'horror', label: 'Horror', checked: false },
			{ value: 'adventure', label: 'Adventure', checked: false },
			{ value: 'thriller', label: 'Thriller', checked: false },
			{ value: 'biography', label: 'Biography', checked: false },
			{ value: 'history', label: 'History', checked: false },
		],
	},
	{
		id: '1',
		name: 'Authors',
		options: [
			{ value: 'Robi Sen', label: 'Robi Sen', checked: false },
			{ value: 'Charlie Collins', label: 'Charlie Collins', checked: false },
			{ value: 'Bernerd Allmon', label: 'Bernerd Allmon', checked: false },
			{ value: 'Jeremy Anderson', label: 'Jeremy Anderson', checked: false },
		],
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}
function Pagination() {
	const [currentPage, setCurrentPage] = useState(1);
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [sortBy, setSortBy] = useState('');

	const { selectedGenres, selectedAuthors } = useSelector(
		(state: RootState) => state.books,
	);

	const dispatch = useDispatch();

	const location = useLocation();
	const navigate = useNavigate();
	// const searchParams = new URLSearchParams(location.search);
	const [searchParams] = useSearchParams(location.search);

	const books = useSelector((state: RootState) => state.books.books);

	// Calculate the index range for the current page
	const indexOfLastItem = currentPage * 8;
	const indexOfFirstItem = indexOfLastItem - 8;

	const [currentItems, setCurrentItems] = useState<
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
			publishedDate: string;
		}[]
	>(books.slice(indexOfFirstItem, indexOfLastItem));

	const totalPages = Math.ceil(books.length / 8);

	let noOfPages: number[] = [];
	for (let i = 0; i < totalPages; i++) {
		noOfPages.push(i);
	}

	const handleCheckboxChange = (field: string, fieldValue: string) => {
		if (field === 'genre') {
			const updatedGenres = [...selectedGenres];
			const genreIndex = updatedGenres.indexOf(fieldValue);

			if (genreIndex !== -1) {
				// Genre is already selected, remove it
				updatedGenres.splice(genreIndex, 1);
			} else {
				// Genre is not selected, add it
				updatedGenres.push(fieldValue);
			}

			// Update URL with the new genre parameters
			searchParams.set(field, updatedGenres.join(`&${field}=`));
			console.log(searchParams.toString());
			const urlEncodedString = updatedGenres
				.map((str) => encodeURIComponent(str))
				.join(`&${field}=`);

			if (urlEncodedString.length > 0)
				navigate(`?${field}=${urlEncodedString}`, { replace: true });
			else navigate(`/books`, { replace: true });

			// Update state
			// setSelectedGenres(updatedGenres);
			dispatch(setSelectedGenres(updatedGenres));
		}

		if (field === 'authors') {
			const updatedAuthors = [...selectedAuthors];
			const genreIndex = updatedAuthors.indexOf(
				fieldValue.toLowerCase().replace(/\s/g, ''),
			);

			if (genreIndex !== -1) {
				// Genre is already selected, remove it
				updatedAuthors.splice(genreIndex, 1);
			} else {
				// Genre is not selected, add it
				updatedAuthors.push(fieldValue.toLowerCase().replace(/\s/g, ''));
			}

			// Update URL with the new genre parameters
			searchParams.set(field, updatedAuthors.join(`&${field}=`));
			const urlEncodedString = updatedAuthors
				.map((str) => encodeURIComponent(str))
				.join(`&${field}=`);

			if (urlEncodedString.length > 0)
				navigate(`?${field}=${urlEncodedString}`, { replace: true });
			else navigate(`/books`, { replace: true });

			// Update state
			// setSelectedGenres(updatedGenres);
			dispatch(setSelectedAuthors(updatedAuthors));
		}
	};
	const prevPageHandler = (currentPage: number) => {
		if (currentPage <= 1) return;
		setCurrentPage((currPage) => currPage - 1);
	};

	const nextPageHandler = (currentPage: number) => {
		if (currentPage >= totalPages) return;
		setCurrentPage((currPage) => currPage + 1);
	};

	const paginationHandler = (currentPage: number) => {
		setCurrentPage(currentPage);
	};

	const sortByHandler: MouseEventHandler<HTMLButtonElement> = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		// console.log(event.currentTarget.innerText);
		if (event.currentTarget.innerText === 'Newest')
			setCurrentItems(
				currentItems
					.slice()
					.sort(
						(a, b) => parseInt(a.publishedDate) - parseInt(b.publishedDate),
					),
			);
		if (event.currentTarget.innerText === 'Price: Low to High')
			setCurrentItems(currentItems.slice().sort((a, b) => a.price - b.price));

		if (event.currentTarget.innerText === 'Price: High to Low')
			setCurrentItems(currentItems.slice().sort((a, b) => b.price - a.price));
	};

	// Function to handle page change
	// pagination and sorting

	useEffect(() => {
		const fetchBooksPerPage = async () => {
			if (currentPage === 0) return;
			// console.log(loc);

			const data = await fetch(
				`${server}${location.pathname}${location.search}`,
			);

			const res = await data?.json();
			// console.log(res);
			setCurrentItems(res.data?.books);
			if (res.data.books <= 0) setCurrentItems(books);
		};
		fetchBooksPerPage();
	}, [currentPage, sortBy, location, books]);

	return (
		<div className='bg-white max-w-[80%] mx-auto'>
			<Navbar />
			<div>
				{/* Mobile filter dialog */}
				<main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4'>
						<h1 className='text-xl font-bold tracking-tight text-gray-900'>
							Filter By
						</h1>
						{/* <SearchBar /> */}
						<div className='flex items-center'>
							<Menu as='div' className='relative inline-block text-left'>
								<div>
									<Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
										Sort
										<ChevronDownIcon
											className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
											aria-hidden='true'
										/>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter='transition ease-out duration-100'
									enterFrom='transform opacity-0 scale-95'
									enterTo='transform opacity-100 scale-100'
									leave='transition ease-in duration-75'
									leaveFrom='transform opacity-100 scale-100'
									leaveTo='transform opacity-0 scale-95'>
									<Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
										<div className='py-1'>
											{sortOptions.map((option) => (
												<Menu.Item key={option.name}>
													{({ active }) => (
														<button
															className={classNames(
																option.current
																	? 'font-medium text-gray-900'
																	: 'text-gray-500',
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm',
															)}
															onClick={sortByHandler}>
															{option.name}
														</button>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
							<button
								type='button'
								className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
								onClick={() => setMobileFiltersOpen(true)}>
								<span className='sr-only'>Filters</span>
								<FunnelIcon className='h-5 w-5' aria-hidden='true' />
							</button>
						</div>
					</div>

					<section aria-labelledby='products-heading' className='pb-24 pt-6'>
						<h2 id='products-heading' className='sr-only'>
							Products
						</h2>

						<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
							{/* Filters */}
							<form className='hidden lg:block'>
								{/*<h3 className='sr-only'>Categories</h3>
								 <ul
									role='list'
									className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'>
									{subCategories.map((category) => (
										<li key={category.name}>
											<a href={category.href}>{category.name}</a>
										</li>
									))}
								</ul> */}

								{filters.map((section) => (
									<Disclosure
										as='div'
										key={section.id}
										className='border-b border-gray-200 py-6'>
										{({ open }) => (
											<>
												<h3 className='-my-3 flow-root'>
													<Disclosure.Button className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
														<span className='font-medium text-gray-900'>
															{section.name}
														</span>
														<span className='ml-6 flex items-center'>
															{open ? (
																<MinusIcon
																	className='h-5 w-5'
																	aria-hidden='true'
																/>
															) : (
																<PlusIcon
																	className='h-5 w-5'
																	aria-hidden='true'
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className='pt-6'>
													<div className='space-y-4'>
														{section.options.map((option, optionIdx) => (
															<div
																key={option.value}
																className='flex items-center'>
																<input
																	id={`filter-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	defaultValue={option.value}
																	type='checkbox'
																	defaultChecked={option.checked}
																	className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
																	onClick={() => {
																		// const selectedGenres = genres.map(
																		// 	(genre) => {
																		// 		if (option.value === genre.value) {
																		// 			genre.checked = !genre.checked;
																		// 		}
																		// 		return genre;
																		// 	},
																		// );
																		// setGenres(selectedGenres);

																		handleCheckboxChange(
																			section.name
																				.toLowerCase()
																				.replace(/\s/g, ''),
																			option.value,
																		);
																	}}
																/>
																<label
																	htmlFor={`filter-${section.id}-${optionIdx}`}
																	className='ml-3 text-sm text-gray-600'>
																	{option.label}
																</label>
															</div>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</form>

							{/* Product grid */}
							<div className='lg:col-span-3'>
								{/* Pagination controls */}
								<div className='flex flex-col items-center my-[2rem]'>
									<div className='grid grid-cols-4 gap-6 mx-auto'>
										{currentItems.map((book) => (
											<BookItem book={book} key={book._id} />
										))}
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
// {currentItems.length <= 8 && (
// 	<nav aria-label='Page navigation example'>
// 		<ul className='inline-flex -space-x-px text-sm gap-4'>
// 			{currentPage > 1 && (
// 				<button
// 					onClick={() => prevPageHandler(currentPage)}
// 					disabled={currentPage <= 1}>
// 					Prev
// 				</button>
// 			)}
// 			{Array.from(noOfPages, (book, i) => {
// 				return (
// 					<li key={i}>
// 						<button
// 							aria-current='page'
// 							className='flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
// 							onClick={() => paginationHandler(i + 1)}>
// 							<h1>{i + 1}</h1>
// 						</button>
// 					</li>
// 				);
// 			})}
// 			{currentPage < totalPages && (
// 				<button
// 					onClick={() => nextPageHandler(currentPage)}>
// 					Next
// 				</button>
// 			)}
// 		</ul>
// 	</nav>
// )}
export default Pagination;
