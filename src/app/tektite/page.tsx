'use client';

import { useState } from 'react';

export default function LeadCaptureFunnel() {
  const [email, setEmail] = useState('');
  const [bottleneck, setBottleneck] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const WEBHOOK_URL = process.env.NEXT_PUBLIC_TEKTITE_WEBHOOK_URL || ''; 

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, bottleneck, source: 'Tektite_AI_Grader', timestamp: new Date().toISOString() }),
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch (error) {
      console.error('Webhook failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">Ascent to <span className="text-blue-500">Autonomous Operations.</span></h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">Stop losing cycles to manual processes. Input your primary operational bottleneck below to receive a custom Agentic AI architecture map.</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl max-w-xl mx-auto">
          {status === 'success' ? (
             <div className="text-green-400 font-semibold text-xl animate-pulse">Architecture Map Generating. Check your inbox.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="space-y-2">
                <label htmlFor="bottleneck" className="block text-sm font-medium text-gray-300">What is your biggest operational bottleneck right now?</label>
                <select id="bottleneck" required value={bottleneck} onChange={(e) => setBottleneck(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option value="" disabled>Select a friction point...</option>
                  <option value="data_processing">Manual Data Processing & Routing</option>
                  <option value="customer_support">High-Volume Customer Support</option>
                  <option value="content_generation">Content Generation & Review</option>
                  <option value="system_integration">Disjointed Software Systems</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Where should we send your custom Semantic Kernel blueprint?</label>
                <input type="email" id="email" required placeholder="commander@yourcompany.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 disabled:opacity-50">
                {status === 'loading' ? 'Initializing...' : 'Generate AI Architecture'}
              </button>
            </form>
          )}
        </div>
        <p className="text-sm text-gray-500 pt-8">Powered by Tektite Industries & Anthracite. We do not share your data.</p>
      </div>
    </div>
  );
}
