'use client';
import { useState } from 'react';

export default function IronSummitQuote() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/quote-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'ISFG_Home_Quote' }),
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch (err) { setStatus('error'); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 uppercase tracking-tighter italic">IRON<span className="text-blue-500">SUMMIT</span></h1>
        <p className="text-center text-slate-400 mb-8 text-xs uppercase tracking-widest font-semibold">Financial Group | Wealth Defense</p>
        
        {status === 'success' ? (
          <div className="text-blue-400 text-center font-bold py-10 animate-pulse text-xl uppercase tracking-widest border border-blue-900/30 rounded-xl bg-blue-950/20">REQUEST SECURED.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-800 border-slate-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            <select name="coverage" required className="w-full bg-slate-800 border-slate-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-300">
              <option value="">Select Coverage Needed...</option>
              <option value="Auto">Auto Insurance</option>
              <option value="Home">Homeowners Insurance</option>
              <option value="Life">Life / Health</option>
            </select>
            <textarea name="details" placeholder="Briefly describe your needs..." className="w-full bg-slate-800 border-slate-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
            <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-lg font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20">
              {status === 'loading' ? 'PROCESSING...' : 'GET MY QUOTE'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
