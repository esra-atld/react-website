import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchButton.css';

function SearchButton() {
  return (
    <button className="search-btn" type="submit" aria-label="Otel ara">
      <FaSearch className="search-icon" />
      <span className="search-btn-text">Ara</span>
    </button>
  );
}

export default SearchButton; 