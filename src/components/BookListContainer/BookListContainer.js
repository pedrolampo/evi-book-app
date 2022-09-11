import React, { useEffect, useState } from 'react';
import { getBooks } from '../../services/Firebase/firebase';

import BookInfo from '../BookInfo/BookInfo';

import './bookListContainer.css';

export default function BookListContainer() {
  const [books, setBooks] = useState([]);
  const genreId = '';

  useEffect(() => {
    getBooks('genre', '==', genreId)
      .then((books) => {
        setBooks(books);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="book-list-container">
      <h3>Libros Leídos</h3>

      <div className="book-list">
        <BookInfo items={books} />
      </div>
    </div>
  );
}
