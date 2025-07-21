import React from 'react';
import parisImage from '../../assets/paris.jpg';
import lisbonImage from '../../assets/lisbon.jpg';
import './PopularDestinations.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ca } from 'date-fns/locale';
import { useBooking } from '../../BookingContext';
import { getProductInfo, searchRecommended } from '../../services/productInfoService';
import { toDateOnlyString } from '../../App'; 
import {  locationPriceSearch } from '../../services/priceSearchService';

const PopularDestinations = () => {
  const {
    loading, setLoading,
    selectedNationality,
    range, setRange,
    selectedLocation, setSelectedLocation,
    setAdults,
    setChildren,
    setRooms,
    childrenAges,
    currency, setCurrency
  } = useBooking();

  
  const destinations = [
    {
      id: "10830",
      name: 'İstanbul',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: "51446",
      name: 'Paris',
      image: parisImage
    },
    {
      id: "44617",
      name: 'Lizbon',
      image: lisbonImage
    },
    {
      id: "26020",
      name: 'Roma',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    }
  ];
  
  const navigate = useNavigate();
  
  const handleDestinationClick = async (destination) => {
    setLoading(true);
    const checkInDate = new Date();
    const checkOutDate = new Date();
    checkOutDate.setDate(checkInDate.getDate() + 5);
    setRange([{
      startDate: checkInDate,
      endDate: checkOutDate,
      key: 'selection'
    }]);

    setAdults(1);
    setChildren(0);
    setRooms(1);
    setSelectedLocation({
      type: 'CityOrDestination',
      city: { id: destination.id, name: destination.name }
    });
    setCurrency({ code: 'EUR', name: 'Euro' });
    const requestData = {
      checkAllotment: true,
      checkStopSale: true,
      getOnlyDiscountedPrice: false,
      getOnlyBestOffers: true,
      productType: 2,
      roomCriteria: [
        { adult: 1, childAges: [] }
      ],
      nationality: selectedNationality?.id || 'TR',
      checkIn: range[0].startDate ? toDateOnlyString(new Date(range[0].startDate)) 
                            : toDateOnlyString(new Date()),
      night: 5,
      currency: currency?.code || 'EUR',
      culture: 'tr-TR',
      arrivalLocations: [
        {
          id: destination.id,
          type: 2
        }
      ]
    };

    try {
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
    } catch (err) {
      console.error('Error during destination search:', err);
    } finally {
      setLoading(false);
    }



    /*
    try {

      const hotelsToSearch = await searchRecommended(destination.name);

      if (hotelsToSearch.length === 0) {
        alert(`No hotels found for ${destination.name}.`);
        navigate('/detail', { state: { hotels: [] } });
        return; 
      }

      const productRequests = hotelsToSearch.map(item => ({
        productType: 2,
        ownerProvider: 2,
        product: item.hotel.id,
        culture: 'tr-TR'
      }));

      // Fetch all product infos in parallel
      const productInfoResults = await Promise.all(
        productRequests.map(req => getProductInfo(req))
      );

      const hotelsList = productInfoResults.map(item => item.body.hotel);


      if(productInfoResults.length === 0) {
          alert("Bu şehirde otel bulunamadı.");
          navigate('/detail', { state: { hotels: [] } });
      }
      else{
          navigate('/detail', { state: { hotels: hotelsList } });
      }

      // TODO: Save results to state/context, or navigate to filtered result screen
    } catch (err) {
      console.error('Error during destination search:', err);
    } finally {
      setLoading(false);
    }
    */


  };


  return (
    <div className="popular-destinations">
      <h2 className="popular-destinations-heading">
        Popüler Otel Destinasyonları
      </h2>
      <div className="destinations-grid">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="destination-card"
            onClick={() => handleDestinationClick(destination)}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${destination.image})`
            }}
          >
            <span className="destination-name">
              {destination.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations; 