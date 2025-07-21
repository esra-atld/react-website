import logo from './logo.svg';
import './App.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SearchBar from './search-page/SearchBar/SearchBar';
import PopularDestinations from './rezervation-page/PopularDestinations/PopularDestinations';
import NationalitySelect from './search-page/SearchBar/NationalitySelect';
import CurrencySelect from './search-page/SearchBar/CurrencySelect';
import DetailPage from './detail-page/DetailPage';
import RoomDetailPage from './detail-page/RoomDetailPage';
import Header from './components/Header';
import { SearchSuggestionType } from './search-page/SearchBar/LocationInput';
import { hotelPriceSearch, locationPriceSearch } from './services/priceSearchService';
import { BookingProvider } from './BookingContext';
import { useBooking } from './BookingContext';
import PaymentPage from './pages/PaymentPage';


// Ana sayfa bileşeni
function HomePage({ handleSearch }) {
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currencyRef = useRef(null);

  const [nationality, setNationality] = useState('TUR');
  const [nationalityDropdownOpen, setNationalityDropdownOpen] = useState(false);
  const nationalityRef = useRef(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateBoxRef = useRef(null);

  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const guestRef = useRef(null);
  


  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
        setNationalityDropdownOpen(false);
      }
      if (dateBoxRef.current && !dateBoxRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setGuestDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (childrens > childrenAges.length) {
      setChildrenAges([...childrenAges, null]);
    } else if (childrens < childrenAges.length) {
      setChildrenAges(childrenAges.slice(0, childrens));
    }
  }, [childrens, childrenAges.length]);

  const totalGuests = adults + childrens;
  const guestText = `${totalGuests} Misafir, ${rooms} Oda`;

  const updateChildAge = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  return (
    <div className="App">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
          {`
          body {
              font-family: 'Inter', sans-serif;
          }
          `}
      </style>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div>Yükleniyor...</div>
        </div>
      )}
      <Header 
        selectedNationality={selectedNationality} 
        onNationalityChange={setSelectedNationality} 
        selectedCurrency={currency}
        onCurrencyChange={setCurrency}
      />

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '40px' }}>
          <SearchBar
          handleSearch={handleSearch}
          />
      </div>

      <div className="PD-container"> 
        <PopularDestinations />
      </div>  

    </div>
  );
}
export function toDateOnlyString(date) {
  return date.getFullYear() + '-' 
       + String(date.getMonth() + 1).padStart(2, '0') + '-' 
       + String(date.getDate()).padStart(2, '0');
}

function AppRoutes() {
  const {
    selectedLocation, setSelectedLocation,
    selectedNationality, setSelectedNationality,
    range, setRange,
    loading, setLoading,
    adults, setAdults,
    childrenAges, setChildrenAges,
    children, setChildren,
    rooms, setRooms,
    currency, setCurrency,
  } = useBooking();


  const navigate = useNavigate();

  const handleSearch = async () => {

    setLoading(true);

    let arrivalLocations = [];

    if (selectedLocation) {
      if (selectedLocation.type === SearchSuggestionType.Hotel && selectedLocation.hotel?.id) {
        arrivalLocations.push({ id: selectedLocation.hotel.id, name: selectedLocation.hotel.name });
      } else if (selectedLocation.type === SearchSuggestionType.CityOrDestination && selectedLocation.city?.id) {
        arrivalLocations.push({ id: selectedLocation.city.id, type: selectedLocation.type });
      }
    }

    const requestData = {
      checkAllotment: true,
      checkStopSale: true,
      getOnlyDiscountedPrice: false,
      getOnlyBestOffers: true,
      productType: 2,
      roomCriteria: [
      { adult: adults, childAges: childrenAges }
      ],
      nationality: selectedNationality?.id || "TR",
      checkIn: range[0].startDate ? toDateOnlyString(new Date(range[0].startDate)) 
                            : toDateOnlyString(new Date()),
      night: range[0].endDate && range[0].startDate 
        ? Math.max(1, Math.ceil((new Date(range[0].endDate) - new Date(range[0].startDate)) / (1000 * 60 * 60 * 24)))
      : 1,
      currency: currency?.code || "EUR",
      culture: "tr-TR"
    };

    try {
      
      if(selectedLocation.type === SearchSuggestionType.Hotel ) {
          requestData.Products = [];
          requestData.Products.push(selectedLocation.hotel.id);
          const data = await hotelPriceSearch(requestData);
          if(!data.body || !data.body.hotels || data.body.hotels.length === 0) {
          alert("Bu şehirde otel bulunamadı.");
          navigate('/detail', { state: { hotels: [] } });
        }else{
          navigate('/detail', { state: { hotels: data.body.hotels } });
        }
      } else if (selectedLocation.type === SearchSuggestionType.CityOrDestination) {
        requestData.arrivalLocations = arrivalLocations;
        requestData.arrivalLocations[0].type = 2;
        const data = await locationPriceSearch(requestData);
        if(!data.body || !data.body.hotels || data.body.hotels.length === 0) {
          alert("Bu şehirde otel bulunamadı.");
          navigate('/detail', { state: { hotels: [] } });
        }else if(data.header.success === "false") {
          alert(data.Header.messages[0].message);
          navigate('/detail', { state: { hotels: [] } });
        }
        else{
          navigate('/detail', { state: { hotels: data.body.hotels } });
        }
      }
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }finally {
      setLoading(false);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            handleSearch={handleSearch}
          />
        }
      />
      <Route
        path="/detail"
        element={
          <DetailPage
            handleSearch={handleSearch}
          />
        }
      />
      <Route 
        path="/room/:id" 
        element={
        <RoomDetailPage 
        />
        } 
      />
      <Route
        path="/payment"
        element={<PaymentPage />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <BookingProvider>
        <AppRoutes />
      </BookingProvider>
    </Router>
  );
}


export default App;