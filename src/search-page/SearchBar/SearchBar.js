import React, {useState} from 'react';
import './SearchBar.css';
import LocationInput from './LocationInput';
import DateRangePickerComponent from './DateRangePicker';
import GuestSelector from './GuestSelector';
import SearchButton from './SearchButton';
import { useBooking } from '../../BookingContext';

export function SearchBar({ handleSearch }) {
  const {
    selectedLocation, setSelectedLocation,
    selectedNationality, setSelectedNationality,
    range, setRange,
    adults, setAdults,
    childrens, setChildren,
    childrenAges, setChildrenAges,
    rooms, setRooms,
    currency, setCurrency,
    loading, setLoading, 
  } = useBooking();
  
  const handleSearchClick = () => {
    if (handleSearch) {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-box">
      <LocationInput 
        onLocationSelect={setSelectedLocation}
        selectedLocation={selectedLocation}
       />
      <DateRangePickerComponent/>
      
      <GuestSelector/>
      <SearchButton onClick={handleSearchClick} />
    </div>
  );
}

export default SearchBar;