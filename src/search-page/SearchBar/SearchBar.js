import React, {useState} from 'react';
import './SearchBar.css';
import LocationInput from './LocationInput';
import DateRangePickerComponent from './DateRangePicker';
import GuestSelector from './GuestSelector';
import SearchButton from './SearchButton';

export function SearchBar({ onSearch }) {
  
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div className="search-bar-box">
      <LocationInput onLocationSelect={setSelectedLocation} />
      <DateRangePickerComponent selectedLocation={selectedLocation} />
      <GuestSelector />
      <SearchButton onClick={handleSearchClick} />
    </div>
  );
}

export default SearchBar;