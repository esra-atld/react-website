import React from 'react';
import Header from '../components/Header';

const dummyHotel = {
  name: 'Excalibur Hotel',
  address: 'Antalya, Belek',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  stars: 5,
  features: ['Ücretsiz Wi-Fi', '24 Saat Resepsiyon', 'Otopark', 'Spa & Wellness', 'Denize Sıfır', 'Açık Havuz', 'Fitness Merkezi', 'Çocuk Kulübü', 'Deniz Manzarası', 'Klima', 'Mini Bar']
};

const PaymentPage = () => {
  return (
    <div>
      <Header showSelectors={false} />
      <div style={{ marginTop: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', background: '#f8f9fa', padding: '40px 0' }}>
          {/* Sidebars sütunu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginLeft: 80 }}>
            {/* Otel Bilgisi Sidebar */}
            <div style={{
              width: 500,
              height: 500,
              background: '#fff',
              borderRadius: 28,
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: 48,
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', width: '100%' }}>
                <img src={dummyHotel.image} alt="Otel" style={{ width: 150, height: 150, borderRadius: 20, objectFit: 'cover', marginRight: 36, flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 36, fontWeight: 700, margin: 0, color: '#1E232C', textAlign: 'left', marginBottom: 12, maxWidth: 260, wordBreak: 'break-word' }}>{dummyHotel.name}</h3>
                  <div style={{ color: '#666', fontSize: 22, margin: '10px 0 10px 0', textAlign: 'left', maxWidth: 260, wordBreak: 'break-word' }}>{dummyHotel.address}</div>
                  <div style={{ color: '#FFD700', fontSize: 28, marginBottom: 0, textAlign: 'left' }}>{'★'.repeat(dummyHotel.stars)}</div>
                </div>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '32px 0 0 0',
                color: '#1E232C',
                fontSize: 17,
                width: '100%',
                lineHeight: 1.5,
                maxWidth: 420,
                maxHeight: 170,
                overflowY: 'auto',
                wordBreak: 'break-word',
                background: 'transparent',
              }}>
                {dummyHotel.features.slice(0, 3).map((f, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>• {f}</li>
                ))}
              </ul>
            </div>
            {/* Rezervasyon Bilgileriniz Sidebar */}
            <div style={{
              width: 500,
              height: 500,
              background: '#fff',
              borderRadius: 28,
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: 48,
              boxSizing: 'border-box',
            }}>
              <h3 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: '#1E232C', marginBottom: 20 }}>Rezervasyon Bilgileriniz</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                <div style={{ background: '#F5F6FA', borderRadius: 10, boxShadow: '0 1px 3px rgba(30,35,44,0.05)', padding: '10px 14px', display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <span style={{ color: '#222', fontWeight: 600, fontSize: 15, marginBottom: 2 }}>Giriş Tarihi</span>
                  <span style={{ color: '#222', fontSize: 15 }}>12.07.2024</span>
                </div>
                <div style={{ background: '#F5F6FA', borderRadius: 10, boxShadow: '0 1px 3px rgba(30,35,44,0.05)', padding: '10px 14px', display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <span style={{ color: '#222', fontWeight: 600, fontSize: 15, marginBottom: 2 }}>Çıkış Tarihi</span>
                  <span style={{ color: '#222', fontSize: 15 }}>15.07.2024</span>
                </div>
                <div style={{ background: '#F5F6FA', borderRadius: 10, boxShadow: '0 1px 3px rgba(30,35,44,0.05)', padding: '10px 14px', display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <span style={{ color: '#222', fontWeight: 600, fontSize: 15, marginBottom: 2 }}>Kişi Sayısı</span>
                  <span style={{ color: '#222', fontSize: 15 }}>2 Yetişkin</span>
                </div>
                <div style={{ background: '#F5F6FA', borderRadius: 10, boxShadow: '0 1px 3px rgba(30,35,44,0.05)', padding: '10px 14px', display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <span style={{ color: '#222', fontWeight: 600, fontSize: 15, marginBottom: 2 }}>Oda Tipi</span>
                  <span style={{ color: '#222', fontSize: 15 }}>Deluxe</span>
                </div>
              </div>
            </div>
            {/* Fiyat Özeti Sidebar */}
            <div style={{
              width: 500,
              height: 500,
              background: '#fff',
              borderRadius: 28,
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: 48,
              boxSizing: 'border-box',
            }}>
              <h3 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: '#1E232C', marginBottom: 20 }}>Fiyat Özeti</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F5F6FA', borderRadius: 10, padding: '12px 18px', fontSize: 17, color: '#222', fontWeight: 500 }}>
                  <span>Oda Fiyatı</span>
                  <span>₺12.000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F5F6FA', borderRadius: 10, padding: '12px 18px', fontSize: 17, color: '#222', fontWeight: 500 }}>
                  <span>İndirim Miktarı</span>
                  <span>-₺1.800</span>
                </div>
                <div style={{ height: 1, background: '#E0E0E0', margin: '18px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F5F6FA', borderRadius: 10, padding: '16px 18px', fontSize: 20, color: '#1E232C', fontWeight: 700 }}>
                  <span>Güncel Fiyat</span>
                  <span>₺10.200</span>
                </div>
              </div>
            </div>
          </div>
          {/* Sağda ana içerik alanı (Payment Side Bar) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
            <div style={{
              width: 1000,
              minHeight: 1000,
              background: '#fff',
              borderRadius: 32,
              boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
              padding: 64,
              boxSizing: 'border-box',
              marginLeft: 56,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: '#1E232C', margin: 0, marginBottom: 32 }}>Bilgilerinizi Girin</h2>
              <form style={{ width: '100%' }}>
                <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Ad</label>
                    <input type="text" placeholder="Adınız" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Soyad</label>
                    <input type="text" placeholder="Soyadınız" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Kart Numarası</label>
                  <input type="text" placeholder="•••• •••• •••• ••••" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                </div>
                <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Son Kullanma Tarihi</label>
                    <input type="text" placeholder="AA/YY" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>CVV</label>
                    <input type="text" placeholder="CVV" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>E-posta Adresi</label>
                  <input type="email" placeholder="ornek@mail.com" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Adres</label>
                  <input type="text" placeholder="Adresinizi girin" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                </div>
                <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Şehir</label>
                    <input type="text" placeholder="Şehir" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Posta Kodu</label>
                    <input type="text" placeholder="Posta Kodu" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Ülke</label>
                    <input type="text" placeholder="Ülke" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Bölge</label>
                    <input type="text" placeholder="Bölge" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                  </div>
                </div>
                <div style={{ marginBottom: 32 }}>
                  <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Telefon Numarası</label>
                  <input type="tel" placeholder="05xx xxx xx xx" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 17 }} />
                </div>
                <button type="submit" style={{ width: '100%', background: '#1668E3', color: '#fff', fontWeight: 700, fontSize: 20, border: 'none', borderRadius: 10, padding: '16px 0', cursor: 'pointer', marginTop: 8 }}>Ödemeyi Tamamla</button>
              </form>
            </div>
            {/* Özel İstek/Notlar Barı */}
            <div style={{
              width: 1000,
              height: 300,
              background: '#fff',
              borderRadius: 32,
              boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
              padding: 48,
              boxSizing: 'border-box',
              marginLeft: 56,
              marginTop: 32,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1E232C', margin: 0, marginBottom: 24 }}>Özel İstek/Notlar</h2>
              <textarea
                placeholder="Rezervasyonunuza özel bir isteğiniz veya notunuz varsa buraya yazabilirsiniz..."
                style={{
                  width: '100%',
                  height: 160,
                  borderRadius: 12,
                  border: '1px solid #E0E0E0',
                  fontSize: 18,
                  padding: 16,
                  resize: 'none',
                  color: '#1E232C',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {/* Harika Bir Tercihti Barı */}
            <div style={{
              width: 1000,
              height: 100,
              background: '#fff',
              borderRadius: 32,
              boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
              padding: 48,
              boxSizing: 'border-box',
              marginLeft: 56,
              marginTop: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: '#1E232C', textAlign: 'center', width: '100%' }}>
                Harika bir tercihti, iyi tatiller!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 