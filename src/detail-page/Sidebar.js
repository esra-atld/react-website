import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import LeafletMap from './LeafletMap';

function Sidebar({
  hotels,
  filteredHotels,
  priceRange = [0, 10000],
  setPriceRange,
  rangeCurrency,
  setRangeCurrency,
  selectedStars,
  setSelectedStars,
  selectedAmenities,
  setSelectedAmenities,
  style,
  selectedLocation, // yeni eklendi
  currency,
  absoluteMinMax = [0, 10000]
}) {
  
  const amenityGroups = {
    restoran: ["88", "89"], 
    internet: ["94", "95"],
    otopark: ["101", "102"]
  };

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


  const [searchCurrency, setSearchCurrency] = useState(currency);

  
  const [tempPriceRange, setTempPriceRange] = React.useState(priceRange);
// Update temp range while dragging
  const handleSliderChange = (event, newValue) => {
    setTempPriceRange(newValue);
  };

  // Apply final range on mouse up
  const handleSliderCommit = (event, newValue) => {
    setPriceRange(newValue);
  };


  const formatValue = (value) => {
    // Always show in original currency (from hotel data)
    return `${value.toLocaleString()} ${rangeCurrency || 'USD'}`;
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
        <h4>Fiyat Aralığı ({rangeCurrency})</h4>
          <Box sx={{ width: '100%', padding: '0 8px' }}>
            <Slider
              value={tempPriceRange}
              onChange={handleSliderChange}
              onChangeCommitted={handleSliderCommit}
              valueLabelDisplay="auto"
              valueLabelFormat={formatValue}
              min={Math.min(absoluteMinMax[0], priceRange[0])}
              max={Math.max(absoluteMinMax[1], priceRange[1])}
              step={10}
              sx={{
                color: '#FB8500',
                height: 8,
                '& .MuiSlider-thumb': {
                  height: 24,
                  width: 24,
                  backgroundColor: '#fff',
                  border: '2px solid currentColor',
                  '&:hover': {
                    boxShadow: '0 0 0 8px rgba(251, 133, 0, 0.16)',
                  },
                },
                '& .MuiSlider-valueLabel': {
                  backgroundColor: '#FB8500',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              {formatValue(absoluteMinMax[0] || 0, rangeCurrency)}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              {formatValue(absoluteMinMax[1] || 1, rangeCurrency)}
              </Typography>
            </Box>
          </Box>
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