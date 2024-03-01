import React from 'react';
import Navbar from '../components/Navbar';
import Ads from '../components/Ads';
import FeaturedBooks from '../components/FeaturedBooks';
import Footer from '../components/Footer';
import BooksListStack from '../components/BooksListStack';
import Form from '../components/Form';

function Homepage() {
  return (
    <div className=" max-w-[80%] mx-auto">
      <header>
        <Navbar />
      </header>
      <main>
        <Ads />
        <BooksListStack />
      </main>
      <Footer />
      {/* <Form /> */}
    </div>
  );
}

export default Homepage;
