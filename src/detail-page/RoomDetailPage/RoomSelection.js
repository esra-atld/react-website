import React from 'react';
import DateRangePicker from '../../search-page/SearchBar/DateRangePicker';
import GuestSelector from '../../search-page/SearchBar/GuestSelector';
import './RoomSelection.css';

const RoomSelection = () => {
  return (
    <div className="room-selection-row minimal">
      <DateRangePicker />
      <GuestSelector />
    </div>
  );
};

export default RoomSelection; 