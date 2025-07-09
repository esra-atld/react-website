import React, { useState, useRef, useEffect } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { tr } from 'date-fns/locale';
import './DateRangePicker.css';

function formatRange(start, end) {
  if (!start || !end) return 'Check-in — Check-out';
  const aylar = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const gunler = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getDate()} ${aylar[s.getMonth()]}, ${gunler[s.getDay()]} - ${e.getDate()} ${aylar[e.getMonth()]}, ${gunler[e.getDay()]}`;
}

function DateRangePickerComponent() {
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [calendarOpen, setCalendarOpen] = useState(false);
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
            minDate={new Date()}
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