import React, { useState, useRef, useEffect } from 'react';
import './CurrencySelect.css';

function CurrencySelect() {
  const [currency, setCurrency] = useState('USD');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currencyRef = useRef(null);

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

  return (
    <div
      className="currency-box"
      onClick={() => setDropdownOpen((open) => !open)}
      ref={currencyRef}
    >
      <span className="currency-icon">💲</span>
      <span className="currency-text">{currency}</span>
      {dropdownOpen && (
        <div className="currency-dropdown">
          {['USD', 'EUR', 'GBP', 'TRY'].map((cur) => (
            <div
              key={cur}
              className="currency-option"
              onClick={() => { setCurrency(cur); setDropdownOpen(false); }}
            >
              {cur}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrencySelect; 