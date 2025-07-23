import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomCard.css';
import { FaChevronRight } from 'react-icons/fa';
import RoomDetailPopup from './RoomDetailPopup';

// ÖRNEK KULLANIM (test için):
// <RoomCard
//   images={[
//     "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
//     "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
//   ]}
//   name="Deneme Oda"
//   details={["2 kişilik", "Deniz manzaralı"]}
//   price="5.000 TL"
//   priceInfo="Gecelik"
//   onReserve={() => alert("Rezervasyon!")}
//   // diğer gerekli prop'lar...
// />

const RoomCard = ({
  images,
  roomName,
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
  onReserve,
  facilities,
  matchedDetail
}) => {
  const imageList = images.length > 0 ? images : (image ? [image] : []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeArrow, setActiveArrow] = useState(null); // 'left' veya 'right'
  const [showRoomDetailPopup, setShowRoomDetailPopup] = useState(false);
  const navigate = useNavigate();

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };
  // SVG renkleri
  const defaultColor = "#0C4A69";
  const activeColor = "#8ECAE6";

  return (
    <div className="room-card">
      <div className="room-card-image-area">
        <img src={imageList[currentIndex]} alt={name} className="room-card-image" />
        <div className="room-card-image-arrows">
          <button
            className="room-card-arrow left"
            onClick={handlePrev}
            aria-label="Önceki görsel"
            onMouseDown={() => setActiveArrow('left')}
            onMouseUp={() => setActiveArrow(null)}
            onMouseLeave={() => setActiveArrow(null)}
          >
            <svg className={`arrow-icon${activeArrow === 'left' ? ' active' : ''}`} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="#fff" fillOpacity="0.7" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M22 12L15 18L22 24" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="room-card-arrow right"
            onClick={handleNext}
            aria-label="Sonraki görsel"
            onMouseDown={() => setActiveArrow('right')}
            onMouseUp={() => setActiveArrow(null)}
            onMouseLeave={() => setActiveArrow(null)}
          >
            <svg className={`arrow-icon${activeArrow === 'right' ? ' active' : ''}`} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="#fff" fillOpacity="0.7" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M14 12L21 18L14 24" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="room-card-image-count">
          <svg className="camera-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" style={{marginRight: 6, verticalAlign: 'middle'}} xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="10" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="7" y="3" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          <span>{imageList.length > 1 ? `${currentIndex + 1} / ${imageList.length}` : '1 / 1'}</span>
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
        <a className="about-section-link" href="#" onClick={e => { e.preventDefault(); setShowRoomDetailPopup(true); }}>
          Tüm detaylar <FaChevronRight style={{ verticalAlign: 'middle', marginLeft: 4 }} />
        </a>
      </div>
      <div className="room-card-price-section">
        {discount && <div className="roomcard-indirim-badgesi">%{discount} indirim</div>}
        <div>
          {oldPrice && <span className="roomcard-eski-fiyat">{oldPrice}</span>}
          <span className="roomcard-fiyat">{price}</span>
        </div>
        <div className="roomcard-fiyat-detay">{priceInfo}</div>
        <button
          className="roomcard-oda-sec-btn"
          onClick={() => {
            if (!matchedDetail || Object.keys(matchedDetail).length === 0) {
              console.warn('matchedDetail is not ready yet');
              return;
            }
          
            navigate('/payment', {
              state: {
                offerDetail: matchedDetail,
                features: facilities
              }
            });
          }}
        >
          {matchedDetail ? 'Rezervasyon yap' : 'Yükleniyor...'}
        </button>

      </div>
      <RoomDetailPopup 
        open={showRoomDetailPopup} 
        onClose={() => setShowRoomDetailPopup(false)} 
        images={images}
        roomDetails={matchedDetail} 
        facilities={facilities}
        />
    </div>
  );
};

export default RoomCard; 