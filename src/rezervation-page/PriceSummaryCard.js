import React from 'react';
import './PriceSummaryCard.css';

const PriceSummaryCard = ({ roomPrice, discount, currentPrice }) => (
  <div className="price-summary-card">
    <h3 className="price-summary-title">Fiyat Özeti</h3>
    <div className="price-summary-list">
      <div className="price-summary-item">
        <span>Oda Fiyatı</span>
        <span>{roomPrice}</span>
      </div>
      <div className="price-summary-item">
        <span>İndirim Miktarı</span>
        <span>-{discount}</span>
      </div>
      <div className="price-summary-divider" />
      <div className="price-summary-item price-summary-current">
        <span>Güncel Fiyat</span>
        <span>{currentPrice}</span>
      </div>
    </div>
  </div>
);

export default PriceSummaryCard; 