import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../search-page/SearchBar/SearchBar';
import './RoomDetailPage.css';
import LeafletMap from '../LeafletMap';
import { FaStar } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import RoomDetailTabs from './RoomDetailTabs';
import AboutOtelPopup from './AboutOtelPopup';
import RoomSelectionBar from './RoomSelectionBar';
import RoomCardList from './RoomCardList';
import OtelPhotoPopup from './otelPhotoPopup';
import { getProductInfo } from '../../services/productInfoService';
import { getOffers, getOfferDetails } from '../../services/getOffersService';

import { useLocation } from 'react-router-dom';
import { useBooking } from '../../BookingContext';

const RoomDetailPage =  ({ handleSearch }) => {

  const {
    selectedLocation, setSelectedLocation,
    loading, setLoading,
    currency, setCurrency,
    selectedNationality, setSelectedNationality,
  } = useBooking();
  
  const location = useLocation();
  const productID = location.state?.productID || '';
  const amenities = location.state?.amenities || [];
  const offerID = location.state?.offerID || '';
  const searchID = location.state?.searchId || '';
  const [productInfo, setProductInfo] = useState(null);
  const [offers, setOffers] = useState([]);
  const [offerDetails, setOfferDetails] = useState([]);
  
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 10;

  const displayedAmenities = showAll ? amenities : amenities.slice(0, MAX_VISIBLE);

  const toggleShow = () => setShowAll(prev => !prev);  const [loadingDots, setLoadingDots] = useState('');


  useEffect(() => {
    setLoading(true)
    async function fetchProductInfo() {
      try {
        const productRequests = {
          productType: 2,
          ownerProvider: 2,
          product: productID,
          culture: 'tr-TR'
        };

        const response = await getProductInfo(productRequests);
        if (response.body?.hotel) {
          setProductInfo(response.body.hotel);
        } else {
          console.error('No hotel found in response');
        }
      } catch (err) {
        console.error('Error fetching product info:', err);
      } finally {
        setLoading(false)
      }
    }

    if (productID) {
      fetchProductInfo();
    }
  }, [productID]);

  useEffect(() => {
    setLoading(true)
    async function fetchOffers(){
      try{
        const offerRequest = {
          searchId: searchID,
          offerId: offerID,
          productType: 2,
          productId: productID,
          currency:currency,
          culture: "tr-TR",
          getRoomInfo: true
        }

        const response = await getOffers(offerRequest);

        if (response.body?.offers) {
          setOffers(response.body.offers);
        } else {
          console.error('No offers found in response');
        }
      }catch (err) {
        console.error('Error fetching product info:', err);
      } finally {
        setLoading(false)
      }
    }

    if (productID) {
      fetchOffers();
    }
  }, [productID]);

  useEffect(() => {
    setLoading(true)
    async function fetchOfferDetails(){
      try{
        const offerDetailRequest = {
          offerIds: offers.map(offer => offer.offerId),
          currency: currency,
          getProductInfo: true
        }

        const response = await getOfferDetails(offerDetailRequest);
        if (response.body?.offerDetails) {
          setOfferDetails(response.body.offerDetails);
        } else {
          console.error('No offerDetails found in response');
        }
      }catch (err) {
        console.error('Error fetching product info:', err);
      } finally {
        setLoading(false)
      }
    }

    if (offers.length > 0) {
    fetchOfferDetails();
  }
  }, [offers]);



  useEffect(() => {
    if (productInfo) return;
    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setLoadingDots('.'.repeat(count));
    }, 500);
    return () => clearInterval(interval);
  }, [productInfo]);

  const [activeTab, setActiveTab] = useState('about');
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const roomSelectionRef = useRef(null);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);

  const handleRoomsTabClick = () => {
    setTimeout(() => {
      if (roomSelectionRef.current) {
        roomSelectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // sekme değişimi sonrası scroll için küçük gecikme
  };

  const handleOpenPhotoPopup = () => setIsPhotoPopupOpen(true);
  const handleClosePhotoPopup = () => setIsPhotoPopupOpen(false);

  const handleThumbnailClick = (photo) => {
    console.log('Thumbnail clicked:', photo);
    handleOpenPhotoPopup();
  };

  const handleSelectRoomFromPopup = () => {
    if (roomSelectionRef.current) {
      roomSelectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsPhotoPopupOpen(false);
  };

  if (!productInfo) {
    return (
      <div className="room-detail-page">
        <Header 
        selectedNationality={selectedNationality} 
        onNationalityChange={setSelectedNationality} 
        selectedCurrency={currency}
        onCurrencyChange={setCurrency}
      />
        <div className="searchbar-wrapper">
          <SearchBar  
            handleSearch={handleSearch}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation} 
          />
        </div>
        <div style={{ padding: '2rem', textAlign: 'center' }}>{`Tripora${loadingDots}`}</div>
      </div>
    );
  }

  const hotel = {
    name: productInfo.name,
    stars: productInfo.stars || 0,
    rating: productInfo.rating,
    ratingLabel: '',
    reviewCount: 0,
    geolocation: productInfo.geoLocation || productInfo.geolocation,
    location: `${productInfo.country?.name || ''}, ${productInfo.city?.name || ''}`,
    images: productInfo.seasons?.[0]?.mediaFiles?.map(file => file.urlFull) || [],
    description: extractText(productInfo.description?.text) || '',
    hotelCategory: { name: 'Resort' },
    themes: productInfo.themes?.map(theme => theme.name) || [],
    facilities: productInfo.seasons?.[0]?.facilityCategories?.[0]?.facilities?.map(facilitie => ({
      title: facilitie.name,
      isPriced: facilitie.isPriced,
    })) || []
  };


  return (
    
    <div className="room-detail-page">
      
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div>Yükleniyor...</div>
        </div>
      )}

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
      <div className="searchbar-wrapper">
        <SearchBar
          handleSearch={handleSearch}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation} 
         />
      </div>
      <div className="room-detail-content">
        <div className="room-main">
          <div className="hotel-header">
            <div>
              <h2 className="hotel-title">{hotel.name}</h2>
              <div className="hotel-location-theme-row">
                <span className="hotel-location">{hotel.location}</span>
                <span className="vertical-divider" />
                <span className="hotel-theme">Resort</span>
              </div>
              <div className="hotel-stars">
                {[1, 2, 3, 4, 5].map(i => (
                  <FaStar
                    key={i}
                    color={i <= Math.floor(hotel.stars) ? '#FFB703' : '#e0e0e0'}
                    size={18}
                    style={{ marginRight: 2 }}
                  />
                ))}
              </div>
            </div>
            <div className="hotel-actions">
              <button className="select-room-btn" onClick={() => {
                if (roomSelectionRef.current) {
                  roomSelectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}>
                Oda Seç
              </button>
            </div>
          </div>
          <div className="photo-gallery">
            <img src={hotel.images[0]} alt="main" className="main-photo" onClick={() => handleThumbnailClick(hotel.images[0])} style={{cursor: 'pointer'}} />
            <div className="side-photos">
              <img src={hotel.images[1]} alt="side1" onClick={() => handleThumbnailClick(hotel.images[1])} style={{cursor: 'pointer'}} />
              <div className="side-photo-with-button">
                <img src={hotel.images[2]} alt="side2" onClick={() => handleThumbnailClick(hotel.images[2])} style={{cursor: 'pointer'}} />
                <button className="more-photos-btn" onClick={handleOpenPhotoPopup}>Tüm Fotoğraflar</button>
              </div>
            </div>
          </div>
          <RoomDetailTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              if (tab === 'rooms') {
                if (roomSelectionRef.current) {
                  roomSelectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              } else {
                setActiveTab(tab);
              }
            }}
            onRoomsTabClick={handleRoomsTabClick}
          />
          <div className="tab-content">
            {activeTab === 'about' && (
              <div>
                <h4 className="about-section-title">Bu konaklama yeri hakkında</h4>
                <p className="about-section-desc about-section-desc-grey">
                  {(hotel.description && hotel.description.substring
                  ? hotel.description.substring(0, 300) + ' ...'
                  : 'Bu konaklama yeri hakkında bilgi bulunamadı.')}
                </p>
                <div className="about-section-features-row">
                  <ul className="about-section-list">
                    {hotel.themes.slice(0,3).map((theme) => (
                      <li key={theme}>{theme}</li>
                    ))}
                  </ul>
                  <ul className="about-section-list">
                    {hotel.facilities.slice(0,3).map((facility) => (
                      <li key={facility.title}>{facility.title}</li>
                    ))}
                  </ul>
                </div>
                <a className="about-section-link" href="#" onClick={e => { e.preventDefault(); setShowAboutPopup(true); }}>
                  Bu konaklama yeri hakkında tüm bilgiler <FaChevronRight style={{verticalAlign: 'middle'}} />
                </a>
                <AboutOtelPopup
                  open={showAboutPopup}
                  onClose={() => setShowAboutPopup(false)}
                  themes={hotel.themes}
                  facilities={hotel.facilities}
                  description={hotel.description}
                />
                <div className="about-section-divider" />
                <div ref={roomSelectionRef}>
                  <RoomSelectionBar />
                </div>
                <RoomCardList
                  offers = {offers}
                  offerDetails = {offerDetails}
                  images = {hotel.images.slice(0,10)}
                  amenities = {amenities}
                />
              </div>
            )}
            {activeTab === 'rooms' && (
              <div>
                <button
                  className="scroll-to-room-selection-btn"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#219EBC',
                    fontWeight: 700,
                    fontSize: 22,
                    cursor: 'pointer',
                    padding: 0,
                    margin: '24px 0 0 0',
                    textDecoration: 'underline',
                  }}
                  onClick={() => {
                    if (roomSelectionRef.current) {
                      roomSelectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Odalar
                </button>
              </div>
            )}
          </div>
        </div>
        <aside className="room-sidebar">
          <div className="map-section">
            <h3 className="sidebar-map-title">Bölgeyi keşfedin</h3>
            <hr className="sidebar-divider" />
            <div className="map-container">
              <LeafletMap choosenHotel={hotel} />
            </div>
          </div>
          <hr className="sidebar-divider" />
          <div className="sidebar-section">
            <ul className={`feature-list${amenities.length > 8 ? ' feature-list-scroll' : ''}`}>
              {amenities.length > 0 ? (
                amenities.map((amenity, index) => (
                  <li key={index}>{amenity.name}</li>
                ))
              ) : (
                <li>Özellik bilgisi bulunamadı.</li>
              )}
            </ul>
          </div>
        </aside>
      </div>
      <OtelPhotoPopup
        open={isPhotoPopupOpen}
        onClose={handleClosePhotoPopup}
        hotelName={hotel.name}
        starCount={5}
        onSelectRoomClick={handleSelectRoomFromPopup}
        photos={hotel.images}
      />
    </div>
  );
};

function extractText(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}


export default RoomDetailPage; 