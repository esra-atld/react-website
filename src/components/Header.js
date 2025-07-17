import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NationalitySelect from '../search-page/SearchBar/NationalitySelect';
import CurrencySelect from '../search-page/SearchBar/CurrencySelect';
import './Header.css';

function Header({
  selectedNationality, 
  onNationalityChange,
  selectedCurrency,
  onCurrencyChange
}) {
  const navigate = useNavigate();

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
      <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '20px', alignItems: 'center' }}>
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
        <div style={{ 
          fontWeight: '600', 
          fontSize: '1.5rem', 
          color: 'white', 
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          userSelect: 'none'
        }}>
          Yardım
        </div>
      </div>
    </div>
  );
}

export default Header; 