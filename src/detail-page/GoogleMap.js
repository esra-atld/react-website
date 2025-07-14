import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

function GoogleMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      // Google Maps API anahtarını environment variable'dan al
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
      
      if (apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
        // API anahtarı ayarlanmamışsa fallback göster
        mapRef.current.innerHTML = `
          <div style="
            width: 100%; 
            height: 100%; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            display: flex; 
            flex-direction: column;
            align-items: center; 
            justify-content: center; 
            border-radius: 12px;
            font-family: 'Inter', sans-serif;
            color: white;
            font-size: 14px;
            text-align: center;
            padding: 20px;
          ">
            <div style="font-size: 24px; margin-bottom: 8px;">🗺️</div>
            <div style="font-weight: 600; margin-bottom: 4px;">Google Maps</div>
            <div style="font-size: 12px; opacity: 0.9;">API anahtarı gerekli</div>
          </div>
        `;
        return;
      }

      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        
        // Antalya koordinatları
        const antalya = { lat: 36.8969, lng: 30.7133 };
        
        const map = new google.maps.Map(mapRef.current, {
          center: antalya,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // Otel işaretleyicileri
        const hotels = [
          {
            name: 'Akra Antalya',
            position: { lat: 36.8969, lng: 30.7133 },
            icon: '🏨'
          },
          {
            name: 'Grand Hotel İstanbul',
            position: { lat: 36.8969, lng: 30.7233 },
            icon: '🏨'
          },
          {
            name: 'Marmara Bodrum',
            position: { lat: 36.8869, lng: 30.7133 },
            icon: '🏨'
          },
          {
            name: 'Kaya Palazzo',
            position: { lat: 36.9069, lng: 30.7033 },
            icon: '🏨'
          },
          {
            name: 'Divan Otel',
            position: { lat: 36.8769, lng: 30.7233 },
            icon: '🏨'
          },
          {
            name: 'Rixos Premium',
            position: { lat: 36.9169, lng: 30.7333 },
            icon: '🏨'
          }
        ];

        // Her otel için işaretleyici oluştur
        hotels.forEach((hotel, index) => {
          const marker = new google.maps.Marker({
            position: hotel.position,
            map: map,
            title: hotel.name,
            label: {
              text: hotel.icon,
              fontSize: '20px'
            }
          });

          // Bilgi penceresi
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; font-family: 'Inter', sans-serif;">
                <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">${hotel.name}</h3>
                <p style="margin: 0; font-size: 12px; color: #666;">Otel ${index + 1}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

      } catch (error) {
        console.error('Google Maps yüklenirken hata oluştu:', error);
        // Hata durumunda fallback görüntü göster
        mapRef.current.innerHTML = `
          <div style="
            width: 100%; 
            height: 100%; 
            background: #f0f0f0; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            border-radius: 12px;
            font-family: 'Inter', sans-serif;
            color: #666;
            font-size: 14px;
          ">
            Harita yüklenemedi
          </div>
        `;
      }
    };

    initMap();
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

export default GoogleMap; 