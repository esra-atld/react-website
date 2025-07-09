import React from 'react';
import parisImage from '../../assets/paris.jpg';
import lisbonImage from '../../assets/lisbon.jpg';
import './PopularDestinations.css';

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'İstanbul',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      name: 'Paris',
      image: parisImage
    },
    {
      id: 3,
      name: 'Lizbon',
      image: lisbonImage
    },
    {
      id: 4,
      name: 'Roma',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <div className="popular-destinations">
      <h2 className="popular-destinations-heading">
        Popüler Otel Destinasyonları
      </h2>
      <div className="destinations-grid">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="destination-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${destination.image})`
            }}
          >
            <span className="destination-name">
              {destination.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations; 