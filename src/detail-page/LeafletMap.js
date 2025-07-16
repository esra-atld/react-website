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

const LeafletMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Eski harita varsa temizle
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Harita oluştur
    const map = L.map(mapRef.current, {
      center: [36.8969, 30.7133],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
      preferCanvas: true
    });
    mapInstanceRef.current = map;

    // Tile layer ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Örnek marker
    L.marker([36.8969, 30.7133]).addTo(map)
      .bindPopup('Otel Konumu')
      .openPopup();

    // Harita boyutunu güncelle (kasılmayı önler)
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    // Temizlik
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
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
        overflow: 'hidden',
        background: '#e0e0e0',
        minHeight: '200px',
        minWidth: '100px',
      }}
    />
  );
};

export default LeafletMap; 