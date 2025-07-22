import React from 'react';
import RoomCard from './RoomCard';

const sampleRooms = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    imagesCount: 5,
    name: 'Oda ismi, kara manzaralı',
    details: [
      '2 kişilik',
      'kaç m²',
      '1 en Büyük Boy (King) Yatak',
      'Şimdi rezervasyon yapın, depozito ödeyin'
    ],
    freeCancel: true,
    detailLink: '#',
    discount: 8,
    oldPrice: '71.202 TL',
    price: '65.859 TL',
    priceInfo: '13 gece, 1 oda için\nGecelik 5.066 TL\nvergiler ve ücretler dahildir',
    onReserve: () => alert('Rezervasyon yapıldı!')
  },
  // İsterseniz daha fazla örnek oda ekleyebilirsiniz
];

const RoomCardList = ({offers, offerDetails, images, amenities}) => {
  return (
    <div className="room-card-list" style={{ marginTop: 32 }}>
      {offers.map((offer, idx) => {
        const { rooms, night, isRefundable, price, priceBreakdowns } = offer;
        const currency = price.currency;
        const totalPrice = price.amount;

        const nightlyPrice = priceBreakdowns?.[0]?.priceBreakdowns?.[0]?.price?.amount;

        const roomNames = rooms.map((room) => `${room.roomName} (${room.boardName})`).join(', ');

        const details = [
          `${night} gece`,
          rooms.length > 1 ? `${rooms.length} oda` : '1 oda',
          rooms.map(room => room.boardGroups?.[0]?.name ?? '').filter(Boolean).join(', '),
          isRefundable ? 'Şimdi rezervasyon yapın, iptal ücretsiz' : ''
        ].filter(Boolean);

        const priceInfo = [
          `${night} gece, ${rooms.length} oda için`,
          nightlyPrice ? `Gecelik ${nightlyPrice} ${currency}` : null,
          'vergiler ve ücretler dahildir'
        ].filter(Boolean).join('\n');

        const matchedDetail = offerDetails.find(detail => detail.offerId === offer.offerId);
        return (
          <RoomCard
            key={idx}
            image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            imagesCount={rooms.length}
            name={roomNames}
            details={details}
            freeCancel={isRefundable}
            detailLink="#"
            discount={0}
            oldPrice={null}
            price={`${totalPrice} ${currency}`}
            priceInfo={priceInfo}
            onReserve={() => alert('Rezervasyon yapıldı!')}
            matchedDetail = {matchedDetail}
            facilities={amenities} // 👈 pass real facilities
            images= {images}
          />
        );
      })}
    </div>
  );
};

export default RoomCardList; 