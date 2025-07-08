import logo from './logo.svg';
import './App.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [currency, setCurrency] = useState('USD');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currencyRef = useRef(null);

  const [nationality, setNationality] = useState('Turkey');
  const [nationalityDropdownOpen, setNationalityDropdownOpen] = useState(false);
  const nationalityRef = useRef(null);

  // Dropdown dışına tıklanınca kapansın
  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
        setNationalityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      {/* Top Header Bar */}
      <div className="top-header-bar">
        <div className="header-content">
          <span className="travel-icon">
            <FaMapMarkerAlt />
          </span>
          <h1 className="site-name">Tripora</h1>
        </div>
      </div>

      {/* Search Bar Box */}
      <div className="search-bar-box">
        <div
          className="currency-box"
          onClick={() => setDropdownOpen((open) => !open)}
          ref={currencyRef}
        >
          <span className="currency-icon">💲</span>
          <span className="currency-text">{currency}</span>
          {dropdownOpen && (
            <div className="currency-dropdown">
              <div onClick={() => { setCurrency('USD'); setDropdownOpen(false); }}>USD</div>
              <div onClick={() => { setCurrency('EUR'); setDropdownOpen(false); }}>EUR</div>
              <div onClick={() => { setCurrency('TRY'); setDropdownOpen(false); }}>TRY</div>
            </div>
          )}
        </div>
        {/* Nationality Box */}
        <div
          className="nationality-box"
          onClick={() => setNationalityDropdownOpen((open) => !open)}
          ref={nationalityRef}
        >
          <span className="nationality-icon">🌍</span>
          <span className="nationality-text">{nationality}</span>
          {nationalityDropdownOpen && (
            <div className="nationality-dropdown">
              <div onClick={() => { setNationality('Turkey'); setNationalityDropdownOpen(false); }}>Turkey</div>
              <div onClick={() => { setNationality('USA'); setNationalityDropdownOpen(false); }}>USA</div>
              <div onClick={() => { setNationality('Germany'); setNationalityDropdownOpen(false); }}>Germany</div>
            </div>
          )}
        </div>
      </div>
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
