import React, { useState, useRef, useEffect } from 'react';
import { getNationalities } from '../../services/nationalityService'; // import the service
import './NationalitySelect.css';

function NationalitySelect({ onNationalityChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState(null);
  const nationalityRef = useRef(null);

  // Fetch nationalities on first render
  useEffect(() => {
    getNationalities()
      .then((data) => {
        setNationalities(data);
        const defaultNat = data.find(n => n.threeLetterCode === 'TUR') || data[0];
        setSelectedNationality(defaultNat);
        onNationalityChange?.(defaultNat); // Optional callback to parent
      })
      .catch(err => {
        console.error('Failed to load nationalities:', err);
      });
  }, []);

  // Handle clicks outside
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
    setSelectedNationality(nat);
    setDropdownOpen(false);
    onNationalityChange?.(nat); // Pass full nationality object to parent
  };

  return (
    <div
      className="nationality-box"
      onClick={() => setDropdownOpen(prev => !prev)}
      ref={nationalityRef}
      style={{ marginLeft: 8 }}
    >
      <span className="nationality-icon">🌍</span>
      <span className="nationality-text">
        {selectedNationality?.threeLetterCode || 'Select Nationality'}
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
                background: '#fff',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseOut={e => e.currentTarget.style.background = '#fff'}
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