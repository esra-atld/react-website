import React, { useState, useRef, useEffect } from 'react';
import { getCurrencies } from '../../services/currencyService';
import './CurrencySelect.css';

const currencySymbols = {
  AED: 'د.إ',
  AMD: '֏',
  BAM: 'KM',
  BHD: 'ب.د',
  CHF: 'CHF',
  CZK: 'Kč',
  DKK: 'kr',
  EGP: '£',
  EUR: '€',
  EUR1: '€',
  FJD: 'FJ$',
  GBP: '£',
  HUF: 'Ft',
  INR: '₹',
  IQD: 'ع.د',
  JOD: 'د.ا',
  JPY: '¥',
  KWD: 'د.ك',
  KZT: '₸',
  MAD: 'د.م.',
  MDL: 'L',
  MKD: 'ден',
  MXN: '$',
  PKR: '₨',
  RON: 'lei',
  RSD: 'дин',
  RUB: '₽',
  SHTR: '¤',
  THB: '฿',
  TND: 'د.ت',
  TRY: '₺',
  UAH: '₴',
  USD: '$',
  YER: '﷼',
  ZAR: 'R'
};

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
      <span className="currency-text-wrapper">
  <span className="currency-symbol-circle">
    {currencySymbols[selectedCurrency?.code] || currencySymbols["EUR"]}
  </span>
  <span className="currency-text">
    {selectedCurrency?.code || 'EUR'}
  </span>
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
            <span className="currency-symbol-circle">
              {currencySymbols[currency.code] || ''}
            </span>
            <span>{currency.code}</span>
            </div>
          ))}


        </div>
      )}
    </div>
  );
}

export default CurrencySelect;