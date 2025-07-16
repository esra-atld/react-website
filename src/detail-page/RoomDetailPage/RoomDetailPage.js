import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../search-page/SearchBar/SearchBar';
import './RoomDetailPage.css';
import LeafletMap from '../LeafletMap';
import { FaStar } from 'react-icons/fa';

const hotel = {
  name: 'Excalibur',
  rating: 9.2,
  ratingLabel: 'Harika',
  reviewCount: 1322,
  location: 'Türkiye, Antalya, Belek',
  images: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80',
  ]
};

const RoomDetailPage = () => {
  return (
    <div className="room-detail-page">
      <Header />
      <div className="searchbar-wrapper">
        <SearchBar />
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
                {[1,2,3,4,5].map((i) => (
                  <FaStar key={i} color={i <= 4 ? '#FFD700' : '#e0e0e0'} size={18} style={{marginRight: 2}} />
                ))}
              </div>
            </div>
            <div className="hotel-actions">
              <button className="select-room-btn">Oda Seç</button>
            </div>
          </div>
          <div className="photo-gallery">
            <img src={hotel.images[0]} alt="main" className="main-photo" />
            <div className="side-photos">
              <img src={hotel.images[1]} alt="side1" />
              <div className="side-photo-with-button">
                <img src={hotel.images[2]} alt="side2" />
                <button className="more-photos-btn">+50 fotoğraf</button>
              </div>
            </div>
          </div>
          {/* Yorumlar ve puan bölümü kaldırıldı */}
        </div>
        <aside className="room-sidebar">
          <div className="map-section">
            <h3 className="sidebar-map-title">Bölgeyi keşfedin</h3>
            <div className="map-container">
              <LeafletMap />
            </div>
          </div>
          {/* Diğer sidebar içerikleri burada */}
          <div className="sidebar-section">
            <ul className="feature-list">
              <li>Ücretsiz Wi-Fi</li>
              <li>24 Saat Resepsiyon</li>
              <li>Otopark</li>
              <li>Spa & Wellness</li>
              <li>Çocuk Kulübü</li>
              <li>Denize Sıfır</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RoomDetailPage; 