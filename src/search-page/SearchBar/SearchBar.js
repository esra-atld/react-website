import React, {useState} from 'react';
import './SearchBar.css';
import CurrencySelect from './CurrencySelect';
import NationalitySelect from './NationalitySelect';
import LocationInput from './LocationInput';
import DateRangePickerComponent from './DateRangePicker';
import GuestSelector from './GuestSelector';
import SearchButton from './SearchButton';

export function SearchBar() {
  
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="search-bar-box">
      <CurrencySelect />
      <NationalitySelect />
      <LocationInput onLocationSelect={setSelectedLocation} />
      <DateRangePickerComponent selectedLocation={selectedLocation} />
      <GuestSelector />
      <SearchButton />
    </div>
  );
}

export default SearchBar;