'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ClientStatusPortal() {
  const [email, setEmail] = useState('');
  const [dossierId, setDossierId] = useState('');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/status?email=${email}&id=${dossierId}`);
      const data = await res.json();
      if (data.error) setError(data.error);
      else setRecord(data);
    } catch (err) { setError('Connection Failure.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: '#060D09', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .card { background: rgba(10, 15, 12, 0.98); border: 1px solid rgba(255, 215, 0, 0.2); padding: 40px; border-radius: 12px; width: 100%; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        input { width: 100%; padding: 12px; background: #000; border: 1px solid #333; color: white; border-radius: 6px; margin-bottom: 20px; box-sizing: border-box; outline: none; }
        .btn { width: 100%; padding: 16px; background: #1A4B2C; color: white; border: 1px solid #FFD70033; border-radius: 6px; font-weight: bold; cursor: pointer; }
        .gold { color: #FFD700; }
        .status-badge { background: #1A4B2C; color: #FFD700; padding: 5px 10px; font-size: 10px; font-weight: bold; border-radius: 4px; display: inline-block; margin-bottom: 15px; }
      `}} />

      <div className="card">
        {!record ? (
          <form onSubmit={checkStatus}>
            <h2 style={{ color: 'white', marginBottom: '10px' }}>Client <span className="gold">Status</span></h2>
            <p style={{ color: '#666', fontSize: '12px', marginBottom: '25px' }}>Access your mandate progress via secure link.</p>
            
            <label style={{ color: '#888', fontSize: '10px', display: 'block', marginBottom: '8px' }}>SECURE EMAIL</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <label style={{ color: '#888', fontSize: '10px', display: 'block', marginBottom: '8px' }}>DOSSIER ID</label>
            <input required type="text" value={dossierId} onChange={(e) => setDossierId(e.target.value)} placeholder="UUID-882" />
            
            {error && <p style={{ color: '#ff4444', fontSize: '12px' }}>{error}</p>}
            <button className="btn">{loading ? 'AUTHENTICATING...' : 'ACCESS DOSSIER'}</button>
          </form>
        ) : (
          <div style={{ color: 'white' }}>
            <div className="status-badge">CURRENT PHASE: PROCESSING</div>
            <h2 style={{ margin: '0 0 10px 0' }}>{record.name}</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Focus: <span className="gold">{record.focus}</span></p>
            <div style={{ borderTop: '1px solid #333', marginTop: '20px', paddingTop: '20px' }}>
               <p style={{ fontSize: '13px' }}>✅ Intake Authenticated</p>
               <p style={{ fontSize: '13px' }}>⏳ Fiduciary Underwriting</p>
            </div>
            <button className="btn" style={{ marginTop: '20px', background: '#000' }} onClick={() => setRecord(null)}>EXIT</button>
          </div>
        )}
      </div>
    </div>
  );
}