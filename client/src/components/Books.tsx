import React, { useEffect, useState } from 'react';
import server from '../server';
import BookItem from './BookItem';
import Pagination from './Pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

function Books() {
  const [books, setBooks] = useState<any[]>([]);
  const [isBooksLoading, setIsBooksLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await fetch(`${server}/books`);
      const res = await data.json();
      console.log(res);
      setBooks(res.data.books);
    };
    setIsBooksLoading(true);
    fetchBooks();
    setIsBooksLoading(false);
  }, []);

  return (
    <div>
      <Pagination books={books} />
    </div>
  );
}

export default Books;
