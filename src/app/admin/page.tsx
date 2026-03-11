'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MissionControl() {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDossiers() {
      try {
        const res = await fetch('/api/iron-summit');
        const data = await res.json();
        if (Array.isArray(data)) setDossiers(data);
      } catch (err) {
        console.error("Failed to fetch dossiers");
      } finally {
        setLoading(false);
      }
    }
    fetchDossiers();
  }, []);

  return (
    <div className="mission-control">
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #060D09 !important; margin: 0; color: white; font-family: sans-serif; }
        .mission-control { min-height: 100vh; padding: 40px; position: relative; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid #ffffff11; padding-bottom: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .stat-card { background: rgba(255,255,255,0.03); border: 1px solid #ffffff11; padding: 20px; border-radius: 8px; }
        .table-container { margin-top: 40px; background: rgba(10, 15, 12, 0.95); border: 1px solid rgba(255, 215, 0, 0.2); border-radius: 12px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { background: rgba(255, 215, 0, 0.05); color: #FFD700; padding: 15px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; }
        td { padding: 15px; border-bottom: 1px solid #ffffff05; color: #cbd5e1; font-size: 13px; }
        .gold { color: #FFD700; }
        .badge { padding: 4px 8px; border-radius: 4px; font-size: 9px; font-weight: bold; background: #1A4B2C; color: white; text-transform: uppercase; }
        .loading-bar { height: 2px; background: #FFD700; width: 30%; animation: slide 2s infinite; }
        @keyframes slide { from { margin-left: -30%; } to { margin-left: 100%; } }
      `}} />

      <div className="header">
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '2px' }}>MISSION <span className="gold">CONTROL</span></h1>
          <p style={{ color: '#64748b', fontSize: '10px', marginTop: '4px', letterSpacing: '1px' }}>SYSTEM TERMINAL ALPHA</p>
        </div>
        <Link href="/iron-summit" style={{ color: '#64748b', textDecoration: 'none', fontSize: '11px', border: '1px solid #ffffff11', padding: '8px 16px', borderRadius: '4px' }}>EXIT TERMINAL</Link>
      </div>

      <div className="grid">
        <div className="stat-card">
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '10px', letterSpacing: '1px' }}>ACTIVE DOSSIERS</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{dossiers.length}</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '10px', letterSpacing: '1px' }}>ENCRYPTION</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>AES-256</div>
        </div>
      </div>

      <div className="table-container">
        {loading && <div className="loading-bar"></div>}
        <table>
          <thead>
            <tr>
              <th>Principal</th>
              <th>Secure Email</th>
              <th>Mandate Focus</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {dossiers.length > 0 ? dossiers.map((d: any, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td className="gold">{d.focus}</td>
                <td style={{ fontSize: '11px', opacity: 0.5 }}>{new Date(d.created_at).toLocaleString()}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  {loading ? 'Initializing Secure Link...' : 'No Dossiers Located in Vault'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}