import React from 'react';
import parisImage from '../../assets/paris.jpg';
import lisbonImage from '../../assets/lisbon.jpg';
import './PopularDestinations.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ca } from 'date-fns/locale';
import { useBooking } from '../../BookingContext';
import { getProductInfo, searchRecommended } from '../../services/productInfoService';

const PopularDestinations = () => {
  const {
        loading, setLoading, 
      } = useBooking();
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
  
  const navigate = useNavigate();
  
  const handleDestinationClick = async (destination) => {
    setLoading(true);

    try {

      const hotelsToSearch = await searchRecommended(destination.name);

      if (hotelsToSearch.length === 0) {
        alert(`No hotels found for ${destination.name}.`);
        navigate('/detail', { state: { hotels: [] } });
        return; 
      }

      const productRequests = hotelsToSearch.map(item => ({
        productType: 2,
        ownerProvider: 2,
        product: item.hotel.id,
        culture: 'tr-TR'
      }));

      // Fetch all product infos in parallel
      const productInfoResults = await Promise.all(
        productRequests.map(req => getProductInfo(req))
      );

      const hotelsList = productInfoResults.map(item => item.body.hotel);


      if(productInfoResults.length === 0) {
          alert("Bu şehirde otel bulunamadı.");
          navigate('/detail', { state: { hotels: [] } });
      }
      else{
          navigate('/detail', { state: { hotels: hotelsList } });
      }

      // TODO: Save results to state/context, or navigate to filtered result screen
    } catch (err) {
      console.error('Error during destination search:', err);
    } finally {
      setLoading(false);
    }
  };


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
            onClick={() => handleDestinationClick(destination)}
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