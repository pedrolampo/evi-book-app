import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AddBookContextProvider } from './context/AddBookContext';

import Header from './components/Header/Header';
import BookListContainer from './components/BookListContainer/BookListContainer';
import AddBook from './components/AddBook/AddBook';

import './App.css';

function App() {
  return (
    <div className="App">
      <AddBookContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<BookListContainer />} />
            <Route exact path="/add-book" element={<AddBook />} />
          </Routes>
        </BrowserRouter>
      </AddBookContextProvider>
    </div>
  );
}

export default App;
