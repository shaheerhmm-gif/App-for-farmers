import { useState, useEffect, useRef } from 'react';
import './index.css';

const formatCurrency = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const Avatar = ({ seed, size = 48 }) => (
  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=D4DFD0`} style={{ width: size, height: size, borderRadius: '50%', border: '2px solid var(--sage-light)' }} alt="" />
);

const Modal = ({ children, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <div className="modal-handle" />
      {children}
    </div>
  </div>
);

const StarRating = ({ rating, onRate, size = 24 }) => (
  <div style={{ display: 'flex', gap: 4 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} onClick={() => onRate?.(i)} style={{ fontSize: size, cursor: onRate ? 'pointer' : 'default', color: i <= rating ? '#F59E0B' : '#E5E7EB' }}>★</span>
    ))}
  </div>
);

// ============ SCROLL EXPLODE LOGIN - AWARD WINNING ============
const ScrollExplodeLogin = ({ onSelectRole }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e) => {
    const container = e.target;
    const progress = container.scrollHeight - container.clientHeight > 0
      ? Math.min(container.scrollTop / (container.scrollHeight - container.clientHeight), 1)
      : 0;
    setScrollProgress(progress);
  };

  // Wireframe circles - minimal, elegant
  const orbits = [
    { radius: 60, startAngle: 0 },
    { radius: 60, startAngle: 180 },
    { radius: 100, startAngle: 60 },
    { radius: 100, startAngle: 240 },
    { radius: 140, startAngle: 120 },
    { radius: 140, startAngle: 300 },
  ];

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#000000',
        cursor: 'default'
      }}
    >
      <div style={{ height: '350vh' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>

          {/* Dramatic Typography - THE HERO */}
          <div style={{
            position: 'absolute',
            top: '15%',
            textAlign: 'center',
            transform: `translateY(${scrollProgress * -100}px)`,
            opacity: Math.max(0, 1 - scrollProgress * 1.5),
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <h1 style={{
              fontSize: 'clamp(60px, 15vw, 140px)',
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.06em',
              lineHeight: 0.9
            }}>
              KHET
            </h1>
            <h1 style={{
              fontSize: 'clamp(60px, 15vw, 140px)',
              fontWeight: 800,
              color: '#22C55E',
              margin: 0,
              letterSpacing: '-0.06em',
              lineHeight: 0.9
            }}>
              BANDHU
            </h1>
          </div>

          {/* Minimal tagline */}
          <p style={{
            position: 'absolute',
            top: '52%',
            color: 'rgba(255,255,255,0.3)',
            fontSize: 12,
            letterSpacing: '0.3em',
            fontWeight: 500,
            opacity: Math.max(0, 1 - scrollProgress * 2),
            transform: `translateY(${scrollProgress * -50}px)`,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            FARM EQUIPMENT
          </p>

          {/* Central orbital system */}
          <div style={{
            position: 'absolute',
            width: 320,
            height: 320,
            opacity: scrollProgress > 0.6
              ? Math.max(0, 1 - (scrollProgress - 0.6) * 4) // Fade out quickly
              : (scrollProgress > 0.1 ? Math.min((scrollProgress - 0.1) * 1.5, 1) : 0),
            transform: `scale(${1 - Math.max(0, scrollProgress - 0.6)})`, // Shrink slightly as it leaves
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}>
            {/* Core circle */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 24,
              height: 24,
              border: '2px solid #22C55E',
              borderRadius: '50%',
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)'
            }} />

            {/* Orbiting wireframe circles */}
            {orbits.map((orbit, i) => {
              const angle = (orbit.startAngle + scrollProgress * 360) * (Math.PI / 180);
              const expandFactor = scrollProgress * 1.8;
              const x = Math.cos(angle) * orbit.radius * expandFactor;
              const y = Math.sin(angle) * orbit.radius * expandFactor;

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 12 + (i * 2),
                    height: 12 + (i * 2),
                    border: `1px solid ${i % 2 === 0 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(255,255,255,0.3)'}`,
                    borderRadius: '50%',
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              );
            })}

            {/* Connecting lines */}
            <svg style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%'
            }}>
              {[60, 120, 180, 240, 300, 360].map((angle, i) => {
                const rad = (angle + scrollProgress * 360) * (Math.PI / 180);
                const r = 80 * scrollProgress * 1.8;
                return (
                  <line
                    key={i}
                    x1="160"
                    y1="160"
                    x2={160 + Math.cos(rad) * r}
                    y2={160 + Math.sin(rad) * r}
                    stroke="rgba(34, 197, 94, 0.15)"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </div>

          {/* Progress text - elegant */}
          <div style={{
            position: 'absolute',
            bottom: 200,
            textAlign: 'center',
            opacity: scrollProgress > 0.5
              ? Math.max(0, 1 - (scrollProgress - 0.5) * 4) // Fade out before buttons
              : (scrollProgress > 0.3 ? Math.min((scrollProgress - 0.3) * 2, 1) : 0),
            transition: 'opacity 0.4s ease'
          }}>
            <span style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.15em'
            }}>
              {Math.round(scrollProgress * 100)}% LOADED
            </span>
          </div>

          {/* Scroll indicator - elegant line */}
          <div style={{
            position: 'absolute',
            bottom: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            opacity: Math.max(0, 1 - scrollProgress * 3),
            transition: 'opacity 0.3s ease'
          }}>
            <span style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.25em',
              fontWeight: 500
            }}>
              SCROLL
            </span>
            <div style={{
              width: 1,
              height: 50,
              background: 'linear-gradient(to bottom, rgba(34, 197, 94, 0.5), transparent)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: -2,
                width: 5,
                height: 5,
                background: '#22C55E',
                borderRadius: '50%',
                animation: 'scrollLine 2s ease-in-out infinite'
              }} />
            </div>
          </div>

          {/* Login options - POP cards */}
          <div style={{
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: `translateX(-50%)`,
            width: '100%',
            maxWidth: 480,
            padding: '0 24px',
            boxSizing: 'border-box',
            opacity: scrollProgress > 0.65 ? Math.min((scrollProgress - 0.65) * 3, 1) : 0,
            pointerEvents: scrollProgress > 0.75 ? 'auto' : 'none',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <p style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.35)',
              fontSize: 10,
              letterSpacing: '0.25em',
              marginBottom: 20,
              fontWeight: 500
            }}>
              SELECT YOUR ROLE
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button
                onClick={() => onSelectRole('customer')}
                style={{
                  flex: 1,
                  background: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.5)',
                  borderRadius: 12,
                  padding: '28px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'center',
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.1)'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
                  e.currentTarget.style.borderColor = '#22C55E';
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(34, 197, 94, 0.2)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.1)';
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>👨‍🌾</div>
                <p style={{ color: '#22C55E', fontSize: 16, fontWeight: 700, margin: 0, letterSpacing: '0.05em' }}>FARMER</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, margin: '8px 0 0' }}>Book Equipment</p>
              </button>

              <button
                onClick={() => onSelectRole('owner')}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  padding: '28px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'center',
                  boxShadow: '0 0 30px rgba(255,255,255,0.03)'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,255,255,0.08)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.03)';
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>🚜</div>
                <p style={{ color: 'white', fontSize: 16, fontWeight: 700, margin: 0, letterSpacing: '0.05em' }}>OWNER</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, margin: '8px 0 0' }}>Earn Money</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(45px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ============ LOGIN PAGE ============
const LoginPage = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep('otp'); }, 1500);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length >= 4) {
      setLoading(true);
      setTimeout(() => { setLoading(false); onLogin(userType); }, 1500);
    }
  };

  if (!userType) {
    return <ScrollExplodeLogin onSelectRole={setUserType} />;
  }

  return (
    <div className="login-container animate-fade">
      <button className="back-btn" onClick={() => setUserType(null)}>← वापस / Back</button>

      <div className="login-logo">{userType === 'customer' ? '👨‍🌾' : '🚜'}</div>
      <h1 className="login-title" style={{ fontSize: 24 }}>{userType === 'customer' ? 'किसान लॉगिन' : 'मालिक लॉगिन'}</h1>
      <p className="login-subtitle">{userType === 'customer' ? 'Farmer Login' : 'Owner Login'}</p>

      <div className="login-card animate-slide-up">
        {step === 'phone' ? (
          <>
            <div className="input-label">📱 मोबाइल नंबर / Mobile Number</div>
            <p className="input-hint">अपना फोन नंबर डालें / Enter your phone</p>
            <div className="phone-input-group">
              <span className="country-code">+91</span>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="98765 43210" className="phone-input" autoFocus />
            </div>
            <button onClick={handleSendOTP} disabled={phone.length < 10 || loading} className={`submit-btn ${phone.length >= 10 ? 'active' : ''}`}>
              {loading ? <span className="spinner" /> : 'OTP भेजें / Send OTP →'}
            </button>
          </>
        ) : (
          <>
            <div className="input-label">🔐 OTP डालें / Enter OTP</div>
            <p className="input-hint">+91 {phone} पर भेजा गया</p>
            <div className="otp-input-group">
              {[0, 1, 2, 3].map(i => (
                <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={otp[i] || ''} onChange={e => {
                  const v = e.target.value.replace(/\D/g, '');
                  setOtp(otp.slice(0, i) + v + otp.slice(i + 1));
                  if (v && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
                }} className="otp-input" />
              ))}
            </div>
            <button onClick={handleVerifyOTP} disabled={otp.length < 4 || loading} className={`submit-btn ${otp.length >= 4 ? 'active' : ''}`}>
              {loading ? <span className="spinner" /> : 'लॉगिन करें / Login →'}
            </button>
            <button className="text-btn" onClick={() => setStep('phone')}>← नंबर बदलें / Change Number</button>
          </>
        )}
      </div>

      <div className="whatsapp-hint animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <span>💬</span> WhatsApp पर भी बुक करें: <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">wa.me/919876543210</a>
      </div>
    </div>
  );
};

// ============ CUSTOMER APP ============
const CustomerApp = ({ onLogout }) => {
  const [view, setView] = useState('home');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'Booking Confirmed!', msg: 'Tractor arriving tomorrow at 9 AM', time: '2 min ago', read: false },
    { id: 2, type: 'info', title: 'New Offer!', msg: '20% off on first booking', time: '1 hour ago', read: true },
  ]);
  const [myBookings, setMyBookings] = useState([
    { id: 1, service: 'Ploughing', status: 'confirmed', date: 'Tomorrow, 9 AM', machine: 'Mahindra 575', owner: 'Ram Singh', ownerPhone: '98765-43210', amount: 1200, rating: 0 },
    { id: 1, service: 'Tractor', status: 'confirmed', date: 'Today, 2 PM', machine: 'Mahindra 575 DI', owner: 'Ram Singh', ownerPhone: '9876543210', amount: 1200, rating: 0 },
    { id: 2, service: 'Harvesting', status: 'completed', date: 'Dec 10', machine: 'John Deere', owner: 'Mohan Lal', ownerPhone: '87654-32109', amount: 3500, rating: 5 },
  ]);

  const services = [
    { id: 1, name: 'Ploughing', nameHi: 'जुताई', icon: '🚜', price: 600, unit: 'acre', desc: 'Deep tractor ploughing for your field', popular: true },
    { id: 2, name: 'Harvesting', nameHi: 'कटाई', icon: '🌾', price: 800, unit: 'acre', desc: 'Combine harvester for crop cutting', popular: true },
    { id: 3, name: 'Sowing', nameHi: 'बुवाई', icon: '🌱', price: 400, unit: 'acre', desc: 'Machine sowing of seeds' },
    { id: 4, name: 'Spraying', nameHi: 'स्प्रे', icon: '💧', price: 300, unit: 'acre', desc: 'Pesticide & fertilizer spraying' },
    { id: 5, name: 'Transport', nameHi: 'ढुलाई', icon: '🚛', price: 15, unit: 'km', desc: 'Trolley transport service' },
    { id: 6, name: 'Excavation', nameHi: 'खुदाई', icon: '⛏️', price: 800, unit: 'hour', desc: 'JCB digging and excavation' },
  ];

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const CustomerHome = () => (
    <div style={{ padding: 20, background: 'linear-gradient(180deg, #FAFAF8 0%, #F5F3EF 100%)', minHeight: '100vh' }}>
      {/* Premium Header */}
      <header style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>Welcome back 🙏</p>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: '6px 0', color: '#0F172A', letterSpacing: '-0.02em' }}>Suresh Yadav</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
              <span style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 14 }}>📍</span> Rampur, UP
              </span>
              <span style={{
                fontSize: 11,
                background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                color: '#10B981',
                padding: '4px 10px',
                borderRadius: 20,
                fontWeight: 600,
                border: '1px solid rgba(16,185,129,0.15)'
              }}>☀️ 28°C</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => setView('notifications')}
              style={{
                background: 'white',
                border: 'none',
                width: 48,
                height: 48,
                borderRadius: 16,
                position: 'relative',
                cursor: 'pointer',
                fontSize: 20,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              🔔
              {notifications.filter(n => !n.read).length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 10,
                  height: 10,
                  background: '#EF4444',
                  borderRadius: '50%',
                  border: '2px solid white',
                  animation: 'pulseGlow 2s ease-in-out infinite'
                }} />
              )}
            </button>
            <Avatar seed="SureshYadav" size={48} />
          </div>
        </div>
      </header>

      {/* Premium Quick Book Card */}
      <div style={{
        background: 'linear-gradient(145deg, #0D2818 0%, #1B4332 40%, #2D5A4A 100%)',
        borderRadius: 28,
        padding: 24,
        color: 'white',
        marginBottom: 20,
        boxShadow: '0 12px 40px rgba(13,40,24,0.3), 0 4px 12px rgba(13,40,24,0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '60%',
          height: '120%',
          background: 'radial-gradient(circle, rgba(116,168,146,0.12) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, position: 'relative' }}>
          <div>
            <p style={{ fontSize: 13, opacity: 0.7, fontWeight: 500 }}>🚜 Book Equipment</p>
            <p style={{ fontSize: 22, fontWeight: 700, margin: '6px 0', letterSpacing: '-0.01em' }}>What do you need?</p>
          </div>
          <span style={{
            fontSize: 11,
            background: 'rgba(16,185,129,0.2)',
            backdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: 20,
            color: '#86EFAC',
            fontWeight: 600,
            border: '1px solid rgba(134,239,172,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <span style={{ width: 6, height: 6, background: '#86EFAC', borderRadius: '50%', animation: 'pulseGlow 2s infinite' }} />
            12 Available
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, position: 'relative' }}>
          {[
            { icon: '🚜', label: 'Tractor', price: '600' },
            { icon: '⛏️', label: 'JCB', price: '1200' },
            { icon: '🌾', label: 'Harvester', price: '800' },
            { icon: '💨', label: 'Sprayer', price: '400' },
          ].map((s, i) => (
            <button
              key={i}
              onClick={() => setModal({ type: 'book', service: services.find(sv => sv.name.toLowerCase().includes(s.label.toLowerCase())) || services[i] })}
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 18,
                padding: '16px 8px',
                cursor: 'pointer',
                color: 'white',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: 32, display: 'block', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>{s.icon}</span>
              <p style={{ fontSize: 12, margin: '8px 0 3px', fontWeight: 600, letterSpacing: '0.01em' }}>{s.label}</p>
              <p style={{ fontSize: 11, opacity: 0.6 }}>₹{s.price}/hr</p>
            </button>
          ))}
        </div>
      </div>

      {/* Premium Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { icon: '📋', value: myBookings.length, label: 'Bookings', color: '#7C3AED' },
          { icon: '💰', value: `₹${(myBookings.reduce((a, b) => a + b.amount, 0) / 1000).toFixed(1)}K`, label: 'Spent', color: '#10B981' },
          { icon: '⭐', value: '4.9', label: 'Rating', color: '#F59E0B' }
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: 'white',
              borderRadius: 20,
              padding: 18,
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            <span style={{ fontSize: 26 }}>{stat.icon}</span>
            <p style={{
              fontSize: 22,
              fontWeight: 800,
              color: stat.color,
              margin: '8px 0 4px',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em'
            }}>{stat.value}</p>
            <p style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Active Booking Card */}
      {myBookings.filter(b => b.status === 'confirmed').length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', borderRadius: 20, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ width: 10, height: 10, background: '#22C55E', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: 14, fontWeight: 700 }}>🚜 Active Booking</span>
          </div>
          {myBookings.filter(b => b.status === 'confirmed').slice(0, 1).map(b => (
            <div key={b.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700 }}>{b.service}</p>
                  <p style={{ fontSize: 12, color: '#666' }}>{b.machine} • {b.owner}</p>
                </div>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#1B4332' }}>₹{b.amount}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 11, background: 'white', padding: '4px 10px', borderRadius: 8 }}>📅 {b.date}</span>
                <span style={{ fontSize: 11, background: 'white', padding: '4px 10px', borderRadius: 8 }}>⏱️ ETA: 25 min</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => window.open(`tel:${b.ownerPhone}`, '_self')} style={{ flex: 1, background: '#1B4332', color: 'white', border: 'none', padding: 12, borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>📞 Call Driver</button>
                <button onClick={() => showToast('📍 Machine is 2.3 km away!')} style={{ flex: 1, background: 'white', border: '2px solid #1B4332', padding: 12, borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>📍 Track Live</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Services - Premium Cards */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>📋 All Services</h2>
          <span style={{ fontSize: 12, color: '#1B4332', fontWeight: 600 }}>{services.length} available</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {services.map(s => (
            <div key={s.id} onClick={() => setModal({ type: 'book', service: s })} style={{ background: 'white', borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
              <div style={{ width: 50, height: 50, background: '#E8F5E9', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 700 }}>{s.name}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: '#666' }}>⭐ 4.8</span>
                  <span style={{ fontSize: 10, color: '#666' }}>• 156 bookings</span>
                  <span style={{ fontSize: 10, color: '#22C55E' }}>• 8 available</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#1B4332' }}>₹{s.price}</p>
                <p style={{ fontSize: 10, color: '#666' }}>per {s.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Krishi Mitra - Compact */}
      <div onClick={() => setModal({ type: 'aiAssistant' })} style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', borderRadius: 16, padding: 14, color: 'white', marginBottom: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 32 }}>🤖</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 700 }}>AI Krishi Mitra</p>
          <p style={{ fontSize: 11, opacity: 0.8 }}>Crop advice, weather, prices • Powered by Gemini</p>
        </div>
        <span style={{ fontSize: 18, opacity: 0.8 }}>→</span>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        {[
          { icon: '💬', label: 'WhatsApp', action: () => window.open('https://wa.me/919876543210', '_blank') },
          { icon: '📞', label: 'Call', action: () => window.open('tel:9876543210', '_self') },
          { icon: '📜', label: 'History', action: () => setView('bookings') },
          { icon: '👤', label: 'Profile', action: () => setView('profile') },
        ].map((a, i) => (
          <button key={i} onClick={a.action} style={{ background: 'white', border: 'none', borderRadius: 14, padding: 14, cursor: 'pointer', textAlign: 'center' }}>
            <span style={{ fontSize: 22 }}>{a.icon}</span>
            <p style={{ fontSize: 10, margin: '4px 0 0', fontWeight: 600, color: '#666' }}>{a.label}</p>
          </button>
        ))}
      </div>

      {/* AI Floating Button */}
      <button onClick={() => setModal({ type: 'aiAssistant' })} style={{ position: 'fixed', bottom: 90, right: 20, width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', border: 'none', boxShadow: '0 4px 20px rgba(124,58,237,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: 'white', zIndex: 100, animation: 'pulse 2s infinite' }}>✨</button>
      <style>{`@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }`}</style>
    </div>
  );

  const CustomerBookings = () => {
    const confirmedCount = myBookings.filter(b => b.status === 'confirmed').length;
    const completedCount = myBookings.filter(b => b.status === 'completed').length;
    const totalSpent = myBookings.reduce((a, b) => a + b.amount, 0);

    return (
      <div style={{ padding: 20, background: '#f5f5f0', minHeight: '100vh' }}>
        {/* Header */}
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>📋 My Bookings</h1>

        {/* Stats Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          <div style={{ background: '#E8F5E9', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#22C55E' }}>{confirmedCount}</p>
            <p style={{ fontSize: 10, color: '#666' }}>Active</p>
          </div>
          <div style={{ background: '#FEF3C7', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#D97706' }}>{completedCount}</p>
            <p style={{ fontSize: 10, color: '#666' }}>Completed</p>
          </div>
          <div style={{ background: 'white', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#1B4332' }}>₹{(totalSpent / 1000).toFixed(1)}K</p>
            <p style={{ fontSize: 10, color: '#666' }}>Total Spent</p>
          </div>
        </div>

        {/* Active Bookings Section */}
        {confirmedCount > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ width: 8, height: 8, background: '#22C55E', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
              <h3 style={{ fontSize: 14, fontWeight: 700 }}>Active Booking</h3>
            </div>
            {myBookings.filter(b => b.status === 'confirmed').map(b => (
              <div key={b.id} style={{ background: 'linear-gradient(135deg, #1B4332, #2D5A4A)', borderRadius: 20, padding: 16, color: 'white', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 700 }}>{b.service}</p>
                    <p style={{ fontSize: 12, opacity: 0.8 }}>{b.machine}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 20, fontWeight: 800 }}>₹{b.amount}</p>
                    <span style={{ fontSize: 10, background: 'rgba(34,197,94,0.3)', padding: '2px 8px', borderRadius: 8, color: '#86EFAC' }}>Active</span>
                  </div>
                </div>

                {/* Timeline */}
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 24, height: 24, background: '#22C55E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                      <span style={{ fontSize: 11 }}>Booked</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 24, height: 24, background: '#22C55E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                      <span style={{ fontSize: 11 }}>Assigned</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 24, height: 24, background: 'rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, animation: 'pulse 1.5s infinite' }}>🚜</span>
                      <span style={{ fontSize: 11 }}>On the way</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 10, opacity: 0.7 }}>📅 {b.date}</span>
                    <span style={{ fontSize: 10, opacity: 0.7 }}>⏱️ ETA: 20 min</span>
                    <span style={{ fontSize: 10, opacity: 0.7 }}>📍 2.1 km away</span>
                  </div>
                </div>

                {/* Operator Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <Avatar seed={b.owner} size={44} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600 }}>{b.owner}</p>
                    <p style={{ fontSize: 11, opacity: 0.8 }}>⭐ 4.9 • 156 jobs • ✓ Verified</p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => window.open(`tel:${b.ownerPhone}`, '_self')} style={{ flex: 1, background: 'white', color: '#1B4332', border: 'none', padding: 12, borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>📞 Call</button>
                  <button onClick={() => showToast('📍 Machine is 2.1 km away!')} style={{ flex: 1, background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: 12, borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>📍 Track</button>
                  <button onClick={() => showToast('Sending message...')} style={{ flex: 1, background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: 12, borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>💬</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Bookings */}
        {completedCount > 0 && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>✅ Past Bookings</h3>
            {myBookings.filter(b => b.status === 'completed').map(b => (
              <div key={b.id} style={{ background: 'white', borderRadius: 16, padding: 14, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, background: '#E8F5E9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>✓</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15 }}>{b.service}</p>
                      <p style={{ fontSize: 11, color: '#666' }}>{b.date}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 700, color: '#1B4332' }}>₹{b.amount}</p>
                    {b.rating > 0 ? <StarRating rating={b.rating} size={12} /> : null}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
                  <Avatar seed={b.owner} size={28} />
                  <span style={{ fontSize: 12, color: '#666', flex: 1 }}>{b.owner} • {b.machine}</span>
                  {b.rating === 0 && (
                    <button onClick={() => setModal({ type: 'rate', booking: b })} style={{ background: '#FEF3C7', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>⭐ Rate</button>
                  )}
                  <button onClick={() => setModal({ type: 'book', service: services.find(s => s.name === b.service) || services[0] })} style={{ background: '#E8F5E9', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', color: '#1B4332' }}>↻ Book Again</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pending Bookings */}
        {myBookings.filter(b => b.status === 'pending').length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>⏳ Pending Confirmation</h3>
            {myBookings.filter(b => b.status === 'pending').map(b => (
              <div key={b.id} style={{ background: 'white', borderRadius: 16, padding: 14, marginBottom: 10, border: '2px dashed #FCD34D' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15 }}>{b.service}</p>
                    <p style={{ fontSize: 11, color: '#666' }}>{b.date}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 10, background: '#FEF3C7', padding: '4px 10px', borderRadius: 8, color: '#D97706' }}>Finding operator...</span>
                    <p style={{ fontWeight: 700, color: '#1B4332', marginTop: 4 }}>₹{b.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {myBookings.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <span style={{ fontSize: 60 }}>📋</span>
            <p style={{ fontSize: 16, fontWeight: 600, margin: '12px 0 4px' }}>No bookings yet</p>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 20 }}>Book your first machine service</p>
            <button onClick={() => setView('home')} style={{ background: '#1B4332', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>🚜 Browse Services</button>
          </div>
        )}

        {/* Quick Stats Footer */}
        {myBookings.length > 0 && (
          <div style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', borderRadius: 16, padding: 16, color: 'white' }}>
            <p style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>🎉 Loyalty Status</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 18, fontWeight: 800 }}>Gold Farmer</p>
                <p style={{ fontSize: 11, opacity: 0.8 }}>{myBookings.length} bookings • ₹{(totalSpent / 1000).toFixed(1)}K spent</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 20, fontWeight: 800 }}>5%</p>
                <p style={{ fontSize: 10, opacity: 0.8 }}>Next booking discount</p>
              </div>
            </div>
          </div>
        )}

        <style>{`@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }`}</style>
      </div>
    );
  };

  const CustomerNotifications = () => (
    <div className="notifications-page animate-fade">
      <h1 className="page-title">🔔 Notifications</h1>
      {notifications.map(n => (
        <div key={n.id} className={`notification-card ${n.read ? 'read' : 'unread'}`} onClick={() => setNotifications(notifications.map(x => x.id === n.id ? { ...x, read: true } : x))}>
          <div className={`notification-icon ${n.type}`}>{n.type === 'success' ? '✓' : 'ℹ'}</div>
          <div className="notification-content">
            <p className="notification-title">{n.title}</p>
            <p className="notification-msg">{n.msg}</p>
            <p className="notification-time">{n.time}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const CustomerProfile = () => (
    <div className="profile-page animate-fade">
      <h1 className="page-title">👤 Profile</h1>

      <div className="profile-card">
        <Avatar seed="SureshYadav" size={80} />
        <div className="profile-info">
          <h2>Suresh Yadav</h2>
          <p>+91 98765-43210</p>
          <span className="verified-badge">✓ Verified Farmer</span>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card"><span className="stat-value">12</span><span className="stat-label">Bookings</span></div>
        <div className="stat-card"><span className="stat-value">₹18.5K</span><span className="stat-label">Total Spent</span></div>
        <div className="stat-card"><span className="stat-value">4.9⭐</span><span className="stat-label">Rating</span></div>
      </div>

      <div className="settings-list">
        <div className="settings-item"><span>📍 Village</span><span>Rampur, UP</span></div>
        <div className="settings-item"><span>🔔 Notifications</span><span className="toggle on">On</span></div>
        <div className="settings-item" onClick={() => window.open('tel:9876543210')}><span>❓ Help & Support</span><span>→</span></div>
      </div>

      <button className="logout-btn" onClick={onLogout}>🚪 Logout</button>
    </div>
  );

  // WhatsApp Chat Bot Interface
  const [chatMessages, setChatMessages] = useState([
    { id: 1, from: 'bot', text: '🌾 Namaste! Welcome to Khet Bandhu.\n\nI\'m your AI assistant. How can I help you today?\n\n1️⃣ Book a Machine\n2️⃣ Check My Bookings\n3️⃣ Track Machine\n4️⃣ Talk to Support', time: '10:00 AM' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [bookingFlow, setBookingFlow] = useState({ step: null, data: {} });

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setBotTyping(true);

    // Bot response logic
    setTimeout(() => {
      let botResponse = '';
      const lowerText = text.toLowerCase();

      if (bookingFlow.step === 'select_service') {
        const services = ['Ploughing', 'Harvesting', 'Sowing', 'Spraying', 'Transport', 'Excavation'];
        const idx = parseInt(text) - 1;
        if (idx >= 0 && idx < services.length) {
          setBookingFlow({ step: 'select_date', data: { ...bookingFlow.data, service: services[idx] } });
          botResponse = `Great choice! ✅ You selected **${services[idx]}**\n\nWhen do you need the service?\n\n1️⃣ Today\n2️⃣ Tomorrow\n3️⃣ Day After Tomorrow\n4️⃣ Choose Custom Date`;
        } else {
          botResponse = 'Please select a valid option (1-6)';
        }
      } else if (bookingFlow.step === 'select_date') {
        const dates = ['Today', 'Tomorrow', 'Day After Tomorrow'];
        const idx = parseInt(text) - 1;
        if (idx >= 0 && idx < 3) {
          setBookingFlow({ step: 'select_time', data: { ...bookingFlow.data, date: dates[idx] } });
          botResponse = `Perfect! 📅 **${dates[idx]}** it is!\n\nWhat time works best?\n\n1️⃣ Morning (6-9 AM)\n2️⃣ Mid-Morning (9-12 PM)\n3️⃣ Afternoon (2-5 PM)\n4️⃣ Evening (5-7 PM)`;
        } else {
          botResponse = 'Please select a valid option (1-4)';
        }
      } else if (bookingFlow.step === 'select_time') {
        const times = ['Morning (6-9 AM)', 'Mid-Morning (9-12 PM)', 'Afternoon (2-5 PM)', 'Evening (5-7 PM)'];
        const idx = parseInt(text) - 1;
        if (idx >= 0 && idx < 4) {
          setBookingFlow({ step: 'select_acres', data: { ...bookingFlow.data, time: times[idx] } });
          botResponse = `Great! ⏰ **${times[idx]}**\n\nHow many acres/units do you need?\n\nPlease type a number (e.g., 2 or 5)`;
        } else {
          botResponse = 'Please select a valid option (1-4)';
        }
      } else if (bookingFlow.step === 'select_acres') {
        const acres = parseInt(text);
        if (acres > 0 && acres < 100) {
          const prices = { 'Ploughing': 600, 'Harvesting': 800, 'Sowing': 400, 'Spraying': 300, 'Transport': 15, 'Excavation': 800 };
          const price = prices[bookingFlow.data.service] * acres;
          setBookingFlow({ step: 'confirm', data: { ...bookingFlow.data, acres, price } });
          botResponse = `📋 **Booking Summary**\n\n🚜 Service: ${bookingFlow.data.service}\n📅 Date: ${bookingFlow.data.date}\n⏰ Time: ${bookingFlow.data.time}\n🌾 Area: ${acres} acres\n💰 Total: ₹${price.toLocaleString()}\n\nReply **CONFIRM** to book or **CANCEL** to start over.`;
        } else {
          botResponse = 'Please enter a valid number of acres (1-99)';
        }
      } else if (bookingFlow.step === 'confirm') {
        if (lowerText.includes('confirm') || lowerText === 'yes' || lowerText === 'y') {
          const bookingId = 'KB' + Math.random().toString(36).substr(2, 6).toUpperCase();
          setBookingFlow({ step: null, data: {} });
          botResponse = `🎉 **Booking Confirmed!**\n\n✅ Booking ID: #${bookingId}\n🚜 ${bookingFlow.data.service} - ${bookingFlow.data.acres} acres\n📅 ${bookingFlow.data.date} at ${bookingFlow.data.time}\n💰 Amount: ₹${bookingFlow.data.price.toLocaleString()}\n\n📞 Your operator will call you shortly to confirm.\n\nThank you for using Khet Bandhu! 🌾\n\nType anything to start a new conversation.`;
          // Add to bookings
          setMyBookings(prev => [{
            id: Date.now(),
            service: bookingFlow.data.service,
            status: 'confirmed',
            date: bookingFlow.data.date + ', ' + bookingFlow.data.time.split(' ')[0],
            machine: 'Assigning...',
            owner: 'Ram Singh',
            ownerPhone: '98765-43210',
            amount: bookingFlow.data.price,
            rating: 0
          }, ...prev]);
        } else if (lowerText.includes('cancel')) {
          setBookingFlow({ step: null, data: {} });
          botResponse = '❌ Booking cancelled.\n\nHow else can I help you?\n\n1️⃣ Book a Machine\n2️⃣ Check My Bookings\n3️⃣ Track Machine\n4️⃣ Talk to Support';
        } else {
          botResponse = 'Please reply **CONFIRM** to book or **CANCEL** to start over.';
        }
      } else if (lowerText === '1' || lowerText.includes('book')) {
        setBookingFlow({ step: 'select_service', data: {} });
        botResponse = '🚜 **Book a Machine**\n\nWhich service do you need?\n\n1️⃣ Ploughing - ₹600/acre\n2️⃣ Harvesting - ₹800/acre\n3️⃣ Sowing - ₹400/acre\n4️⃣ Spraying - ₹300/acre\n5️⃣ Transport - ₹15/km\n6️⃣ Excavation - ₹800/hr\n\nReply with a number (1-6)';
      } else if (lowerText === '2' || lowerText.includes('booking') || lowerText.includes('order')) {
        botResponse = `📋 **Your Recent Bookings**\n\n${myBookings.slice(0, 3).map((b, i) => `${i + 1}. ${b.service}\n   📅 ${b.date}\n   💰 ₹${b.amount}\n   Status: ${b.status === 'confirmed' ? '✅ Confirmed' : b.status === 'completed' ? '✓ Completed' : '⏳ Pending'}`).join('\n\n')}\n\nReply 1 to book a new machine.`;
      } else if (lowerText === '3' || lowerText.includes('track')) {
        botResponse = '📍 **Live Tracking**\n\n🚜 Mahindra 575 DI\n👤 Driver: Raju Kumar\n📍 Current: En route to your field\n⏱️ ETA: 15 minutes\n📞 Call: 98765-43210\n\n[🗺️ View on Map]\n\nReply 1 to book another machine.';
      } else if (lowerText === '4' || lowerText.includes('support') || lowerText.includes('help')) {
        botResponse = '📞 **Customer Support**\n\n🕐 Available: 6 AM - 10 PM\n📱 Call: +91 98765-43210\n📧 Email: support@khetbandhu.com\n\nOr describe your issue and I\'ll help you.\n\nReply 1 to book a machine.';
      } else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
        botResponse = '👋 Hello! Welcome to Khet Bandhu.\n\nHow can I assist you today?\n\n1️⃣ Book a Machine\n2️⃣ Check My Bookings\n3️⃣ Track Machine\n4️⃣ Talk to Support';
      } else if (lowerText.includes('price') || lowerText.includes('rate') || lowerText.includes('cost')) {
        botResponse = '💰 **Our Rates**\n\n🚜 Ploughing: ₹600/acre\n🌾 Harvesting: ₹800/acre\n🌱 Sowing: ₹400/acre\n💧 Spraying: ₹300/acre\n🚛 Transport: ₹15/km\n⛏️ Excavation: ₹800/hr\n\n✨ 20% OFF on first booking!\n\nReply 1 to book now.';
      } else {
        botResponse = 'I\'m here to help! Choose an option:\n\n1️⃣ Book a Machine\n2️⃣ Check My Bookings\n3️⃣ Track Machine\n4️⃣ Talk to Support\n\nOr type your question.';
      }

      setBotTyping(false);
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        from: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  const WhatsAppChat = () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#ECE5DD' }}>
      {/* Header */}
      <div style={{ background: '#075E54', color: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ background: 'none', border: 'none', color: 'white', fontSize: 20, cursor: 'pointer' }} onClick={() => setView('home')}>←</button>
        <div style={{ width: 40, height: 40, background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🌾</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 16 }}>Khet Bandhu</p>
          <p style={{ fontSize: 12, opacity: 0.9 }}>🟢 Online • AI Assistant</p>
        </div>
        <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 12 }}>Verified ✓</span>
      </div>

      {/* Chat Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {chatMessages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%',
              background: msg.from === 'user' ? '#DCF8C6' : 'white',
              padding: '10px 14px',
              borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              <p style={{ fontSize: 10, color: '#667', textAlign: 'right', marginTop: 4 }}>
                {msg.time} {msg.from === 'user' && '✓✓'}
              </p>
            </div>
          </div>
        ))}
        {botTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ background: 'white', padding: '12px 20px', borderRadius: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <span style={{ width: 8, height: 8, background: '#999', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                <span style={{ width: 8, height: 8, background: '#999', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }} />
                <span style={{ width: 8, height: 8, background: '#999', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '8px 16px', background: '#f0f0f0', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {['Book Machine', 'My Bookings', 'Prices', 'Track'].map(action => (
          <button key={action} onClick={() => sendMessage(action)} style={{ background: 'white', border: '1px solid #ddd', borderRadius: 20, padding: '8px 16px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer' }}>{action}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ background: '#F0F0F0', padding: '8px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="text"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage(chatInput)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '12px 16px', borderRadius: 24, border: 'none', fontSize: 15, outline: 'none' }}
        />
        <button onClick={() => sendMessage(chatInput)} style={{ width: 48, height: 48, borderRadius: '50%', background: '#075E54', border: 'none', color: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ➤
        </button>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      {view === 'home' && <CustomerHome />}
      {view === 'bookings' && <CustomerBookings />}
      {view === 'notifications' && <CustomerNotifications />}
      {view === 'profile' && <CustomerProfile />}
      {view === 'whatsapp' && <WhatsAppChat />}

      {/* Booking Modal */}
      {modal?.type === 'book' && (
        <Modal onClose={() => setModal(null)}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            {/* Service Header */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 80, height: 80, background: '#E8F5E9', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, margin: '0 auto 12px' }}>{modal.service?.icon || '🚜'}</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px' }}>{modal.service?.name || 'Service'}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: '#666' }}>⭐ 4.8 (156 reviews)</span>
                <span style={{ fontSize: 12, color: '#22C55E' }}>● 8 available nearby</span>
              </div>
            </div>

            {/* Nearby Operators */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 14, marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🚜 Nearby Operators</h4>
              {[
                { name: 'Ram Singh', distance: '1.2 km', eta: '15 min', rating: 4.9, price: modal.service?.price || 600, machine: 'Mahindra 575' },
                { name: 'Shyam Kumar', distance: '2.5 km', eta: '25 min', rating: 4.7, price: (modal.service?.price || 600) - 50, machine: 'Swaraj 744' },
                { name: 'Vijay Patel', distance: '3.1 km', eta: '35 min', rating: 4.8, price: (modal.service?.price || 600) + 20, machine: 'John Deere' },
              ].map((o, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px solid #e0e0e0' : 'none' }}>
                  <Avatar seed={o.name} size={40} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{o.name}</span>
                      <span style={{ fontSize: 10, color: '#22C55E' }}>✓ Verified</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                      <span style={{ fontSize: 10, color: '#666' }}>📍 {o.distance}</span>
                      <span style={{ fontSize: 10, color: '#666' }}>⏱️ {o.eta}</span>
                      <span style={{ fontSize: 10, color: '#666' }}>⭐ {o.rating}</span>
                    </div>
                    <span style={{ fontSize: 10, color: '#999' }}>{o.machine}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 700, color: '#1B4332', fontSize: 14 }}>₹{o.price}</p>
                    <p style={{ fontSize: 9, color: '#666' }}>per {modal.service?.unit || 'hour'}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Details */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 14, marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>📅 Booking Details</h4>

              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Select Date</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {['Today', 'Tomorrow', 'Sat, 14', 'Sun, 15'].map((d, i) => (
                  <button key={i} style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: i === 1 ? '2px solid #1B4332' : '1px solid #e0e0e0', background: i === 1 ? '#E8F5E9' : 'white', cursor: 'pointer', fontSize: 11, fontWeight: i === 1 ? 700 : 400 }}>{d}</button>
                ))}
              </div>

              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Select Time</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {['6-8 AM', '8-10 AM', '10-12 PM', '2-4 PM', '4-6 PM'].map((t, i) => (
                  <button key={i} style={{ flex: 1, padding: '8px 4px', borderRadius: 8, border: i === 0 ? '2px solid #1B4332' : '1px solid #e0e0e0', background: i === 0 ? '#E8F5E9' : 'white', cursor: 'pointer', fontSize: 10, fontWeight: i === 0 ? 700 : 400 }}>{t}</button>
                ))}
              </div>

              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Area ({modal.service?.unit || 'hours'})</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid #e0e0e0', background: 'white', fontSize: 18, cursor: 'pointer' }}>−</button>
                <input type="number" defaultValue="2" style={{ width: 60, textAlign: 'center', padding: 10, borderRadius: 10, border: '1px solid #e0e0e0', fontSize: 16, fontWeight: 700 }} />
                <button style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid #e0e0e0', background: 'white', fontSize: 18, cursor: 'pointer' }}>+</button>
                <span style={{ flex: 1, textAlign: 'right', fontSize: 12, color: '#666' }}>2 {modal.service?.unit || 'hours'} × ₹{modal.service?.price || 600}</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div style={{ background: '#1B4332', borderRadius: 16, padding: 16, color: 'white', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, opacity: 0.8 }}>Service Charge</span>
                <span style={{ fontSize: 12 }}>₹{(modal.service?.price || 600) * 2}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, opacity: 0.8 }}>Platform Fee (5%)</span>
                <span style={{ fontSize: 12 }}>₹{Math.round((modal.service?.price || 600) * 2 * 0.05)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: '#86EFAC' }}>First Booking Discount</span>
                <span style={{ fontSize: 12, color: '#86EFAC' }}>-₹100</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: 10, marginTop: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 800 }}>₹{(modal.service?.price || 600) * 2 + Math.round((modal.service?.price || 600) * 2 * 0.05) - 100}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {[
                { icon: '✓', label: 'Verified Operator' },
                { icon: '🛡️', label: 'Damage Protection' },
                { icon: '💰', label: 'Pay After Service' },
              ].map((b, i) => (
                <div key={i} style={{ flex: 1, background: '#f5f5f0', borderRadius: 10, padding: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: 16 }}>{b.icon}</span>
                  <p style={{ fontSize: 9, margin: '4px 0 0', color: '#666' }}>{b.label}</p>
                </div>
              ))}
            </div>

            {/* Book Button */}
            <button onClick={() => {
              setMyBookings([{
                id: Date.now(),
                service: modal.service?.name || 'Service',
                status: 'confirmed',
                date: 'Tomorrow, 6-8 AM',
                machine: 'Mahindra 575 DI',
                owner: 'Ram Singh',
                ownerPhone: '9876543210',
                amount: (modal.service?.price || 600) * 2 + Math.round((modal.service?.price || 600) * 2 * 0.05) - 100,
                rating: 0
              }, ...myBookings]);
              setModal(null);
              showToast('✓ Booking Confirmed! Ram Singh will call you shortly.');
            }} style={{ width: '100%', padding: 16, background: 'linear-gradient(135deg, #1B4332, #2D5A4A)', color: 'white', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              ✓ Confirm Booking
            </button>
          </div>
        </Modal>
      )}

      {/* Rating Modal */}
      {modal?.type === 'rate' && (
        <Modal onClose={() => setModal(null)}>
          <div className="rate-modal">
            <h2>⭐ Rate Your Experience</h2>
            <p>How was your experience?</p>
            <div className="rate-stars">
              <StarRating rating={0} onRate={(r) => {
                setMyBookings(myBookings.map(b => b.id === modal.booking.id ? { ...b, rating: r } : b));
                setModal(null);
                showToast('Thanks for your rating!');
              }} size={40} />
            </div>
          </div>
        </Modal>
      )}

      {/* AI Assistant Modal */}
      {modal?.type === 'aiAssistant' && (
        <Modal onClose={() => setModal(null)}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 48 }}>🤖</span>
              <h2 style={{ margin: '8px 0 4px', fontSize: 22, fontWeight: 800 }}>AI Krishi Mitra</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', color: 'white', padding: '2px 8px', borderRadius: 8 }}>Powered by Gemini</span>
                <span style={{ fontSize: 10, background: '#E8F5E9', color: '#22C55E', padding: '2px 8px', borderRadius: 8 }}>● Online</span>
              </div>
            </div>

            {/* Today's Insights */}
            <div style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', borderRadius: 16, padding: 16, color: 'white', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span>☁️</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Today's Farming Weather</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 32, fontWeight: 800 }}>28°C</p>
                  <p style={{ fontSize: 12, opacity: 0.8 }}>Partly Cloudy</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 12, opacity: 0.8 }}>💧 Humidity: 65%</p>
                  <p style={{ fontSize: 12, opacity: 0.8 }}>💨 Wind: 12 km/h</p>
                  <p style={{ fontSize: 11, marginTop: 4, background: 'rgba(34,197,94,0.3)', padding: '2px 8px', borderRadius: 8 }}>✓ Good for Ploughing</p>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💡 AI Recommendations for You</h4>
              {[
                { icon: '🌾', title: 'Best Time to Harvest', desc: 'Based on weather, harvest wheat in next 3 days', action: 'Book Harvester' },
                { icon: '💰', title: 'Price Alert', desc: 'Wheat prices up 12% this week - good time to sell', action: 'View Prices' },
                { icon: '🌱', title: 'Sowing Suggestion', desc: 'Consider Mustard for your 2-acre plot in January', action: 'Learn More' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px solid #e0e0e0' : 'none' }}>
                  <span style={{ fontSize: 24 }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</p>
                    <p style={{ fontSize: 11, color: '#666' }}>{r.desc}</p>
                  </div>
                  <button onClick={() => { setModal(null); showToast('Opening ' + r.action + '...'); }} style={{ background: '#7C3AED', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>{r.action}</button>
                </div>
              ))}
            </div>

            {/* Market Prices */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📊 Live Mandi Prices (Rampur)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {[
                  { crop: 'Wheat', price: '₹2,250', change: '+8%', up: true },
                  { crop: 'Rice', price: '₹1,950', change: '+5%', up: true },
                  { crop: 'Sugarcane', price: '₹350', change: '-2%', up: false },
                  { crop: 'Potato', price: '₹1,100', change: '+15%', up: true },
                ].map((p, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: 12, padding: 12 }}>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{p.crop}</p>
                    <p style={{ fontSize: 18, fontWeight: 800, color: '#1B4332' }}>{p.price}/qtl</p>
                    <span style={{ fontSize: 11, color: p.up ? '#22C55E' : '#EF4444' }}>{p.up ? '↑' : '↓'} {p.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Ask AI */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💬 Ask Krishi Mitra</h4>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {['Best fertilizer for wheat?', 'When to water crops?', 'Pest control tips', 'Government schemes'].map((q, i) => (
                  <button key={i} onClick={() => {
                    showToast('🤖 AI thinking...');
                    setTimeout(() => showToast('✓ Check WhatsApp for detailed answer!'), 1500);
                  }} style={{ background: 'white', border: '1px solid #e0e0e0', padding: '8px 12px', borderRadius: 20, fontSize: 11, cursor: 'pointer' }}>
                    {q}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input placeholder="Type your farming question..." style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid #e0e0e0', fontSize: 13 }} />
                <button style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', color: 'white', border: 'none', padding: '12px 16px', borderRadius: 12, cursor: 'pointer', fontSize: 16 }}>🚀</button>
              </div>
            </div>

            {/* AI Features Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                { icon: '🌾', title: 'Crop Doctor', desc: 'Photo diagnosis of crop diseases' },
                { icon: '📅', title: 'Farm Calendar', desc: 'AI-planned sowing/harvesting dates' },
                { icon: '💧', title: 'Irrigation AI', desc: 'Smart watering recommendations' },
                { icon: '🛒', title: 'Best Mandi', desc: 'Find best prices to sell' },
              ].map((f, i) => (
                <div key={i} onClick={() => showToast('Coming soon: ' + f.title)} style={{ background: 'white', borderRadius: 16, padding: 14, cursor: 'pointer', border: '1px solid #f0f0f0' }}>
                  <span style={{ fontSize: 28 }}>{f.icon}</span>
                  <p style={{ fontSize: 13, fontWeight: 700, margin: '6px 0 2px' }}>{f.title}</p>
                  <p style={{ fontSize: 10, color: '#666' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Dock */}
      {view !== 'whatsapp' && (
        <nav className="dock">
          {[
            { id: 'home', icon: '🏠', label: 'Home' },
            { id: 'bookings', icon: '📋', label: 'Bookings' },
            { id: 'whatsapp', icon: '💬', label: 'Chat' },
            { id: 'profile', icon: '👤', label: 'Profile' },
          ].map(tab => (
            <button key={tab.id} className={`dock-btn ${view === tab.id ? 'active' : ''}`} onClick={() => setView(tab.id)}>
              <span className="dock-icon">{tab.icon}</span>
              <span className="dock-label">{tab.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

// ============ OWNER APP ============
const OwnerApp = ({ onLogout }) => {
  const [view, setView] = useState('home');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [earnings, setEarnings] = useState(485000);
  const [todayEarnings] = useState(8500);
  const [machines, setMachines] = useState([
    { id: 1, name: 'Mahindra 575 DI', type: 'Tractor', status: 'Working', fuel: 42, operator: 'Raju Kumar', location: 'Rampur Field', health: 92, revenue: 285000, jobs: 89, hoursRun: 1240, lastService: '5 days ago', nextService: '25 days', purchaseYear: 2019, purchasePrice: 650000, currentValue: 520000, efficiency: 94, fuelConsumed: 450, avgJobValue: 3202, image: '🚜' },
    { id: 2, name: 'JCB 3DX Super', type: 'Excavator', status: 'Available', fuel: 88, operator: null, location: 'Depot', health: 78, revenue: 122000, jobs: 34, hoursRun: 890, lastService: '12 days ago', nextService: '18 days', purchaseYear: 2021, purchasePrice: 4200000, currentValue: 3800000, efficiency: 88, fuelConsumed: 280, avgJobValue: 3588, image: '⛏️' },
    { id: 3, name: 'John Deere W70', type: 'Harvester', status: 'Maintenance', fuel: 65, operator: 'Sanjay Yadav', location: 'Workshop', health: 45, revenue: 178000, jobs: 33, hoursRun: 650, lastService: 'Today', nextService: '30 days', purchaseYear: 2020, purchasePrice: 2800000, currentValue: 2200000, efficiency: 79, fuelConsumed: 320, avgJobValue: 5394, image: '🌾' },
    { id: 4, name: 'Swaraj 744 FE', type: 'Tractor', status: 'Working', fuel: 71, operator: 'Vikram Singh', location: 'Kheda Farm', health: 88, revenue: 198000, jobs: 67, hoursRun: 980, lastService: '8 days ago', nextService: '22 days', purchaseYear: 2022, purchasePrice: 720000, currentValue: 650000, efficiency: 91, fuelConsumed: 380, avgJobValue: 2955, image: '🚜' },
    { id: 5, name: 'Massey 1035 DI', type: 'Tractor', status: 'Available', fuel: 95, operator: null, location: 'Depot', health: 96, revenue: 145000, jobs: 52, hoursRun: 720, lastService: '2 days ago', nextService: '28 days', purchaseYear: 2023, purchasePrice: 580000, currentValue: 560000, efficiency: 97, fuelConsumed: 290, avgJobValue: 2788, image: '🚜' },
  ]);
  const [team, setTeam] = useState([
    { id: 1, name: 'Raju Kumar', role: 'Senior Driver', status: 'On Job', phone: '98765-43210', jobs: 145, rating: 4.9, earnings: 435000, hoursWorked: 1240, onTimeRate: 98, customerSatisfaction: 99, experience: '5 years', specialization: 'Tractor Expert', certifications: ['ISO Certified', 'Safety Trained'], joinDate: 'Jan 2019' },
    { id: 2, name: 'Sanjay Yadav', role: 'JCB Operator', status: 'Available', phone: '87654-32109', jobs: 98, rating: 4.7, earnings: 294000, hoursWorked: 890, onTimeRate: 95, customerSatisfaction: 96, experience: '3 years', specialization: 'Excavation Expert', certifications: ['Heavy Machine Licensed'], joinDate: 'Mar 2021' },
    { id: 3, name: 'Mohan Das', role: 'Harvester Operator', status: 'Off Duty', phone: '76543-21098', jobs: 72, rating: 4.8, earnings: 216000, hoursWorked: 650, onTimeRate: 97, customerSatisfaction: 98, experience: '2 years', specialization: 'Harvesting', certifications: ['Equipment Certified'], joinDate: 'Aug 2022' },
    { id: 4, name: 'Vikram Singh', role: 'Lead Supervisor', status: 'On Job', phone: '65432-10987', jobs: 189, rating: 4.95, earnings: 567000, hoursWorked: 1580, onTimeRate: 99, customerSatisfaction: 100, experience: '7 years', specialization: 'Fleet Management', certifications: ['ISO Certified', 'Leadership Trained', 'First Aid'], joinDate: 'Sep 2017' },
    { id: 5, name: 'Amit Patel', role: 'Tractor Driver', status: 'Available', phone: '54321-09876', jobs: 67, rating: 4.6, earnings: 201000, hoursWorked: 540, onTimeRate: 94, customerSatisfaction: 95, experience: '1.5 years', specialization: 'Ploughing', certifications: ['Safety Trained'], joinDate: 'Jun 2023' },
  ]);
  const [requests, setRequests] = useState([
    { id: 101, farmer: 'Ramesh Patil', service: 'Ploughing', area: '2 Acres', when: 'Tomorrow, 9 AM', amount: 1200, phone: '99887-76655', location: 'Village Rampur' },
    { id: 102, farmer: 'Anita Sharma', service: 'Harvesting', area: '5 Acres', when: 'Today, 4 PM', amount: 4000, phone: '88776-65544', location: 'Kheda Farm' },
  ]);
  const [completedJobs] = useState([
    { id: 1, farmer: 'Mohan Patel', service: 'Ploughing', amount: 1800, date: 'Yesterday', rating: 5 },
    { id: 2, farmer: 'Geeta Devi', service: 'Spraying', amount: 900, date: '2 days ago', rating: 4 },
  ]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const downloadStatement = () => {
    const reportHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Khet Bandhu - Financial Statement</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; color: #333; }
    .container { max-width: 900px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #8B9E7C, #6B8060); color: white; padding: 40px; text-align: center; }
    .header h1 { font-size: 32px; margin-bottom: 8px; }
    .header p { opacity: 0.9; }
    .section { padding: 30px 40px; border-bottom: 1px solid #eee; }
    .section-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #333; display: flex; align-items: center; gap: 10px; }
    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .summary-card { background: #f9f9f9; border-radius: 12px; padding: 20px; text-align: center; }
    .summary-card .value { font-size: 28px; font-weight: 800; color: #8B9E7C; }
    .summary-card .label { font-size: 12px; color: #666; margin-top: 4px; }
    .chart-container { background: #f9f9f9; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
    .chart-title { font-size: 14px; font-weight: 600; margin-bottom: 15px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f9f9f9; font-weight: 600; font-size: 12px; color: #666; text-transform: uppercase; }
    td { font-size: 14px; }
    .amount { font-weight: 700; color: #8B9E7C; }
    .amount.debit { color: #EF4444; }
    .status { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; }
    .status.completed { background: #E8F5E9; color: #2E7D32; }
    .status.pending { background: #FFF3E0; color: #EF6C00; }
    .pie-container { display: flex; align-items: center; gap: 40px; }
    .pie-legend { flex: 1; }
    .legend-item { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .legend-color { width: 16px; height: 16px; border-radius: 4px; }
    .footer { background: #f9f9f9; padding: 30px 40px; text-align: center; font-size: 12px; color: #666; }
    .insights { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .insight-card { background: linear-gradient(135deg, #f0f7f0, #e8f5e9); border-radius: 12px; padding: 20px; }
    .insight-card h4 { font-size: 14px; margin-bottom: 8px; }
    .insight-card p { font-size: 24px; font-weight: 800; color: #8B9E7C; }
    .insight-card span { font-size: 12px; color: #666; }
    .bar-chart { display: flex; align-items: flex-end; gap: 12px; height: 150px; padding-top: 20px; }
    .bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; }
    .bar { width: 100%; background: #8B9E7C; border-radius: 4px 4px 0 0; transition: height 0.3s; }
    .bar-label { font-size: 11px; color: #666; margin-top: 8px; }
    .bar-value { font-size: 10px; color: #8B9E7C; font-weight: 600; margin-bottom: 4px; }
    @media print { body { background: white; } .container { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌾 Khet Bandhu</h1>
      <p>Financial Statement | December 2024</p>
      <p style="margin-top: 16px; font-size: 14px;">Generated: ${new Date().toLocaleString()}</p>
    </div>

    <div class="section">
      <div class="section-title">📊 Account Summary</div>
      <div class="summary-grid">
        <div class="summary-card">
          <div class="value">₹4,85,000</div>
          <div class="label">Total Earnings</div>
        </div>
        <div class="summary-card">
          <div class="value">₹85,000</div>
          <div class="label">This Month</div>
        </div>
        <div class="summary-card">
          <div class="value">156</div>
          <div class="label">Jobs Completed</div>
        </div>
        <div class="summary-card">
          <div class="value">4.8⭐</div>
          <div class="label">Average Rating</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">📈 Monthly Revenue Trend</div>
      <div class="chart-container">
        <div class="bar-chart">
          ${[
        { month: 'Jul', value: 42000 }, { month: 'Aug', value: 58000 }, { month: 'Sep', value: 71000 },
        { month: 'Oct', value: 65000 }, { month: 'Nov', value: 78000 }, { month: 'Dec', value: 85000 }
      ].map(d => `
            <div class="bar-wrapper">
              <div class="bar-value">₹${(d.value / 1000).toFixed(0)}K</div>
              <div class="bar" style="height: ${(d.value / 85000) * 120}px"></div>
              <div class="bar-label">${d.month}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🥧 Revenue by Service Type</div>
      <div class="pie-container">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#8B9E7C" stroke-width="40" stroke-dasharray="201 503" stroke-dashoffset="0"/>
          <circle cx="100" cy="100" r="80" fill="none" stroke="#C67B5B" stroke-width="40" stroke-dasharray="126 503" stroke-dashoffset="-201"/>
          <circle cx="100" cy="100" r="80" fill="none" stroke="#D4A574" stroke-width="40" stroke-dasharray="100 503" stroke-dashoffset="-327"/>
          <circle cx="100" cy="100" r="80" fill="none" stroke="#6B8060" stroke-width="40" stroke-dasharray="76 503" stroke-dashoffset="-427"/>
        </svg>
        <div class="pie-legend">
          <div class="legend-item"><div class="legend-color" style="background: #8B9E7C"></div><span>Ploughing - ₹45,000 (40%)</span></div>
          <div class="legend-item"><div class="legend-color" style="background: #C67B5B"></div><span>Harvesting - ₹28,000 (25%)</span></div>
          <div class="legend-item"><div class="legend-color" style="background: #D4A574"></div><span>Spraying - ₹12,000 (20%)</span></div>
          <div class="legend-item"><div class="legend-color" style="background: #6B8060"></div><span>Others - ₹10,000 (15%)</span></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">💡 Business Insights</div>
      <div class="insights">
        <div class="insight-card">
          <h4>📈 Growth Rate</h4>
          <p>+23%</p>
          <span>vs last month</span>
        </div>
        <div class="insight-card">
          <h4>⏱️ Avg. Job Duration</h4>
          <p>2.5 hrs</p>
          <span>per job</span>
        </div>
        <div class="insight-card">
          <h4>🔄 Repeat Customers</h4>
          <p>68%</p>
          <span>return rate</span>
        </div>
        <div class="insight-card">
          <h4>💰 Avg. Job Value</h4>
          <p>₹3,109</p>
          <span>per booking</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">📋 Recent Transactions</div>
      <table>
        <thead>
          <tr><th>Date</th><th>Description</th><th>Customer</th><th>Status</th><th>Amount</th></tr>
        </thead>
        <tbody>
          <tr><td>13 Dec 2024</td><td>Ploughing Service - 3 Acres</td><td>Ramesh Patil</td><td><span class="status completed">Completed</span></td><td class="amount">+₹1,800</td></tr>
          <tr><td>12 Dec 2024</td><td>Harvesting Service - 5 Acres</td><td>Anita Sharma</td><td><span class="status completed">Completed</span></td><td class="amount">+₹4,000</td></tr>
          <tr><td>12 Dec 2024</td><td>Withdrawal to Bank</td><td>HDFC ••••1234</td><td><span class="status completed">Completed</span></td><td class="amount debit">-₹25,000</td></tr>
          <tr><td>11 Dec 2024</td><td>Spraying Service - 2 Acres</td><td>Mohan Patel</td><td><span class="status completed">Completed</span></td><td class="amount">+₹600</td></tr>
          <tr><td>10 Dec 2024</td><td>Ploughing Service - 4 Acres</td><td>Geeta Devi</td><td><span class="status completed">Completed</span></td><td class="amount">+₹2,400</td></tr>
          <tr><td>09 Dec 2024</td><td>Transport Service - 15 km</td><td>Suresh Kumar</td><td><span class="status completed">Completed</span></td><td class="amount">+₹225</td></tr>
          <tr><td>08 Dec 2024</td><td>JCB Excavation - 3 hrs</td><td>Rajesh Verma</td><td><span class="status completed">Completed</span></td><td class="amount">+₹2,400</td></tr>
          <tr><td>07 Dec 2024</td><td>Harvesting Service - 8 Acres</td><td>Kamla Devi</td><td><span class="status completed">Completed</span></td><td class="amount">+₹6,400</td></tr>
          <tr><td>06 Dec 2024</td><td>Fuel Expense - Mahindra 575</td><td>Depot</td><td><span class="status pending">Expense</span></td><td class="amount debit">-₹3,500</td></tr>
          <tr><td>05 Dec 2024</td><td>Ploughing Service - 2 Acres</td><td>Ravi Shankar</td><td><span class="status completed">Completed</span></td><td class="amount">+₹1,200</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">🚜 Fleet Performance</div>
      <table>
        <thead>
          <tr><th>Machine</th><th>Type</th><th>Jobs</th><th>Revenue</th><th>Fuel Used</th><th>Efficiency</th></tr>
        </thead>
        <tbody>
          <tr><td>Mahindra 575</td><td>Tractor</td><td>89</td><td>₹2,85,000</td><td>450L</td><td>⭐ 94%</td></tr>
          <tr><td>JCB 3DX</td><td>Excavator</td><td>34</td><td>₹1,22,000</td><td>280L</td><td>⭐ 88%</td></tr>
          <tr><td>Harvester Pro</td><td>Harvester</td><td>33</td><td>₹78,000</td><td>320L</td><td>⭐ 79%</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">👥 Team Performance</div>
      <table>
        <thead>
          <tr><th>Name</th><th>Role</th><th>Jobs</th><th>Rating</th><th>Earnings</th></tr>
        </thead>
        <tbody>
          <tr><td>Raju Kumar</td><td>Driver</td><td>45</td><td>⭐ 4.8</td><td>₹1,35,000</td></tr>
          <tr><td>Sanjay Yadav</td><td>Operator</td><td>38</td><td>⭐ 4.6</td><td>₹1,14,000</td></tr>
          <tr><td>Mohan Das</td><td>Helper</td><td>22</td><td>⭐ 4.9</td><td>₹66,000</td></tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <p><strong>Khet Bandhu</strong> - Your Farming Partner</p>
      <p style="margin-top: 8px;">This is a computer-generated statement. For queries, contact support@khetbandhu.com</p>
      <p style="margin-top: 4px;">Report ID: KB-${Date.now()}</p>
    </div>
  </div>
  <script>window.onload = () => window.print();</script>
</body>
</html>`;
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    showToast('Statement generated!');
  };

  // Export to Excel (CSV format for compatibility)
  const exportToExcel = () => {
    console.log('exportToExcel called');

    // Mock transaction data
    const transactions = [
      ['15 Dec 2024', 'Ploughing Service - 3 Acres', 'Ramesh Patil', 'Mahindra 575 DI', 'Raju Kumar', 'Completed', 1800],
      ['14 Dec 2024', 'Harvesting Service - 5 Acres', 'Anita Sharma', 'John Deere W70', 'Mohan Das', 'Completed', 4000],
      ['14 Dec 2024', 'JCB Excavation - 2 Hours', 'Suresh Kumar', 'JCB 3DX Super', 'Sanjay Yadav', 'Completed', 1600],
      ['13 Dec 2024', 'Spraying Service - 4 Acres', 'Mohan Patel', 'Swaraj 744 FE', 'Vikram Singh', 'Completed', 1200],
      ['13 Dec 2024', 'Transport - 25 km', 'Geeta Devi', 'Massey 1035 DI', 'Amit Patel', 'Completed', 375],
      ['12 Dec 2024', 'Ploughing Service - 6 Acres', 'Rajesh Verma', 'Mahindra 575 DI', 'Raju Kumar', 'Completed', 3600],
      ['12 Dec 2024', 'Withdrawal to Bank', '-', '-', '-', 'Completed', -25000],
      ['11 Dec 2024', 'Harvesting Service - 8 Acres', 'Kamla Devi', 'John Deere W70', 'Mohan Das', 'Completed', 6400],
      ['10 Dec 2024', 'Ploughing Service - 2 Acres', 'Ravi Shankar', 'Swaraj 744 FE', 'Vikram Singh', 'Completed', 1200],
      ['09 Dec 2024', 'JCB Excavation - 4 Hours', 'Dinesh Patel', 'JCB 3DX Super', 'Sanjay Yadav', 'Completed', 3200],
      ['08 Dec 2024', 'Fuel Expense', 'Depot', 'Mahindra 575 DI', '-', 'Expense', -3500],
      ['07 Dec 2024', 'Spraying Service - 3 Acres', 'Sunita Devi', 'Massey 1035 DI', 'Amit Patel', 'Completed', 900],
      ['06 Dec 2024', 'Transport - 40 km', 'Ram Prasad', 'Swaraj 744 FE', 'Vikram Singh', 'Completed', 600],
      ['05 Dec 2024', 'Ploughing Service - 5 Acres', 'Anil Kumar', 'Mahindra 575 DI', 'Raju Kumar', 'Completed', 3000],
      ['04 Dec 2024', 'Harvesting Service - 10 Acres', 'Meera Bai', 'John Deere W70', 'Mohan Das', 'Completed', 8000],
    ];

    // Create CSV rows
    const headers = ['Date', 'Description', 'Customer', 'Machine', 'Operator', 'Status', 'Amount (INR)'];
    const csvRows = [headers.join(',')];

    transactions.forEach(row => {
      csvRows.push(row.map(cell => {
        const str = String(cell);
        return str.includes(',') ? `"${str}"` : str;
      }).join(','));
    });

    // Add totals
    const totalEarnings = transactions.filter(t => t[6] > 0).reduce((a, t) => a + t[6], 0);
    const totalExpenses = Math.abs(transactions.filter(t => t[6] < 0).reduce((a, t) => a + t[6], 0));
    csvRows.push('');
    csvRows.push(`Total Earnings,,,,,, ${totalEarnings}`);
    csvRows.push(`Total Expenses,,,,,, ${totalExpenses}`);
    csvRows.push(`Net Income,,,,,, ${totalEarnings - totalExpenses}`);

    const csvContent = csvRows.join('\n');

    // Create download using data URI (CSP-safe method)
    const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `KhetBandhu_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('CSV download triggered');
    showToast('📊 CSV Downloaded! Open in Excel.');
  };

  // Download PDF Report
  const downloadPDF = () => {
    // Generate PDF-like HTML that can be saved as PDF
    const pdfHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Khet Bandhu - Business Report</title>
  <style>
    @page { size: A4; margin: 20mm; }
    @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; background: white; font-size: 11pt; line-height: 1.4; }
    .page { max-width: 210mm; margin: 0 auto; padding: 20mm; }
    .header { background: linear-gradient(135deg, #1B4332, #2D5A4A); color: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; }
    .header h1 { font-size: 24pt; margin-bottom: 5px; }
    .header p { opacity: 0.9; font-size: 10pt; }
    .header .date { float: right; font-size: 9pt; opacity: 0.8; }
    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px; }
    .summary-card { background: #f9f9f9; border-radius: 10px; padding: 15px; text-align: center; border: 1px solid #eee; }
    .summary-card .value { font-size: 20pt; font-weight: 800; color: #1B4332; }
    .summary-card .label { font-size: 8pt; color: #666; margin-top: 4px; text-transform: uppercase; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 14pt; font-weight: 700; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #1B4332; color: #1B4332; }
    table { width: 100%; border-collapse: collapse; font-size: 9pt; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f5f5f5; font-weight: 600; color: #666; text-transform: uppercase; font-size: 8pt; }
    .amount { font-weight: 700; color: #1B4332; }
    .amount.negative { color: #EF4444; }
    .status { padding: 3px 10px; border-radius: 12px; font-size: 8pt; font-weight: 600; }
    .status.completed { background: #E8F5E9; color: #2E7D32; }
    .status.expense { background: #FFEBEE; color: #C62828; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #eee; font-size: 9pt; color: #999; }
    .chart-bar { height: 20px; background: linear-gradient(90deg, #1B4332, #2D5A4A); border-radius: 4px; margin-bottom: 8px; }
    .fleet-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .fleet-card { background: #f9f9f9; padding: 12px; border-radius: 8px; text-align: center; }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <span class="date">Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      <h1>🌾 Khet Bandhu</h1>
      <p>Business Performance Report - December 2024</p>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <div class="value">₹4.85L</div>
        <div class="label">Total Revenue</div>
      </div>
      <div class="summary-card">
        <div class="value">156</div>
        <div class="label">Total Jobs</div>
      </div>
      <div class="summary-card">
        <div class="value">5</div>
        <div class="label">Active Machines</div>
      </div>
      <div class="summary-card">
        <div class="value">4.8★</div>
        <div class="label">Avg Rating</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">📊 Monthly Revenue Trend</div>
      <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; text-align: center;">
        ${[
        { month: 'Jul', value: 42000, pct: 49 },
        { month: 'Aug', value: 58000, pct: 68 },
        { month: 'Sep', value: 71000, pct: 84 },
        { month: 'Oct', value: 65000, pct: 76 },
        { month: 'Nov', value: 78000, pct: 92 },
        { month: 'Dec', value: 85000, pct: 100 }
      ].map(d => `
          <div>
            <div class="chart-bar" style="height: ${d.pct * 0.6}px; margin-bottom: 5px;"></div>
            <div style="font-weight: 700; font-size: 10pt;">₹${(d.value / 1000).toFixed(0)}K</div>
            <div style="font-size: 8pt; color: #666;">${d.month}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">🚜 Fleet Performance</div>
      <table>
        <thead>
          <tr><th>Machine</th><th>Type</th><th>Jobs</th><th>Hours</th><th>Efficiency</th><th>Revenue</th></tr>
        </thead>
        <tbody>
          ${machines.map(m => `
            <tr>
              <td><strong>${m.name}</strong></td>
              <td>${m.type}</td>
              <td>${m.jobs}</td>
              <td>${m.hoursRun} hrs</td>
              <td>${m.efficiency}%</td>
              <td class="amount">₹${(m.revenue / 1000).toFixed(0)}K</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">👥 Team Performance</div>
      <table>
        <thead>
          <tr><th>Name</th><th>Role</th><th>Jobs</th><th>Rating</th><th>On-Time</th><th>Earnings</th></tr>
        </thead>
        <tbody>
          ${team.map(t => `
            <tr>
              <td><strong>${t.name}</strong></td>
              <td>${t.role}</td>
              <td>${t.jobs}</td>
              <td>⭐ ${t.rating}</td>
              <td>${t.onTimeRate}%</td>
              <td class="amount">₹${(t.earnings / 1000).toFixed(0)}K</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">📋 Recent Transactions</div>
      <table>
        <thead>
          <tr><th>Date</th><th>Description</th><th>Customer</th><th>Status</th><th>Amount</th></tr>
        </thead>
        <tbody>
          <tr><td>15 Dec</td><td>Ploughing - 3 Acres</td><td>Ramesh Patil</td><td><span class="status completed">Completed</span></td><td class="amount">+₹1,800</td></tr>
          <tr><td>14 Dec</td><td>Harvesting - 5 Acres</td><td>Anita Sharma</td><td><span class="status completed">Completed</span></td><td class="amount">+₹4,000</td></tr>
          <tr><td>13 Dec</td><td>JCB Excavation - 2 Hours</td><td>Suresh Kumar</td><td><span class="status completed">Completed</span></td><td class="amount">+₹1,600</td></tr>
          <tr><td>12 Dec</td><td>Withdrawal to HDFC Bank</td><td>-</td><td><span class="status expense">Withdrawal</span></td><td class="amount negative">-₹25,000</td></tr>
          <tr><td>11 Dec</td><td>Spraying - 4 Acres</td><td>Mohan Patel</td><td><span class="status completed">Completed</span></td><td class="amount">+₹1,200</td></tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <p><strong>Khet Bandhu</strong> - Your Farming Partner</p>
      <p style="margin-top: 5px;">This is a computer-generated report. For queries, contact support@khetbandhu.com</p>
      <p style="margin-top: 5px;">Report ID: KB-${Date.now()} | Owner: Ram Singh | Phone: +91 98765-43210</p>
    </div>
  </div>
  <script>
    window.onload = () => { 
      document.title = 'Khet_Bandhu_Report_${new Date().toISOString().split('T')[0]}.pdf';
      setTimeout(() => window.print(), 500); 
    };
  </script>
</body>
</html>`;

    const blob = new Blob([pdfHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    showToast('📄 PDF Report ready! Use Print > Save as PDF');
  };

  const OwnerHome = () => {
    const fleetValue = machines.reduce((a, m) => a + m.currentValue, 0);
    const fleetRevenue = machines.reduce((a, m) => a + m.revenue, 0);
    const teamRevenue = team.reduce((a, m) => a + m.earnings, 0);
    const totalJobs = machines.reduce((a, m) => a + m.jobs, 0);
    const avgEfficiency = (machines.reduce((a, m) => a + m.efficiency, 0) / machines.length).toFixed(0);
    const activeMachines = machines.filter(m => m.status === 'working').length;

    return (
      <div style={{ padding: 20, background: '#f5f5f0', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 13, color: '#666' }}>Good morning ☀️</p>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: '4px 0' }}>Ram Singh</h1>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 10, background: '#E8F5E9', color: '#2E7D32', padding: '3px 8px', borderRadius: 12, fontWeight: 600 }}>✓ Verified</span>
              <span style={{ fontSize: 10, background: '#FEF3C7', color: '#D97706', padding: '3px 8px', borderRadius: 12, fontWeight: 600 }}>⭐ 4.8</span>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <Avatar seed="RamSingh" size={56} />
            <span style={{ position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, background: '#22C55E', borderRadius: '50%', border: '2px solid white' }} />
          </div>
        </header>

        {/* Revenue Hero */}
        <div onClick={() => setModal({ type: 'revenueDetails' })} style={{ background: 'linear-gradient(135deg, #1B4332, #2D5A4A)', borderRadius: 24, padding: 24, color: 'white', marginBottom: 16, cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 12, opacity: 0.8 }}>Total Revenue</p>
              <p style={{ fontSize: 36, fontWeight: 800, margin: '4px 0' }}>{formatCurrency(earnings + fleetRevenue)}</p>
              <span style={{ fontSize: 12, background: 'rgba(34,197,94,0.3)', padding: '4px 10px', borderRadius: 12, color: '#86EFAC' }}>↑ +28% this month</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, opacity: 0.7 }}>Today</p>
              <p style={{ fontSize: 24, fontWeight: 800 }}>{formatCurrency(todayEarnings)}</p>
              <p style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>3 jobs done</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, height: 40 }}>
            {[30, 45, 25, 60, 40, 75, 55, 80, 65, 90, 70, 85].map((h, i) => (
              <div key={i} style={{ flex: 1, background: i === 11 ? '#22C55E' : 'rgba(255,255,255,0.25)', height: `${h}%`, borderRadius: 2, alignSelf: 'flex-end' }} />
            ))}
          </div>
          <p style={{ fontSize: 10, opacity: 0.5, marginTop: 6, textAlign: 'center' }}>Tap for detailed analytics →</p>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
          <div onClick={() => setView('fleet')} style={{ background: 'white', borderRadius: 16, padding: 12, textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: 20 }}>🚜</span>
            <p style={{ fontSize: 16, fontWeight: 800, margin: '4px 0', color: '#1B4332' }}>{formatCurrency(fleetValue)}</p>
            <p style={{ fontSize: 9, color: '#666' }}>Fleet Value</p>
          </div>
          <div onClick={() => setModal({ type: 'weeklyStats' })} style={{ background: 'white', borderRadius: 16, padding: 12, textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: 20 }}>📊</span>
            <p style={{ fontSize: 16, fontWeight: 800, margin: '4px 0', color: '#1B4332' }}>₹42.5K</p>
            <p style={{ fontSize: 9, color: '#666' }}>This Week</p>
          </div>
          <div onClick={() => setModal({ type: 'jobsHistory' })} style={{ background: 'white', borderRadius: 16, padding: 12, textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <p style={{ fontSize: 16, fontWeight: 800, margin: '4px 0', color: '#1B4332' }}>{totalJobs}+</p>
            <p style={{ fontSize: 9, color: '#666' }}>Jobs Done</p>
          </div>
          <div onClick={() => setModal({ type: 'efficiencyDetails' })} style={{ background: 'white', borderRadius: 16, padding: 12, textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <p style={{ fontSize: 16, fontWeight: 800, margin: '4px 0', color: '#1B4332' }}>{avgEfficiency}%</p>
            <p style={{ fontSize: 9, color: '#666' }}>Efficiency</p>
          </div>
        </div>

        {/* Live Status */}
        <div style={{ background: 'white', borderRadius: 20, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>🔴 Live Status</h3>
            <span onClick={() => setView('fleet')} style={{ fontSize: 11, color: '#22C55E', fontWeight: 600, cursor: 'pointer' }}>{activeMachines} Active →</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {machines.slice(0, 4).map((m, i) => (
              <div key={i} onClick={() => setModal({ type: 'machineDetails', data: m })} style={{ flex: 1, background: m.status === 'working' ? '#E8F5E9' : '#f5f5f5', borderRadius: 12, padding: 10, textAlign: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 24 }}>🚜</span>
                <p style={{ fontSize: 10, fontWeight: 600, marginTop: 4 }}>{m.name.split(' ')[0]}</p>
                <span style={{ fontSize: 8, color: m.status === 'working' ? '#22C55E' : '#999' }}>
                  {m.status === 'working' ? '● Working' : m.status === 'available' ? '○ Free' : '⚠ Service'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* New Requests */}
        {requests.length > 0 && (
          <div style={{ background: 'white', borderRadius: 20, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>🔔 New Requests</h3>
              <span style={{ background: '#EF4444', color: 'white', padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>{requests.length}</span>
            </div>
            {requests.map((r, i) => (
              <div key={r.id} onClick={() => setModal({ type: 'request', data: r })} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer' }}>
                <Avatar seed={r.farmer} size={44} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>{r.farmer}</p>
                  <p style={{ fontSize: 12, color: '#666' }}>{r.service} · {r.area}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 700, color: '#1B4332', fontSize: 15 }}>₹{r.amount}</p>
                  <p style={{ fontSize: 10, color: '#666' }}>{r.when}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Earnings Breakdown */}
        <div onClick={() => setModal({ type: 'reports' })} style={{ background: 'white', borderRadius: 20, padding: 16, marginBottom: 16, cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>💰 Earnings Breakdown</h3>
            <span style={{ fontSize: 11, color: '#1B4332' }}>Details →</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Ploughing', amount: 185000, color: '#1B4332', pct: 40 },
              { label: 'Harvesting', amount: 125000, color: '#2D5A4A', pct: 27 },
              { label: 'Sowing', amount: 95000, color: '#3D6B5A', pct: 20 },
              { label: 'Other', amount: 60000, color: '#8B9E7C', pct: 13 },
            ].map((e, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 6 }}>
                  <div style={{ width: '70%', height: `${e.pct * 1.5}px`, background: e.color, borderRadius: '6px 6px 0 0' }} />
                </div>
                <p style={{ fontSize: 11, fontWeight: 700 }}>{e.pct}%</p>
                <p style={{ fontSize: 9, color: '#666' }}>{e.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team & Fleet Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
          <div onClick={() => setView('team')} style={{ background: 'white', borderRadius: 16, padding: 14, cursor: 'pointer' }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>👥 Team</h4>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#1B4332' }}>{team.length}</p>
            <p style={{ fontSize: 11, color: '#666' }}>Members Active</p>
            <div style={{ display: 'flex', marginTop: 8 }}>
              {team.slice(0, 3).map((t, i) => (
                <div key={i} style={{ marginLeft: i > 0 ? -8 : 0 }}><Avatar seed={t.name} size={28} /></div>
              ))}
              <span style={{ marginLeft: 4, fontSize: 11, color: '#666', alignSelf: 'center' }}>+{team.length - 3}</span>
            </div>
          </div>
          <div onClick={() => setView('fleet')} style={{ background: 'white', borderRadius: 16, padding: 14, cursor: 'pointer' }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🚜 Fleet</h4>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#1B4332' }}>{machines.length}</p>
            <p style={{ fontSize: 11, color: '#666' }}>Machines Total</p>
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              <span style={{ fontSize: 9, background: '#E8F5E9', color: '#22C55E', padding: '2px 6px', borderRadius: 8 }}>{activeMachines} Active</span>
              <span style={{ fontSize: 9, background: '#f0f0f0', color: '#666', padding: '2px 6px', borderRadius: 8 }}>{machines.length - activeMachines} Idle</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', borderRadius: 20, padding: 16, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>⚡ Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            <button onClick={() => setModal({ type: 'withdraw' })} style={{ background: 'white', border: 'none', borderRadius: 12, padding: 12, cursor: 'pointer', textAlign: 'center' }}>
              <span style={{ fontSize: 24 }}>💸</span>
              <p style={{ fontSize: 10, marginTop: 4, fontWeight: 600 }}>Withdraw</p>
            </button>
            <button onClick={() => setModal({ type: 'reports' })} style={{ background: 'white', border: 'none', borderRadius: 12, padding: 12, cursor: 'pointer', textAlign: 'center' }}>
              <span style={{ fontSize: 24 }}>�</span>
              <p style={{ fontSize: 10, marginTop: 4, fontWeight: 600 }}>Reports</p>
            </button>
            <button onClick={() => setModal({ type: 'addDriver' })} style={{ background: 'white', border: 'none', borderRadius: 12, padding: 12, cursor: 'pointer', textAlign: 'center' }}>
              <span style={{ fontSize: 24 }}>👥</span>
              <p style={{ fontSize: 10, marginTop: 4, fontWeight: 600 }}>Add Staff</p>
            </button>
            <button onClick={() => setModal({ type: 'addMachine' })} style={{ background: 'white', border: 'none', borderRadius: 12, padding: 12, cursor: 'pointer', textAlign: 'center' }}>
              <span style={{ fontSize: 24 }}>🚜</span>
              <p style={{ fontSize: 10, marginTop: 4, fontWeight: 600 }}>Add Machine</p>
            </button>
          </div>
        </div>

        {/* Recent Complete Jobs */}
        <div style={{ background: 'white', borderRadius: 20, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>✅ Recent Jobs</h3>
            <span style={{ fontSize: 12, color: '#1B4332', fontWeight: 600 }}>View All →</span>
          </div>
          {completedJobs.map((j, i) => (
            <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f0f0' : 'none' }}>
              <div style={{ width: 40, height: 40, background: '#E8F5E9', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✓</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 13 }}>{j.farmer}</p>
                <p style={{ fontSize: 11, color: '#666' }}>{j.service} · {j.date}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 700, color: '#1B4332' }}>₹{j.amount}</p>
                <StarRating rating={j.rating} size={10} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OwnerFleet = () => {
    const totalRevenue = machines.reduce((a, m) => a + m.revenue, 0);
    const totalJobs = machines.reduce((a, m) => a + m.jobs, 0);
    const totalValue = machines.reduce((a, m) => a + m.currentValue, 0);
    const avgEfficiency = (machines.reduce((a, m) => a + m.efficiency, 0) / machines.length).toFixed(0);
    const totalHours = machines.reduce((a, m) => a + m.hoursRun, 0);

    return (
      <div className="fleet-page animate-fade" style={{ padding: 20 }}>
        <div className="page-header">
          <h1>🚜 My Fleet</h1>
          <button className="add-btn" onClick={() => setModal({ type: 'addMachine' })}>+ Add</button>
        </div>

        {/* Fleet Value Card */}
        <div style={{ background: 'linear-gradient(135deg, #8B9E7C, #6B8060)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 24 }}>
          <p style={{ opacity: 0.9, fontSize: 14 }}>Total Fleet Value</p>
          <p style={{ fontSize: 36, fontWeight: 800, margin: '8px 0' }}>{formatCurrency(totalValue)}</p>
          <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
            <div><p style={{ opacity: 0.8, fontSize: 12 }}>Revenue Generated</p><p style={{ fontSize: 18, fontWeight: 700 }}>{formatCurrency(totalRevenue)}</p></div>
            <div><p style={{ opacity: 0.8, fontSize: 12 }}>ROI</p><p style={{ fontSize: 18, fontWeight: 700 }}>+12.4%</p></div>
            <div><p style={{ opacity: 0.8, fontSize: 12 }}>Utilization</p><p style={{ fontSize: 18, fontWeight: 700 }}>87%</p></div>
          </div>
        </div>

        {/* Fleet Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 24 }}>
          <div style={{ background: 'white', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#8B9E7C' }}>{machines.length}</p>
            <p style={{ fontSize: 10, color: '#666' }}>Machines</p>
          </div>
          <div style={{ background: 'white', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#8B9E7C' }}>{totalJobs}</p>
            <p style={{ fontSize: 10, color: '#666' }}>Jobs Done</p>
          </div>
          <div style={{ background: 'white', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#8B9E7C' }}>{avgEfficiency}%</p>
            <p style={{ fontSize: 10, color: '#666' }}>Efficiency</p>
          </div>
          <div style={{ background: 'white', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#8B9E7C' }}>{(totalHours / 1000).toFixed(1)}K</p>
            <p style={{ fontSize: 10, color: '#666' }}>Hours Run</p>
          </div>
          <div style={{ background: 'white', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#22C55E' }}>{machines.filter(m => m.status === 'Working').length}</p>
            <p style={{ fontSize: 10, color: '#666' }}>Active Now</p>
          </div>
        </div>

        {/* Revenue Chart by Machine */}
        <div style={{ background: 'white', borderRadius: 16, padding: 20, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>📊 Revenue by Machine</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
            {machines.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: '#8B9E7C', fontWeight: 600 }}>₹{(m.revenue / 1000).toFixed(0)}K</span>
                <div style={{ width: '100%', background: ['#8B9E7C', '#C67B5B', '#D4A574', '#6B8060', '#F59E0B'][i], borderRadius: '4px 4px 0 0', height: `${(m.revenue / 285000) * 120}px`, marginTop: 4 }} />
                <span style={{ fontSize: 8, color: '#666', marginTop: 6, textAlign: 'center' }}>{m.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Status Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#E8F5E9', borderRadius: 14, padding: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>✅</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#2E7D32' }}>{machines.filter(m => m.status === 'Working').length}</p>
            <p style={{ fontSize: 12, color: '#2E7D32' }}>Working</p>
          </div>
          <div style={{ background: '#E0F2FE', borderRadius: 14, padding: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🅿️</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#0284C7' }}>{machines.filter(m => m.status === 'Available').length}</p>
            <p style={{ fontSize: 12, color: '#0284C7' }}>Available</p>
          </div>
          <div style={{ background: '#FEF3C7', borderRadius: 14, padding: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🔧</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#D97706' }}>{machines.filter(m => m.status === 'Maintenance').length}</p>
            <p style={{ fontSize: 12, color: '#D97706' }}>Maintenance</p>
          </div>
        </div>

        {/* Machine Cards */}
        <h3 style={{ fontSize: 16, marginBottom: 12 }}>🚜 All Machines</h3>
        {machines.map(m => (
          <div key={m.id} style={{ background: 'white', borderRadius: 16, padding: 20, marginBottom: 16, borderLeft: `4px solid ${m.status === 'Working' ? '#22C55E' : m.status === 'Available' ? '#0284C7' : '#F59E0B'}` }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, background: '#f0f0f0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>{m.image}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{m.name}</h3>
                    <p style={{ fontSize: 13, color: '#666' }}>{m.type} · {m.purchaseYear}</p>
                  </div>
                  <span style={{ padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: m.status === 'Working' ? '#E8F5E9' : m.status === 'Available' ? '#E0F2FE' : '#FEF3C7', color: m.status === 'Working' ? '#2E7D32' : m.status === 'Available' ? '#0284C7' : '#D97706' }}>{m.status}</span>
                </div>
                {m.operator && <p style={{ fontSize: 12, marginTop: 4 }}>👤 Operated by: <strong>{m.operator}</strong></p>}
                <p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>📍 {m.location}</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
              <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#8B9E7C' }}>₹{(m.revenue / 1000).toFixed(0)}K</p>
                <p style={{ fontSize: 9, color: '#666' }}>Revenue</p>
              </div>
              <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#8B9E7C' }}>{m.jobs}</p>
                <p style={{ fontSize: 9, color: '#666' }}>Jobs</p>
              </div>
              <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#8B9E7C' }}>{m.hoursRun}</p>
                <p style={{ fontSize: 9, color: '#666' }}>Hours</p>
              </div>
              <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#8B9E7C' }}>{m.efficiency}%</p>
                <p style={{ fontSize: 9, color: '#666' }}>Efficiency</p>
              </div>
            </div>

            {/* Fuel & Health Bars */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span>⛽ Fuel Level</span>
                  <span style={{ fontWeight: 600, color: m.fuel < 30 ? '#EF4444' : '#8B9E7C' }}>{m.fuel}%</span>
                </div>
                <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4 }}>
                  <div style={{ height: '100%', background: m.fuel < 30 ? '#EF4444' : m.fuel < 50 ? '#F59E0B' : '#8B9E7C', borderRadius: 4, width: `${m.fuel}%` }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span>🔧 Health</span>
                  <span style={{ fontWeight: 600, color: m.health < 50 ? '#F59E0B' : '#8B9E7C' }}>{m.health}%</span>
                </div>
                <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4 }}>
                  <div style={{ height: '100%', background: m.health < 50 ? '#F59E0B' : '#8B9E7C', borderRadius: 4, width: `${m.health}%` }} />
                </div>
              </div>
            </div>

            {/* Asset Value & Service Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
              <div>
                <p style={{ fontSize: 10, color: '#666' }}>Asset Value</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#8B9E7C' }}>{formatCurrency(m.currentValue)}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: '#666' }}>Last Service</p>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{m.lastService}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: '#666' }}>Next Service</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: m.nextService === '18 days' ? '#F59E0B' : '#666' }}>{m.nextService}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Fleet Analytics Summary */}
        <div style={{ background: 'linear-gradient(135deg, #2C2C2C, #1a1a1a)', borderRadius: 20, padding: 24, color: 'white', marginTop: 24 }}>
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>📈 Fleet Analytics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <div>
              <p style={{ opacity: 0.7, fontSize: 12 }}>Total Investment</p>
              <p style={{ fontSize: 24, fontWeight: 800 }}>{formatCurrency(machines.reduce((a, m) => a + m.purchasePrice, 0))}</p>
            </div>
            <div>
              <p style={{ opacity: 0.7, fontSize: 12 }}>Total Depreciation</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#EF4444' }}>-{formatCurrency(machines.reduce((a, m) => a + (m.purchasePrice - m.currentValue), 0))}</p>
            </div>
            <div>
              <p style={{ opacity: 0.7, fontSize: 12 }}>Avg Job Value</p>
              <p style={{ fontSize: 24, fontWeight: 800 }}>{formatCurrency(totalRevenue / totalJobs)}</p>
            </div>
            <div>
              <p style={{ opacity: 0.7, fontSize: 12 }}>Revenue/Hour</p>
              <p style={{ fontSize: 24, fontWeight: 800 }}>{formatCurrency(totalRevenue / totalHours)}</p>
            </div>
          </div>
          <div style={{ marginTop: 20, padding: 16, background: 'rgba(255,255,255,0.1)', borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14 }}>🎯 Fleet Profitability Score</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#22C55E' }}>A+</span>
            </div>
            <p style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>Your fleet is performing 23% above industry average</p>
          </div>
        </div>
      </div>
    );
  };

  const OwnerTeam = () => {
    const totalEarnings = team.reduce((a, m) => a + m.earnings, 0);
    const avgRating = (team.reduce((a, m) => a + m.rating, 0) / team.length).toFixed(2);
    const totalJobs = team.reduce((a, m) => a + m.jobs, 0);
    const totalHours = team.reduce((a, m) => a + m.hoursWorked, 0);

    return (
      <div className="team-page animate-fade" style={{ padding: 20 }}>
        <div className="page-header">
          <h1>👥 My Team</h1>
          <button className="add-btn" onClick={() => setModal({ type: 'addDriver' })}>+ Add</button>
        </div>

        {/* Team Overview Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          <div style={{ background: 'linear-gradient(135deg, #8B9E7C, #6B8060)', borderRadius: 16, padding: 16, color: 'white', textAlign: 'center' }}>
            <p style={{ fontSize: 28, fontWeight: 800 }}>{team.length}</p>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Team Members</p>
          </div>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#8B9E7C' }}>{totalJobs}</p>
            <p style={{ fontSize: 12, color: '#666' }}>Total Jobs</p>
          </div>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#8B9E7C' }}>{avgRating}⭐</p>
            <p style={{ fontSize: 12, color: '#666' }}>Avg Rating</p>
          </div>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#8B9E7C' }}>{(totalHours / 1000).toFixed(1)}K</p>
            <p style={{ fontSize: 12, color: '#666' }}>Hours Worked</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div style={{ background: 'white', borderRadius: 16, padding: 20, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>📊 Team Performance</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 120 }}>
            {team.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: '#8B9E7C', fontWeight: 600 }}>₹{(m.earnings / 1000).toFixed(0)}K</span>
                <div style={{ width: '100%', background: i === 3 ? '#C67B5B' : '#8B9E7C', borderRadius: '4px 4px 0 0', height: `${(m.earnings / 567000) * 100}px`, marginTop: 4 }} />
                <span style={{ fontSize: 9, color: '#666', marginTop: 6, textAlign: 'center' }}>{m.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Leaderboard */}
        <div style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', borderRadius: 16, padding: 20, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, marginBottom: 12 }}>🏆 Top Performer This Month</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <Avatar seed="Vikram Singh" size={72} />
              <span style={{ position: 'absolute', bottom: -4, right: -4, background: '#F59E0B', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>👑</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 18 }}>Vikram Singh</p>
              <p style={{ fontSize: 13, color: '#666' }}>Lead Supervisor · 7 years exp</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: 20 }}>189 jobs</span>
                <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: 20 }}>⭐ 4.95</span>
                <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: 20 }}>100% satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <h3 style={{ fontSize: 16, marginBottom: 12 }}>👤 All Team Members</h3>
        {team.map(m => (
          <div key={m.id} style={{ background: 'white', borderRadius: 16, padding: 20, marginBottom: 16 }} onClick={() => setModal({ type: 'teamDetail', member: m })}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <Avatar seed={m.name} size={60} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{m.name}</h3>
                    <p style={{ fontSize: 13, color: '#666' }}>{m.role} · {m.experience}</p>
                  </div>
                  <span style={{ padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: m.status === 'On Job' ? '#FEF3C7' : m.status === 'Available' ? '#E8F5E9' : '#f0f0f0', color: m.status === 'On Job' ? '#D97706' : m.status === 'Available' ? '#2E7D32' : '#666' }}>{m.status}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  {m.certifications.map((c, i) => (
                    <span key={i} style={{ fontSize: 10, background: '#E8F5E9', color: '#2E7D32', padding: '3px 8px', borderRadius: 10 }}>✓ {c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#8B9E7C' }}>{m.jobs}</p>
                <p style={{ fontSize: 10, color: '#666' }}>Jobs Done</p>
              </div>
              <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#8B9E7C' }}>₹{(m.earnings / 1000).toFixed(0)}K</p>
                <p style={{ fontSize: 10, color: '#666' }}>Earnings</p>
              </div>
              <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#8B9E7C' }}>{m.onTimeRate}%</p>
                <p style={{ fontSize: 10, color: '#666' }}>On-Time</p>
              </div>
              <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#8B9E7C' }}>{m.customerSatisfaction}%</p>
                <p style={{ fontSize: 10, color: '#666' }}>Satisfaction</p>
              </div>
            </div>

            {/* Progress Bars */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                <span>Performance Score</span>
                <span style={{ fontWeight: 600 }}>{((m.onTimeRate + m.customerSatisfaction + m.rating * 20) / 3).toFixed(0)}%</span>
              </div>
              <div style={{ height: 6, background: '#f0f0f0', borderRadius: 3 }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #8B9E7C, #6B8060)', borderRadius: 3, width: `${((m.onTimeRate + m.customerSatisfaction + m.rating * 20) / 3)}%` }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 12, color: '#666' }}>📅 Joined {m.joinDate}</span>
              <span style={{ fontSize: 12, color: '#666' }}>📞 {m.phone}</span>
              <span style={{ fontSize: 12, color: '#8B9E7C', fontWeight: 600 }}>View Details →</span>
            </div>
          </div>
        ))}

        {/* Team Summary Card */}
        <div style={{ background: 'linear-gradient(135deg, #2C2C2C, #1a1a1a)', borderRadius: 20, padding: 24, color: 'white', marginTop: 24 }}>
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>📈 Team Analytics Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <div>
              <p style={{ opacity: 0.7, fontSize: 12 }}>Total Team Revenue</p>
              <p style={{ fontSize: 28, fontWeight: 800 }}>{formatCurrency(totalEarnings)}</p>
            </div>
            <div>
              <p style={{ opacity: 0.7, fontSize: 12 }}>Avg Job Value</p>
              <p style={{ fontSize: 28, fontWeight: 800 }}>{formatCurrency(totalEarnings / totalJobs)}</p>
            </div>
            <div>
              <p style={{ opacity: 0.7, fontSize: 12 }}>Team Utilization</p>
              <p style={{ fontSize: 28, fontWeight: 800 }}>87%</p>
            </div>
            <div>
              <p style={{ opacity: 0.7, fontSize: 12 }}>Avg Experience</p>
              <p style={{ fontSize: 28, fontWeight: 800 }}>3.7 yrs</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OwnerWallet = () => (
    <div className="wallet-page animate-fade">
      <h1 className="page-title">💳 Wallet</h1>

      <div className="balance-card">
        <p className="balance-label">Available Balance</p>
        <p className="balance-amount">{formatCurrency(earnings)}</p>
        <div className="balance-actions">
          <button onClick={() => setModal({ type: 'withdraw' })}>Withdraw</button>
          <button onClick={downloadStatement}>Statement</button>
        </div>
      </div>

      <div className="earnings-breakdown">
        <h3>This Month</h3>
        <div className="breakdown-item"><span>🚜 Ploughing</span><span>₹45,000</span></div>
        <div className="breakdown-item"><span>🌾 Harvesting</span><span>₹28,000</span></div>
        <div className="breakdown-item"><span>💧 Spraying</span><span>₹12,000</span></div>
      </div>

      <div className="referral-card">
        <span className="referral-icon">🎁</span>
        <h3>Invite & Earn</h3>
        <p>Get ₹500 for each referral</p>
        <button onClick={() => { navigator.clipboard?.writeText('https://khet-bandhu.vercel.app'); showToast('Link copied!'); }}>Share Link</button>
      </div>
    </div>
  );

  const OwnerProfile = () => (
    <div className="profile-page animate-fade">
      <h1 className="page-title">👤 Profile</h1>

      <div className="profile-card">
        <Avatar seed="RamSingh" size={80} />
        <div className="profile-info">
          <h2>Ram Singh</h2>
          <p>+91 98765-43210</p>
          <div className="profile-badges">
            <span className="badge gold">⭐ 4.8 Rating</span>
            <span className="badge">156 Jobs</span>
          </div>
        </div>
      </div>

      <div className="settings-list">
        <div className="settings-item"><span>🔔 Notifications</span><span className="toggle on">On</span></div>
        <div className="settings-item"><span>🌐 Language</span><span>English</span></div>
        <div className="settings-item"><span>🏦 Bank Account</span><span>••••1234</span></div>
        <div className="settings-item"><span>📄 Documents</span><span>Verified ✓</span></div>
        <div className="settings-item"><span>❓ Help & Support</span><span>→</span></div>
      </div>

      <button className="logout-btn" onClick={onLogout}>Log Out</button>
    </div>
  );

  return (
    <div className="app-container owner">
      {toast && <div className="toast">{toast}</div>}

      {view === 'home' && <OwnerHome />}
      {view === 'fleet' && <OwnerFleet />}
      {view === 'team' && <OwnerTeam />}
      {view === 'wallet' && <OwnerWallet />}
      {view === 'profile' && <OwnerProfile />}

      {/* Request Modal */}
      {modal?.type === 'request' && (
        <Modal onClose={() => setModal(null)}>
          <div className="request-modal">
            <Avatar seed={modal.data.farmer} size={80} />
            <h2>{modal.data.farmer}</h2>
            <p className="verified">✓ Verified Farmer · ⭐ 4.7</p>

            <div className="request-details">
              <div className="detail-row"><span>Service</span><span>{modal.data.service}</span></div>
              <div className="detail-row"><span>Area</span><span>{modal.data.area}</span></div>
              <div className="detail-row"><span>When</span><span>{modal.data.when}</span></div>
              <div className="detail-row"><span>Location</span><span>{modal.data.location}</span></div>
              <div className="detail-row total"><span>Amount</span><span>₹{modal.data.amount}</span></div>
            </div>

            <div className="modal-actions">
              <button className="decline-btn" onClick={() => { setRequests(requests.filter(r => r.id !== modal.data.id)); setModal(null); showToast('Declined'); }}>Decline</button>
              <button className="accept-btn" onClick={() => { setRequests(requests.filter(r => r.id !== modal.data.id)); setModal(null); showToast('✓ Accepted! Farmer notified.'); }}>Accept</button>
            </div>
          </div>
        </Modal>
      )}

      {modal?.type === 'addMachine' && (
        <Modal onClose={() => setModal(null)}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Add Machine</h2>
          <input id="mName" placeholder="Machine Name" className="modal-input" />
          <select id="mType" className="modal-select"><option>Tractor</option><option>Excavator</option><option>Harvester</option></select>
          <button className="modal-submit" onClick={() => { setMachines([...machines, { id: Date.now(), name: document.getElementById('mName').value || 'New Machine', type: document.getElementById('mType').value, status: 'Available', fuel: 100, operator: null, location: 'Depot', health: 100 }]); setModal(null); showToast('Machine added!'); }}>Add Machine</button>
        </Modal>
      )}

      {modal?.type === 'addDriver' && (
        <Modal onClose={() => setModal(null)}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Add Team Member</h2>
          <input id="dName" placeholder="Name" className="modal-input" />
          <input id="dPhone" placeholder="Phone" className="modal-input" />
          <select id="dRole" className="modal-select"><option>Driver</option><option>Operator</option><option>Helper</option></select>
          <button className="modal-submit" onClick={() => { setTeam([...team, { id: Date.now(), name: document.getElementById('dName').value || 'New Member', role: document.getElementById('dRole').value, status: 'Available', phone: document.getElementById('dPhone').value || '00000-00000', jobs: 0, rating: 5.0 }]); setModal(null); showToast('Team member added!'); }}>Add Member</button>
        </Modal>
      )}

      {modal?.type === 'withdraw' && (
        <Modal onClose={() => setModal(null)}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Withdraw</h2>
          <div className="withdraw-balance">Available: {formatCurrency(earnings)}</div>
          <input id="wAmt" type="number" defaultValue="10000" className="modal-input amount" />
          <button className="modal-submit" onClick={() => { const a = parseInt(document.getElementById('wAmt').value); if (a > 0 && a <= earnings) { setEarnings(earnings - a); setModal(null); showToast(`₹${a.toLocaleString()} withdrawal initiated!`); } }}>Confirm Withdrawal</button>
        </Modal>
      )}

      {modal?.type === 'reports' && (
        <Modal onClose={() => setModal(null)}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20, fontSize: 20 }}>📊 Business Reports</h2>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#E8F5E9', borderRadius: 16, padding: 16, textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: '#666' }}>Total Revenue</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#1B4332' }}>{formatCurrency(earnings + machines.reduce((a, m) => a + m.revenue, 0))}</p>
                <p style={{ fontSize: 11, color: '#22C55E' }}>↑ +28% vs last year</p>
              </div>
              <div style={{ background: '#FEF3C7', borderRadius: 16, padding: 16, textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: '#666' }}>Net Profit</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#D97706' }}>₹8.45L</p>
                <p style={{ fontSize: 11, color: '#22C55E' }}>↑ +18% margin</p>
              </div>
            </div>

            {/* Monthly Revenue Chart */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Monthly Revenue (2024)</h4>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
                {[45, 52, 48, 65, 58, 72, 68, 85, 78, 92, 88, 95].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '80%', height: `${h}px`, background: i === 11 ? '#1B4332' : '#8B9E7C', borderRadius: '4px 4px 0 0' }} />
                    <span style={{ fontSize: 8, marginTop: 4, color: '#666' }}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Key Performance Metrics</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Fleet Utilization', value: '87%', change: '+5%' },
                  { label: 'Avg Job Value', value: '₹3,450', change: '+12%' },
                  { label: 'Customer Retention', value: '68%', change: '+8%' },
                  { label: 'On-Time Completion', value: '94%', change: '+3%' },
                  { label: 'Customer Rating', value: '4.8/5', change: '+0.2' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 4 ? '1px solid #e0e0e0' : 'none' }}>
                    <span style={{ fontSize: 13 }}>{m.label}</span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{m.value}</span>
                      <span style={{ marginLeft: 8, fontSize: 11, color: '#22C55E' }}>{m.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Services */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Top Services by Revenue</h4>
              {[
                { name: 'Ploughing', amount: 485000, pct: 40 },
                { name: 'Harvesting', amount: 325000, pct: 27 },
                { name: 'Sowing', amount: 242000, pct: 20 },
                { name: 'Spraying', amount: 156000, pct: 13 },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12 }}>{s.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{formatCurrency(s.amount)}</span>
                  </div>
                  <div style={{ height: 8, background: '#e0e0e0', borderRadius: 4 }}>
                    <div style={{ height: '100%', width: `${s.pct}%`, background: '#1B4332', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Download Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              <button onClick={() => { downloadPDF(); setModal(null); }} style={{ background: 'linear-gradient(135deg, #1B4332, #2D5A4A)', color: 'white', border: 'none', borderRadius: 14, padding: 16, cursor: 'pointer', fontWeight: 600, fontSize: 14, boxShadow: '0 4px 12px rgba(27,67,50,0.3)', transition: 'all 0.2s' }}>
                📄 Download PDF
              </button>
              <button onClick={() => { exportToExcel(); setModal(null); }} style={{ background: 'white', color: '#1B4332', border: '2px solid #1B4332', borderRadius: 14, padding: 16, cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s' }}>
                📊 Export Excel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {modal?.type === 'revenueDetails' && (
        <Modal onClose={() => setModal(null)}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>💰 Revenue Analytics</h2>

            {/* All-Time Stats */}
            <div style={{ background: 'linear-gradient(135deg, #1B4332, #2D5A4A)', borderRadius: 16, padding: 20, color: 'white', marginBottom: 16 }}>
              <p style={{ fontSize: 12, opacity: 0.8 }}>All-Time Revenue</p>
              <p style={{ fontSize: 32, fontWeight: 800 }}>{formatCurrency(earnings + machines.reduce((a, m) => a + m.revenue, 0))}</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                <div><p style={{ fontSize: 10, opacity: 0.7 }}>This Year</p><p style={{ fontWeight: 700 }}>₹10.2L</p></div>
                <div><p style={{ fontSize: 10, opacity: 0.7 }}>This Month</p><p style={{ fontWeight: 700 }}>₹1.45L</p></div>
                <div><p style={{ fontSize: 10, opacity: 0.7 }}>This Week</p><p style={{ fontWeight: 700 }}>₹42.5K</p></div>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Revenue by Source</h4>
              {[
                { name: 'Service Jobs', amount: 890000, pct: 62, icon: '🚜' },
                { name: 'Rental Income', amount: 350000, pct: 24, icon: '📅' },
                { name: 'Contract Work', amount: 145000, pct: 10, icon: '📝' },
                { name: 'Referral Bonus', amount: 56000, pct: 4, icon: '🎁' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid #e0e0e0' : 'none' }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</p>
                    <div style={{ height: 6, background: '#e0e0e0', borderRadius: 3, marginTop: 4 }}>
                      <div style={{ height: '100%', width: `${s.pct}%`, background: '#1B4332', borderRadius: 3 }} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 700 }}>{formatCurrency(s.amount)}</p>
                    <p style={{ fontSize: 10, color: '#666' }}>{s.pct}%</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Growth Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              <div style={{ background: '#E8F5E9', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#22C55E' }}>+28%</p>
                <p style={{ fontSize: 11, color: '#666' }}>YoY Growth</p>
              </div>
              <div style={{ background: '#FEF3C7', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#D97706' }}>₹3.4K</p>
                <p style={{ fontSize: 11, color: '#666' }}>Avg per Job</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modal?.type === 'weeklyStats' && (
        <Modal onClose={() => setModal(null)}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>📊 This Week's Performance</h2>

            <div style={{ background: '#1B4332', borderRadius: 16, padding: 20, color: 'white', marginBottom: 16 }}>
              <p style={{ fontSize: 12, opacity: 0.8 }}>Week 50 (Dec 9-15)</p>
              <p style={{ fontSize: 32, fontWeight: 800 }}>₹42,580</p>
              <span style={{ fontSize: 12, background: 'rgba(34,197,94,0.3)', padding: '4px 10px', borderRadius: 12, color: '#86EFAC' }}>↑ +15% vs last week</span>
            </div>

            {/* Daily Breakdown */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Daily Earnings</h4>
              {[
                { day: 'Monday', amount: 4500, jobs: 2 },
                { day: 'Tuesday', amount: 8200, jobs: 3 },
                { day: 'Wednesday', amount: 3800, jobs: 1 },
                { day: 'Thursday', amount: 7500, jobs: 3 },
                { day: 'Friday', amount: 6200, jobs: 2 },
                { day: 'Saturday', amount: 9500, jobs: 4 },
                { day: 'Sunday', amount: 2880, jobs: 1 },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 6 ? '1px solid #e0e0e0' : 'none' }}>
                  <span style={{ fontSize: 13, width: 90 }}>{d.day}</span>
                  <span style={{ fontSize: 11, color: '#666' }}>{d.jobs} jobs</span>
                  <span style={{ fontWeight: 700, color: '#1B4332' }}>₹{d.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Weekly Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              <div style={{ background: 'white', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#1B4332' }}>16</p>
                <p style={{ fontSize: 10, color: '#666' }}>Jobs</p>
              </div>
              <div style={{ background: 'white', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#1B4332' }}>48hrs</p>
                <p style={{ fontSize: 10, color: '#666' }}>Machine Time</p>
              </div>
              <div style={{ background: 'white', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#1B4332' }}>4.9</p>
                <p style={{ fontSize: 10, color: '#666' }}>Avg Rating</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modal?.type === 'jobsHistory' && (
        <Modal onClose={() => setModal(null)}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>✅ Job History</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
              <div style={{ background: '#E8F5E9', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#22C55E' }}>{machines.reduce((a, m) => a + m.jobs, 0)}</p>
                <p style={{ fontSize: 10, color: '#666' }}>Total Jobs</p>
              </div>
              <div style={{ background: '#FEF3C7', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#D97706' }}>94%</p>
                <p style={{ fontSize: 10, color: '#666' }}>Success Rate</p>
              </div>
              <div style={{ background: '#EDE9FE', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#7C3AED' }}>4.8</p>
                <p style={{ fontSize: 10, color: '#666' }}>Avg Rating</p>
              </div>
            </div>

            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Recent Completed Jobs</h4>
            {[
              { farmer: 'Suresh Kumar', service: 'Ploughing', date: 'Today, 2PM', amount: 3500, acres: 5, rating: 5 },
              { farmer: 'Rajesh Patel', service: 'Harvesting', date: 'Today, 10AM', amount: 8000, acres: 10, rating: 5 },
              { farmer: 'Mohan Singh', service: 'Sowing', date: 'Yesterday', amount: 2800, acres: 4, rating: 4 },
              { farmer: 'Anil Verma', service: 'Ploughing', date: 'Dec 11', amount: 4200, acres: 6, rating: 5 },
              { farmer: 'Vikram Yadav', service: 'Spraying', date: 'Dec 10', amount: 1800, acres: 3, rating: 5 },
            ].map((j, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 4 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ width: 44, height: 44, background: '#E8F5E9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>{j.farmer}</p>
                  <p style={{ fontSize: 12, color: '#666' }}>{j.service} · {j.acres} acres · {j.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 700, color: '#1B4332' }}>₹{j.amount.toLocaleString()}</p>
                  <p style={{ fontSize: 10 }}>{'⭐'.repeat(j.rating)}</p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {modal?.type === 'efficiencyDetails' && (
        <Modal onClose={() => setModal(null)}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>⚡ Efficiency Analytics</h2>

            <div style={{ background: 'linear-gradient(135deg, #1B4332, #2D5A4A)', borderRadius: 16, padding: 20, color: 'white', marginBottom: 16, textAlign: 'center' }}>
              <p style={{ fontSize: 12, opacity: 0.8 }}>Overall Fleet Efficiency</p>
              <p style={{ fontSize: 48, fontWeight: 800 }}>{(machines.reduce((a, m) => a + m.efficiency, 0) / machines.length).toFixed(0)}%</p>
              <span style={{ fontSize: 12, background: 'rgba(34,197,94,0.3)', padding: '4px 10px', borderRadius: 12, color: '#86EFAC' }}>↑ +5% vs last month</span>
            </div>

            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Machine-wise Efficiency</h4>
            {machines.map((m, i) => (
              <div key={i} style={{ background: '#f5f5f0', borderRadius: 12, padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>🚜 {m.name}</span>
                  <span style={{ fontWeight: 700, color: m.efficiency >= 85 ? '#22C55E' : m.efficiency >= 70 ? '#D97706' : '#EF4444' }}>{m.efficiency}%</span>
                </div>
                <div style={{ height: 8, background: '#e0e0e0', borderRadius: 4 }}>
                  <div style={{ height: '100%', width: `${m.efficiency}%`, background: m.efficiency >= 85 ? '#22C55E' : m.efficiency >= 70 ? '#D97706' : '#EF4444', borderRadius: 4 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#666' }}>
                  <span>{m.hoursRun} hrs run</span>
                  <span>{m.jobs} jobs</span>
                  <span>{formatCurrency(m.revenue)} earned</span>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {modal?.type === 'machineDetails' && modal.data && (
        <Modal onClose={() => setModal(null)}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 60 }}>🚜</span>
              <h2 style={{ margin: '10px 0 4px' }}>{modal.data.name}</h2>
              <span style={{ fontSize: 12, background: modal.data.status === 'working' ? '#22C55E' : modal.data.status === 'available' ? '#3B82F6' : '#EF4444', color: 'white', padding: '4px 12px', borderRadius: 12 }}>
                {modal.data.status === 'working' ? '● Working Now' : modal.data.status === 'available' ? '○ Available' : '⚠ Needs Service'}
              </span>
            </div>

            {/* Key Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#E8F5E9', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#22C55E' }}>{formatCurrency(modal.data.revenue)}</p>
                <p style={{ fontSize: 11, color: '#666' }}>Total Earnings</p>
              </div>
              <div style={{ background: '#FEF3C7', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#D97706' }}>{modal.data.jobs}</p>
                <p style={{ fontSize: 11, color: '#666' }}>Jobs Completed</p>
              </div>
            </div>

            {/* Machine Details */}
            <div style={{ background: '#f5f5f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Machine Details</h4>
              {[
                { label: 'Purchase Price', value: formatCurrency(modal.data.purchasePrice) },
                { label: 'Current Value', value: formatCurrency(modal.data.currentValue) },
                { label: 'Hours Run', value: `${modal.data.hoursRun} hours` },
                { label: 'Efficiency', value: `${modal.data.efficiency}%` },
                { label: 'Next Service', value: 'Jan 15, 2025' },
                { label: 'Insurance', value: 'Valid till Mar 2025' },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 5 ? '1px solid #e0e0e0' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#666' }}>{d.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{d.value}</span>
                </div>
              ))}
            </div>

            {/* ROI */}
            <div style={{ background: 'linear-gradient(135deg, #1B4332, #2D5A4A)', borderRadius: 16, padding: 16, color: 'white', textAlign: 'center' }}>
              <p style={{ fontSize: 12, opacity: 0.8 }}>Return on Investment</p>
              <p style={{ fontSize: 28, fontWeight: 800 }}>{((modal.data.revenue / modal.data.purchasePrice) * 100).toFixed(0)}%</p>
              <p style={{ fontSize: 11, opacity: 0.7 }}>₹{((modal.data.revenue / modal.data.hoursRun) || 0).toFixed(0)}/hour earned</p>
            </div>
          </div>
        </Modal>
      )}

      <nav className="dock owner">
        {[
          { id: 'home', icon: '⊞', label: 'Home' },
          { id: 'fleet', icon: '🚜', label: 'Fleet' },
          { id: 'team', icon: '👥', label: 'Team' },
          { id: 'wallet', icon: '💳', label: 'Wallet' },
          { id: 'profile', icon: '👤', label: 'Profile' },
        ].map(tab => (
          <button key={tab.id} className={`dock-btn ${view === tab.id ? 'active' : ''}`} onClick={() => setView(tab.id)}>
            <span className="dock-icon">{tab.icon}</span>
            <span className="dock-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};


// ============ MAIN APP ============
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="splash-screen">
        <div className="splash-logo">🌾</div>
        <h1 className="splash-title">KhetBandhu</h1>
        <div className="splash-loader" />
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <LoginPage onLogin={(type) => setUser(type)} />
      ) : user === 'customer' ? (
        <CustomerApp onLogout={() => setUser(null)} />
      ) : (
        <OwnerApp onLogout={() => setUser(null)} />
      )}
    </>
  );
}

export default App;
