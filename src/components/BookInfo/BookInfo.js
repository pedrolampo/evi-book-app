import React from 'react';

import './bookInfo.css';

export default function BookInfo({ items }) {
  return (
    <>
      {/* <div className="book-header">
        <div className="book-date">Date</div>
        <div className="book-title">Title</div>
        <div className="book-author">Author</div>
        <div className="book-genre">Genre</div>
        <div className="book-pages">Pages</div>
        <div className="book-rating">Rating</div>
      </div>
      {items.map((book) => (
        <div key={book.title} className="book-info">
          <div className="book-date">{book.date}</div>
          <div className="book-title">{book.title}</div>
          <div className="book-author">{book.author}</div>
          <div className="book-genre">{book.genre}</div>
          <div className="book-pages">{book.pages}</div>
          <div className={`book-rating ${book.rating}`}>
            <div className="rating-dot"></div>
            <div className="rating-dot"></div>
            <div className="rating-dot"></div>
            <div className="rating-dot"></div>
            <div className="rating-dot"></div>
          </div>
        </div>
      ))} */}

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
            <tr className="book-row">
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
