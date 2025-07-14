import React from 'react';
import './OtelKartlari.css';
import HaritadaGoster from './HaritadaGoster';

function OtelKartlari() {
  const yildizSayisi = 3; // örnek olarak 3 yıldız aktif
  return (
    <div className="otel-kartlari-box">
      <div className="otel-image-area">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Otel" className="otel-image" />
      </div>
      <div className="otel-main-content">
        <div className="otel-header">
          <span className="otel-isim">Akra Antalya</span>
          <span className="otel-adres">Eski lara, Muratpaşa, Antalya</span>
          <HaritadaGoster />
          <div className="otel-ozellikler">
            <span className="ozellik"><span className="ozellik-ikon">🏊‍♂️</span> Havuz</span>
            <span className="ozellik"><span className="ozellik-ikon">💆‍♀️</span> Spa</span>
          </div>
        </div>
        <div className="otel-yildiz-bolumu">
          {Array.from({ length: yildizSayisi }).map((_, i) => (
            <span key={i} className="otel-yildiz">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FB8500">
                <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <div className="otel-fiyat-bolumu">
        <span className="otel-fiyat">43.742 TL</span>
        <span className="otel-fiyat-detay">3 gece, 1 oda için<br/>Gecelik 14.581 TL<br/>vergiler ve ücretler dahildir</span>
        <button className="oda-sec-btn">Oda Seç</button>
      </div>
    </div>
  );
}

export default OtelKartlari; 