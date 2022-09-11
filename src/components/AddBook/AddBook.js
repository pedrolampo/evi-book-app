import React, { useContext, useState } from 'react';
import { addDoc, collection, writeBatch } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { db } from '../../services/Firebase/firebase';
import { AddBookContext } from '../../context/AddBookContext';

import './addBook.css';

export default function AddBook() {
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  const {
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
  } = useContext(AddBookContext);

  const handleRating = (rating) => {
    switch (rating) {
      case '1':
        setRating('one');
        break;
      case '2':
        setRating('two');
        break;
      case '3':
        setRating('three');
        break;
      case '4':
        setRating('four');
        break;
      case '5':
        setRating('five');
        break;
      default:
        break;
    }
  };

  function handleDate(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace('MM', month.toString().padStart(2, '0'));

    //replace the year
    if (format.indexOf('yyyy') > -1) {
      format = format.replace('yyyy', year.toString());
    } else if (format.indexOf('yy') > -1) {
      format = format.replace('yy', year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace('dd', day.toString().padStart(2, '0'));

    return format;
  }

  const submitBook = (e) => {
    e.preventDefault();

    const batch = writeBatch(db);

    const book = {
      title: title,
      author: author,
      genre: genre,
      date: date,
      pages: pages,
      rating: rating,
    };

    if (
      !book.title ||
      !book.author ||
      !book.genre ||
      !book.date ||
      !book.pages ||
      !book.rating ||
      book.rating === 'none'
    ) {
      console.log('error: missing fields');
      return;
    }

    setProcessing(true);

    addDoc(collection(db, 'books'), book)
      .then(({ id }) => {
        batch.commit().then(() => console.log(id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProcessing(false);
        navigate('/');
      });
  };

  if (processing) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="add-book-screen">
      <form>
        <div className="form-section">
          <label htmlFor="bookTitle">Título:</label>
          <input
            autoComplete="off"
            placeholder="Mein Kampf"
            type="text"
            id="bookTitle"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-section">
          <label htmlFor="bookAuthor">Autor:</label>
          <input
            autoComplete="off"
            placeholder="Brando Sando"
            type="text"
            id="bookAuthor"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-section">
          <label htmlFor="bookGenre">Género:</label>
          <input
            autoComplete="off"
            placeholder="Sci-Fi"
            type="text"
            id="bookGenre"
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="form-section">
          <label htmlFor="bookDate">Fecha:</label>
          <input
            autoComplete="off"
            type="date"
            id="bookDate"
            onChange={(e) => setDate(handleDate(e.target.value, 'dd-MM-yyyy'))}
          />
        </div>
        <div className="form-section">
          <label htmlFor="bookPages">Páginas:</label>
          <input
            className="number-input"
            placeholder="1250"
            autoComplete="off"
            type="number"
            id="bookPages"
            onChange={(e) => setPages(parseInt(e.target.value))}
          />
        </div>
        <div className="form-section">
          <label htmlFor="bookPages">Puntaje:</label>
          <select onChange={(e) => handleRating(e.target.value)}>
            <option value="none" defaultValue>
              Elegir puntaje
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          className="submit-button"
          type="submit"
          onClick={(e) => submitBook(e)}
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
