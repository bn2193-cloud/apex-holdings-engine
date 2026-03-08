'use client';
import { useState, useEffect } from 'react';
import { getLeads } from './actions';
import Link from 'next/link';

export default function ApexDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLeads()
      .then(setLeads)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <div className="p-8 text-red-500 font-mono text-xs uppercase">System Breach: {error}</div>;

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono p-8">
      <div className="flex justify-between items-end border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
            APEX<span className="text-blue-600">HOLDINGS</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em]">Mission Control // Tektite Intelligence</p>
        </div>
        <div className="text-right text-xs text-emerald-500 animate-pulse">● ENGINES ONLINE</div>
      </div>

      {loading ? (
        <div className="text-center animate-pulse text-[10px]">Scanning Database...</div>
      ) : (
        <div className="border border-slate-800 bg-slate-950/30 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-500 uppercase text-[9px] tracking-widest border-b border-slate-800">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Identity</th>
                <th className="p-4">Sentinel Analysis</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 text-slate-600">{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td className="p-4 font-bold text-white tracking-tighter">{lead.primary_concern}</td>
                  <td className="p-4 text-slate-400">{lead.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 border border-slate-800 text-[9px] font-black uppercase tracking-tighter text-cyan-500">
                      {lead.notes?.split('|')[0].replace('[SENTINEL REPORT]', '').trim() || 'Tier 3 (Standard)'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      href={`/admin/report/${lead.id}`} 
                      target="_blank" 
                      className="bg-white text-black px-4 py-2 text-[9px] font-black uppercase hover:bg-cyan-500 hover:text-white transition-colors"
                    >
                      Mint Dossier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}