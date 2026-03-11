'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MissionControl() {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDossiers = async () => {
    try {
      const res = await fetch('/api/iron-summit');
      const data = await res.json();
      if (Array.isArray(data)) setDossiers(data);
    } catch (err) { console.error("Fetch failed"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDossiers(); }, []);

  const purgeDossier = async (id: string) => {
    if (!confirm("CONFIRM DATA PURGE: This action is irreversible.")) return;
    try {
      const res = await fetch(`/api/iron-summit?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchDossiers();
    } catch (err) { alert("Purge failed."); }
  };

  return (
    <div className="mission-control">
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #060D09 !important; margin: 0; color: white; font-family: sans-serif; }
        .mission-control { min-height: 100vh; padding: 40px; position: relative; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid #ffffff11; padding-bottom: 20px; }
        .table-container { background: rgba(10, 15, 12, 0.95); border: 1px solid rgba(255, 215, 0, 0.2); border-radius: 12px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { background: rgba(255, 215, 0, 0.05); color: #FFD700; padding: 15px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; }
        td { padding: 15px; border-bottom: 1px solid #ffffff05; color: #cbd5e1; font-size: 13px; }
        .gold { color: #FFD700; }
        .purge-btn { 
          background: transparent; border: 1px solid rgba(255, 0, 0, 0.3); color: #ff4444; 
          font-size: 9px; padding: 4px 8px; border-radius: 4px; cursor: pointer; text-transform: uppercase;
          transition: 0.3s;
        }
        .purge-btn:hover { background: #ff4444; color: white; border-color: #ff4444; }
      `}} />

      <div className="header">
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '2px' }}>MISSION <span className="gold">CONTROL</span></h1>
          <p style={{ color: '#64748b', fontSize: '10px', marginTop: '4px', letterSpacing: '1px' }}>SYSTEM TERMINAL ALPHA</p>
        </div>
        <Link href="/iron-summit" style={{ color: '#64748b', textDecoration: 'none', fontSize: '11px', border: '1px solid #ffffff11', padding: '8px 16px', borderRadius: '4px' }}>EXIT TERMINAL</Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Principal</th>
              <th>Secure Email</th>
              <th>Mandate Focus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dossiers.length > 0 ? dossiers.map((d: any) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td className="gold">{d.focus}</td>
                <td><button className="purge-btn" onClick={() => purgeDossier(d.id)}>Purge</button></td>
              </tr>
            )) : (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No Dossiers in Vault</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}