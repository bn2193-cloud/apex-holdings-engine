
'use client';
import React, { useState } from 'react';

export default function Anthracite() {
  const [status, setStatus] = useState('idle');
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/intake', {
      method: 'POST',
      body: JSON.stringify({ ...Object.fromEntries(new FormData(e.currentTarget)), type: 'Audit', source: 'Anthracite_System' }),
    });
    if (res.ok) setStatus('success'); else setStatus('error');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono">
      <div className="max-w-lg w-full bg-[#111] border border-[#222] p-12">
        <h1 className="text-2xl font-black mb-2 uppercase tracking-tighter">ANTHRACITE</h1>
        <p className="text-[9px] text-[#555] tracking-widest uppercase mb-8">Precision Risk Intelligence</p>
        
        {status === 'success' ? (
          <div className="text-cyan-500 font-mono text-xs border border-cyan-900/50 bg-cyan-950/20 p-6 text-center">
            THREAT MATRIX INITIALIZED.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input name="email" type="email" placeholder="SECURE EMAIL" required className="w-full bg-black border border-[#333] p-4 text-cyan-500 text-xs outline-none focus:border-cyan-500" />
            
            <textarea name="details" placeholder="DESCRIBE THREAT LANDSCAPE (e.g., lawsuit, audit, compliance threat)..." required className="w-full bg-black border border-[#333] p-4 text-cyan-500 text-xs h-32 resize-none outline-none focus:border-cyan-500"></textarea>
            
            <button className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-cyan-500 transition-all text-[10px]">
              Execute Vulnerability Audit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
