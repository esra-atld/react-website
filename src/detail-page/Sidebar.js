import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import LeafletMap from './LeafletMap';

function Sidebar({
  hotels,
  filteredHotels,
  priceRange,
  setPriceRange,
  selectedStars,
  setSelectedStars,
  selectedAmenities,
  setSelectedAmenities,
  style
  }) {


  // Handle star rating checkboxes
  const handleStarChange = (star) => {
    setSelectedStars(prev =>
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    );
  };

  // Handle amenity checkboxes
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  // Handle price slider
  const handlePriceChange = (e) => {
    setPriceRange([0, Number(e.target.value)]);
  };



  return (
    <div className="sidebar" style={style}>
      <div className="sidebar-content">
        {/* Harita Bölümü */}
        <div className="detail-map-section">
          <h3>Harita</h3>
          <div className="detail-map-container">
            <LeafletMap markers={filteredHotels} />
          </div>
          <div className="map-info">
            <p>Antalya bölgesindeki oteller</p>
            <span className="hotel-count">'{filteredHotels.length} otel bulundu'</span>
          </div>
        </div>

        <div className="filter-section">
          <h4>Fiyat Aralığı</h4>
          <div className="price-range">
            <input 
              type="range" 
              min="0" 
              max="10000" 
              className="price-slider" 
            />
            <div className="price-labels">
              <span>0 TL</span>
              <span>{priceRange[1].toLocaleString()} TL</span>
            </div>
          </div>
        </div>
        
        <div className="filter-section">
          <h4>Yıldız</h4>
          <div className="star-filters">
            {[5, 4, 3, 2, 1].map(star => (
              <label key={star}>
                <input
                  type="checkbox"
                  checked={selectedStars.includes(star)}
                  onChange={() => handleStarChange(star)}
                /> {star} Yıldız
              </label>
            ))}
          </div>
        </div>
        
        <div className="filter-section">
          <h4>Özellikler</h4>
          <div className="amenity-filters">
            {["WiFi", "Havuz", "Spor Salonu", "Restoran", "Bar"].map(amenity => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                /> {amenity}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 