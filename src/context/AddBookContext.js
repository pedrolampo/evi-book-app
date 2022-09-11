import React, { useState } from 'react';

export const AddBookContext = React.createContext();

export function AddBookContextProvider({ children }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [pages, setPages] = useState('');
  const [rating, setRating] = useState('');

  const value = {
    title,
    genre,
    author,
    date,
    pages,
    rating,
    setTitle,
    setGenre,
    setAuthor,
    setDate,
    setPages,
    setRating,
  };

  return (
    <AddBookContext.Provider value={value}>{children}</AddBookContext.Provider>
  );
}
