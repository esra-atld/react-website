import React from 'react';
import './ReservationInfoCard.css';

const ReservationInfoCard = ({ checkIn, checkOut, guestCount, roomType }) => (
  <div className="reservation-info-card">
    <h3 className="reservation-info-title">Rezervasyon Bilgileriniz</h3>
    <div className="reservation-info-list">
      <div className="reservation-info-item">
        <span className="reservation-info-label">Giriş Tarihi</span>
        <span>{checkIn.slice(0,10)}</span>
      </div>
      <div className="reservation-info-item">
        <span className="reservation-info-label">Çıkış Tarihi</span>
        <span>{checkOut.slice(0,10)}</span>
      </div>
      <div className="reservation-info-item">
        <span className="reservation-info-label">Kişi Sayısı</span>
        <span>{guestCount}</span>
      </div>
      <div className="reservation-info-item">
        <span className="reservation-info-label">Oda Tipi</span>
        <span>{roomType}</span>
      </div>
    </div>
  </div>
);

export default ReservationInfoCard; 