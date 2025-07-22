import React, { createContext, useContext, useState } from 'react';

// Create context
const BookingContext = createContext();

// Provider component
export const BookingProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedNationality, setSelectedNationality] = useState(null);
  const [range, setRange] = useState([{ startDate: null, endDate: null, key: 'selection' }]);
  const [adults, setAdults] = useState(1);
  const [childrens, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [currency, setCurrency] = useState('EUR');
  const [loading, setLoading] = useState(false);

  return (
    <BookingContext.Provider
      value={{
        selectedLocation, setSelectedLocation,
        selectedNationality, setSelectedNationality,
        range, setRange,
        adults, setAdults,
        childrens, setChildren,
        childrenAges, setChildrenAges,
        rooms, setRooms,
        currency, setCurrency,
        loading, setLoading
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Hook to use the context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
