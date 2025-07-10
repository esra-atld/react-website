import React, { useState, useRef, useEffect } from 'react';
import { FaFlag, FaMapMarkerAlt } from 'react-icons/fa';
import './LocationInput.css';

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

function getLocationIcon(type) {
  switch (type) {
    case 'hotel':
      return <img 
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdGVsLWljb24gbHVjaWRlLWhvdGVsIj48cGF0aCBkPSJNMTAgMjJ2LTYuNTciLz48cGF0aCBkPSJNMTIgMTFoLjAxIi8+PHBhdGggZD0iTTEyIDdoLjAxIi8+PHBhdGggZD0iTTE0IDE1LjQzVjIyIi8+PHBhdGggZD0iTTE1IDE2YTUgNSAwIDAgMC02IDAiLz48cGF0aCBkPSJNMTYgMTFoLjAxIi8+PHBhdGggZD0iTTE2IDdoLjAxIi8+PHBhdGggZD0iTTggMTFoLjAxIi8+PHBhdGggZD0iTTggN2guMDEiLz48cmVjdCB4PSI0IiB5PSIyIiB3aWR0aD0iMTYiIGhlaWdodD0iMjAiIHJ4PSIyIi8+PC9zdmc+" 
        alt="hotel" 
        style={{ width: '1.4rem', height: '1.4rem', filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(182deg) brightness(104%) contrast(97%)' }} 
      />;
    case 'city':
    case 'region':
    case 'country':
    default:
      return <FaMapMarkerAlt style={{ fontSize: '1.4rem' }} />;
  }
}

function LocationInput() {
  const [location, setLocation] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const locationRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length < 4) {
      setFilteredOptions([]);
      setDropdownOpen(false);
      return;
    }
    setLoading(true);
    setDropdownOpen(true);
    setTimeout(() => {
      const filtered = locationOptions.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase()) ||
        option.country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setLoading(false);
    }, 300);
  };

  const handleSelect = (selectedLocation) => {
    setLocation(selectedLocation.name);
    setDropdownOpen(false);
    setFilteredOptions([]);
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (location.length >= 4) {
        setDropdownOpen(true);
      }
    }
  };

  return (
    <div
      className="location-box"
      ref={locationRef}
      style={{ marginLeft: 8, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, padding: '10px 20px 10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'relative', minWidth: 200, userSelect: 'none', transition: 'box-shadow 0.2s' }}
      onClick={handleBoxClick}
    >
      <span style={{ background: '#F9FAFB', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#0E597E', marginRight: 10 }}>
        <FaFlag style={{ color: '#0E597E' }} />
      </span>
      <input
        type="text"
        className="location-input"
        placeholder="Nereye gitmek istersiniz?"
        value={location}
        onChange={handleChange}
        onFocus={() => {
          if (location.length >= 4) {
            setDropdownOpen(true);
          }
        }}
        ref={inputRef}
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
        onClick={e => e.stopPropagation()}
      />
      {dropdownOpen && (
        <div style={{ 
          position: 'absolute', 
          top: '110%', 
          left: 0, 
          zIndex: 120, 
          background: '#fff', 
          borderRadius: 12, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)', 
          padding: '8px 0', 
          minWidth: 280,
          border: '1px solid #E5E7EB',
          maxHeight: 300,
          overflowY: 'auto'
        }} onClick={e => e.stopPropagation()}>
          {loading ? (
            <div style={{ 
              padding: '16px', 
              textAlign: 'center', 
              color: '#6B7280', 
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem'
            }}>
              🔍 Arama yapılıyor...
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
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
  );
}

export default LocationInput; 