import React, { useState, useRef, useEffect } from 'react';
import './NationalitySelect.css';

function NationalitySelect() {
  const [nationality, setNationality] = useState('Turkey');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const nationalityRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="nationality-box"
      onClick={() => setDropdownOpen((open) => !open)}
      ref={nationalityRef}
      style={{ marginLeft: 8 }}
    >
      <span className="nationality-icon">🌍</span>
      <span className="nationality-text">{nationality}</span>
      {dropdownOpen && (
        <div className="nationality-dropdown">
          {['Turkey', 'USA', 'Germany', 'England'].map((nat) => (
            <div
              key={nat}
              onClick={() => { setNationality(nat); setDropdownOpen(false); }}
              style={{ padding: '10px 20px', cursor: 'pointer', color: '#1E232C', fontWeight: 500, background: '#fff', transition: 'background 0.15s' }}
              onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseOut={e => e.currentTarget.style.background = '#fff'}
            >
              {nat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NationalitySelect; 