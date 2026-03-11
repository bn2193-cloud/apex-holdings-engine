'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function IronSummitPortal() {
  const [formData, setFormData] = useState({ name: '', email: '', focus: 'Wealth Accumulation & Growth' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/iron-summit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) setStatus('success');
      else setStatus('idle');
    } catch (error) {
      setStatus('idle');
    }
  };

  return (
    <div className="iron-summit-container">
      {/* THE NUKE: This style tag injects CSS directly into the page head. 
         It doesn't care about Tailwind or Vercel config. 
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        html, body { 
          background-color: #060D09 !important; 
          margin: 0 !important; 
          padding: 0 !important;
          color: white !important;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .iron-summit-container {
          min-height: 100vh;
          background-color: #060D09;
          position: relative;
          overflow-x: hidden;
        }
        .glow-1 {
          position: fixed; top: -20%; left: -10%; width: 600px; height: 600px;
          border-radius: 50%; background: #1A4B2C; filter: blur(150px); opacity: 0.3;
        }
        .glow-2 {
          position: fixed; bottom: -20%; right: -10%; width: 500px; height: 500px;
          border-radius: 50%; background: #FFD700; filter: blur(180px); opacity: 0.1;
        }
        nav {
          position: fixed; top: 0; width: 100%; z-index: 100;
          background: rgba(6, 13, 9, 0.8); backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .content {
          max-width: 1200px; margin: 0 auto; padding: 120px 24px 80px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
        }
        @media (max-width: 850px) { .content { grid-template-columns: 1fr; } }
        .hero-title { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: white; }
        .gold-text { color: #FFD700; }
        .form-box {
          background: rgba(10, 18, 14, 0.9); border: 1px solid rgba(255, 215, 0, 0.2);
          padding: 40px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        input, select {
          width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
          padding: 14px; border-radius: 6px; color: white; margin-bottom: 20px; outline: none;
        }
        button {
          width: 100%; background: #1A4B2C; color: white; border: none; padding: 16px;
          border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.3s;
        }
        button:hover { background: #256a3e; box-shadow: 0 0 15px rgba(26, 75, 44, 0.5); }
        .exit-link { color: #64748b; text-decoration: none; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
      `}} />

      <div className="glow-1"></div>
      <div className="glow-2"></div>

      <nav>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: '#1A4B2C', border: '1px solid #FFD700', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#FFD700' }}>IS</div>
            <span style={{ fontWeight: '900', letterSpacing: '2px', color: 'white' }}>IRON SUMMIT</span>
          </div>
          <Link href="/" className="exit-link">Exit to Lobby</Link>
        </div>
      </nav>

      <div className="content">
        <div>
          <h1 className="hero-title">
            Institutional Wealth, <br/>
            <span className="gold-text">Engineered.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.6', maxWidth: '500px' }}>
            We protect and grow generational capital through proprietary architecture and fiduciary excellence.
          </p>
        </div>

        <div className="form-box">
          <h2 style={{ marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Client Intake</h2>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', color: '#FFD700', padding: '40px 0' }}>
              <h3>Dossier Encrypted & Sent</h3>
              <p>We will initiate contact shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', fontSize: '11px', marginBottom: '8px', color: '#64748b' }}>FULL NAME</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              
              <label style={{ display: 'block', fontSize: '11px', marginBottom: '8px', color: '#64748b' }}>SECURE EMAIL</label>
              <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              
              <label style={{ display: 'block', fontSize: '11px', marginBottom: '8px', color: '#64748b' }}>MANDATE FOCUS</label>
              <select value={formData.focus} onChange={(e) => setFormData({...formData, focus: e.target.value})}>
                <option>Wealth Accumulation & Growth</option>
                <option>Legacy Architecture</option>
                <option>Risk Mitigation</option>
              </select>
              
              <button type="submit">{status === 'submitting' ? 'PROCESSING...' : 'SUBMIT DOSSIER'}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}