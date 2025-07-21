import React, { useState, useRef, useEffect } from 'react';
import { getCurrencies } from '../../services/currencyService';
import './CurrencySelect.css';

function CurrencySelect({ onCurrencyChange, selectedCurrency }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const currencyRef = useRef(null);

  // Fetch currencies on first render
  useEffect(() => {
    getCurrencies()
      .then((data) => {
        setCurrencies(data);
        // Only set default if no currency is selected (e.g., first load)
        if (!selectedCurrency) {
          const defaultCur = data.find(c => c.code === 'EUR') || data[0];
          onCurrencyChange?.(defaultCur);
        }
      })
      .catch(err => {
        console.error('Failed to load currencies:', err);
      });
  }, []); // No dependency on selectedCurrency to avoid loops

  // Close dropdown on clicks outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (currency) => {
    onCurrencyChange?.(currency); // Update via callback
    setDropdownOpen(false);
  };

  return (
    <div
      className="currency-box"
      onClick={() => setDropdownOpen(prev => !prev)}
      ref={currencyRef}
      style={{ marginLeft: 8, position: 'relative' }}
    >
      <span className="currency-text">
        {selectedCurrency?.code || 'EUR'}
      </span>

      {dropdownOpen && (
        <div className="currency-dropdown">
          {currencies.map((currency) => (
            <div
              key={currency.code}
              onClick={() => handleSelect(currency)}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                color: '#1E232C',
                fontWeight: 500,
                background: currency.code === selectedCurrency?.code ? '#E5E7EB' : '#fff',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseOut={e => e.currentTarget.style.background = currency.code === selectedCurrency?.code ? '#E5E7EB' : '#fff'}
            >
              {currency.code}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrencySelect;