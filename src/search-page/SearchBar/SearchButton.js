import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchButton.css';

function SearchButton({ onClick }) {
  return (
    <button 
      className="search-btn" 
      type="button" 
      aria-label="Otel ara"
      onClick={onClick}
    >
      <FaSearch className="search-icon" />
      <span className="search-btn-text">Ara</span>
    </button>
  );
}

export default SearchButton; 