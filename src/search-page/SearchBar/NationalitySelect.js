import React, { useState, useRef, useEffect } from 'react';
import { getNationalities } from '../../services/nationalityService';
import './NationalitySelect.css';

function NationalitySelect({ onNationalityChange, selectedNationality }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nationalities, setNationalities] = useState([]);
  const nationalityRef = useRef(null);

  // Fetch nationalities on first render
  useEffect(() => {
    getNationalities()
      .then((data) => {
        setNationalities(data);
        // Only set default if no nationality is selected (e.g., first load)
        if (!selectedNationality) {
          const defaultNat = data.find(n => n.id === 'TR') || data[0];
          onNationalityChange?.(defaultNat);
        }
      })
      .catch(err => {
        console.error('Failed to load nationalities:', err);
      });
  }, []); // No dependency on selectedNationality to avoid loops

  // Close dropdown on clicks outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (nat) => {
    onNationalityChange?.(nat); // Update context directly
    setDropdownOpen(false);
  };

  return (
    <div
      className="nationality-box"
      onClick={() => setDropdownOpen(prev => !prev)}
      ref={nationalityRef}
      style={{ marginLeft: 8 }}
    >
      <span className="nationality-text">
        {selectedNationality?.threeLetterCode || 'TUR'}
      </span>

      {dropdownOpen && (
        <div className="nationality-dropdown">
          {nationalities.map((nat) => (
            <div
              key={nat.id}
              onClick={() => handleSelect(nat)}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                color: '#1E232C',
                fontWeight: 500,
                background: nat.id === selectedNationality?.id ? '#E5E7EB' : '#fff',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseOut={e => e.currentTarget.style.background = nat.id === selectedNationality?.id ? '#E5E7EB' : '#fff'}
            >
              {nat.threeLetterCode}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NationalitySelect;