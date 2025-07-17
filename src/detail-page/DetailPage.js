import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../search-page/SearchBar/SearchBar';
import Sidebar from './Sidebar';
import './DetailPage.css';
import SortCriteriaButton from './SortCriteriaButton';
import OtelKartlari from './OtelKartlari';
import { useBooking } from '../BookingContext';
import RoomDetailPage from './RoomDetailPage'; // yeni import klasörden

function DetailPage({ handleSearch }) {
  const {
      selectedLocation, setSelectedLocation,
      selectedNationality, setSelectedNationality,
      range, setRange,
      adults, setAdults,
      childrens, setChildren,
      childrenAges, setChildrenAges,
      rooms, setRooms,
      currency, setCurrency,
      loading, setLoading, 
    } = useBooking();
  
  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'POOL': return '🏊‍♂️';
      case 'SPA': return '💆‍♀️';
      case 'RESTAURANT': return '🍽️';
      case 'GYM': return '🏋️‍♂️';
      case 'BAR': return '🍹';
      case 'BEACH': return '🏖️';
      case 'CASINO': return '🎰';
      case 'GOLF': return '🏌️‍♂️';
      case 'TENNIS': return '🎾';
      default: return '✨';
    }
  };  
  const location = useLocation();
  const hotels = location.state?.hotels || [];

  console.log("DetailPage hotels:", hotels);
  

  return (
    <div className="detail-page">
      <Header />
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div>Yükleniyor...</div>
        </div>
      )}
      <div className="search-section">
        <SearchBar 
          handleSearch={handleSearch}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
      </div>
      <SortCriteriaButton />
      <div className="detail-content">
       
        <Sidebar 
          style={{ marginTop: "0px" }} 
          hotels={hotels}
        />
        
        
        <div className="detail-container">
        {hotels.length > 0 ? (
          hotels.map(hotel => {
            // Build amenity icons nicely
            const mappedAmenities = hotel.amenities?.map(a => ({
              icon: getAmenityIcon(a),
              name: a
            })) || [];
          
            return (
              <OtelKartlari
                key={hotel.id}
                hotel={{
                  name: hotel.name,
                  address: hotel.address || "Adres bulunamadı",
                  image: hotel.thumbnailFull || "https://via.placeholder.com/400x300",
                  stars: hotel.stars || 4,
                  amenities: mappedAmenities,
                  price: `${hotel.offers[0].price.amount} ${hotel.offers[0].price.currency}`,
                  priceDetails: "Fiyat bilgi detayı bulunamadı"
                }}
              />
            );
          })
        ) : (
          <div>Hiç otel bulunamadı.</div>
        )}
      </div>
      </div>
    </div>
  );
}

export default DetailPage; 