import React from 'react';
import './Header.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

function Header() {
  return (
    <div className="top-header-bar">
      <div className="header-content">
        <span className="travel-icon">
          <FaMapMarkerAlt />
        </span>
        <h1 className="site-name">Tripora</h1>
      </div>
    </div>
  );
}

export default Header; 