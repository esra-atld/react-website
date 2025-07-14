import React from 'react';
import './HaritadaGoster.css';

function HaritadaGoster() {
  const handleClick = (e) => {
    e.preventDefault();
    alert('Harita açılacak');
  };

  return (
    <a href="#" className="haritada-goster-link" onClick={handleClick}>
      Haritada Göster
    </a>
  );
}

export default HaritadaGoster; 