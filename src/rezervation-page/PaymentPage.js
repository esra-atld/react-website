import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HotelInfoCard from './HotelInfoCard';
import ReservationInfoCard from './ReservationInfoCard';
import PriceSummaryCard from './PriceSummaryCard';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router-dom';
import { useBooking } from '../BookingContext';
import { BeginTransaction } from '../services/bookingService'; 



const PaymentPage = () => {
  
  const { roomList, setRoomList, currency, selectedNationality } = useBooking();

  const location = useLocation();
  const offerDetail = location.state?.offerDetail || {};
  const hotelFeatures = location.state?.features || [];
  const [transactionId, setTransactionId] = useState("");

  const hotel = {
    name: offerDetail.hotels[0].name,
    address: offerDetail.hotels[0].country.name+", "+ offerDetail.hotels[0].city.name,
    image: offerDetail.hotels[0].thumbnailFull,
    starts: offerDetail.hotels[0].stars,
    features: hotelFeatures,
  };
  console.log("offerID:", offerDetail.offerId)
  
  const rooms = offerDetail?.hotels?.[0]?.offers?.[0]?.rooms || [];
  console.log("rooms", rooms)
  const totalGuests = rooms.reduce((sum, room) => sum + (room.travellers?.length || 0), 0);


  // Begin Transaction
  useEffect(() => {
    async function beginTransaction() {
      if (!offerDetail?.offerId) return;
      console.log("transaction beginned")
      /** @type {import('../services/bookingService').BeginTransactionRequest} */
      const requestData = {
        offerIds: [offerDetail.offerId],
        currency: currency.code,
        culture: 'tr-TR',
      };
      try {
        const response = await BeginTransaction(requestData);
        console.log('Transaction started:', response);
        setTransactionId(response.body.transactionId);
      } catch (err) {
        console.error('Failed to begin transaction:', err);
      }      
    }
    beginTransaction();

  }, [offerDetail]);

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
            <PaymentForm 
              rooms ={rooms}
              transactionId = {transactionId}  
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 