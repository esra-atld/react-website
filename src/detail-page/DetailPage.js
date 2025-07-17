import React, {useState, useEffect} from 'react';
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

  // FILTER STATE
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [filteredHotels, setFilteredHotels] = useState([]);

  // FILTER LOGIC
  useEffect(() => {
    const filtered = hotels.filter(hotel => {
      const priceOk = hotel.offers?.[0]?.price?.amount || hotel.offers?.[0]?.price?.amount <= priceRange[1];
      const starOk = selectedStars.length === 0 || selectedStars.includes(Math.floor(hotel.stars));
      const amenitiesOk = selectedAmenities.every(am =>
        hotel.amenities?.includes(am)
      );
      return priceOk && starOk && amenitiesOk;
    });

    setFilteredHotels(filtered);
  }, [hotels, priceRange, selectedStars, selectedAmenities]);

  // SORT STATE
  const [sortOption, setSortOption] = useState('İlk önerilen');

  useEffect(() => {
    let filtered = hotels.filter(hotel => {
      const price = hotel.offers?.[0]?.price?.amount;
      const priceOk = price === undefined || price <= priceRange[1];

      const starOk = selectedStars.length === 0 ||
        selectedStars.includes(Math.floor(hotel.stars));

      const amenitiesOk = selectedAmenities.every(am =>
        hotel.amenities?.includes(am)
      );

      return priceOk && starOk && amenitiesOk;
    });

    // Sort after filtering
    switch (sortOption) {
      case 'Fiyat: düşükten yükseğe':
        filtered.sort((a, b) => (a.offers?.[0]?.price?.amount ?? Infinity) - (b.offers?.[0]?.price?.amount ?? Infinity));
        break;
      case 'Fiyat: yüksekten düşüğe':
        filtered.sort((a, b) => (b.offers?.[0]?.price?.amount ?? 0) - (a.offers?.[0]?.price?.amount ?? 0));
        break;
      case 'Yıldız derecelendirmesi':
        filtered.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
        break;
      case 'İlk önerilen':
      default:
        break;
    }

    setFilteredHotels(filtered);
  }, [hotels, priceRange, selectedStars, selectedAmenities, sortOption]);


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
      <SortCriteriaButton onChange={setSortOption} />
      <div className="detail-content">
       
        <Sidebar 
          style={{ marginTop: "0px" }} 
          hotels={hotels}
          filteredHotels={filteredHotels}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedStars={selectedStars}
          setSelectedStars={setSelectedStars}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
        />
        
        
        <div className="detail-container">
        {filteredHotels.length > 0 ? (
          filteredHotels.map(hotel => {
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
                  price: `${hotel.offers?.[0]?.price?.amount || 0} ${hotel.offers?.[0]?.price?.currency || ''}`,
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