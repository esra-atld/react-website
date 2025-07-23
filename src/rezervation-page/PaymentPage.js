import React from 'react';
import Header from '../components/Header';
import HotelInfoCard from './HotelInfoCard';
import ReservationInfoCard from './ReservationInfoCard';
import PriceSummaryCard from './PriceSummaryCard';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router-dom';

const dummyHotel = {
  name: 'Excalibur Hotel',
  address: 'Antalya, Belek',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  stars: 5,
  features: ['Ücretsiz Wi-Fi', '24 Saat Resepsiyon', 'Otopark', 'Spa & Wellness', 'Denize Sıfır', 'Açık Havuz', 'Fitness Merkezi', 'Çocuk Kulübü', 'Deniz Manzarası', 'Klima', 'Mini Bar']
};

const PaymentPage = () => {
  const location = useLocation();
  const offerDetail = location.state?.offerDetail || {};
  const hotelFeatures = location.state?.features || [];
  
  const hotel = {
    name: offerDetail.hotels[0].name,
    address: offerDetail.hotels[0].country.name+", "+ offerDetail.hotels[0].city.name,
    image: offerDetail.hotels[0].thumbnailFull,
    starts: offerDetail.hotels[0].stars,
    features: hotelFeatures,
  };

  const rooms = offerDetail?.hotels?.[0]?.offers?.[0]?.rooms || [];
  const totalGuests = rooms.reduce((sum, room) => sum + (room.travellers?.length || 0), 0);
  return (
    <div>
      <Header showSelectors={false} />
      <div style={{
  marginTop: 100,
  background: '#f8f9fa',
  padding: '40px 0'
}}>
  <div
    style={{
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      gap: 48,
      alignItems: 'flex-start',
      padding: '0 24px', // equal left-right padding
    }}
  >
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <HotelInfoCard
              image={hotel.image}
              name={hotel.name}
              address={hotel.address}
              stars={hotel.stars}
              features={hotel.features}
            />
            <ReservationInfoCard
              checkIn={offerDetail.checkIn}
              checkOut={offerDetail.checkOut}
              guestCount={totalGuests}
              roomType={rooms.length + "-" + offerDetail.hotels[0].offers[0].rooms[0].roomName}
            />
            <PriceSummaryCard
              roomPrice={
                ((offerDetail.price.oldAmount ?? offerDetail.price.amount) + " " + offerDetail.price.currency)
              }
              discount={
                offerDetail.price.oldAmount
                  ? offerDetail.price.oldAmount - offerDetail.price.amount
                  : 0
              }
              currentPrice={
                offerDetail.price.amount + " " + offerDetail.price.currency
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <PaymentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 