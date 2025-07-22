import React, { useState } from 'react';
import './RoomDetailPopup.css';
import { FaTimes } from 'react-icons/fa';

function RoomDetailPopup(
  {
    open,
    onClose,
    images = [],
    roomName,
    facilities,
    roomDetails
  }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeArrow, setActiveArrow] = useState(null); // 'left' veya 'right'
  if (!open) return null;
  
  const imageList = images.length > 0 ? images : [];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };


  return (
    <div className="roomdetail-popup-backdrop" onClick={onClose}>
      <div className="roomdetail-popup-modal large" onClick={e => e.stopPropagation()}>
        <div className="roomdetail-popup-header">
          <button className="roomdetail-popup-close" onClick={onClose} aria-label="Kapat">
            <span className="roomdetail-popup-close-icon"><FaTimes size={24} /></span>
          </button>
          <div className="roomdetail-popup-title-row">
            <span className="roomdetail-popup-title">{roomDetails.hotels[0].offers[0].rooms[0].roomName + " ("+roomDetails.hotels[0].offers[0].rooms[0].boardName+")"}</span>
          </div>
        </div>
        <div className="roomdetail-popup-scrollable">
          <div className="roomdetail-popup-image-area">
            {imageList.length > 0 && (
              <>
                <img src={imageList[currentIndex]} alt="Oda görseli" className="roomdetail-popup-image" />
                <div className="roomdetail-popup-image-arrows">
                  <button
                    className="roomdetail-popup-arrow left"
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
                    className="roomdetail-popup-arrow right"
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
                <div className="roomdetail-popup-image-count">
                  <span>{imageList.length > 1 ? `${currentIndex + 1} / ${imageList.length}` : '1 / 1'}</span>
                </div>
              </>
            )}
          </div>
          <div className="roomdetail-popup-content vertical">
            <div className="roomdetail-popup-roomname-heading">{roomName}</div>
            
            <div className="roomdetail-popup-blocks">
              {facilities.length === 0 ? <div>Veri yok</div> : facilities.slice(0,10).map((facility, i) => (
                <div className="roomdetail-popup-feature-block" key={facility.title || facility.name || i}>
                  <div className="roomdetail-popup-feature-title-row">
                    {facility.icon && <span className="roomdetail-popup-feature-icon">{facility.icon}</span>}
                    <span className="roomdetail-popup-feature-title">{facility.title || facility.name}</span>
                  </div>
                  {facility.desc && Array.isArray(facility.desc) ? (
                    <ul className="roomdetail-popup-feature-desc-list">
                      {facility.desc.map((line, idx) => <li key={idx}>{line}</li>)}
                    </ul>
                  ) : facility.desc ? (
                    <div className="roomdetail-popup-feature-desc">{facility.desc}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPopup; 