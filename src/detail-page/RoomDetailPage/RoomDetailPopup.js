import React, { useState } from 'react';
import './RoomDetailPopup.css';
import { FaTimes } from 'react-icons/fa';

function RoomDetailPopup({ open, onClose, images = [], facilities = [] }) {
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
            <span className="roomdetail-popup-title">Oda Bilgileri</span>
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
            <div className="roomdetail-popup-roomname-heading">Deluxe King Oda</div>
            <div className="roomdetail-popup-amenities-section">
              <div className="roomdetail-popup-amenities-title">Room Amenities and Features</div>
              <div className="roomdetail-popup-amenities-list">
                {[
                  { heading: 'Bathroom', features: [
                    { icon: <span className="fa fa-bath" />, text: 'Bathrobes' },
                    { icon: <span className="fa fa-shower" />, text: 'Shower/tub combo' },
                    { icon: <span className="fa fa-towel" />, text: 'Towels' },
                    { icon: <span className="fa fa-door-closed" />, text: 'Private bathroom' },
                    { icon: <span className="fa fa-soap" />, text: 'Soap' },
                    { icon: <span className="fa fa-wind" />, text: 'Hair dryer' },
                  ]},
                  { heading: 'Comfort', features: [
                    { icon: <span className="fa fa-moon" />, text: 'Blackout curtains' },
                    { icon: <span className="fa fa-snowflake" />, text: 'Air conditioning' },
                    { icon: <span className="fa fa-feather-alt" />, text: 'Down comforter' },
                    { icon: <span className="fa fa-bed" />, text: 'Bed linen' },
                  ]},
                  { heading: 'Entertainment', features: [
                    { icon: <span className="fa fa-tv" />, text: '40-inch flat-screen TV with cable channels' },
                  ]},
                  { heading: 'Family Friendly', features: [
                    { icon: <span className="fa fa-baby" />, text: 'Free crib' },
                  ]},
                  { heading: 'Food and Drink', features: [
                    { icon: <span className="fa fa-ice-cream" />, text: 'Refrigerator' },
                    { icon: <span className="fa fa-bread-slice" />, text: 'Toaster' },
                  ]},
                  { heading: 'Kitchen', features: [
                    { icon: <span className="fa fa-utensils" />, text: 'Cookware/dishes/utensils' },
                    { icon: <span className="fa fa-chair" />, text: 'Dining area' },
                    { icon: <span className="fa fa-table" />, text: 'Dining table' },
                  ]},
                  { heading: 'Other', features: [
                    { icon: <span className="fa fa-check" />, text: 'Extra pillows' },
                    { icon: <span className="fa fa-check" />, text: 'Iron/ironing board (on request)' },
                  ]},
                ].map((group, idx) => (
                  <div className="roomdetail-popup-amenities-group" key={group.heading}>
                    <div className="roomdetail-popup-amenities-group-title">{group.heading}</div>
                    <ul className="roomdetail-popup-amenities-feature-list">
                      {group.features.map((feature, fidx) => (
                        <li className="roomdetail-popup-amenities-feature" key={fidx}>
                          <span className="roomdetail-popup-amenities-feature-icon">{feature.icon}</span>
                          <span className="roomdetail-popup-amenities-feature-text">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="roomdetail-popup-blocks">
              {facilities.length === 0 ? <div>Veri yok</div> : facilities.map((facility, i) => (
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