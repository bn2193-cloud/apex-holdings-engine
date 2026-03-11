'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function IronSummitPortal() {
  const [formData, setFormData] = useState({ name: '', email: '', focus: 'Wealth Accumulation & Growth' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/iron-summit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('idle');
        alert("Transmission Error. Please try again.");
      }
    } catch (error) {
      setStatus('idle');
      alert("Network Error.");
    }
  };

  return (
    <div className="min-h-screen bg-[#060D09] text-slate-200 font-sans selection:bg-[#FFD700] selection:text-black overflow-x-hidden">
      
      {/* Fintech Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>
      
      {/* Glowing Ambient Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1A4B2C] blur-[150px] opacity-40 pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#FFD700] blur-[180px] opacity-10 pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#060D09]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#1A4B2C] to-black border border-[#FFD700]/30 rounded-sm shadow-[0_0_15px_rgba(255,215,0,0.1)]">
               <span className="text-[#FFD700] font-serif text-sm font-bold">IS</span>
             </div>
             <span className="font-serif text-lg tracking-[0.15em] text-white uppercase shadow-black drop-shadow-md">
               Iron Summit
             </span>
          </div>
          <Link href="/" className="text-xs tracking-[0.2em] uppercase text-slate-400 hover:text-[#FFD700] transition-colors duration-300">
            Exit to Apex Hub
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center min-h-[90vh]">
        
        {/* Left Column: Value Prop */}
        <div className="lg:col-span-7 space-y-10 pr-0 lg:pr-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></span>
            <span className="text-[10px] tracking-widest text-[#FFD700] uppercase font-semibold">Fiduciary Standard Architecture</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-white tracking-tight">
            Institutional Wealth, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#A68A00]">Engineered.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            We deploy dynamic, data-driven strategies to protect capital, architect growth, and facilitate seamless generational wealth transfer. 
          </p>

          {/* Fintech Metric Grid */}
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-serif text-white mb-1">Algorithmic</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Risk Mitigation</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-white mb-1">Enduring</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Legacy Architecture</p>
            </div>
          </div>
        </div>

        {/* Right Column: The Intake Terminal */}
        <div className="lg:col-span-5 relative group">
          {/* Neon Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-b from-[#FFD700]/50 to-[#1A4B2C]/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-[#0A120E]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="font-serif text-xl text-white">Client Intake Protocol</h2>
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            {status === 'success' ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1A4B2C] to-black rounded-full border border-[#FFD700] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(26,75,44,0.5)]">
                  <svg className="w-8 h-8 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-white mb-2">Secure Handshake Complete</h3>
                  <p className="text-slate-400 text-sm">Your dossier is encrypted and logged. An advisor will initiate contact shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-1 relative">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold ml-1">Principal Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3.5 text-white text-sm focus:outline-none focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/50 transition-all" 
                    placeholder="Enter full legal name"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold ml-1">Secure Communication (Email)</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3.5 text-white text-sm focus:outline-none focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/50 transition-all" 
                    placeholder="name@domain.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold ml-1">Primary Mandate</label>
                  <select 
                    value={formData.focus}
                    onChange={(e) => setFormData({...formData, focus: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3.5 text-white text-sm focus:outline-none focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/50 transition-all appearance-none cursor-pointer"
                  >
                    <option className="bg-[#0A120E] text-white">Wealth Accumulation & Growth</option>
                    <option className="bg-[#0A120E] text-white">Retirement Distribution Strategy</option>
                    <option className="bg-[#0A120E] text-white">Business Exit Planning</option>
                    <option className="bg-[#0A120E] text-white">Generational Wealth Transfer</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full mt-4 bg-gradient-to-r from-[#1A4B2C] to-[#12351f] border border-[#1A4B2C] hover:border-[#FFD700]/50 text-white font-semibold text-sm uppercase tracking-widest p-4 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(26,75,44,0.4)] transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
                >
                  <span className="relative z-10">{status === 'submitting' ? 'Encrypting Payload...' : 'Submit Dossier'}</span>
                  {/* Button shine effect */}
                  <div className="absolute top-0 -left-[100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:left-[100%] transition-all duration-700"></div>
                </button>
                
                <p className="text-[9px] text-center text-slate-600 mt-4 uppercase tracking-widest">
                  Protected by 256-bit institutional encryption.
                </p>
              </form>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}