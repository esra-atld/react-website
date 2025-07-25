import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import './GuestSelector.css';
import { useBooking } from '../../BookingContext';

function GuestSelector() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const guestRef = useRef(null);
  const { roomList, setRoomList } = useBooking();

  useEffect(() => {
    function handleClickOutside(event) {
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalGuests = roomList.reduce(
    (sum, room) => sum + room.adult + room.childAges.length,
    0
  );
  const guestText = `${totalGuests} Misafir, ${roomList.length} Oda`;

  const addRoom = () => {
    if (roomList.length < 5) {
      setRoomList([...roomList, { adult: 1, childAges: [] }]);
    }
  };

  const removeRoom = (index) => {
    const updated = roomList.filter((_, i) => i !== index);
    setRoomList(updated);
  };

  const updateCount = (index, type, operation) => {
    const updated = [...roomList];
    const room = updated[index];

    if (type === 'adult') {
      room.adult = Math.max(1, room.adult + operation);
    } else if (type === 'child') {
      if (operation === 1 && room.childAges.length < 5) {
        room.childAges.push(null); // null until selected
      } else if (operation === -1 && room.childAges.length > 0) {
        room.childAges.pop();
      }
    }

    setRoomList(updated);
  };

  return (
    <div className="guest-box" ref={guestRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
      <span className="guest-icon">
        <FaUser />
      </span>
      <span className="guest-text">{guestText}</span>

      {dropdownOpen && (
        <div className="guest-dropdown" onClick={(e) => e.stopPropagation()}>
          {roomList.map((room, index) => (
            <div
              key={index}
              style={{
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <strong>{index + 1}. Oda</strong>
                {index > 0 && (
                  <button
                    onClick={() => removeRoom(index)}
                    style={{
                      color: '#DC2626',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Odayı Kaldır
                  </button>
                )}
              </div>

              {/* Adults */}
              <div className="guest-row">
                <span>Yetişkin</span>
                <button
                  onClick={() => updateCount(index, 'adult', -1)}
                  disabled={room.adult <= 1}
                >
                  -
                </button>
                <span>{room.adult}</span>
                <button
                  onClick={() => updateCount(index, 'adult', 1)}
                  disabled={room.adult >= 5}
                >
                  +
                </button>
              </div>

              {/* Children */}
              <div className="guest-row">
                <span>Çocuk 0-12 Yaş</span>
                <button
                  onClick={() => updateCount(index, 'child', -1)}
                  disabled={room.childAges.length <= 0}
                >
                  -
                </button>
                <span>{room.childAges.length}</span>
                <button
                  onClick={() => updateCount(index, 'child', 1)}
                  disabled={room.childAges.length >= 5}
                >
                  +
                </button>
              </div>

              {/* Child Age Dropdowns */}
              {room.childAges.map((age, childIndex) => (
                <div key={childIndex} style={{ marginBottom: '8px' }}>
                  <label>{childIndex + 1}. Çocuk</label>
                  <select
                    value={age ?? ''}
                    onChange={(e) => {
                      const newRooms = [...roomList];
                      newRooms[index].childAges[childIndex] = parseInt(e.target.value);
                      setRoomList(newRooms);
                    }}
                    style={{
                      marginLeft: '8px',
                      padding: '6px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      width: '100%',
                    }}
                  >
                    <option value="">Yaşını Seçin</option>
                    {Array.from({ length: 13 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}

          {/* Add Room Button */}
          <button onClick={addRoom} className="add-room-button">
            Yeni Oda Ekle
          </button>
        </div>
      )}
    </div>
  );
}

export default GuestSelector;
