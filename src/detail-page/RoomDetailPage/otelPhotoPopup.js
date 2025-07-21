import React, { useEffect } from 'react';
import './otelPhotoPopup.css';
import { FaTimes, FaStar } from 'react-icons/fa';

function OtelPhotoPopup({ open, onClose, hotelName = '', starCount = 0, onSelectRoomClick, photos = [] }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="otel-photo-popup-backdrop" onClick={onClose}>
      <div className="otel-photo-popup-modal" onClick={e => e.stopPropagation()}>
        <div className="otel-photo-popup-header-row otel-photo-popup-header-center">
          <button className="otel-photo-popup-close" onClick={onClose} aria-label="Kapat">
            <span className="aboutotel-popup-close-icon"><FaTimes size={24} /></span>
          </button>
          <div className="otel-photo-popup-header-center-content">
            <span className="otel-photo-popup-hotel-name">{hotelName}</span>
            <span className="otel-photo-popup-stars">
              {[...Array(starCount)].map((_, i) => (
                <FaStar key={i} color="#FFB703" size={20} style={{marginRight: 2}} />
              ))}
            </span>
          </div>
          <button
            className="otel-photo-popup-select-room-btn"
            onClick={onSelectRoomClick}
            type="button"
          >
            Oda Seç
          </button>
        </div>
        <div className="photo-popup-gallery">
          <div className="photo-popup-gallery-grid">
            {photos.length > 0 ? (
              photos.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Otel Fotoğrafı ${i + 1}`}
                  className="photo-popup-gallery-img"
                />
              ))
            ) : (
              <p>Fotoğraf bulunamadı.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtelPhotoPopup; 