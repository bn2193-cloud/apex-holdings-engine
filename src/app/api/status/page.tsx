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
      const res = await fetch(`/api/status?email=${email}&id=${dossierId}`);
      const data = await res.json();
      if (data.error) setError(data.error);
      else setRecord(data);
    } catch (err) { setError('System Uplink Failure. Verify credentials.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="status-container">
      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #060D09 !important; margin: 0; color: white; font-family: sans-serif; }
        .status-container { 
          min-height: 100vh; display: flex; align-items: center; justify-content: center; 
          padding: 20px; background-color: #060D09; position: relative; overflow: hidden;
        }
        .glow-orb {
          position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 500px; height: 500px; background: #1A4B2C; filter: blur(140px); opacity: 0.2; z-index: 1;
        }
        .status-card {
          background: rgba(10, 15, 12, 0.98); border: 1px solid rgba(255, 215, 0, 0.2);
          padding: 40px; border-radius: 12px; width: 100%; max-width: 420px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.6); position: relative; z-index: 10;
          backdrop-filter: blur(10px);
        }
        .gold { color: #FFD700; }
        .label { font-size: 10px; color: #64748b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; display: block; }
        input {
          width: 100%; padding: 14px; background: #000; border: 1px solid #333;
          color: white; border-radius: 6px; margin-bottom: 25px; box-sizing: border-box; outline: none;
        }
        input:focus { border-color: #FFD700; }
        .btn {
          width: 100%; padding: 18px; background: #1A4B2C; color: white;
          border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 6px;
          font-weight: 900; letter-spacing: 2px; cursor: pointer; text-transform: uppercase;
        }
        .btn:hover { background: #256a3e; }
        .badge {
          background: #1A4B2C; color: #FFD700; padding: 6px 12px;
          font-size: 10px; font-weight: bold; border-radius: 4px; display: inline-block; margin-bottom: 20px;
        }
        .exit-link { 
          display: block; text-align: center; margin-top: 20px; color: #475569; 
          text-decoration: none; font-size: 11px; letter-spacing: 1px; 
        }
      `}} />

      <div className="glow-orb"></div>

      <div className="status-card">
        {!record ? (
          <form onSubmit={checkStatus}>
            <h2 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>Dossier <span className="gold">Status</span></h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '35px' }}>Access mandate progression via secure uplink.</p>
            
            <span className="label">Principal Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <span className="label">Mandate ID</span>
            <input required type="text" value={dossierId} onChange={(e) => setDossierId(e.target.value)} placeholder="UUID-XXXX" />
            
            {error && <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '15px' }}>{error}</p>}
            
            <button className="btn" type="submit">
              {loading ? 'AUTHENTICATING...' : 'REQUEST ACCESS'}
            </button>
          </form>
        ) : (
          <div>
            <div className="badge">PHASE: ALPHA-ONE (UNDERWRITING)</div>
            <h2 style={{ fontSize: '28px', margin: '0 0 5px 0' }} className="gold">{record.name}</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '30px' }}>Focus: {record.focus}</p>
            
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
               <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '13px' }}>Intake Verified</span>
               </div>
               <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#FFD700', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '13px', color: '#FFD700' }}>Fiduciary Underwriting (In Progress)</span>
               </div>
               <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.3 }}>
                  <div style={{ width: '8px', height: '8px', background: '#64748b', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '13px' }}>Principal Consultation</span>
               </div>
            </div>

            <button className="btn" style={{ marginTop: '30px', background: '#000' }} onClick={() => setRecord(null)}>TERMINATE SESSION</button>
          </div>
        )}
        <Link href="/iron-summit" className="exit-link">RETURN TO LOBBY</Link>
      </div>
    </div>
  );
}