import React, { useState, useRef, useEffect } from 'react';
import './SortCriteriaButton.css';

const SORT_OPTIONS = [
  'İlk önerilen',
  'Fiyat: düşükten yükseğe',
  'Fiyat: yüksekten düşüğe',
  'Yıldız derecelendirmesi',
];

function SortCriteriaButton({ onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="sort-criteria-wrapper" ref={dropdownRef}>
      <span className="sort-label">Sıralama ölçütü:</span>
      <button
        className="sort-btn"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        {selected}
        <span className="sort-arrow">▼</span>
      </button>
      {open && (
        <ul className="sort-dropdown">
          {SORT_OPTIONS.map((option) => (
            <li
              key={option}
              className={option === selected ? 'selected' : ''}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortCriteriaButton; 