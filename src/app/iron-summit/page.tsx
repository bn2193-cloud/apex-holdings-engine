'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function IronSummitPortal() {
  const [formData, setFormData] = useState({ name: '', email: '', focus: 'Wealth Accumulation' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/iron-summit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) setStatus('success');
      else setStatus('idle');
    } catch (err) { setStatus('idle'); }
  };

  return (
    <div style={{ backgroundColor: '#060D09', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-glow { position: fixed; top: -10%; left: -10%; width: 500px; height: 500px; background: #1A4B2C; filter: blur(120px); opacity: 0.4; z-index: 1; }
        .gold-glow { position: fixed; bottom: -10%; right: -10%; width: 400px; height: 400px; background: #FFD700; filter: blur(150px); opacity: 0.15; z-index: 1; }
        .container { max-width: 1100px; margin: 0 auto; padding: 100px 24px; position: relative; z-index: 10; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        @media (max-width: 800px) { .container { grid-template-columns: 1fr; padding-top: 60px; } }
        .form-card { background: rgba(10, 15, 12, 0.95); border: 1px solid rgba(255, 215, 0, 0.2); padding: 40px; border-radius: 12px; box-shadow: 0 25px 50px rgba(0,0,0,0.6); }
        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; font-size: 11px; color: #888; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
        .input-group input, .input-group select { width: 100%; padding: 12px; background: #000; border: 1px solid #333; color: #fff; border-radius: 6px; box-sizing: border-box; }
        .btn { width: 100%; padding: 16px; background: #1A4B2C; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; border: 1px solid #FFD70033; }
        .gold { color: #FFD700; }
        nav { padding: 20px; border-bottom: 1px solid #ffffff11; display: flex; justify-content: space-between; align-items: center; }
      `}} />

      <div className="hero-glow"></div>
      <div className="gold-glow"></div>

      <nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ border: '1px solid #FFD700', padding: '4px 8px', color: '#FFD700', fontWeight: 'bold' }}>IS</div>
          <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>IRON SUMMIT</span>
        </div>
        <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>EXIT TO LOBBY</Link>
      </nav>

      <div className="container">
        <div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Institutional Wealth, <br/><span className="gold">Engineered.</span></h1>
          <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '1.1rem' }}>Protecting capital and architecting growth through proprietary architecture and fiduciary excellence.</p>
        </div>

        <div className="form-card">
          <h2 style={{ marginBottom: '30px' }}>Client Intake Protocol</h2>
          {status === 'success' ? (
            <div style={{ color: '#FFD700', textAlign: 'center' }}><h3>Transmission Received</h3><p>We will contact you shortly.</p></div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Principal Name</label>
                <input required type="text" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Secure Email</label>
                <input required type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <button type="submit" className="btn">{status === 'submitting' ? 'TRANSMITTING...' : 'SUBMIT DOSSIER'}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}