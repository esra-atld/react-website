import React, { useState, useRef } from 'react';
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
  ],
  description: 'Serik bölgesinde, plaja yakın, plaja bitişik, spa, ücretsiz plaj servisi olan konaklama yeri. Havaalanı transferi, bar, ücretsiz kahvaltı, havuz, spa gibi olanaklar sunar. Modern ve konforlu odaları ile aileler ve çiftler için idealdir.',
  hotelCategory: { name: 'Resort' },
  themes: ['Spa', 'Lüks', 'Aile', 'Deniz Manzarası', 'Çocuk Dostu', 'Golf'],
  facilities: [
    {
      title: 'Otopark',
      desc: ['Tekerlekli sandalye kullanımına uygun otopark mevcuttur']
    },
    {
      title: 'Kahvaltı',
      desc: [
        'Ücretli Zengin tipi kahvaltı',
        'Her gün 8-13 saatleri arasında sunulur',
        'Kişi başı 10-70 USD'
      ]
    },
    {
      title: 'Yiyecek ve içecek',
      desc: [
        '3 bar/oturma salonu',
        '3 restoran',
        'Bir havuz kenarı barı',
        'Bir kahve dükkânı/kafe',
        'Ortak alanlarda kahve ve çay',
        'Konaklama yerinde birden fazla restoran',
        'The Lexi Lounge - Bu lobi salonu kahvaltı, hafta sonu geç kahvaltı, öğle yemeği ve akşam yemeği servisi yapmaktadır. Misafirler için indirimli içki saati servisi mevcuttur.',
        'RSK - temalı restoran. Her gün açık'
      ]
    },
    {
      title: 'Havuz',
      desc: [
        'Konaklama yerinde 1 açık havuz',
        'Havuz kabini ve havuzda şezlong bulunur',
        'Havuz girişi: 10 - 19'
      ]
    },
    {
      title: 'Spor salonu',
      desc: ['Spor salonu']
    },
    {
      title: 'Evcil hayvanlar',
      desc: ['Sadece rehber hayvanlar kabul edilir (evcil hayvanlar kabul edilmez)']
    },
    {
      title: 'Yapılacak şeyler',
      desc: [
        'Gece eğlencesi',
        'Gece kulübü',
        'Karaoke',
        'Konserler/canlı gösteriler',
        'Ortak alanlarda televizyon'
      ]
    },
    {
      title: 'Sunulan Kolaylıklar',
      desc: [
        '24 saat açık resepsiyon',
        'ATM',
        'Ortak mikrodalga fırın',
        'Rehber kitaplar',
        'Resepsiyonda emanet kasası',
        'Su sebili',
        'Valiz dolabı'
      ]
    },
    {
      title: 'Misafir hizmetleri',
      desc: [
        'Çarşaf takımı değişimi (istek üzerine)',
        'Danışma hizmetleri',
        'Düğün organizasyonu',
        'İstek üzerine havlu değişimi',
        'Kat hizmetleri (istek üzerine)',
        'Oda hizmetçisi/belboy'
      ]
    },
    {
      title: 'Ofis ve iş hizmetleri',
      desc: ['Toplantı odaları']
    },
    {
      title: 'Açık alanlar',
      desc: ['Piknik alanı', 'Teras']
    },
    {
      title: 'Engellilere yönelik özellikler',
      desc: [
        'Engellilere yönelik özel istekleriniz varsa lütfen rezervasyonunuzu yaptıktan sonra rezervasyon onayındaki bilgileri kullanarak konaklama yeriyle iletişime geçin.',
        'Asansör',
        'Genel alanlarda karo döşeme',
        'Tekerlekli sandalye kullanımına uygun (kısıtlamalar olabilir)',
        'Tekerlekli sandalye kullanımına uygun otopark'
      ]
    },
    {
      title: 'Diğer',
      desc: [
        '1 yapı',
        '5 kat',
        'Aydınlatmanın en az %80\'i LED\'dir',
        'Banket salonu',
        'Gıdaların en az %80\'i yerel kaynaklardan tedarik edilir',
        'Kârın en az %10\'u topluluğa ve sürdürülebilirliğe yeniden yatırılır',
        'Resepsiyon salonu',
        'Sigara içilmeyen konaklama yeri',
        'Vegan yemek seçenekleri',
        'Vejetaryen kahvaltı seçeneği',
        'Vejetaryen yemek seçenekleri',
        'Yerel sanatçı sergisi'
      ]
    },
    {
      title: 'Yakındaki etkinlikler',
      desc: ['Golf']
    }
  ],
};

const RoomDetailPage = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const roomSelectionRef = useRef(null);

  const handleRoomsTabClick = () => {
    setTimeout(() => {
      if (roomSelectionRef.current) {
        roomSelectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // sekme değişimi sonrası scroll için küçük gecikme
  };

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
                  <FaStar key={i} color={i <= 4 ? '#FFB703' : '#e0e0e0'} size={18} style={{marginRight: 2}} />
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
          <RoomDetailTabs activeTab={activeTab} onTabChange={setActiveTab} onRoomsTabClick={handleRoomsTabClick} />
          <div className="tab-content">
            {activeTab === 'about' && (
              <div>
                <h4 className="about-section-title">Bu konaklama yeri hakkında</h4>
                <p className="about-section-desc about-section-desc-grey">
                  Serik bölgesinde, plaja yakın, plaja bitişik, spa, ücretsiz plaj servisi olan konaklama yeri.
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
                />
                <div className="about-section-divider" />
                <RoomSelectionBar />
                <RoomCardList />
              </div>
            )}
            {activeTab === 'rooms' && (
              <div>
                <h3>Odalar</h3>
                <p>Burada otelin tüm oda tipleri, oda özellikleri ve fiyatları listelenecek.</p>
              </div>
            )}
          </div>
        </div>
        <aside className="room-sidebar">
          <div className="map-section">
            <h3 className="sidebar-map-title">Bölgeyi keşfedin</h3>
            <div className="map-container">
              <LeafletMap />
            </div>
          </div>
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