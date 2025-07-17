import React from 'react';
import './RoomCard.css';

const RoomCard = ({
  image,
  imagesCount,
  name,
  details,
  freeCancel,
  detailLink,
  discount,
  oldPrice,
  price,
  priceInfo,
  onReserve
}) => {
  return (
    <div className="room-card">
      <div className="room-card-image-area">
        <img src={image} alt={name} className="room-card-image" />
        <div className="room-card-image-arrows">
          <button className="room-card-arrow left">&#60;</button>
          <button className="room-card-arrow right">&#62;</button>
        </div>
        <div className="room-card-image-count">
          <span>&#128247; {imagesCount}</span>
        </div>
      </div>
      <div className="room-card-main-content">
        <div className="room-card-header">
          <span className="room-card-title">{name}</span>
        </div>
        <ul className="room-card-details">
          {details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
        {freeCancel && <div className="room-card-free-cancel">✔ Ücretsiz iptal</div>}
        <a className="room-card-detail-link" href={detailLink}>Tüm detaylar</a>
      </div>
      <div className="room-card-price-section">
        {discount && <div className="room-card-discount">%{discount} indirim</div>}
        <div className="room-card-old-price">{oldPrice && <s>{oldPrice}</s>}</div>
        <div className="room-card-price">{price}</div>
        <div className="room-card-price-info">{priceInfo}</div>
        <button className="room-card-reserve-btn" onClick={onReserve}>Rezervasyon yap</button>
      </div>
    </div>
  );
};

export default RoomCard; 