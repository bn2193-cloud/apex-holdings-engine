'use client';

import { useState } from 'react';

export default function GeneralContactFunnel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    const WEBHOOK_URL = process.env.NEXT_PUBLIC_IRON_SUMMIT_WEBHOOK_URL || ''; 

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          interest, 
          source: 'Iron_Summit_General_Inquiry', 
          timestamp: new Date().toISOString() 
        }),
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
      <div className="max-w-2xl w-full space-y-8 text-center">
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Protect What <span className="text-blue-500">Matters Most.</span>
          </h1>
          <p className="text-lg text-slate-400">
            Comprehensive coverage tailored to your life and business. Request a consultation to explore your insurance and strategy options.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl text-left">
          {status === 'success' ? (
             <div className="text-blue-400 font-semibold text-xl text-center py-8">
               Information received. Our team will contact you shortly.
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Full Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Phone Number</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Email Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">What are you looking to protect?</label>
                <select required value={interest} onChange={(e) => setInterest(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option value="" disabled>Select an area of interest...</option>
                  <option value="home_auto">Home & Auto Insurance</option>
                  <option value="life_health">Life & Health Insurance</option>
                  <option value="business_commercial">Business & Commercial Coverage</option>
                  <option value="general_strategy">General Wealth & Protection Strategy</option>
                </select>
              </div>

              <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all mt-4 disabled:opacity-50">
                {status === 'loading' ? 'Processing...' : 'Request Consultation'}
              </button>
            </form>
          )}
        </div>
        
        <p className="text-sm text-slate-500 pt-8">
          Iron Summit Financial Group
        </p>

      </div>
    </div>
  );
}