import logo from './logo.svg';
import './App.css';
import { FaMapMarkerAlt, FaFlag, FaRegCalendarAlt, FaUser, FaSearch } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { tr } from 'date-fns/locale';
import SearchBar from './components/SearchBar/SearchBar';
import PopularDestinations from './components/PopularDestinations/PopularDestinations';

function formatRange(start, end) {
  if (!start || !end) return 'Check-in — Check-out';
  const aylar = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const gunler = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getDate()} ${aylar[s.getMonth()]}, ${gunler[s.getDay()]} - ${e.getDate()} ${aylar[e.getMonth()]}, ${gunler[e.getDay()]}`;
}

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
  const [locationLoading, setLocationLoading] = useState(false);
  const [filteredLocationOptions, setFilteredLocationOptions] = useState([]);
  const locationRef = useRef(null);
  
  // Sample location data with type indicators
  const locationOptions = [
    { name: 'İstanbul', type: 'city', country: 'Türkiye' },
    { name: 'Antalya', type: 'city', country: 'Türkiye' },
    { name: 'İzmir', type: 'city', country: 'Türkiye' },
    { name: 'Bodrum', type: 'city', country: 'Türkiye' },
    { name: 'Kapadokya', type: 'region', country: 'Türkiye' },
    { name: 'Türkiye', type: 'country', country: 'Türkiye' },
    { name: 'Berlin', type: 'city', country: 'Almanya' },
    { name: 'Münih', type: 'city', country: 'Almanya' },
    { name: 'Almanya', type: 'country', country: 'Almanya' },
    { name: 'New York', type: 'city', country: 'ABD' },
    { name: 'Los Angeles', type: 'city', country: 'ABD' },
    { name: 'ABD', type: 'country', country: 'ABD' },
    { name: 'Londra', type: 'city', country: 'İngiltere' },
    { name: 'İngiltere', type: 'country', country: 'İngiltere' },
    { name: 'Paris', type: 'city', country: 'Fransa' },
    { name: 'Fransa', type: 'country', country: 'Fransa' },
    { name: 'Hilton İstanbul Bosphorus', type: 'hotel', country: 'Türkiye' },
    { name: 'Rixos Premium Belek', type: 'hotel', country: 'Türkiye' },
    { name: 'Grand Hotel Europe', type: 'hotel', country: 'Almanya' },
    { name: 'The Plaza Hotel', type: 'hotel', country: 'ABD' },
  ];

  // Date range picker state
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateBoxRef = useRef(null);

  // Guest state
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const guestRef = useRef(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([]);

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

  // Çocuk sayısı değiştiğinde yaş array'ini güncelle
  useEffect(() => {
    if (children > childrenAges.length) {
      // Yeni çocuk eklendi, yaş array'ine boş değer ekle
      setChildrenAges([...childrenAges, null]);
    } else if (children < childrenAges.length) {
      // Çocuk azaltıldı, yaş array'inden son elemanı çıkar
      setChildrenAges(childrenAges.slice(0, children));
    }
  }, [children, childrenAges.length]);

  // Guest sayısını hesapla
  const totalGuests = adults + children;
  const guestText = `${totalGuests} Misafir, ${rooms} Oda`;

  // Çocuk yaşı güncelleme fonksiyonu
  const updateChildAge = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  // Location search fonksiyonu
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    
    if (value.length < 4) {
      setFilteredLocationOptions([]);
      setLocationDropdownOpen(false);
      return;
    }

    setLocationLoading(true);
    setLocationDropdownOpen(true);

    // Simulate API call delay
    setTimeout(() => {
      const filtered = locationOptions.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase()) ||
        option.country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocationOptions(filtered);
      setLocationLoading(false);
    }, 300);
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation.name);
    setLocationDropdownOpen(false);
    setFilteredLocationOptions([]);
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'hotel':
        return <img 
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdGVsLWljb24gbHVjaWRlLWhvdGVsIj48cGF0aCBkPSJNMTAgMjJ2LTYuNTciLz48cGF0aCBkPSJNMTIgMTFoLjAxIi8+PHBhdGggZD0iTTEyIDdoLjAxIi8+PHBhdGggZD0iTTE0IDE1LjQzVjIyIi8+PHBhdGggZD0iTTE1IDE2YTUgNSAwIDAgMC02IDAiLz48cGF0aCBkPSJNMTYgMTFoLjAxIi8+PHBhdGggZD0iTTE2IDdoLjAxIi8+PHBhdGggZD0iTTggMTFoLjAxIi8+PHBhdGggZD0iTTggN2guMDEiLz48cmVjdCB4PSI0IiB5PSIyIiB3aWR0aD0iMTYiIGhlaWdodD0iMjAiIHJ4PSIyIi8+PC9zdmc+" 
          alt="hotel" 
          style={{ 
            width: '1.4rem', 
            height: '1.4rem',
            filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(182deg) brightness(104%) contrast(97%)'
          }} 
        />;
      case 'city':
      case 'region':
      case 'country':
        return <FaMapMarkerAlt style={{ fontSize: '1.4rem' }} />;
      default:
        return <FaMapMarkerAlt style={{ fontSize: '1.4rem' }} />;
    }
  };

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
      <SearchBar />
      
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
