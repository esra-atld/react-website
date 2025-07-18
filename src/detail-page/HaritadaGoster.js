import React from 'react';
import './HaritadaGoster.css';

function HaritadaGoster({ onShowMap, hotel}) {
  
  
  const handleClick = (e) => {
    e.preventDefault();
    if (onShowMap && hotel) {
      onShowMap(hotel);
    }
  };

  return (
    <a href="#" className="haritada-goster-link" onClick={handleClick}>
      Haritada Göster
    </a>
  );
}

export default HaritadaGoster; 