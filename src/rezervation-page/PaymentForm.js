import React, { useState } from 'react';
import './PaymentForm.css';

const PaymentForm = () => {
  // State and validation logic (copied from PaymentPage.js)
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [expiry, setExpiry] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Regexes
  const onlyLettersRegex = /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s'-]+$/;
  const onlyNumbersRegex = /^\d+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^\d{3,4}$/;

  // Handlers
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value && !onlyLettersRegex.test(value)) {
      setNameError("Lütfen sadece harf giriniz.");
    } else {
      setNameError("");
    }
  };
  const handleSurnameChange = (e) => {
    const value = e.target.value;
    setSurname(value);
    if (value && !onlyLettersRegex.test(value)) {
      setSurnameError("Lütfen sadece harf giriniz.");
    } else {
      setSurnameError("");
    }
  };
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setCardNumber(value);
    if (value && (!onlyNumbersRegex.test(value) || value.length < 13 || value.length > 19)) {
      setCardNumberError("Geçerli bir kart numarası giriniz.");
    } else {
      setCardNumberError("");
    }
  };
  const handleExpiryChange = (e) => {
    const value = e.target.value;
    setExpiry(value);
    if (value && !expiryRegex.test(value)) {
      setExpiryError("AA/YY formatında giriniz.");
    } else {
      setExpiryError("");
    }
  };
  const handleCvvChange = (e) => {
    const value = e.target.value;
    setCvv(value);
    if (value && !cvvRegex.test(value)) {
      setCvvError("3 veya 4 haneli CVV giriniz.");
    } else {
      setCvvError("");
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !emailRegex.test(value)) {
      setEmailError("Geçerli bir e-posta giriniz.");
    } else {
      setEmailError("");
    }
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (value && !onlyLettersRegex.test(value)) {
      setCityError("Lütfen sadece harf giriniz.");
    } else {
      setCityError("");
    }
  };
  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    setPostalCode(value);
    if (value && !onlyNumbersRegex.test(value)) {
      setPostalCodeError("Lütfen sadece rakam giriniz.");
    } else {
      setPostalCodeError("");
    }
  };
  const handleCountryChange = (e) => {
    const value = e.target.value;
    setCountry(value);
    if (value && !onlyLettersRegex.test(value)) {
      setCountryError("Lütfen sadece harf giriniz.");
    } else {
      setCountryError("");
    }
  };
  const handleRegionChange = (e) => {
    const value = e.target.value;
    setRegion(value);
    if (value && !onlyLettersRegex.test(value)) {
      setRegionError("Lütfen sadece harf giriniz.");
    } else {
      setRegionError("");
    }
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
    if (value && (!onlyNumbersRegex.test(value) || value.length < 10)) {
      setPhoneError("Geçerli bir telefon numarası giriniz.");
    } else {
      setPhoneError("");
    }
  };

  // Prevent submit if any error
  const hasError = [nameError, surnameError, cardNumberError, expiryError, cvvError, emailError, cityError, postalCodeError, countryError, regionError, phoneError].some(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasError) return;
    // ...submit logic...
  };

  return (
    <div className="payment-form-card">
      <h2 className="payment-form-title">Bilgilerinizi Girin</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Ad</label>
            <input
              type="text"
              placeholder="Adınız"
              className={`payment-form-input${nameError ? ' error' : ''}`}
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <div className="payment-form-error">{nameError}</div>}
          </div>
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Soyad</label>
            <input
              type="text"
              placeholder="Soyadınız"
              className={`payment-form-input${surnameError ? ' error' : ''}`}
              value={surname}
              onChange={handleSurnameChange}
            />
            {surnameError && <div className="payment-form-error">{surnameError}</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Kart Numarası</label>
            <input
              type="text"
              placeholder="•••• •••• •••• ••••"
              className={`payment-form-input${cardNumberError ? ' error' : ''}`}
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
            />
            {cardNumberError && <div className="payment-form-error">{cardNumberError}</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Son Kullanma Tarihi</label>
            <input
              type="text"
              placeholder="AA/YY"
              className={`payment-form-input${expiryError ? ' error' : ''}`}
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
            />
            {expiryError && <div className="payment-form-error">{expiryError}</div>}
          </div>
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">CVV</label>
            <input
              type="text"
              placeholder="CVV"
              className={`payment-form-input${cvvError ? ' error' : ''}`}
              value={cvv}
              onChange={handleCvvChange}
              maxLength={4}
            />
            {cvvError && <div className="payment-form-error">{cvvError}</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">E-posta Adresi</label>
            <input
              type="email"
              placeholder="ornek@mail.com"
              className={`payment-form-input${emailError ? ' error' : ''}`}
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <div className="payment-form-error">{emailError}</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Adres</label>
            <input
              type="text"
              placeholder="Adresinizi girin"
              className="payment-form-input"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Şehir</label>
            <input
              type="text"
              placeholder="Şehir"
              className={`payment-form-input${cityError ? ' error' : ''}`}
              value={city}
              onChange={handleCityChange}
            />
            {cityError && <div className="payment-form-error">{cityError}</div>}
          </div>
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Posta Kodu</label>
            <input
              type="text"
              placeholder="Posta Kodu"
              className={`payment-form-input${postalCodeError ? ' error' : ''}`}
              value={postalCode}
              onChange={handlePostalCodeChange}
            />
            {postalCodeError && <div className="payment-form-error">{postalCodeError}</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Ülke</label>
            <input
              type="text"
              placeholder="Ülke"
              className={`payment-form-input${countryError ? ' error' : ''}`}
              value={country}
              onChange={handleCountryChange}
            />
            {countryError && <div className="payment-form-error">{countryError}</div>}
          </div>
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Bölge</label>
            <input
              type="text"
              placeholder="Bölge"
              className={`payment-form-input${regionError ? ' error' : ''}`}
              value={region}
              onChange={handleRegionChange}
            />
            {regionError && <div className="payment-form-error">{regionError}</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Telefon Numarası</label>
            <input
              type="tel"
              placeholder="05xx xxx xx xx"
              className={`payment-form-input${phoneError ? ' error' : ''}`}
              value={phone}
              onChange={handlePhoneChange}
              maxLength={11}
            />
            {phoneError && <div className="payment-form-error">{phoneError}</div>}
          </div>
        </div>
        <button type="submit" className="payment-form-button" disabled={hasError}>Ödemeyi Tamamla</button>
      </form>
    </div>
  );
};

export default PaymentForm; 