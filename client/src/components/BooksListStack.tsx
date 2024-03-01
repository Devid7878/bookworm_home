import React from 'react';
import FeaturedBooks from './FeaturedBooks';
import { Link } from 'react-router-dom';

function BooksListStack() {
  return (
    <div className="flex flex-col w-full">
      <div className="block">
        <div className="divider divider-start text-xl m-4 mt-[5rem]">
          Trending
        </div>
        <Link to="/books">View All</Link>
      </div>
      <FeaturedBooks />
      <div className="divider divider-start text-xl m-4 mt-[5rem]">
        Suggested Books
      </div>
      <FeaturedBooks />
      <div className="divider divider-start text-xl m-4 mt-[5rem]">
        Latest Collections
      </div>
      <FeaturedBooks />
    </div>
  );
}

export default BooksListStack;
