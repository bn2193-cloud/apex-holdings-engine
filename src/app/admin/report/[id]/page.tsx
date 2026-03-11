'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MissionControl() {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We'll wire this to your API shortly
    setLoading(false);
  }, []);

  return (
    <div className="mission-control">
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #060D09 !important; margin: 0; color: white; font-family: sans-serif; }
        .mission-control { min-height: 100vh; padding: 40px; position: relative; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid #ffffff11; padding-bottom: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .stat-card { background: rgba(255,255,255,0.03); border: 1px solid #ffffff11; padding: 20px; border-radius: 8px; }
        .table-container { margin-top: 40px; background: rgba(10, 15, 12, 0.95); border: 1px solid rgba(255, 215, 0, 0.2); border-radius: 12px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { background: rgba(255, 215, 0, 0.05); color: #FFD700; padding: 15px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        td { padding: 15px; border-bottom: 1px solid #ffffff05; color: #cbd5e1; }
        .gold { color: #FFD700; }
        .badge { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; background: #1A4B2C; color: white; }
      `}} />

      <div className="header">
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>MISSION <span className="gold">CONTROL</span></h1>
          <p style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>APEX HOLDINGS INTELLIGENCE TERMINAL</p>
        </div>
        <Link href="/iron-summit" style={{ color: '#64748b', textDecoration: 'none', fontSize: '12px' }}>← VIEW PORTAL</Link>
      </div>

      <div className="grid">
        <div className="stat-card">
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '10px' }}>TOTAL DOSSIERS</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>24</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '10px' }}>ACTIVE MANDATES</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFD700' }}>12</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '10px' }}>SYSTEM STATUS</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>SECURE</div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Principal</th>
              <th>Email Address</th>
              <th>Mandate Focus</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Verification Test</td>
              <td>test@apex.com</td>
              <td>Wealth Accumulation</td>
              <td><span className="badge">NEW</span></td>
            </tr>
            {/* Real data will map here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}