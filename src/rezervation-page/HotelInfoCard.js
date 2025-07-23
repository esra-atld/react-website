import React from 'react';
import './HotelInfoCard.css';
import { FaStar } from 'react-icons/fa';

const HotelInfoCard = ({ image, name, address, stars, features }) => {
  const firstRow = features.slice(0, 2);
  const secondRow = features.slice(2, 4);
  const displayedFeatures = features.slice(0, 4); // limit for layout

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
        {displayedFeatures.map((feature, i) => (
          <div className="roomdetail-popup-feature-block" key={feature.name || i}>
            <div className="roomdetail-popup-feature-title-row">
              {feature.icon && (
                <span className="roomdetail-popup-feature-icon">{feature.icon}</span>
              )}
              <span className="roomdetail-popup-feature-title">{feature.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelInfoCard; 