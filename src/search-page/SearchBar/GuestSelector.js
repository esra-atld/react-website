import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import './GuestSelector.css';
import { useBooking } from '../../BookingContext';

function GuestSelector() {
  const {
    selectedLocation, setSelectedLocation,
    selectedNationality, setSelectedNationality,
    range, setRange,
    adults, setAdults,
    childrens, setChildren,
    childrenAges, setChildrenAges,
    rooms, setRooms,
    currency, setCurrency,
    loading, setLoading, 
  } = useBooking();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const guestRef = useRef(null);
  
  const currentChildrenAges = childrenAges || [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Use currentChildrenAges here to safely access .length
    if (childrens > currentChildrenAges.length) {
      setChildrenAges([...currentChildrenAges, null]);
    } else if (childrens < currentChildrenAges.length) {
      setChildrenAges(currentChildrenAges.slice(0, childrens));
    }
  }, [childrens, currentChildrenAges.length, setChildrenAges]); //Add setChildrenAges to dependencies

  const totalGuests = adults + childrens;
  const guestText = `${totalGuests} Misafir, ${rooms} Oda`;

  const updateChildAge = (index, age) => {
    const newAges = [...currentChildrenAges]; 
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  return (
    <div
      className="guest-box"
      ref={guestRef}
      onClick={() => setDropdownOpen((open) => !open)}
    >
      <span className="guest-icon">
        <FaUser />
      </span>
      <span className="guest-text">
        {guestText}
      </span>
      {dropdownOpen && (
        <div style={{ 
          position: 'absolute', 
          top: '110%', 
          left: 0, 
          zIndex: 120, 
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
                className="guest-incdec-btn"
                aria-label="Yetişkin sayısını azalt"
                onClick={e => { e.stopPropagation(); setAdults(Math.max(1, adults - 1)); }}
                disabled={adults <= 1}
              >
                -
              </button>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1E232C', minWidth: '20px', textAlign: 'center' }}>
                {adults}
              </span>
              <button
                className="guest-incdec-btn"
                aria-label="Yetişkin sayısını artır"
                onClick={e => { e.stopPropagation(); setAdults(Math.min(10, adults + 1)); }}
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
                className="guest-incdec-btn"
                aria-label="Çocuk sayısını azalt"
                onClick={e => { e.stopPropagation(); setChildren(Math.max(0, childrens - 1)); }}
                disabled={childrens <= 0}
              >
                -
              </button>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1E232C', minWidth: '20px', textAlign: 'center' }}>
                {childrens}
              </span>
              <button
                className="guest-incdec-btn"
                aria-label="Çocuk sayısını artır"
                onClick={e => { e.stopPropagation(); setChildren(Math.min(6, childrens + 1)); }}
                disabled={childrens >= 6}
              >
                +
              </button>
            </div>
          </div>
          {/* Oda */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: childrens > 0 ? '20px' : 0 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#1E232C', marginBottom: '4px' }}>Oda</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.85rem', color: '#6B7280' }}>Oda sayısı</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <button
                className="guest-incdec-btn"
                aria-label="Oda sayısını azalt"
                onClick={e => { e.stopPropagation(); setRooms(Math.max(1, rooms - 1)); }}
                disabled={rooms <= 1}
              >
                -
              </button>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1E232C', minWidth: '20px', textAlign: 'center' }}>
                {rooms}
              </span>
              <button
                className="guest-incdec-btn"
                aria-label="Oda sayısını artır"
                onClick={e => { e.stopPropagation(); setRooms(Math.min(5, rooms + 1)); }}
                disabled={rooms >= 5}
              >
                +
              </button>
            </div>
          </div>
          {/* Çocuk Yaş Seçimi */}
          {childrens > 0 && (
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#1E232C', marginBottom: '16px' }}>
                Yaş (zorunlu)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {childrenAges.map((age, index) => (
                  <div key={index} className="guest-age-row">
                    <div className="guest-age-label">
                      Çocuk {index + 1}
                    </div>
                    <select
                      className={`guest-age-select${age === null ? ' invalid' : ''}`}
                      value={age === null ? '' : age}
                      onChange={e => updateChildAge(index, parseInt(e.target.value))}
                    >
                      {age === null && <option value="">Yaş seçin</option>}
                      {Array.from({ length: 13 }, (_, i) => (
                        <option key={i} value={i}>
                          {i} yaşında
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
  );
}

export default GuestSelector; 