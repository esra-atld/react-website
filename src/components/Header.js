import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NationalitySelect from '../search-page/SearchBar/NationalitySelect';
import CurrencySelect from '../search-page/SearchBar/CurrencySelect';
import './Header.css';
import HelpPopup from './HelpPopup';

function Header({
  selectedNationality, 
  onNationalityChange,
  selectedCurrency,
  onCurrencyChange,
  showSelectors = true
}) {
  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="top-header-bar">
      <div className="header-content" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <span className="travel-icon">
          <FaMapMarkerAlt />
        </span>
        <h1 className="site-name">Tripora</h1>
      </div>
      <div style={{ position: 'absolute', right: showSelectors ? '16px' : '50px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '20px', alignItems: 'center' }}>
        {showSelectors && (
          <>
            <CurrencySelect 
              selectedCurrency={selectedCurrency} 
              onCurrencyChange={onCurrencyChange}
            />
            <div style={{ width: '1.5px', height: '20px', backgroundColor: 'white' }}></div>
            <NationalitySelect
              onNationalityChange={onNationalityChange}
              selectedNationality={selectedNationality}
            />
            <div style={{ width: '1.5px', height: '20px', backgroundColor: 'white' }}></div>
          </>
        )}
        <div
          style={{ 
            fontWeight: '600', 
            fontSize: '1.5rem', 
            color: 'white', 
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={() => setHelpOpen(true)}
        >
          Yardım
        </div>
      </div>
      <HelpPopup open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}

export default Header; 