import React from 'react';
import Header from '../components/Header';
import SearchBar from '../search-page/SearchBar/SearchBar';
import Sidebar from './Sidebar';
import './DetailPage.css';

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
      <div className="detail-content">
        <Sidebar />
        <div className="detail-container">
          <h1>Detay Sayfası</h1>
          <p>Bu sayfa tasarlanacak...</p>
        </div>
      </div>
    </div>
  );
}

export default DetailPage; 