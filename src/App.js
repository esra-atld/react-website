import logo from './logo.svg';
import './App.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import SearchBar from './search-page/SearchBar/SearchBar';
import PopularDestinations from './search-page/PopularDestinations/PopularDestinations';
import NationalitySelect from './search-page/SearchBar/NationalitySelect';
import CurrencySelect from './search-page/SearchBar/CurrencySelect';
import DetailPage from './detail-page/DetailPage';
import Header from './components/Header';

function formatRange(start, end) {
  if (!start || !end) return 'Check-in — Check-out';
  const aylar = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const gunler = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getDate()} ${aylar[s.getMonth()]}, ${gunler[s.getDay()]} - ${e.getDate()} ${aylar[e.getMonth()]}, ${gunler[e.getDay()]}`;
}

// Ana sayfa bileşeni
function HomePage() {
  const [currency, setCurrency] = useState('USD');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currencyRef = useRef(null);

  const [nationality, setNationality] = useState('TUR');
  const [nationalityDropdownOpen, setNationalityDropdownOpen] = useState(false);
  const nationalityRef = useRef(null);

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateBoxRef = useRef(null);

  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const guestRef = useRef(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
        setNationalityDropdownOpen(false);
      }
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

  useEffect(() => {
    if (children > childrenAges.length) {
      setChildrenAges([...childrenAges, null]);
    } else if (children < childrenAges.length) {
      setChildrenAges(childrenAges.slice(0, children));
    }
  }, [children, childrenAges.length]);

  const totalGuests = adults + children;
  const guestText = `${totalGuests} Misafir, ${rooms} Oda`;

  const updateChildAge = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  const handleSearch = () => {
    // Search butonuna basıldığında detay sayfasına yönlendir
    navigate('/detail');
  };

  return (
    <div className="App">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
          {`
          body {
              font-family: 'Inter', sans-serif;
          }
          `}
      </style>
      
      <Header />

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '40px' }}>
          <SearchBar onSearch={handleSearch} />
      </div>

      <div className="PD-container"> 
        <PopularDestinations />
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

// Ana App bileşeni
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
