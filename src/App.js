import logo from './logo.svg';
import './App.css';
import { FaMapMarkerAlt, FaFlag, FaRegCalendarAlt, FaUser, FaSearch } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { tr } from 'date-fns/locale';

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
              <div onClick={() => { setCurrency('GBP'); setDropdownOpen(false); }}
                style={{ padding: '10px 20px', cursor: 'pointer', color: '#1E232C', fontWeight: 500, background: '#fff', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >GBP</div>
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
          style={{ marginLeft: 8 }}
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
              <div onClick={() => { setNationality('England'); setNationalityDropdownOpen(false); }}
                style={{ padding: '10px 20px', cursor: 'pointer', color: '#1E232C', fontWeight: 500, background: '#fff', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >England</div>
            </div>
          )}
        </div>
        {/* Location Box with input */}
        <div
          className="location-box"
          ref={locationRef}
          style={{ marginLeft: 8, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, padding: '10px 20px 10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'relative', minWidth: 200, userSelect: 'none', transition: 'box-shadow 0.2s' }}
        >
          <span style={{ background: '#F9FAFB', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#0E597E', marginRight: 10 }}>
            <FaFlag style={{ color: '#0E597E' }} />
          </span>
          <input
            type="text"
            className="location-input"
            placeholder="Nereye gitmek istersiniz?"
            value={location}
            onChange={handleLocationChange}
            onFocus={() => {
              if (location.length >= 4) {
                setLocationDropdownOpen(true);
              }
            }}
            style={{ 
              border: 'none', 
              outline: 'none', 
              fontWeight: 600, 
              color: '#1E232C', 
              fontSize: '0.92rem', 
              background: 'transparent', 
              width: 200, 
              transition: 'color 0.2s', 
              fontFamily: 'Inter, sans-serif' 
            }}
          />
          {locationDropdownOpen && (
            <div style={{ 
              position: 'absolute', 
              top: '110%', 
              left: 0, 
              zIndex: 100, 
              background: '#fff', 
              borderRadius: 12, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)', 
              padding: '8px 0', 
              minWidth: 280,
              border: '1px solid #E5E7EB',
              maxHeight: 300,
              overflowY: 'auto'
            }} onClick={e => e.stopPropagation()}>
              {locationLoading ? (
                                 <div style={{ 
                   padding: '16px', 
                   textAlign: 'center', 
                   color: '#6B7280', 
                   fontFamily: 'Inter, sans-serif',
                   fontSize: '0.85rem'
                 }}>
                   🔍 Arama yapılıyor...
                 </div>
               ) : filteredLocationOptions.length > 0 ? (
                 filteredLocationOptions.map((option, index) => (
                   <div
                     key={index}
                     onClick={() => handleLocationSelect(option)}
                     style={{ 
                       padding: '12px 16px', 
                       cursor: 'pointer', 
                       color: '#1E232C', 
                       fontWeight: 500, 
                       background: '#fff', 
                       transition: 'background 0.15s',
                       fontFamily: 'Inter, sans-serif',
                       fontSize: '0.9rem',
                       display: 'flex',
                       alignItems: 'center',
                       gap: '12px'
                     }}
                    onMouseOver={e => e.currentTarget.style.background = '#8ECAE6'}
                    onMouseOut={e => e.currentTarget.style.background = '#fff'}
                  >
                                         <span style={{ 
                       fontSize: '1.2rem', 
                       color: '#0E597E',
                       width: '20px',
                       textAlign: 'center'
                     }}>
                       {getLocationIcon(option.type)}
                     </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, marginBottom: '2px' }}>
                        {option.name}
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: '#6B7280',
                        fontWeight: 400
                      }}>
                        {option.country}
                      </div>
                    </div>
                  </div>
                ))
              ) : location.length >= 4 ? (
                                 <div style={{ 
                   padding: '16px', 
                   textAlign: 'center', 
                   color: '#6B7280', 
                   fontFamily: 'Inter, sans-serif',
                   fontSize: '0.85rem'
                 }}>
                   Sonuç bulunamadı
                 </div>
              ) : null}
            </div>
          )}
        </div>
        {/* Check-in — Check-out Box */}
        <div
          className="date-range-box"
          ref={dateBoxRef}
          style={{ marginLeft: 8, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, padding: '10px 20px 10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', minWidth: 220, userSelect: 'none', position: 'relative', cursor: 'pointer' }}
          onClick={() => setCalendarOpen(true)}
        >
          <span style={{ background: '#F9FAFB', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#0E597E', marginRight: 10 }}>
            <FaRegCalendarAlt style={{ color: '#0E597E' }} />
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#1E232C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
            {formatRange(range[0].startDate, range[0].endDate)}
          </span>
          {calendarOpen && (
            <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 100, maxWidth: 320 }} onClick={e => e.stopPropagation()}>
              <DateRange
                editableDateInputs={false}
                onChange={item => {
                  setRange([item.selection]);
                  if (item.selection.startDate && item.selection.endDate && item.selection.startDate !== item.selection.endDate) setTimeout(() => setCalendarOpen(false), 1000);
                }}
                moveRangeOnFirstSelection={false}
                ranges={range}
                locale={tr}
                months={1}
                direction="horizontal"
                showMonthAndYearPickers={false}
                rangeColors={["#219EBC", "#8ECAE6"]}
                weekdayDisplayFormat="EEEEEE"
                showDateDisplay={false}
                minDate={new Date()}
                staticRanges={[]}
                inputRanges={[]}
                dayContentRenderer={date => <span style={{fontFamily:'Inter,sans-serif',fontSize:'1rem'}}>{date.getDate()}</span>}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', background: '#fff', padding: '8px 8px', maxWidth: 320 }}
              />
            </div>
          )}
        </div>
        {/* Guest Box */}
        <div
          className="guest-box"
          ref={guestRef}
          onClick={() => setGuestDropdownOpen((open) => !open)}
          style={{ marginLeft: 8, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, padding: '10px 20px 10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', minWidth: 180, userSelect: 'none', position: 'relative', cursor: 'pointer' }}
        >
          <span style={{ background: '#F9FAFB', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#0E597E', marginRight: 10 }}>
            <FaUser style={{ color: '#0E597E' }} />
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#1E232C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>
            {guestText}
          </span>
          {guestDropdownOpen && (
            <div style={{ 
              position: 'absolute', 
              top: '110%', 
              left: 0, 
              zIndex: 100, 
              background: '#fff', 
              borderRadius: 16, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)', 
              padding: '20px', 
              minWidth: 280,
              border: '1px solid #E5E7EB'
            }} onClick={e => e.stopPropagation()}>
              {/* Yetişkin */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#1E232C', marginBottom: '4px' }}>Yetişkin</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.85rem', color: '#6B7280' }}>13 yaş ve üzeri</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '1px solid #D1D5DB',
                      background: adults <= 1 ? '#F3F4F6' : '#fff',
                      cursor: adults <= 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: adults <= 1 ? '#9CA3AF' : '#1E232C',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (adults > 1) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (adults > 1) {
                        e.target.style.background = '#fff';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseDown={(e) => {
                      if (adults > 1) {
                        e.target.style.background = '#6BB5D1';
                        e.target.style.color = '#fff';
                      }
                    }}
                    onMouseUp={(e) => {
                      if (adults > 1) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    disabled={adults <= 1}
                  >
                    -
                  </button>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1E232C', minWidth: '20px', textAlign: 'center' }}>
                    {adults}
                  </span>
                  <button
                    onClick={() => setAdults(Math.min(10, adults + 1))}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '1px solid #D1D5DB',
                      background: adults >= 10 ? '#F3F4F6' : '#fff',
                      cursor: adults >= 10 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: adults >= 10 ? '#9CA3AF' : '#1E232C',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (adults < 10) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (adults < 10) {
                        e.target.style.background = '#fff';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseDown={(e) => {
                      if (adults < 10) {
                        e.target.style.background = '#6BB5D1';
                        e.target.style.color = '#fff';
                      }
                    }}
                    onMouseUp={(e) => {
                      if (adults < 10) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    disabled={adults >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Çocuk */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#1E232C', marginBottom: '4px' }}>Çocuk</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.85rem', color: '#6B7280' }}>0-12 yaş</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '1px solid #D1D5DB',
                      background: children <= 0 ? '#F3F4F6' : '#fff',
                      cursor: children <= 0 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: children <= 0 ? '#9CA3AF' : '#1E232C',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (children > 0) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (children > 0) {
                        e.target.style.background = '#fff';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseDown={(e) => {
                      if (children > 0) {
                        e.target.style.background = '#6BB5D1';
                        e.target.style.color = '#fff';
                      }
                    }}
                    onMouseUp={(e) => {
                      if (children > 0) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    disabled={children <= 0}
                  >
                    -
                  </button>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1E232C', minWidth: '20px', textAlign: 'center' }}>
                    {children}
                  </span>
                  <button
                    onClick={() => setChildren(Math.min(6, children + 1))}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '1px solid #D1D5DB',
                      background: children >= 6 ? '#F3F4F6' : '#fff',
                      cursor: children >= 6 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: children >= 6 ? '#9CA3AF' : '#1E232C',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (children < 6) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (children < 6) {
                        e.target.style.background = '#fff';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseDown={(e) => {
                      if (children < 6) {
                        e.target.style.background = '#6BB5D1';
                        e.target.style.color = '#fff';
                      }
                    }}
                    onMouseUp={(e) => {
                      if (children < 6) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    disabled={children >= 6}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Oda */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: children > 0 ? '20px' : 0 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#1E232C', marginBottom: '4px' }}>Oda</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.85rem', color: '#6B7280' }}>Oda sayısı</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '1px solid #D1D5DB',
                      background: rooms <= 1 ? '#F3F4F6' : '#fff',
                      cursor: rooms <= 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: rooms <= 1 ? '#9CA3AF' : '#1E232C',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (rooms > 1) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (rooms > 1) {
                        e.target.style.background = '#fff';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseDown={(e) => {
                      if (rooms > 1) {
                        e.target.style.background = '#6BB5D1';
                        e.target.style.color = '#fff';
                      }
                    }}
                    onMouseUp={(e) => {
                      if (rooms > 1) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    disabled={rooms <= 1}
                  >
                    -
                  </button>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1E232C', minWidth: '20px', textAlign: 'center' }}>
                    {rooms}
                  </span>
                  <button
                    onClick={() => setRooms(Math.min(5, rooms + 1))}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '1px solid #D1D5DB',
                      background: rooms >= 5 ? '#F3F4F6' : '#fff',
                      cursor: rooms >= 5 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: rooms >= 5 ? '#9CA3AF' : '#1E232C',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (rooms < 5) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (rooms < 5) {
                        e.target.style.background = '#fff';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    onMouseDown={(e) => {
                      if (rooms < 5) {
                        e.target.style.background = '#6BB5D1';
                        e.target.style.color = '#fff';
                      }
                    }}
                    onMouseUp={(e) => {
                      if (rooms < 5) {
                        e.target.style.background = '#8ECAE6';
                        e.target.style.color = '#1E232C';
                      }
                    }}
                    disabled={rooms >= 5}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Çocuk Yaş Seçimi */}
              {children > 0 && (
                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#1E232C', marginBottom: '16px' }}>
                    Yaş (zorunlu)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {childrenAges.map((age, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          fontFamily: 'Inter, sans-serif', 
                          fontWeight: 500, 
                          fontSize: '0.9rem', 
                          color: '#6B7280',
                          minWidth: '60px'
                        }}>
                          Çocuk {index + 1}
                        </div>
                        <select
                          value={age || ''}
                          onChange={(e) => updateChildAge(index, parseInt(e.target.value))}
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: age === null ? '2px solid #FF6B6B' : '1px solid #D1D5DB',
                            background: '#fff',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.9rem',
                            color: '#1E232C',
                            fontWeight: 500,
                            cursor: 'pointer',
                            outline: 'none',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => {
                            // Hover efekti için CSS ekle
                            const style = document.createElement('style');
                            style.id = 'age-select-hover';
                            style.textContent = `
                              select option:hover {
                                background-color: #8ECAE6 !important;
                                color: #1E232C !important;
                              }
                            `;
                            if (!document.getElementById('age-select-hover')) {
                              document.head.appendChild(style);
                            }
                          }}
                        >
                          <option value="">Yaş seçin</option>
                          {Array.from({ length: 18 }, (_, i) => (
                            <option key={i} value={i}>
                              {i} yaş
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Search Button */}
        <button
          className="search-btn"
          style={{
            marginLeft: 16,
            display: 'flex',
            alignItems: 'center',
            background: '#8ECAE6',
            borderRadius: 16,
            padding: '14px 20px',
            minWidth: 110,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: 'none',
            cursor: 'pointer',
            height: '56px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.18rem',
            color: '#fff',
            transition: 'background 0.2s',
            userSelect: 'none',
          }}
        >
          <FaSearch style={{ color: '#fff', fontSize: '1.4rem', marginRight: 13 }} />
          <span style={{ color: '#fff', fontWeight: 700, fontFamily: 'Inter, sans-serif', fontSize: '1.18rem' }}>Ara</span>
        </button>
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
