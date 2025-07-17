import React from 'react';
import './RoomDetailTabs.css';

const tabs = [
  { key: 'about', label: 'Hakkında' },
  { key: 'rooms', label: 'Odalar' }
];

function RoomDetailTabs({ activeTab, onTabChange, onRoomsTabClick }) {
  return (
    <div className="room-detail-tabs">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={`tab-item${activeTab === tab.key ? ' active' : ''}`}
          onClick={() => {
            onTabChange(tab.key);
            if (tab.key === 'rooms' && typeof onRoomsTabClick === 'function') {
              onRoomsTabClick();
            }
          }}
        >
          {tab.label}
          <div className="tab-underline" />
        </div>
      ))}
    </div>
  );
}

export default RoomDetailTabs; 