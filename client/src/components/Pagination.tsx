import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import BookItem from './BookItem';

type bookPropType = {
  books: {
    _id: string;
    title: string;
    author: string;
    description: string;
    image: string;
    isbn: string;
    price: number;
    rating: number;
    numReviews: number;
    coverPhoto: string;
  }[];
};

function Pagination({ books }: bookPropType) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(books.length / 8);
  return (
    <div>
      {/* Display current page items */}
      {/* <ul>
        {currentItems.map(
          (
            item: {
              _id: string;
              title: string;
              author: string;
              description: string;
              image: string;
              isbn: string;
              price: number;
              rating: number;
              numReviews: number;
            },
            index
          ) => (
            <li key={index}>{item.title}</li>
          )
        )}
      </ul> */}

      {/* Pagination controls */}
      <div className="flex flex-col items-center my-[2rem]">
        <div className="grid grid-cols-4 gap-6 max-w-[80%] mx-auto my-[5rem]">
          {/* Display page numbers */}

          {currentItems.map((book) => (
            <BookItem book={book} key={book._id} />
          ))}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
