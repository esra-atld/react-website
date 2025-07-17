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
  const hotelss = location.state?.hotelss || [];

  console.log("DetailPage hotels:", hotelss);
  // Örnek otel verileri
  const hotels = [
    {
      id: 1,
      name: 'Akra Antalya',
      address: 'Eski lara, Muratpaşa, Antalya',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      stars: 4,
      price: '43.742 TL',
      priceDetails: '3 gece, 1 oda için\nGecelik 14.581 TL\nvergiler ve ücretler dahildir',
      amenities: [
        { icon: '🏊‍♂️', name: 'Havuz' },
        { icon: '💆‍♀️', name: 'Spa' }
      ]
    },
    {
      id: 2,
      name: 'Grand Hotel İstanbul',
      address: 'Sultanahmet, Fatih, İstanbul',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      stars: 5,
      price: '67.890 TL',
      priceDetails: '3 gece, 1 oda için\nGecelik 22.630 TL\nvergiler ve ücretler dahildir',
      amenities: [
        { icon: '🏊‍♂️', name: 'Havuz' },
        { icon: '🍽️', name: 'Restoran' },
        { icon: '🏋️‍♂️', name: 'Spor Salonu' }
      ]
    },
    {
      id: 3,
      name: 'Marmara Bodrum',
      address: 'Bodrum Merkez, Muğla',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80',
      stars: 4,
      price: '89.450 TL',
      priceDetails: '3 gece, 1 oda için\nGecelik 29.817 TL\nvergiler ve ücretler dahildir',
      amenities: [
        { icon: '🏖️', name: 'Özel Plaj' },
        { icon: '🍹', name: 'Bar' },
        { icon: '🚗', name: 'Ücretsiz Otopark' }
      ]
    },
    {
      id: 4,
      name: 'Kaya Palazzo',
      address: 'Kemer, Antalya',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
      stars: 5,
      price: '125.600 TL',
      priceDetails: '3 gece, 1 oda için\nGecelik 41.867 TL\nvergiler ve ücretler dahildir',
      amenities: [
        { icon: '🏊‍♂️', name: 'Havuz' },
        { icon: '🏌️‍♂️', name: 'Golf Sahası' },
        { icon: '🎾', name: 'Tenis Kortu' }
      ]
    },
    {
      id: 5,
      name: 'Divan Otel',
      address: 'Beşiktaş, İstanbul',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80',
      stars: 4,
      price: '78.320 TL',
      priceDetails: '3 gece, 1 oda için\nGecelik 26.107 TL\nvergiler ve ücretler dahildir',
      amenities: [
        { icon: '🍽️', name: 'Restoran' },
        { icon: '💼', name: 'İş Merkezi' },
        { icon: '🚕', name: 'Havalimanı Transferi' }
      ]
    },
    {
      id: 6,
      name: 'Rixos Premium',
      address: 'Belek, Antalya',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80',
      stars: 5,
      price: '156.780 TL',
      priceDetails: '3 gece, 1 oda için\nGecelik 52.260 TL\nvergiler ve ücretler dahildir',
      amenities: [
        { icon: '🏊‍♂️', name: 'Havuz' },
        { icon: '🏖️', name: 'Özel Plaj' },
        { icon: '🎰', name: 'Kumarhane' }
      ]
    }
  ];

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
        <Sidebar style={{ marginTop: "0px" }} />
        <div className="detail-container">
        {hotelss.length > 0 ? (
          hotelss.map(hotel => {
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