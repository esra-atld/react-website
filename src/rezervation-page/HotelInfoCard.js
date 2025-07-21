import React from 'react';
import './HotelInfoCard.css';
import { FaStar } from 'react-icons/fa';

const HotelInfoCard = ({ image, name, address, stars, features }) => {
  const firstRow = features.slice(0, 2);
  const secondRow = features.slice(2, 4);
  return (
    <div className="hotel-info-card">
      <img src={image} alt="Otel" className="hotel-info-image" />
      <h3 className="hotel-info-name">{name}</h3>
      <div className="hotel-info-address">{address}</div>
      <div className="hotel-info-stars">
        {[1,2,3,4,5].map((i) => (
          <FaStar key={i} color={i <= (stars || 3) ? '#FFB703' : '#e0e0e0'} size={22} style={{marginRight: 2}} />
        ))}
      </div>
      <div className="hotel-info-features-grid">
        <div className="hotel-info-features-row">
          {firstRow.map((f, i) => (
            <span className="hotel-info-feature" key={i}>• {f}</span>
          ))}
        </div>
        <div className="hotel-info-features-row">
          {secondRow.map((f, i) => (
            <span className="hotel-info-feature" key={i}>• {f}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelInfoCard; 