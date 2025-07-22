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
import LeafletMap from './LeafletMap';

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
  const amenityGroups = {
    restoran: ["88", "89", "90", "91"],
    internet: ["94", "95"],
    otopark: ["101", "102"],
    klima: ["67", "89"],
    bar: ["81"],
    kasa: ["71"],
    odaServisi: ["69"],
    kafeterya: ["76"],
    dovizBurosu: ["72"],
    kuruTemizleme: ["97"]
  };

    
  const location = useLocation();
  const hotels = location.state?.hotels || [];
  const searchId = location.state?.searchId || "";
  // FILTER STATE
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [filteredHotels, setFilteredHotels] = useState([]);
  
  // SORT STATE
  const [sortOption, setSortOption] = useState('İlk önerilen');

  useEffect(() => {
    let filtered = hotels.filter(hotel => {
      const price = hotel.offers?.[0]?.price?.amount;
      const priceOk = price === undefined || price <= priceRange[1];

      const starOk = selectedStars.length === 0 ||
        selectedStars.includes(Math.min(Math.floor(hotel.stars), 5));

      const amenitiesOk =
      selectedAmenities.length === 0 ||
      selectedAmenities.every(groupKey => {
        const groupIds = amenityGroups[groupKey] || [];
        return groupIds.some(id =>
          hotel.facilities?.some(f => f.id === id)
        );
      });

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

  const [showMapModal, setShowMapModal] = useState(false);
  const [mapMarkers, setMapMarkers] = useState(); 

  const handleShowMapClick = (hotel) => {
    const geo = hotel.geolocation ?? hotel.geoLocation;
    if (geo && geo.latitude && geo.longitude) {
      setMapMarkers(hotel);
      setShowMapModal(true); 
    } else {
      console.warn("Hotel location data is missing or invalid for map display:", hotel.geoLocation);
    }
  };

  return (
    <div className="detail-page">
      <Header 
        selectedNationality={selectedNationality} 
        onNationalityChange={setSelectedNationality} 
        selectedCurrency={currency}
        onCurrencyChange={setCurrency}
      />
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
      {showMapModal && (
      <div className="map-modal-overlay" onClick={() => setShowMapModal(false)}>
        <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-map-button" onClick={() => setShowMapModal(false)}>
            ×
          </button>
          <LeafletMap choosenHotel={mapMarkers} />
        </div>
      </div>
    )}

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
          selectedLocation={selectedLocation}
        />
        
        
        <div className="detail-container">
        {filteredHotels.length > 0 ? (
          filteredHotels.map(hotel => {
          
            return (
              <OtelKartlari
                key={hotel.id}
                hotel={{
                  id: hotel.id,
                  name: hotel.name,
                  geoLocation: getGeoLocation(hotel),
                  address: getAddressText(hotel.address),
                  image: hotel.thumbnailFull || "https://placehold.co/400x300",
                  stars: Math.min(hotel.stars || 4, 5),
                  amenities: getAmenities(hotel),
                  price: `${hotel.offers?.[0]?.price?.amount || 0} ${hotel.offers?.[0]?.price?.currency || ''}`,
                  priceDetails: "Fiyat bilgi detayı bulunamadı",
                  oldPrice: hotel.offers?.[0]?.price?.oldAmount,
                  discountPercent: hotel.offers?.[0]?.price?.percent,
                  searchId: searchId,
                  offerId: hotel.offers?.[0]?.offerId
                }}
                onShowMap={handleShowMapClick}
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


const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "71": return '🔒'; // Kasa
      case "72": return '💱'; // Döviz Bürosu
      case "88": return '🍽️'; //Restoran(lar)
      case "89": return '❄️🍽️'; //Restoran(lar) (Klimalı)
      case "90": return '🚭🍽️'; //Restoran(lar) (Sigara İçilmeyen)
      case "91": return '👶🍽️'; //Restoran(lar) (Çocuk İskemleli)
      case "94": return '🌐'; //İnternet
      case "95": return '📶'; //Kablosuz İnternet
      case "97": return '🧺'; //Kuru Temizleme Servisi
      case "81": return '🍹'; //Bar
      case "67": return '❄️'; //Klima
      case "76": return '☕'; //Kafeterya
      case "69": return '🛎️'; //Oda Servisi
      case "101": return '🚗'; //Açık Otopark
      case "102": return '🚘'; //Kapalı Otopark
      default: return '✨'; // Default icon for unrecognized amenities
    }
  };

function getAmenities(hotel) {
  // Try direct facilities first
  if (Array.isArray(hotel.facilities)) {
    return hotel.facilities.map(a => ({
      icon: getAmenityIcon(a.id),
      name: a.name || 'Bilinmeyen'
    }));
  }

  // Then fallback to seasons path
  if (
    Array.isArray(hotel.seasons) &&
    Array.isArray(hotel.seasons[0]?.facilityCategories) &&
    Array.isArray(hotel.seasons[0].facilityCategories[0]?.facilities)
  ) {
    return hotel.seasons[0].facilityCategories[0].facilities.map(a => ({
      icon: getAmenityIcon(a.id),
      name: a.name || 'Bilinmeyen'
    }));
  }

  // Fallback: empty list
  return [];
}


function getGeoLocation(hotel) {
  const geo = hotel.geoLocation || hotel.geolocation;
  if (!geo) return null;
  return geo.latitude && geo.longitude ? {
    latitude: parseFloat(geo.latitude),
    longitude: parseFloat(geo.longitude)
  } : null;
}
function getAddressText(address) {
  if (!address) return "Adres bulunamadı";

  if (typeof address === 'string') {
    return address;
  }

  // If it's an object with city and addressLines
  if (address.addressLines && Array.isArray(address.addressLines)) {
    return address.addressLines.join(', ');
  }

  // Fallback if no addressLines
  if (address.city && address.city.name) {
    return address.city.name;
  }

  return "Adres bulunamadı";
}

export default DetailPage; 