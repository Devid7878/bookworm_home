import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

type bookPropTypes = {
  book: {
    _id: string;
    title: string;
    coverPhoto: string;
  };
};

function BookItem({ book }: bookPropTypes) {
  return (
    <div className="w-full h-full grid justify-center">
      <Link to={`${book?._id}`}>
        <img
          src={book?.coverPhoto}
          alt={book?.title}
          className="cursor-pointer lg:w-[15vw] object-cover border border-black"
        />
      </Link>
    </div>
  );
}

export default BookItem;
