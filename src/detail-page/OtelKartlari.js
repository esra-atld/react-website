import React from 'react';
import './OtelKartlari.css';
import HaritadaGoster from './HaritadaGoster';

function OtelKartlari({ hotel }) {
  const yildizSayisi = hotel.stars || 3; // örnek olarak 3 yıldız aktif
  return (
    <div className="otel-kartlari-box">
      <div className="otel-image-area">
        <img src={hotel.image} alt={hotel.name} className="otel-image" />
      </div>
      <div className="otel-main-content">
        <div className="otel-header">
          <span className="otel-isim">{hotel.name}</span>
          <span className="otel-adres">{hotel.address}</span>
          <HaritadaGoster />
          <div className="otel-ozellikler">
            {hotel.amenities.map((amenity, index) => (
              <span key={index} className="ozellik">
                <span className="ozellik-ikon">{amenity.icon}</span> {amenity.name}
              </span>
            ))}
          </div>
        </div>
        <div className="otel-yildiz-bolumu">
          {Array.from({ length: yildizSayisi }).map((_, i) => (
            <span key={i} className="otel-yildiz">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FB8500">
                <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <div className="otel-fiyat-bolumu">
        <span className="otel-fiyat">{hotel.price}</span>
        <span className="otel-fiyat-detay">{hotel.priceDetails}</span>
        <button className="oda-sec-btn">Oda Seç</button>
      </div>
    </div>
  );
}

export default OtelKartlari; 