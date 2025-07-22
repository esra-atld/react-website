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

const LeafletMap = ({ markers = [], choosenHotel }) => {
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {

    // Ensure the map container is available
    if (!mapRef.current) {
      return;
    }

    // Clean up previous map instance if it exists to prevent multiple maps
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize the map
    const map = L.map(mapRef.current, {
      center: [36.8969, 30.7133], // Default center (Antalya)
      zoom: 12,
      zoomControl: false, // Disable default zoom control
      attributionControl: false, // Disable default attribution
      preferCanvas: true // Use canvas rendering for performance
    });
    mapInstanceRef.current = map; // Store the map instance

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      // You can add attribution here if attributionControl is enabled
      // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers to the map
    const newMarkers = [];
    markers.forEach(hotel => {
      const geo = hotel.geolocation ?? hotel.geoLocation;

      if (geo?.latitude && geo?.longitude) {
        const marker = L.marker([geo.latitude, geo.longitude])
          .addTo(map)
          .bindPopup(hotel.name || 'Konum');
        newMarkers.push(marker);
      } else {
        console.warn("Invalid marker data:", hotel);
      }
    });
    // Add chosen hotel markers to the map
    if (choosenHotel && (choosenHotel.geoLocation || choosenHotel.geolocation)) {
      const geo = choosenHotel.geolocation ?? choosenHotel.geoLocation;
      const chosenMarker = L.marker([geo.latitude, geo.longitude])
        .addTo(map)
        .bindPopup(choosenHotel.name || 'Seçilen Konum');
      newMarkers.push(chosenMarker);
    } else {
    }
    // Adjust map view based on markers
    if (newMarkers.length > 0) {
      if (newMarkers.length === 1) {
        // For a single marker, set view directly and open popup
        const singleMarker = newMarkers[0];
        map.setView(singleMarker.getLatLng(), 15); // Zoom in closer for single marker
        singleMarker.openPopup();
      } else {
        // For multiple markers, fit bounds
        const bounds = L.latLngBounds(
          newMarkers.map(m => m.getLatLng())
        );
        map.fitBounds(bounds, { padding: [50, 50] }); // Add some padding around the bounds
      }
    } else {
      // If no valid markers, set a default view (Antalya)
      map.setView([36.8969, 30.7133], 12);
    }
    
    // Invalidate map size after a short delay to ensure correct rendering
    // This is crucial if the map container's size changes after initialization (e.g., in a modal)
    // A slightly longer delay might help if the modal animation is slow.
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 400); // Increased timeout slightly

    // Cleanup function: remove the map when the component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [markers, choosenHotel]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '220px', // parent yüksekliği
        width: '100%',
      }}
    >
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
    </div>
  );
};

export default LeafletMap; 