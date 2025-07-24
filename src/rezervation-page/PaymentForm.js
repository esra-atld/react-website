import React, { useState, useEffect } from 'react';
import './PaymentForm.css';
import { useBooking } from '../BookingContext';
import { SetReservationInfo, CommitTransaction  } from '../services/bookingService'; 
import { FiClipboard, FiCheck } from 'react-icons/fi';

const PaymentForm = ({ rooms, transactionId }) => {
  const {
    selectedNationality,
    loading, setLoading
  } = useBooking();
  // State and validation logic
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [roomGuests, setRoomGuests] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reservationNumber, setReservationNumber] = useState("");
  const [copied, setCopied] = useState(false);

  const [loadingDots, setLoadingDots] = useState('');
    useEffect(() => {
      if (!loading) return;
      let count = 0;
      const interval = setInterval(() => {
        count = (count + 1) % 4;
        setLoadingDots('.'.repeat(count));
      }, 500);
      return () => clearInterval(interval);
    }, [loading]);

  useEffect(() => {
  if (rooms && rooms.length > 0) {
    let travellerIdCounter = 1;

    const initializedRooms = rooms.map(room => ({
      roomId: room.roomId || '',
      roomName: room.roomName || '',
      boardName: room.boardName || '',
      travellers: room.travellers?.map(traveller => {
        
        const travellerId = travellerIdCounter.toString();
        travellerIdCounter++;  // increment for next traveller
        
        let title = traveller.title ?? null;
        let gender = null;
        
        let birthDate = "0001-01-01T00:00:00";
        if (traveller.age > 0) {
          const today = new Date();
          const birth = new Date(today);
          birth.setFullYear(today.getFullYear() - traveller.age);
          birthDate = birth.toISOString();
        }

        if (traveller.type === 2) { // Child
          title = 5; // Child
          gender = 1; // default to male for children if no input
        }

        return {
          contactPhone: { countryCode: "", areaCode: "", phoneNumber: "" },
          documents: [],
          insertFields: [],
          identityNumber: "",
          destinationAddress: {},
          travellerId: travellerId,
          type: traveller.type || 1, // 1 = adult, 2 = child
          title: title,
          name: '',
          surname: '',
          isLeader: traveller.isLeader || false,
          birthDate: birthDate,
          age: traveller.age || 0,
          gender: gender,
          leaderEmail: '',
          nationality: { twoLetterCode: traveller.nationality || selectedNationality.id },
          passportInfo: { expireDate: "0001-01-01T00:00:00" },
          address: {
            contactPhone: {},
            email: "",
            address: "",
            zipCode: "",
            city: { id: "", name: "" },
            country: { id: selectedNationality.id, name: selectedNationality.name }
          },
          // validation fields
          nameError: '',
          surnameError: '',
          titleError: '',
          nationalityError: '',
        };
      }) || []
    }));
    
      setRoomGuests(initializedRooms);
    }
  }, [rooms]);

  console.log("rooms:", roomGuests)

  // Regexes
  const onlyLettersRegex = /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s'-]+$/;
  const onlyNumbersRegex = /^\d+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handlers
  const handleContactInfoChange = (field, value) => {
    let cleanedValue = value;
    let currentError = "";

    switch (field) {
      case "email":
        setEmail(value);
        currentError = value && !emailRegex.test(value) ? "Geçerli bir e-posta giriniz." : "";
        setEmailError(currentError);
        break;
      case "phone":
        cleanedValue = value.replace(/\D/g, '');
        setPhone(cleanedValue);
        currentError = cleanedValue && (!onlyNumbersRegex.test(cleanedValue) || cleanedValue.length < 10) ? "Geçerli bir telefon numarası giriniz." : "";
        setPhoneError(currentError);
        break;
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(value);
        currentError = value && !onlyLettersRegex.test(value) ? "Lütfen sadece harf giriniz." : "";
        setCityError(currentError);
        break;
      case "zipCode":
        setZipCode(value);
        currentError = value && !onlyNumbersRegex.test(value) ? "Lütfen sadece rakam giriniz." : "";
        setZipCodeError(currentError);
        break;
      case "country":
        setCountry(value);
        currentError = value && !onlyLettersRegex.test(value) ? "Lütfen sadece harf giriniz." : "";
        setCountryError(currentError);
        break;
      case "region":
        setRegion(value);
        currentError = value && !onlyLettersRegex.test(value) ? "Lütfen sadece harf giriniz." : "";
        setRegionError(currentError);
        break;
      default:
        return; // unknown field
    }

    // Update each traveller's address with new contact info where relevant
    if (["email", "phone", "address", "city", "zipCode", "country"].includes(field)) {
      setRoomGuests(prevRoomGuests =>
        prevRoomGuests.map(room => ({
          ...room,
          travellers: room.travellers.map(traveller => {
            // Clone old address
            const newAddress = { ...traveller.address };

            switch (field) {
              case "email":
                newAddress.email = value;
                // If the current traveller is a leader, also update their specific leaderEmail field
                if (traveller.isLeader) {
                  return { ...traveller, address: newAddress, leaderEmail: value };
                }
                break;
              case "phone":
                // Assuming contactPhone is an object with a 'number' property
                newAddress.contactPhone = { ...newAddress.contactPhone, number: cleanedValue };
                break;
              case "address":
                newAddress.address = value;
                break;
              case "city":
                // Update the 'name' property of the city object
                newAddress.city = { ...newAddress.city, name: value };
                break;
              case "zipCode":
                newAddress.zipCode = value;
                break;
              case "country":
                // Update the 'name' property of the country object. If 'id' is also needed,
                // you'd typically have a mapping or fetch an ID based on the country name.
                newAddress.country = { ...newAddress.country, name: value };
                break;
              // 'region' is handled at the top-level form state, not per traveller address in this structure.
            }

            return {
              ...traveller,
              address: newAddress,
            };
          }),
        }))
      );
    }
  };


  const handleTravellerChange = (e, roomIndex, travellerIndex, field) => {
    
    let value = e.target.value;

    // Eğer 'title' alanıysa, integer yap
    if (field === 'title') {
      value = parseInt(value, 10);
    }

    setRoomGuests(prevRoomGuests =>
      prevRoomGuests.map((room, rIdx) => {
        if (rIdx !== roomIndex) return room;

        return {
          ...room,
          travellers: room.travellers.map((traveller, tIdx) => {
            if (tIdx !== travellerIndex) return traveller;

            // Validation sadece bazı alanlar için
            const error = ['name', 'surname', 'nationality'].includes(field)
              ? validateTravellerField(field, value)
              : (field === 'title' && (value === null || value === "" )) ? "Unvan boş bırakılamaz." : ''; // Also check for empty string for select
            
            let gender = traveller.gender;
            if (field === 'title') {
            if (value === 1) gender = 1; // Mr → Male (1)
            else if ([2, 3, 4].includes(value)) gender = 0; // Ms, Mrs, Miss → Female (0)
            }
            return {
              ...traveller,
              [field]: value,
              gender: gender,             
              [`${field}Error`]: error,
            };
          }),
        };
      })
    );
  };


  const validateTravellerField = (field, value) => {
    switch (field) {
      case 'name':
      case 'surname':
      case 'nationality':
        return value && !onlyLettersRegex.test(value) ? "Lütfen sadece harf giriniz." : "";
      default:
        return "";
    }
  };

  const hasTravellerErrors = roomGuests.some(room =>
    room.travellers.some(t =>
      !t.name || !t.surname || t.title === null || t.title === "" || // Check for null or empty string for title
      t.nameError || t.surnameError || t.titleError || t.nationalityError
    )
  );
  // Prevent submit if any error
  const hasError = [
    emailError, cityError,
    zipCodeError, countryError, regionError, phoneError
  ].some(Boolean) || hasTravellerErrors || !email || !address || !city || !zipCode || !country || !phone;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasError) {
      console.log("Form has errors, cannot submit:", {
        emailError, cityError, zipCodeError, countryError, regionError, phoneError, hasTravellerErrors, email, address, city, zipCode, country, phone
      });
      return;
    }
    console.log("Form validated. Submitting reservation...");
    submitReservation();
  };

  const submitReservation = async () => {
    try {
      // Prepare travellers array (flattened)
      const travellers = roomGuests.flatMap(room => room.travellers.map(traveller => {
        const { nameError, surnameError, titleError, nationalityError, ...cleanTraveller } = traveller;
        return cleanTraveller;
      }));

      travellers[0].isLeader=true;
      
      const setReservationPayload = {
        transactionId,
        travellers,
        agencyReservationNumber: "",
        reservationNote: ""
      };

      //Set Reservation Info
      const setResponse = await SetReservationInfo(setReservationPayload);

      // Commit the transaction
      setLoading(true);
      const commitResponse = await CommitTransaction({ transactionId });

      if(commitResponse.header.success === false || setResponse.header.success === false){
        throw new Error(commitResponse.header.messages[0].message || setResponse.header.messages[0].message);
      }
      console.log("CommitTransaction success:", commitResponse);
      console.log("SetReservationInfo success:", setResponse);

      setReservationNumber(commitResponse.body.reservationNumber);
      setLoading(false)
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Reservation failed:", error);
      setLoading(false)
      setShowSuccessModal(false);
      alert("Rezervasyon sırasında bir hata oluştu.");
    }
  };





  return (
    <div className="payment-form-card">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div>{`Tripora${loadingDots}`}</div>
        </div>
      )}
      <h2 className="payment-form-title">Misafir Bilgilerini Girin</h2>

      <form className="payment-form" onSubmit={handleSubmit}>
        {roomGuests.map((room, roomIndex) => (
          <div key={`room-${room.roomId}-${roomIndex}`} style={{ marginBottom: '40px', border: '1px solid #eee', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
            <h3 className="payment-form-subtitle" style={{ marginBottom: '20px', color: '#007bff' }}>
              {room.roomName} - ({room.boardName})
            </h3>
            {room.travellers.map((traveller, travellerIndex) => (
              <div key={traveller.travellerId} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px dashed #f0f0f0' }}>
                <h4 style={{ marginBottom: '15px', color: '#333' }}>
                  Misafir {travellerIndex + 1} ({traveller.type === 1 ? 'Yetişkin' : 'Çocuk'})
                </h4>
                <div className="payment-form-row">
                  <div style={{ flex: 1 }}>
                    <label className="payment-form-label">Unvan <span style={{ color: 'red' }}>*</span></label>
                    <select
                      className={`payment-form-input${traveller.titleError || traveller.title === null || traveller.title === "" ? ' error' : ''}`}
                      value={traveller.title === null ? "" : traveller.title} // Handle null for initial state
                      onChange={(e) => handleTravellerChange(e, roomIndex, travellerIndex, 'title')}
                      required
                      disabled={traveller.type === 2} // Disable for children

                    >
                      <option value="">Seçiniz</option>
                      <option value={1}>Mr</option>
                      <option value={2}>Ms</option>
                      <option value={3}>Mrs</option>
                      <option value={4}>Miss</option>
                      <option value={5}>Child</option>
                    </select>
                    {(traveller.titleError || traveller.title === null || traveller.title === "") && <div className="payment-form-error">{traveller.titleError || "Unvan boş bırakılamaz."}</div>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="payment-form-label">Ad <span style={{ color: 'red' }}>*</span></label>
                    <input
                      type="text"
                      placeholder="Adınız"
                      className={`payment-form-input${traveller.nameError || !traveller.name ? ' error' : ''}`}
                      value={traveller.name}
                      onChange={(e) => handleTravellerChange(e, roomIndex, travellerIndex, 'name')}
                      required
                    />
                    {(traveller.nameError || !traveller.name) && <div className="payment-form-error">{traveller.nameError || "Ad boş bırakılamaz."}</div>}
                  </div>
                </div>
                <div className="payment-form-row">
                  <div style={{ flex: 1 }}>
                    <label className="payment-form-label">Soyad <span style={{ color: 'red' }}>*</span></label>
                    <input
                      type="text"
                      placeholder="Soyadınız"
                      className={`payment-form-input${traveller.surnameError || !traveller.surname ? ' error' : ''}`}
                      value={traveller.surname}
                      onChange={(e) => handleTravellerChange(e, roomIndex, travellerIndex, 'surname')}
                      required
                    />
                    {(traveller.surnameError || !traveller.surname) && <div className="payment-form-error">{traveller.surnameError || "Soyad boş bırakılamaz."}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <h2 className="payment-form-title" style={{ marginTop: '20px' }}>İletişim ve Adres Bilgileri</h2>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">E-posta Adresi <span style={{ color: 'red' }}>*</span></label>
            <input
              type="email"
              placeholder="ornek@mail.com"
              className={`payment-form-input${emailError || !email ? ' error' : ''}`}
              value={email}
              onChange={(e) => handleContactInfoChange('email', e.target.value)}
              required
            />
            {(emailError || !email) && <div className="payment-form-error">{emailError || "E-posta adresi boş bırakılamaz."}</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Adres <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              placeholder="Adresinizi girin"
              className={`payment-form-input${!address ? ' error' : ''}`}
              value={address}
              onChange={(e) => handleContactInfoChange('address', e.target.value)}
              required
            />
            {!address && <div className="payment-form-error">Adres boş bırakılamaz.</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Şehir <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              placeholder="Şehir"
              className={`payment-form-input${cityError || !city ? ' error' : ''}`}
              value={city}
              onChange={(e) => handleContactInfoChange('city', e.target.value)}
              required
            />
            {(cityError || !city) && <div className="payment-form-error">{cityError || "Şehir boş bırakılamaz."}</div>}
          </div>
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Posta Kodu <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              placeholder="Posta Kodu"
              className={`payment-form-input${zipCodeError || !zipCode ? ' error' : ''}`}
              value={zipCode}
              onChange={(e) => handleContactInfoChange('zipCode', e.target.value)}
              required
            />
            {(zipCodeError || !zipCode) && <div className="payment-form-error">{zipCodeError || "Posta kodu boş bırakılamaz."}</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Ülke <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              placeholder="Ülke"
              className={`payment-form-input${countryError || !country ? ' error' : ''}`}
              value={country}
              onChange={(e) => handleContactInfoChange('country', e.target.value)}
              required
            />
            {(countryError || !country) && <div className="payment-form-error">{countryError || "Ülke boş bırakılamaz."}</div>}
          </div>
        </div>
        <div className="payment-form-row">
          <div style={{ flex: 1 }}>
            <label className="payment-form-label">Telefon Numarası <span style={{ color: 'red' }}>*</span></label>
            <input
              type="tel"
              placeholder="05xx xxx xx xx"
              className={`payment-form-input${phoneError || !phone ? ' error' : ''}`}
              value={phone}
              onChange={(e) => handleContactInfoChange('phone', e.target.value)}
              maxLength={11}
              required
            />
            {(phoneError || !phone) && <div className="payment-form-error">{phoneError || "Telefon numarası boş bırakılamaz."}</div>}
          </div>
        </div>
        <button type="submit" className="payment-form-button" disabled={hasError || loading}>
          Rezervasyonu Tamamla
        </button>
      </form>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-in">
            <h3>Rezervasyon Başarılı!</h3>
            <p>
              Rezervasyon Numaranız:
              <strong style={{ marginLeft: 8 }}>{reservationNumber}</strong>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(reservationNumber);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                title="Kopyala"
                style={{
                  marginLeft: 10,
                  padding: '6px 8px',
                  background: '#f1f3f5',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease',
                }}
              >
                {copied ? <FiCheck color="#198754" /> : <FiClipboard />}
              </button>
            </p>
            {copied && <p style={{ color: "green", marginTop: 5 }}>Kopyalandı!</p>}
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{ marginTop: 20 }}
            >
              Tamam
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default PaymentForm;