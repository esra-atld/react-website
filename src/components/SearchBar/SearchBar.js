import React from 'react';
import './SearchBar.css';
import CurrencySelect from './CurrencySelect';
import NationalitySelect from './NationalitySelect';
import LocationInput from './LocationInput';
import DateRangePickerComponent from './DateRangePicker';
import GuestSelector from './GuestSelector';
import SearchButton from './SearchButton';

function SearchBar() {
  return (
    <div className="search-bar-box">
      <CurrencySelect />
      <NationalitySelect />
      <LocationInput />
      <DateRangePickerComponent />
      <GuestSelector />
      <SearchButton />
    </div>
  );
}

export default SearchBar; 