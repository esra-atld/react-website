import React, { useState, useRef, useEffect } from 'react';
import { getCurrencies } from '../../services/currencyService';
import './CurrencySelect.css';

function CurrencySelect() {
  const [selectedCurrency, setSelectedCurrency] = useState('TRY');
  const [currencies, setCurrencies] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currencyRef = useRef(null);

  useEffect(() => {
    getCurrencies()
      .then((data) => setCurrencies(data))
      .catch((error) => console.error('Failed to fetch currencies:', error));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCurrencySelect = (code) => {
    setSelectedCurrency(code);
    localStorage.setItem('currency', code); // save for later requests
    setDropdownOpen(false);
  };

  return (
    <div
      className="currency-box"
      onClick={() => setDropdownOpen(!dropdownOpen)}
      ref={currencyRef}
    >
      <span className="currency-icon">💲</span>
      <span className="currency-text">{selectedCurrency}</span>
      {dropdownOpen && (
        <div className="currency-dropdown">
          {currencies.map((cur) => (
            <div
              key={cur.code}
              className="currency-option"
              onClick={() => handleCurrencySelect(cur.code)}
            >
              {cur.code}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrencySelect;