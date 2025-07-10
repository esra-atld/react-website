import React, { useState, useRef, useEffect } from 'react';
import { FaFlag, FaMapMarkerAlt, FaHotel } from 'react-icons/fa';
import './LocationInput.css';
import { getArrivalAutocomplete } from '../../services/autocompleteService';

const SearchSuggestionType = {
    CityOrDestination: 1,
    Hotel: 2,
};

function getLocationIcon(type) {
  switch (type) {
    case SearchSuggestionType.Hotel:
      return <FaHotel style={{
        fontSize: '1.4rem',
        color: '#0E597E' 
      }} />;
    case SearchSuggestionType.CityOrDestination:
    default:
      return <FaMapMarkerAlt style={{ fontSize: '1.4rem' }} />;
  }
}

function LocationInput() {
  const [location, setLocation] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [error, setError] = useState(null);
  const locationRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

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

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (value.trim().length < 4) {
      setFilteredOptions([]);
      setDropdownOpen(false);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setDropdownOpen(true);
    setError(null);

    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const data = await getArrivalAutocomplete({
          ProductType: 2,
          Query: value,
          Culture: "tr-TR",
        });
        setFilteredOptions(data);
      } catch (err) {
        console.error("Error fetching autocomplete:", err);
        setError("Arama sırasında bir hata oluştu.");
        setFilteredOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const handleSelect = (selectedOption) => {
    let selectedName = '';
    if (selectedOption.Type === SearchSuggestionType.CityOrDestination && selectedOption.City?.Name) {
        selectedName = selectedOption.City.Name;
    } else if (selectedOption.Type === SearchSuggestionType.Hotel && selectedOption.Hotel?.Name) {
        selectedName = selectedOption.Hotel.Name;
    }
    setLocation(selectedName);
    setDropdownOpen(false);
    setFilteredOptions([]);
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (location.trim().length >= 4 && !loading) {
        setDropdownOpen(true);
      }
    }
  };



  return (
    <div
      className="location-box"
      ref={locationRef}
      style={{ marginLeft: 8, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, padding: '10px 20px 10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'relative', minWidth: 200, userSelect: 'none', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
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
          if (location.trim().length >= 4 && !loading) {
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
      {loading && (
          <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          </div>
      )}

      {dropdownOpen && (loading || error || filteredOptions.length > 0 || location.trim().length >= 4) &&  (
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
          {error && (
              <div style={{
                padding: '16px',
                textAlign: 'center',
                color: '#EF4444',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem'
              }}>
                {error}
              </div>
          )}
          {/* Conditional rendering for suggestions */}
          {!loading && !error && filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              // DEBUG LOG: Log each option object right before rendering
              console.log("Rendering option:", option);
              return (
                <div
                  key={option.Id || option.id || index} // Use a unique ID from the API response if available, fallback to index
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
                    {/* Accessing option.type with lowercase 't' as per API response */}
                    {getLocationIcon(option.type)}
                  </span>
                  <div style={{ flex: 1 }}>
                    {/* Accessing option.type with lowercase 't' */}
                    {option.type === SearchSuggestionType.CityOrDestination && (
                      <>
                        {/* Accessing properties with lowercase first letter as per API response */}
                        <div style={{ fontWeight: 600, marginBottom: '2px' }}>
                          {option.city?.name}
                        </div>
                        {option.country?.name && (
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#6B7280',
                            fontWeight: 400
                          }}>
                            {option.country.name}
                          </div>
                        )}
                      </>
                    )}
                    {/* Accessing option.type with lowercase 't' */}
                    {option.type === SearchSuggestionType.Hotel && (
                      <>
                        {/* Accessing properties with lowercase first letter as per API response */}
                        <div style={{ fontWeight: 600, marginBottom: '2px' }}>
                          {option.hotel?.name || option.hotel?.internationalName}
                        </div>
                        {(option.city?.name || option.country?.name) && (
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#6B7280',
                            fontWeight: 400
                          }}>
                            {option.city?.name}{option.city?.name && option.country?.name ? ', ' : ''}{option.country?.name}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : !loading && !error && location.trim().length >= 4 ? (
            <div style={{
              padding: '16px',
              textAlign: 'center',
              color: '#6B7280',
              fontFamily: 'Inter',
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
