import logo from './logo.svg';
import './App.css';
import { FaMapMarkerAlt, FaFlag, FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [currency, setCurrency] = useState('USD');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currencyRef = useRef(null);

  const [nationality, setNationality] = useState('Turkey');
  const [nationalityDropdownOpen, setNationalityDropdownOpen] = useState(false);
  const nationalityRef = useRef(null);

  // Location state
  const [location, setLocation] = useState('');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const locationRef = useRef(null);
  const locationOptions = [
    'Türkiye',
    'İstanbul',
    'Antalya',
    'Almanya',
    'ABD',
    'İngiltere',
    'Fransa',
  ];

  // Dropdown dışına tıklanınca kapansın
  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
        setNationalityDropdownOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
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
              <div onClick={() => { setCurrency('USD'); setDropdownOpen(false); }}
                style={{ padding: '10px 20px', cursor: 'pointer', color: '#1E232C', fontWeight: 500, background: '#fff', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >USD</div>
              <div onClick={() => { setCurrency('EUR'); setDropdownOpen(false); }}
                style={{ padding: '10px 20px', cursor: 'pointer', color: '#1E232C', fontWeight: 500, background: '#fff', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >EUR</div>
              <div onClick={() => { setCurrency('TRY'); setDropdownOpen(false); }}
                style={{ padding: '10px 20px', cursor: 'pointer', color: '#1E232C', fontWeight: 500, background: '#fff', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >TRY</div>
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
              <div onClick={() => { setNationality('Turkey'); setNationalityDropdownOpen(false); }}
                style={{ padding: '10px 20px', cursor: 'pointer', color: '#1E232C', fontWeight: 500, background: '#fff', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >Turkey</div>
              <div onClick={() => { setNationality('USA'); setNationalityDropdownOpen(false); }}
                style={{ padding: '10px 20px', cursor: 'pointer', color: '#1E232C', fontWeight: 500, background: '#fff', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >USA</div>
              <div onClick={() => { setNationality('Germany'); setNationalityDropdownOpen(false); }}
                style={{ padding: '10px 20px', cursor: 'pointer', color: '#1E232C', fontWeight: 500, background: '#fff', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >Germany</div>
            </div>
          )}
        </div>
        {/* Location Box with input */}
        <div
          className="location-box"
          style={{ marginLeft: 16, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, padding: '10px 20px 10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'relative', minWidth: 200, userSelect: 'none', transition: 'box-shadow 0.2s' }}
        >
          <span style={{ background: '#F9FAFB', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#87D246', marginRight: 10 }}>
            <FaFlag style={{ color: '#87D246' }} />
          </span>
          <input
            type="text"
            className="location-input"
            placeholder="Nereye gitmek istersiniz?"
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={{ border: 'none', outline: 'none', fontWeight: 600, color: '#1E232C', fontSize: '0.92rem', background: 'transparent', width: 200, transition: 'color 0.2s', fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        {/* Check-in — Check-out Box */}
        <div
          className="date-range-box"
          style={{ marginLeft: 16, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, padding: '10px 20px 10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', minWidth: 200, userSelect: 'none' }}
        >
          <span style={{ background: '#F9FAFB', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#0E597E', marginRight: 10 }}>
            <FaRegCalendarAlt style={{ color: '#0E597E' }} />
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.92rem', color: '#1E232C' }}>
            Check-in — Check-out
          </span>
        </div>
        {/* Guest Box */}
        <div className="guest-box"
          style={{ marginLeft: 16, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, padding: '10px 20px 10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', minWidth: 200, userSelect: 'none' }}
        >
          <span className="guest-icon"><FaUser /></span>
          <span className="guest-text">0 Misafir, 0 Oda</span>
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
