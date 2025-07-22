import React from 'react';
import './HelpPopup.css';
import { FaTimes } from 'react-icons/fa';

function HelpPopup({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="helppopup-backdrop" onClick={onClose}>
      <div className="helppopup-modal" onClick={e => e.stopPropagation()}>
        <div className="helppopup-header">
          <button className="helppopup-close" onClick={onClose} aria-label="Kapat">
            <span className="helppopup-close-icon"><FaTimes size={24} /></span>
          </button>
          <span className="helppopup-title">Yardım</span>
        </div>
        <div className="helppopup-content">
          <h2 className="helppopup-main-title">Tripora Yardım Merkezi</h2>
          <div className="helppopup-desc">
            Sıkça sorulan sorular, rezervasyon işlemleri, ödeme, iptal ve diğer konular hakkında bilgi almak için bu alanı kullanabilirsiniz.<br/><br/>
            Herhangi bir sorunuz olursa lütfen bizimle iletişime geçin.<br/>
            <b>E-posta:</b> destek@tripora.com<br/>
            <b>Telefon:</b> 0850 000 00 00
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPopup; 