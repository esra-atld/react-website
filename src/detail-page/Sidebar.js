import React from 'react';
import './Sidebar.css';
import LeafletMap from './LeafletMap';

function Sidebar({ style, hotels = [] }) {
  return (
    <div className="sidebar" style={style}>
      <div className="sidebar-content">
        {/* Harita Bölümü */}
        <div className="map-section">
          <h3>Harita</h3>
          <div className="map-container">
            <LeafletMap markers={hotels} />
          </div>
          <div className="map-info">
            <p>Antalya bölgesindeki oteller</p>
            <span className="hotel-count">'{hotels.length} otel bulundu'</span>
          </div>
        </div>

        <div className="filter-section">
          <h4>Fiyat Aralığı</h4>
          <div className="price-range">
            <input type="range" min="0" max="10000" className="price-slider" />
            <div className="price-labels">
              <span>0 TL</span>
              <span>10.000+ TL</span>
            </div>
          </div>
        </div>
        
        <div className="filter-section">
          <h4>Yıldız</h4>
          <div className="star-filters">
            <label><input type="checkbox" /> 5 Yıldız</label>
            <label><input type="checkbox" /> 4 Yıldız</label>
            <label><input type="checkbox" /> 3 Yıldız</label>
            <label><input type="checkbox" /> 2 Yıldız</label>
            <label><input type="checkbox" /> 1 Yıldız</label>
          </div>
        </div>
        
        <div className="filter-section">
          <h4>Özellikler</h4>
          <div className="amenity-filters">
            <label><input type="checkbox" /> WiFi</label>
            <label><input type="checkbox" /> Havuz</label>
            <label><input type="checkbox" /> Spor Salonu</label>
            <label><input type="checkbox" /> Restoran</label>
            <label><input type="checkbox" /> Bar</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 