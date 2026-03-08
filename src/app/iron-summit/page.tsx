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
