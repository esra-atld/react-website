import React from 'react';
import './OtelKartlari.css';
import HaritadaGoster from './HaritadaGoster';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

function OtelKartlari({ hotel, onShowMap }) {
  const navigate = useNavigate();
  const handleRoomSelect = () => {
    navigate(`/room/${hotel.id}`);
  };
  return (
    <div className="otel-kartlari-box">
      <div className="otel-image-area">
        <img src={hotel.image} alt={hotel.name} className="otel-image" />
      </div>
      <div className="otel-main-content">
        <div className="otel-header">
          <span className="otel-isim">{hotel.name}</span>
          <span className="otel-adres">{hotel.address}</span>
          <HaritadaGoster
            onShowMap={onShowMap} 
            hotel={hotel}
          />
          <div className="otel-ozellikler">
            {hotel.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity.name} className="ozellik">
                <span className="ozellik-ikon">{amenity.icon}</span> {amenity.name}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="ozellik ozellik-devam">
                +{hotel.amenities.length - 3} daha
              </span>
            )}
          </div>
        </div>
        <div className="otel-yildizlar">
          {[1,2,3,4,5].map((i) => (
            <FaStar key={i} color={i <= (hotel.stars || 3) ? '#FFB703' : '#e0e0e0'} size={18} style={{marginRight: 2}} />
          ))}
        </div>
      </div>
      <div className="otel-fiyat-bolumu">
        <div className="otel-indirim-rozet">
          %{hotel.discountPercent && hotel.discountPercent > 0 ? hotel.discountPercent : Math.floor(Math.random() * 26) + 5} indirim
        </div>
        {/* Rozetin hemen altına eski fiyat */}
        <span className="otel-eski-fiyat">
          {hotel.oldPrice > 0 ? hotel.oldPrice.toLocaleString() + ' TL' : '5.000 TL'}
        </span>
        <span className="otel-fiyat">{hotel.price}</span>
        <span className="otel-fiyat-detay">Vergi ve ücretler dahildir.</span>
        <button className="oda-sec-btn" onClick={handleRoomSelect}>Oda Seç</button>
      </div>
    </div>
  );
}

OtelKartlari.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    geoLocation: PropTypes.shape({
      latitude: PropTypes.string,
      longitude: PropTypes.string,
    }).isRequired,
    address: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    stars: PropTypes.number,
    price: PropTypes.string.isRequired,
    priceDetails: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.node.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default OtelKartlari; 