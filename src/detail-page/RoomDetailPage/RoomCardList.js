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

const RoomCardList = () => {
  return (
    <div className="room-card-list" style={{ marginTop: 32 }}>
      {sampleRooms.map((room, idx) => (
        <RoomCard key={idx} {...room} />
      ))}
    </div>
  );
};

export default RoomCardList; 