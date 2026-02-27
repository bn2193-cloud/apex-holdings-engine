'use client';

import { useState } from 'react';

export default function VulnerabilityAuditFunnel() {
  const [email, setEmail] = useState('');
  const [primaryConcern, setPrimaryConcern] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const WEBHOOK_URL = process.env.NEXT_PUBLIC_IRON_SUMMIT_WEBHOOK_URL || ''; 

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, primaryConcern, source: 'Iron_Summit_Audit', compliance_tag: 'pre_licensed', timestamp: new Date().toISOString() }),
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch (error) {
      console.error('Webhook failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Secure the <span className="text-amber-500">Perimeter.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Offense is irrelevant if your defense is compromised. Identify your critical financial vulnerabilities before the market does.
          </p>
        </div>
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-xl mx-auto">
          {status === 'success' ? (
             <div className="text-amber-400 font-semibold text-xl animate-pulse">Threat Matrix Generated. Check your inbox.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="space-y-2">
                <label htmlFor="primaryConcern" className="block text-sm font-medium text-slate-300">What is the weakest point in your current financial structure?</label>
                <select id="primaryConcern" required value={primaryConcern} onChange={(e) => setPrimaryConcern(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all">
                  <option value="" disabled>Select a vulnerability...</option>
                  <option value="unexpected_loss">Lack of protection against sudden income loss</option>
                  <option value="cash_flow">Inefficient cash flow and debt structure</option>
                  <option value="inflation_decay">Liquid capital decaying to inflation</option>
                  <option value="market_exposure">Overexposure to market volatility</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Where should we send your custom Threat Matrix?</label>
                <input type="email" id="email" required placeholder="operator@yourcompany.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-4 px-8 rounded-lg transition-all duration-200 disabled:opacity-50">
                {status === 'loading' ? 'Running Audit...' : 'Generate Vulnerability Audit'}
              </button>
            </form>
          )}
        </div>
        <p className="text-sm text-slate-500 pt-8">Iron Summit Financial Group | Wealth Defense & Strategy</p>
      </div>
    </div>
  );
}
