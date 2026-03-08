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
        body: JSON.stringify({ ...data, source: 'ISFG_Direct_Test' }),
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch (err) { setStatus('error'); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 uppercase tracking-tighter">IRON<span className="text-blue-500">SUMMIT</span></h1>
        {status === 'success' ? (
          <div className="text-blue-400 text-center font-bold py-10 uppercase tracking-widest">REQUEST SECURED.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            <select name="coverage" required className="w-full bg-slate-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Coverage...</option>
              <option value="Auto">Auto</option>
              <option value="Home">Home</option>
              <option value="Life">Life</option>
            </select>
            <textarea name="details" placeholder="Briefly describe your needs..." className="w-full bg-slate-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-lg font-bold uppercase transition-all">SUBMIT REQUEST</button>
          </form>
        )}
      </div>
    </div>
  );
}
