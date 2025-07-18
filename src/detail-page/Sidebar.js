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
<<<<<<< HEAD
  style
  }) {
    
  const amenityGroups = {
    restoran: ["88", "89"], 
    internet: ["94", "95"],
    otopark: ["101", "102"]
  };
=======
  style,
  selectedLocation // yeni eklendi
}) {
>>>>>>> main

  const amenityOptions = [
    { key: "restoran", label: "Restoran" },
    { key: "internet", label: "İnternet" },
    { key: "otopark", label: "Otopark" },
    { key: "klima", label: "Klima" },
    { key: "bar", label: "Bar" },
    { key: "kasa", label: "Kasa" },
    { key: "odaServisi", label: "Oda Servisi" },
    { key: "kafeterya", label: "Kafeterya" },
    { key: "dovizBurosu", label: "Döviz Bürosu" },
    { key: "kuruTemizleme", label: "Kuru Temizleme" },
  ];

  // Handle star rating checkboxes
  const handleStarChange = (star) => {
    setSelectedStars(prev =>
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    );
  };

  // Handle amenity checkboxes
  const handleAmenityChange = (key) => {
    setSelectedAmenities((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
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
            <p>{selectedLocation?.name ? `${selectedLocation.name} bölgesindeki oteller` : 'Bölgedeki oteller'}</p>
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
            {amenityOptions.map(({ key, label }) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={selectedAmenities.includes(key)}
                onChange={() => handleAmenityChange(key)}
              />
              {label}
            </label>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 