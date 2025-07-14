import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet marker icon sorununu çözmek için
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LeafletMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Harita oluştur
    const map = L.map(mapRef.current).setView([36.8969, 30.7133], 12);
    mapInstanceRef.current = map;

    // OpenStreetMap tile layer ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Otel işaretleyicileri
    const hotels = [
      {
        name: 'Akra Antalya',
        position: [36.8969, 30.7133],
        price: '43.742 TL'
      },
      {
        name: 'Grand Hotel İstanbul',
        position: [36.8969, 30.7233],
        price: '67.890 TL'
      },
      {
        name: 'Marmara Bodrum',
        position: [36.8869, 30.7133],
        price: '89.450 TL'
      },
      {
        name: 'Kaya Palazzo',
        position: [36.9069, 30.7033],
        price: '125.600 TL'
      },
      {
        name: 'Divan Otel',
        position: [36.8769, 30.7233],
        price: '78.320 TL'
      },
      {
        name: 'Rixos Premium',
        position: [36.9169, 30.7333],
        price: '156.780 TL'
      }
    ];

    // Her otel için işaretleyici oluştur
    hotels.forEach((hotel, index) => {
      // Özel otel ikonu
      const hotelIcon = L.divIcon({
        className: 'hotel-marker',
        html: `<div style="
          background: #FB8500; 
          color: white; 
          width: 30px; 
          height: 30px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 16px; 
          font-weight: bold;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">🏨</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker(hotel.position, { icon: hotelIcon }).addTo(map);

      // Popup içeriği
      const popupContent = `
        <div style="
          font-family: 'Inter', sans-serif; 
          padding: 8px; 
          min-width: 150px;
        ">
          <h3 style="
            margin: 0 0 4px 0; 
            font-size: 14px; 
            font-weight: 600; 
            color: #1E232C;
          ">${hotel.name}</h3>
          <p style="
            margin: 0; 
            font-size: 12px; 
            color: #FB8500; 
            font-weight: 600;
          ">${hotel.price}</p>
          <p style="
            margin: 4px 0 0 0; 
            font-size: 11px; 
            color: #6B7280;
          ">Otel ${index + 1}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
    });

    // Harita stillerini özelleştir
    const mapContainer = mapRef.current;
    if (mapContainer) {
      mapContainer.style.borderRadius = '12px';
      mapContainer.style.overflow = 'hidden';
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      style={{
        width: '100%',
        height: '200px',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    />
  );
}

export default LeafletMap; 