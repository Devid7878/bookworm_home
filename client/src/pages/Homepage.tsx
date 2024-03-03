import React from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import FeaturedBooks from '../components/FeaturedBooks';
import Footer from '../components/Footer';
import BooksListStack from '../components/BooksListStack';
import Form from '../components/Form';
import Genres from '../components/Genres';

function Homepage() {
	return (
		<div className=' max-w-[80%] mx-auto'>
			<header>
				<Navbar />
			</header>
			<main>
				<Main />
				<Genres />
				<BooksListStack />
			</main>
			<Footer />
			{/* <Form /> */}
		</div>
	);
}

export default Homepage;
