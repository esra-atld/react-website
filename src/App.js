import logo from './logo.svg';
import './App.css';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Only FaMapMarkerAlt is used in this App.js for the header icon
import React, { useState, useRef, useEffect } from 'react';
// DateRange and related imports are expected to be handled within DateRangePickerComponent
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import { tr } from 'date-fns/locale';

// Corrected import paths based on your latest App.js provided
import SearchBar from './search-page/SearchBar/SearchBar';
import PopularDestinations from './search-page/PopularDestinations/PopularDestinations';
import NationalitySelect from './search-page/SearchBar/NationalitySelect';
import CurrencySelect from './search-page/SearchBar/CurrencySelect';

function formatRange(start, end) {
  if (!start || !end) return 'Check-in — Check-out';
  const aylar = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const gunler = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getDate()} ${aylar[s.getMonth()]}, ${gunler[s.getDay()]} - ${e.getDate()} ${aylar[e.getMonth()]}, ${gunler[e.getDay()]}`;
}

function App() {
  
  const [currency, setCurrency] = useState('USD'); // Example: if CurrencySelect is controlled here
  const [dropdownOpen, setDropdownOpen] = useState(false); // Corresponds to currency dropdown
  const currencyRef = useRef(null);

  const [nationality, setNationality] = useState('TUR'); // Example: if NationalitySelect is controlled here
  const [nationalityDropdownOpen, setNationalityDropdownOpen] = useState(false);
  const nationalityRef = useRef(null);

  const [range, setRange] = useState([ // Example: if DateRangePickerComponent is controlled here
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateBoxRef = useRef(null);

  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false); // Example: if GuestSelector is controlled here
  const guestRef = useRef(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
        setNationalityDropdownOpen(false);
      }
      // locationRef and setLocationDropdownOpen removed - handled by LocationInput
      if (dateBoxRef.current && !dateBoxRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setGuestDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Children age update logic (should ideally be inside GuestSelector)
  useEffect(() => {
    if (children > childrenAges.length) {
      setChildrenAges([...childrenAges, null]);
    } else if (children < childrenAges.length) {
      setChildrenAges(childrenAges.slice(0, children));
    }
  }, [children, childrenAges.length]);

  // Guest count calculation (should ideally be inside GuestSelector)
  const totalGuests = adults + children;
  const guestText = `${totalGuests} Misafir, ${rooms} Oda`;

  // Child age update function (should ideally be inside GuestSelector)
  const updateChildAge = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  return (
    <div className="App">
      {/* Load Tailwind CSS */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Set Inter font */}
      <style>
          {`
          body {
              font-family: 'Inter', sans-serif;
          }
          `}
      </style>
      {/* Top Header Bar */}
      <div className="top-header-bar">
        <div className="header-content">
          <span className="travel-icon">
            <FaMapMarkerAlt />
          </span>
          <h1 className="site-name">Tripora</h1>
        </div>
        <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <CurrencySelect />
          <div style={{ width: '1.5px', height: '20px', backgroundColor: 'white' }}></div>
          <NationalitySelect />
          <div style={{ width: '1.5px', height: '20px', backgroundColor: 'white' }}></div>
          <div style={{ 
            fontWeight: '600', 
            fontSize: '1.5rem', 
            color: 'white', 
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
            userSelect: 'none'
          }}>
            Yardım
          </div>
        </div>
      </div>

      {/* Search Bar Box */}
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '40px' }}>
          <SearchBar /> {/* Your SearchBar component is rendered here */}
      </div>

      {/* Popular Destinations */}
      <PopularDestinations />

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
