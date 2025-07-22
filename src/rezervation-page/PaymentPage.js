import React from 'react';
import Header from '../components/Header';
import HotelInfoCard from './HotelInfoCard';
import ReservationInfoCard from './ReservationInfoCard';
import PriceSummaryCard from './PriceSummaryCard';
import PaymentForm from './PaymentForm';

const dummyHotel = {
  name: 'Excalibur Hotel',
  address: 'Antalya, Belek',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  stars: 5,
  features: ['Ücretsiz Wi-Fi', '24 Saat Resepsiyon', 'Otopark', 'Spa & Wellness', 'Denize Sıfır', 'Açık Havuz', 'Fitness Merkezi', 'Çocuk Kulübü', 'Deniz Manzarası', 'Klima', 'Mini Bar']
};

const PaymentPage = () => {
  return (
    <div>
      <Header showSelectors={false} />
      <div style={{ marginTop: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', background: '#f8f9fa', padding: '40px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginLeft: 80 }}>
            <HotelInfoCard
              image={dummyHotel.image}
              name={dummyHotel.name}
              address={dummyHotel.address}
              stars={dummyHotel.stars}
              features={dummyHotel.features}
            />
            <ReservationInfoCard
              checkIn="12.07.2024"
              checkOut="15.07.2024"
              guestCount="2 Yetişkin"
              roomType="Deluxe"
            />
            <PriceSummaryCard
              roomPrice="₺12.000"
              discount="₺1.800"
              currentPrice="₺10.200"
            />
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
            <PaymentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 