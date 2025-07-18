import React, { useState, useRef, useEffect } from 'react';
import './RoomSelectionBar.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { tr } from 'date-fns/locale';
import { FaRegCalendarAlt, FaUser } from 'react-icons/fa';

function formatRange(start, end) {
  if (!start || !end) return 'Check-in — Check-out';
  const aylar = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const gunler = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getDate()} ${aylar[s.getMonth()]} , ${gunler[s.getDay()]} - ${e.getDate()} ${aylar[e.getMonth()]}, ${gunler[e.getDay()]}`;
}

export default function RoomSelectionBar() {
  // Datepicker state
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [availableMinDate, setAvailableMinDate] = useState(new Date());
  const [availableMaxDate, setAvailableMaxDate] = useState(null);
  const dateBoxRef = useRef(null);

  // Guest selector state
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const guestRef = useRef(null);
  const [adults, setAdults] = useState(1);
  const [childrens, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [rooms, setRooms] = useState(1);

  useEffect(() => {
    function handleClickOutside(event) {
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

  const handleDateRangeChange = (item) => {
    setRange([item.selection]);
    if (item.selection.startDate && item.selection.endDate && item.selection.startDate.getTime() !== item.selection.endDate.getTime()) {
      setTimeout(() => setCalendarOpen(false), 1000);
    }
  };

  const totalGuests = adults + childrens;
  const guestText = `${totalGuests} Misafir, ${rooms} Oda`;

  const updateChildAge = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  return (
    <div className="room-selection-bar">
      <h4 className="room-selection-bar-title">Oda seçimi</h4>
      <div className="room-selection-bar-row">
        <div
          className="room-detail-datepicker"
          ref={dateBoxRef}
          onClick={() => setCalendarOpen(true)}
          tabIndex={0}
        >
          <span className="room-detail-datepicker-icon">
            <FaRegCalendarAlt />
          </span>
          <span className="room-detail-datepicker-text">
            {formatRange(range[0].startDate, range[0].endDate)}
          </span>
          {calendarOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, maxWidth: 320, marginTop: 12 }} onClick={e => e.stopPropagation()}>
              <DateRange
                minDate={availableMinDate}
                maxDate={availableMaxDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                editableDateInputs={false}
                moveRangeOnFirstSelection={false}
                ranges={range}
                onChange={handleDateRangeChange}
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
        <div
          className="room-detail-guestselector"
          ref={guestRef}
          tabIndex={0}
          onClick={() => setGuestDropdownOpen((open) => !open)}
        >
          <span className="room-detail-guestselector-icon">
            <FaUser />
          </span>
          <span className="room-detail-guestselector-text">{guestText}</span>
          {guestDropdownOpen && (
            <div style={{ 
              position: 'absolute', 
              top: '100%', 
              left: 0, 
              zIndex: 120, 
              background: '#fff', 
              borderRadius: 16, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)', 
              padding: '20px', 
              minWidth: 280,
              border: '1px solid #E5E7EB',
              marginTop: 8
            }} onClick={e => e.stopPropagation()}>
              {/* Yetişkin */}
              <div className="room-detail-dropdown-row">
                <div className="room-detail-dropdown-label">Yetişkin</div>
                <div className="room-detail-dropdown-desc">13 yaş ve üzeri</div>
                <div className="room-detail-dropdown-value-group">
                  <button className="guest-incdec-btn" aria-label="Yetişkin sayısını azalt" onClick={e => { e.stopPropagation(); setAdults(Math.max(1, adults - 1)); }} disabled={adults <= 1}>-</button>
                  <span className="room-detail-dropdown-value">{adults}</span>
                  <button className="guest-incdec-btn" aria-label="Yetişkin sayısını artır" onClick={e => { e.stopPropagation(); setAdults(Math.min(10, adults + 1)); }} disabled={adults >= 10}>+</button>
                </div>
              </div>
              {/* Çocuk */}
              <div className="room-detail-dropdown-row">
                <div className="room-detail-dropdown-label">Çocuk</div>
                <div className="room-detail-dropdown-desc">0-12 yaş</div>
                <div className="room-detail-dropdown-value-group">
                  <button className="guest-incdec-btn" aria-label="Çocuk sayısını azalt" onClick={e => { e.stopPropagation(); setChildren(Math.max(0, childrens - 1)); }} disabled={childrens <= 0}>-</button>
                  <span className="room-detail-dropdown-value">{childrens}</span>
                  <button className="guest-incdec-btn" aria-label="Çocuk sayısını artır" onClick={e => { e.stopPropagation(); setChildren(Math.min(6, childrens + 1)); }} disabled={childrens >= 6}>+</button>
                </div>
              </div>
              {/* Oda */}
              <div className="room-detail-dropdown-row">
                <div className="room-detail-dropdown-label">Oda</div>
                <div className="room-detail-dropdown-desc">Oda sayısı</div>
                <div className="room-detail-dropdown-value-group">
                  <button className="guest-incdec-btn" aria-label="Oda sayısını azalt" onClick={e => { e.stopPropagation(); setRooms(Math.max(1, rooms - 1)); }} disabled={rooms <= 1}>-</button>
                  <span className="room-detail-dropdown-value">{rooms}</span>
                  <button className="guest-incdec-btn" aria-label="Oda sayısını artır" onClick={e => { e.stopPropagation(); setRooms(Math.min(5, rooms + 1)); }} disabled={rooms >= 5}>+</button>
                </div>
              </div>
              {/* Çocuk Yaş Seçimi */}
              {childrens > 0 && (
                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
                  <div className="room-detail-dropdown-label" style={{ marginBottom: 16 }}>Yaş (zorunlu)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {childrenAges.map((age, index) => (
                      <div key={index} className="guest-age-row">
                        <div className="room-detail-dropdown-age-label">Çocuk {index + 1}</div>
                        <select
                          className={`room-detail-dropdown-age-select${age === null ? ' invalid' : ''}`}
                          value={age === null ? '' : age}
                          onChange={e => updateChildAge(index, parseInt(e.target.value))}
                        >
                          {age === null && <option value="">Yaş seçin</option>}
                          {Array.from({ length: 13 }, (_, i) => (
                            <option key={i} value={i}>{i} yaşında</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <button className="room-detail-search-btn" type="button">
          <span className="room-detail-search-btn-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2"/>
              <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="room-detail-search-btn-text">Aramayı Değiştir</span>
        </button>
      </div>
    </div>
  );
} 