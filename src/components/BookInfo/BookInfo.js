import React from 'react';

import './bookInfo.css';

export default function BookInfo({ items }) {
  return (
    <>
      <table className="books-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Pages</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {items.map((book) => (
            <tr key={book.title} className="book-row">
              <td className="book-date">{book.date}</td>
              <td className="book-title">{book.title}</td>
              <td className="book-author">{book.author}</td>
              <td className="book-genre">{book.genre}</td>
              <td className="book-pages">{book.pages}</td>
              <td className={`book-rating ${book.rating}`}>
                <div className="rating-dot"></div>
                <div className="rating-dot"></div>
                <div className="rating-dot"></div>
                <div className="rating-dot"></div>
                <div className="rating-dot"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
