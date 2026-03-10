'use client';
import { useState } from 'react';

export default function IronSummitPortal() {
  const [status, setStatus] = useState('idle');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const res = await fetch('/api/intake', {
      method: 'POST',
      body: JSON.stringify({ ...data, type: 'Inquiry', source: 'ISFG_Main_Portal' }),
    });
    if (res.ok) setStatus('success');
    else setStatus('error');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#333333] flex items-center justify-center p-6 font-serif">
      <div className="max-w-md w-full bg-white border border-[#D1D1D1] p-10 rounded-none shadow-xl relative overflow-hidden">
        {/* Subtle Geometric Mountain Peak Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0E0E0] -mr-16 -mt-16 rotate-45 z-0"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-2xl tracking-[0.2em] text-[#2C2C2C] uppercase font-bold">
              IRON<span className="text-[#757575]">SUMMIT</span>
            </h1>
            <p className="text-[#8C7E6A] text-[9px] uppercase tracking-[0.4em] mt-3 font-semibold italic">Guiding Your Financial Climb</p>
          </div>

          {status === 'success' ? (
            <div className="text-[#3E2723] text-center py-10 border border-[#E8E4D8] bg-[#FDFCF8] italic font-medium">
              Request secured within the Summit. A specialized branch advisor will be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input name="email" type="email" placeholder="Professional Email" required className="w-full bg-transparent border-b border-[#D1D1D1] p-3 outline-none focus:border-[#2C2C2C] transition-colors text-sm" />
              
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Select Vertical Branch</label>
                <select name="branch" required className="w-full bg-transparent border-b border-[#D1D1D1] p-3 outline-none focus:border-[#2C2C2C] text-sm text-gray-600">
                  <option value="">Choose a Branch...</option>
                  <option value="Sequoia">Sequoia (Wealth & Corporate Advisory)</option>
                  <option value="Redwood">Redwood (Real Estate & Land Management)</option>
                  <option value="Oakridge">Oakridge (Insurance & Retirement)</option>
                  <option value="Everwood">Everwood (Tax & Estate Planning)</option>
                </select>
              </div>

              <textarea name="details" placeholder="Briefly describe your path to growth..." className="w-full bg-transparent border border-[#D1D1D1] p-3 outline-none focus:border-[#2C2C2C] h-24 resize-none text-sm" />
              
              <button type="submit" className="w-full bg-[#2C2C2C] text-white py-4 font-sans uppercase tracking-[0.2em] hover:bg-[#444444] transition-all text-[10px] font-black">
                Initialize Branch Consultation
              </button>
            </form>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-[8px] text-gray-300 uppercase tracking-widest">A Division of Apex Holdings LLC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function IronSummitPortal() {
  const [formData, setFormData] = useState({ name: '', email: '', aum: '', goal: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulating the API route we will wire up next
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#2C5F2D] text-[#F5F5DC] font-sans selection:bg-[#FFD700] selection:text-[#2C5F2D]">
      
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-[#1a381a] to-transparent pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-[#FFD700]/20 bg-[#2C5F2D]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             {/* Abstract Summit/Sequoia Logo */}
             <div className="w-8 h-8 border border-[#FFD700] flex items-end justify-center pb-1">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-[#FFD700]"></div>
             </div>
             <span className="font-serif text-xl tracking-widest text-[#FFD700] uppercase">Iron Summit</span>
          </div>
          <Link href="/" className="text-xs tracking-[0.2em] uppercase hover:text-[#FFD700] transition-colors">
            ← Apex Hub
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Brand & Copy */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-[#FFD700] text-sm tracking-[0.3em] uppercase font-semibold">
              Generational Wealth Management
            </p>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight text-[#F5F5DC]">
              Ascend with <br/> <span className="italic text-[#FFD700]">Precision.</span>
            </h1>
          </div>
          
          <p className="text-[#F5F5DC]/80 text-lg leading-relaxed max-w-md font-light">
            Iron Summit Financial Group provides enduring strategies for market navigation, asset protection, and legacy growth. We engineer your financial ascent.
          </p>

          <div className="flex items-center gap-6 pt-4 border-t border-[#FFD700]/20 max-w-md">
            <div className="space-y-1">
              <span className="block text-2xl font-serif text-[#FFD700]">Private</span>
              <span className="block text-xs uppercase tracking-widest text-[#F5F5DC]/60">Advisory</span>
            </div>
            <div className="w-px h-10 bg-[#FFD700]/20"></div>
            <div className="space-y-1">
              <span className="block text-2xl font-serif text-[#FFD700]">Fiduciary</span>
              <span className="block text-xs uppercase tracking-widest text-[#F5F5DC]/60">Standard</span>
            </div>
          </div>
        </div>

        {/* Right Column: Intake Engine */}
        <div className="bg-[#4A3F35]/40 backdrop-blur-md border border-[#FFD700]/30 p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle gold top line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          
          {status === 'success' ? (
            <div className="text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full border-2 border-[#FFD700] flex items-center justify-center mx-auto mb-6 text-[#FFD700]">
                ✓
              </div>
              <h3 className="font-serif text-2xl text-[#FFD700]">Dossier Initiated</h3>
              <p className="text-[#F5F5DC]/80 text-sm">Our advisory team is reviewing your profile. Expect secure communication shortly.</p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-2xl mb-2 text-[#F5F5DC]">Request Advisory Prospectus</h2>
              <p className="text-sm text-[#F5F5DC]/60 mb-8">Secure, confidential intake for high-net-worth individuals.</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#FFD700] mb-2">Principal Name</label>
                  <input required type="text" className="w-full bg-[#1a381a]/50 border border-[#FFD700]/20 p-3 text-[#F5F5DC] focus:outline-none focus:border-[#FFD700] transition-colors" />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#FFD700] mb-2">Secure Email</label>
                  <input required type="email" className="w-full bg-[#1a381a]/50 border border-[#FFD700]/20 p-3 text-[#F5F5DC] focus:outline-none focus:border-[#FFD700] transition-colors" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#FFD700] mb-2">Primary Advisory Focus</label>
                  <select className="w-full bg-[#1a381a]/50 border border-[#FFD700]/20 p-3 text-[#F5F5DC] focus:outline-none focus:border-[#FFD700] transition-colors appearance-none">
                    <option>Wealth Accumulation & Growth</option>
                    <option>Retirement Distribution Strategy</option>
                    <option>Business Exit Planning</option>
                    <option>Generational Wealth Transfer</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full mt-6 bg-[#FFD700] text-[#2C5F2D] font-bold uppercase tracking-widest p-4 hover:bg-[#F5F5DC] transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Encrypting Data...' : 'Submit Profile'}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}