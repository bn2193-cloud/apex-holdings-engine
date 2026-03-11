'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function StatusPortal() {
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
      const res = await fetch(`/api/status?email=${email}&id=${dossierId}`);
      const data = await res.json();
      if (data.error) setError(data.error);
      else setRecord(data);
    } catch (err) { setError('Uplink failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ background: '#060D09', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .card { background: rgba(10, 15, 12, 0.98); border: 1px solid rgba(255, 215, 0, 0.2); padding: 40px; border-radius: 12px; width: 100%; max-width: 420px; box-shadow: 0 25px 50px rgba(0,0,0,0.6); }
        input { width: 100%; padding: 14px; background: #000; border: 1px solid #333; color: white; border-radius: 6px; margin-bottom: 25px; box-sizing: border-box; outline: none; }
        .btn { width: 100%; padding: 18px; background: #1A4B2C; color: white; border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 6px; font-weight: bold; cursor: pointer; text-transform: uppercase; }
        .gold { color: #FFD700; }
      `}} />
      <div className="card">
        {!record ? (
          <form onSubmit={checkStatus}>
            <h2 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>Dossier <span className="gold">Status</span></h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '35px' }}>Verify mandate progression.</p>
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input required type="text" placeholder="Dossier ID" value={dossierId} onChange={(e) => setDossierId(e.target.value)} />
            {error && <p style={{ color: '#ef4444', fontSize: '12px' }}>{error}</p>}
            <button className="btn">{loading ? 'SCANNING...' : 'ACCESS DOSSIER'}</button>
          </form>
        ) : (
          <div>
            <h2 className="gold">{record.name}</h2>
            <p>Phase: <strong>Fiduciary Underwriting</strong></p>
            <button className="btn" style={{ background: '#000', marginTop: '20px' }} onClick={() => setRecord(null)}>EXIT</button>
          </div>
        )}
      </div>
    </div>
  );
}