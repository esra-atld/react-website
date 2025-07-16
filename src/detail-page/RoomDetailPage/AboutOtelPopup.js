import React, { useState } from 'react';
import './AboutOtelPopup.css';
import { FaTimes } from 'react-icons/fa';

function AboutOtelPopup({ open, onClose, themes = [], facilities = [] }) {
  const [activeTab, setActiveTab] = useState('features');
  if (!open) return null;
  return (
    <div className="aboutotel-popup-backdrop" onClick={onClose}>
      <div className="aboutotel-popup-modal large" onClick={e => e.stopPropagation()}>
        <div className="aboutotel-popup-header">
          <button className="aboutotel-popup-close" onClick={onClose} aria-label="Kapat">
            <span className="aboutotel-popup-close-icon"><FaTimes size={24} /></span>
          </button>
          <div className="aboutotel-popup-tabs-row">
            <span className={"aboutotel-popup-tab" + (activeTab === 'features' ? ' active' : '')} onClick={() => setActiveTab('features')}>İmkân ve Özellikler</span>
            <span className={"aboutotel-popup-tab" + (activeTab === 'about' ? ' active' : '')} onClick={() => setActiveTab('about')}>Hakkında</span>
          </div>
        </div>
        <div className="aboutotel-popup-content vertical">
          {activeTab === 'features' && <>
            <h2 className="aboutotel-popup-main-title">Konaklama yerinin tüm imkân ve özellikleri</h2>
            <div className="aboutotel-popup-blocks">
              {facilities.length === 0 ? <div>Veri yok</div> : facilities.map((facility, i) => (
                <div className="aboutotel-popup-feature-block" key={facility.title || facility.name || i}>
                  <div className="aboutotel-popup-feature-title-row">
                    {facility.icon && <span className="aboutotel-popup-feature-icon">{facility.icon}</span>}
                    <span className="aboutotel-popup-feature-title">{facility.title || facility.name}</span>
                  </div>
                  {facility.desc && Array.isArray(facility.desc) ? (
                    <ul className="aboutotel-popup-feature-desc-list">
                      {facility.desc.map((line, idx) => <li key={idx}>{line}</li>)}
                    </ul>
                  ) : facility.desc ? (
                    <div className="aboutotel-popup-feature-desc">{facility.desc}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </>}
          {activeTab === 'about' && (
            <div className="aboutotel-popup-about-content">
              <h3 className="aboutotel-popup-about-title">Bu konaklama yeri hakkında</h3>
              <div className="aboutotel-popup-about-desc">
                Lexi Las Vegas gece kulübü olanağı sunar, ayrıca Stratosfer Kulesi ve Sahara Las Vegas Kumarhanesi hedeflerine sadece 5 dakikalık sürüş mesafesinde olmanızı sağlar. Açık havuzda keyifli vakit geçirebilir, bir şeyler atıştırmak için 3 restoran arasından birini ziyaret edebilir veya 3 bar/dinlenme salonu arasından birinde bir şeyler içerek gevşeyebilirsiniz. Havuz kenarı barı, spor salonu ve teras; bu butik otel dâhilindeki diğer öne çıkan özellikler arasındadır. Misafirler oda servisi ve yardıma hazır personel ile ilgili harika yorumlarda bulunuyor.<br/><br/>
                <b>Diller</b><br/>
                İngilizce, İspanyolca
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutOtelPopup; 