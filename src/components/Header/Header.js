import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './header.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/">
        <h1>Book App</h1>
      </Link>

      {location.pathname !== '/add-book' && (
        <Link to="/add-book">
          <button>New Book</button>
        </Link>
      )}
    </header>
  );
}
