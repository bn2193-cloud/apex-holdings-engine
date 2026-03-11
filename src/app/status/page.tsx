'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ClientStatusPortal() {
  const [email, setEmail] = useState('');
  const [dossierId, setDossierId] = useState('');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // We'll point this to a status-specific API we create next
      const res = await fetch(`/api/status?email=${email}&id=${dossierId}`);
      const data = await res.json();
      if (data.error) setError(data.error);
      else setRecord(data);
    } catch (err) { setError('System Link Failure. Try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="status-container">
      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #060D09 !important; color: white; font-family: sans-serif; margin: 0; }
        .status-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; position: relative; }
        .glow { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; background: #1A4B2C; filter: blur(150px); opacity: 0.15; z-index: 1; }
        .card { background: rgba(10, 15, 12, 0.95); border: 1px solid rgba(255, 215, 0, 0.2); padding: 40px; border-radius: 12px; width: 100%; max-width: 450px; position: relative; z-index: 10; }
        input { width: 100%; padding: 14px; background: #000; border: 1px solid #333; color: white; border-radius: 6px; margin-bottom: 20px; box-sizing: border-box; }
        .btn { width: 100%; padding: 16px; background: #1A4B2C; color: white; border: 1px solid #FFD70033; border-radius: 6px; font-weight: bold; cursor: pointer; }
        .status-badge { display: inline-block; padding: 6px 12px; border-radius: 4px; background: #1A4B2C; color: #FFD700; font-size: 10px; font-weight: bold; letter-spacing: 1px; margin-bottom: 20px; }
        .gold { color: #FFD700; }
      `}} />

      <div className="glow"></div>

      <div className="card">
        {!record ? (
          <form onSubmit={checkStatus}>
            <h2 style={{ marginBottom: '10px' }}>Dossier <span className="gold">Status</span></h2>
            <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '30px' }}>Enter credentials to view mandate progress.</p>
            
            <label style={{ fontSize: '10px', color: '#888', display: 'block', marginBottom: '8px' }}>SECURE EMAIL</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <label style={{ fontSize: '10px', color: '#888', display: 'block', marginBottom: '8px' }}>DOSSIER ID</label>
            <input required type="text" value={dossierId} onChange={(e) => setDossierId(e.target.value)} placeholder="e.g. UUID-882" />
            
            {error && <p style={{ color: '#ff4444', fontSize: '12px' }}>{error}</p>}
            <button className="btn">{loading ? 'AUTHENTICATING...' : 'ACCESS DOSSIER'}</button>
          </form>
        ) : (
          <div>
            <div className="status-badge">CURRENT PHASE: PROCESSING</div>
            <h2 style={{ margin: '0 0 10px 0' }}>{record.name}</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '30px' }}>Focus: <span className="gold">{record.focus}</span></p>
            
            <div style={{ borderTop: '1px solid #ffffff11', paddingTop: '20px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '15px' }}>MILESTONES</div>
              <p style={{ fontSize: '13px' }}>✅ Intake Received</p>
              <p style={{ fontSize: '13px' }}>⏳ Fiduciary Review (In Progress)</p>
              <p style={{ fontSize: '13px', opacity: 0.3 }}>❌ Principal Consultation Scheduled</p>
            </div>
            
            <button className="btn" style={{ marginTop: '30px', background: '#000' }} onClick={() => setRecord(null)}>EXIT SESSION</button>
          </div>
        )}
      </div>
    </div>
  );
}