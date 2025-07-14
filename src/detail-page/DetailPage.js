import React from 'react';
import Header from '../components/Header';
import SearchBar from '../search-page/SearchBar/SearchBar';
import Sidebar from './Sidebar';
import './DetailPage.css';
import SortCriteriaButton from './SortCriteriaButton';
import OtelKartlari from './OtelKartlari';

function DetailPage() {
  const handleSearch = () => {
    // Detay sayfasında search yapıldığında ne olacağını burada tanımlayabilirsin
    console.log('Search clicked in detail page');
  };

  return (
    <div className="detail-page">
      <Header />
      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
      </div>
      <SortCriteriaButton />
      <div className="detail-content">
        <Sidebar />
        <div className="detail-container">
          <OtelKartlari />
        </div>
      </div>
    </div>
  );
}

export default DetailPage; 