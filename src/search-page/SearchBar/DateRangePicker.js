import React, { useState, useRef, useEffect } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { tr } from 'date-fns/locale';
import './DateRangePicker.css';
import { SearchSuggestionType } from './LocationInput'; 
import { getCheckInDates } from '../../services/checkInDatesService'; 

function formatRange(start, end) {
  if (!start || !end) return 'Check-in — Check-out';
  const aylar = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const gunler = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getDate()} ${aylar[s.getMonth()]} ${s.getFullYear()}, ${gunler[s.getDay()]} - ${e.getDate()} ${aylar[e.getMonth()]} ${e.getFullYear()}, ${gunler[e.getDay()]}`;
}

function DateRangePickerComponent({ selectedLocation }) {
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [availableMinDate, setAvailableMinDate] = useState(null);
  const [availableMaxDate, setAvailableMaxDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]); // To store specific unavailable dates
  const [loadingDates, setLoadingDates] = useState(false);
  const [dateFetchError, setDateFetchError] = useState(null); // New state for error messages
  const dateBoxRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {
      if (dateBoxRef.current && !dateBoxRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Fetch available dates when selectedLocation changes
  useEffect(() => {
    async function fetchAvailableDatesForLocation() {
      
      if (selectedLocation) {
        setLoadingDates(true);
        setDateFetchError(null); 
        setRange([{ startDate: null, endDate: null, key: 'selection' }]); 
        setAvailableMinDate(null);
        setAvailableMaxDate(null);
        setUnavailableDates([]);

        try {
          /** @type {import('../services/checkInDateService').GetCheckInDatesRequestDto['ArrivalLocations']} */
          let arrivalLocations = [];

          if (selectedLocation.type === SearchSuggestionType.Hotel && selectedLocation.hotel?.id) {
            arrivalLocations.push({ Id: selectedLocation.hotel.id, Type: SearchSuggestionType.Hotel });
          } else if (selectedLocation.type === SearchSuggestionType.CityOrDestination && selectedLocation.city?.id) {
            arrivalLocations.push({ Id: selectedLocation.city.id, Type: SearchSuggestionType.CityOrDestination });
          }

          if (arrivalLocations.length > 0) {
            const requestDto = {
              ProductType: SearchSuggestionType.Hotel, 
              IncludeSubLocations: true, 
              Product: null, 
              ArrivalLocations: arrivalLocations
            };

            const data = await getCheckInDates(requestDto);
            
            
            if (data.Dates && data.Dates.length > 0) {
              const dates = data.Dates.map(dateStr => new Date(dateStr));
              setAvailableMinDate(dates[0]);
              setAvailableMaxDate(dates[dates.length - 1]);
              setUnavailableDates([]); 
            } else {
              setAvailableMinDate(new Date()); // No dates from API, default to today
              setAvailableMaxDate(null);
              setDateFetchError("Bu lokasyon için uygun tarih bulunamadı.");
            }
          } else {
            // If no valid location ID, reset to default behavior (minDate today)
            setAvailableMinDate(new Date());
            setAvailableMaxDate(null);
            setDateFetchError("Lütfen geçerli bir konum seçin.");
          }
        } catch (error) {
          console.error("Error fetching available check-in dates:", error);
          setAvailableMinDate(new Date()); // Default to today on error
          setAvailableMaxDate(null);
          setDateFetchError("Tarihleri alırken bir hata oluştu.");
        } finally {
          setLoadingDates(false);
        }
      } else {
        // If no location is selected yet, allow selection from today onwards
        setAvailableMinDate(new Date());
        setAvailableMaxDate(null);
        setUnavailableDates([]);
        setLoadingDates(false);
        setDateFetchError(null);
      }
    }

    fetchAvailableDatesForLocation();
  }, [selectedLocation]); // Dependency array includes selectedLocation

  const handleDateRangeChange = (item) => {
    setRange([item.selection]);
    // Close calendar after both start and end dates are selected and they are different
    if (item.selection.startDate && item.selection.endDate && item.selection.startDate.getTime() !== item.selection.endDate.getTime()) {
      setTimeout(() => setCalendarOpen(false), 1000);
    }
  };












  return (
    <div
      className="date-range-box"
      ref={dateBoxRef}
      onClick={() => setCalendarOpen(true)}
    >
      <span className="date-range-icon">
        <FaRegCalendarAlt />
      </span>
      <span className="date-range-text">
        {formatRange(range[0].startDate, range[0].endDate)}
      </span>
      {calendarOpen && (
        <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 100, maxWidth: 320 }} onClick={e => e.stopPropagation()}>
          <DateRange
          minDate={availableMinDate || new Date()}
          maxDate={availableMaxDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            editableDateInputs={false}
            onChange={item => {
              setRange([item.selection]);
              if (item.selection.startDate && item.selection.endDate && item.selection.startDate !== item.selection.endDate) setTimeout(() => setCalendarOpen(false), 1000);
            }}
            moveRangeOnFirstSelection={false}
            ranges={range}
            locale={tr}
            months={1}
            direction="horizontal"
            showMonthAndYearPickers={false}
            rangeColors={["#219EBC", "#8ECAE6"]}
            weekdayDisplayFormat="EEEEEE"
            showDateDisplay={false}
            staticRanges={[]}
            inputRanges={[]}
            dayContentRenderer={date => <span style={{fontFamily:'Inter,sans-serif',fontSize:'1rem'}}>{date.getDate()}</span>}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', background: '#fff', padding: '8px 8px', maxWidth: 320 }}
          />
        </div>
      )}
    </div>
  );
}

export default DateRangePickerComponent; 