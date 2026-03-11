const fs = require('fs');
const { execSync } = require('child_process');

console.log("\n🛠️ FORGING IRON SUMMIT ENGINE...\n");

try {
  // 1. Force-create the exact directories
  fs.mkdirSync('./src/app/api/iron-summit', { recursive: true });
  fs.mkdirSync('./src/app/iron-summit', { recursive: true });

  // 2. Write the API Route
  const routeCode = `import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { name, email, focus } = await request.json();

    const { error } = await supabase
      .from('iron_summit_leads')
      .insert([{ name, email, focus }]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Dossier securely filed.' });
  } catch (error: any) {
    console.error('Vault insertion failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}`;
  fs.writeFileSync('./src/app/api/iron-summit/route.ts', routeCode);
  console.log("✅ Server API Bridge generated.");

  // 3. Write the Frontend Form
  const pageCode = `'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function IronSummitPortal() {
  const [formData, setFormData] = useState({ name: '', email: '', focus: 'Wealth Accumulation & Growth' });
  const [status, setStatus] = useState('idle');

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
        alert("Error: Check Vercel logs.");
      }
    } catch (error) {
      setStatus('idle');
      alert("Network Error.");
    }
  };

  return (
    <div className="min-h-screen bg-[#2C5F2D] text-[#F5F5DC] font-sans selection:bg-[#FFD700] selection:text-[#2C5F2D]">
      <div className="fixed inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-[#1a381a] to-transparent pointer-events-none"></div>
      <nav className="relative z-10 border-b border-[#FFD700]/20 bg-[#2C5F2D]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 border border-[#FFD700] flex items-end justify-center pb-1">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-[#FFD700]"></div>
             </div>
             <span className="font-serif text-xl tracking-widest text-[#FFD700] uppercase">Iron Summit</span>
          </div>
          <Link href="/" className="text-xs tracking-[0.2em] uppercase hover:text-[#FFD700] transition-colors">← Apex Hub</Link>
        </div>
      </nav>
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-[#FFD700] text-sm tracking-[0.3em] uppercase font-semibold">Generational Wealth Management</p>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight text-[#F5F5DC]">Ascend with <br/> <span className="italic text-[#FFD700]">Precision.</span></h1>
          </div>
          <p className="text-[#F5F5DC]/80 text-lg leading-relaxed max-w-md font-light">Iron Summit Financial Group provides enduring strategies for market navigation, asset protection, and legacy growth. We engineer your financial ascent.</p>
        </div>
        <div className="bg-[#4A3F35]/40 backdrop-blur-md border border-[#FFD700]/30 p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          {status === 'success' ? (
            <div className="text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full border-2 border-[#FFD700] flex items-center justify-center mx-auto mb-6 text-[#FFD700]">✓</div>
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
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#1a381a]/50 border border-[#FFD700]/20 p-3 text-[#F5F5DC] focus:outline-none focus:border-[#FFD700] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#FFD700] mb-2">Secure Email</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#1a381a]/50 border border-[#FFD700]/20 p-3 text-[#F5F5DC] focus:outline-none focus:border-[#FFD700] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#FFD700] mb-2">Primary Advisory Focus</label>
                  <select value={formData.focus} onChange={(e) => setFormData({...formData, focus: e.target.value})} className="w-full bg-[#1a381a]/50 border border-[#FFD700]/20 p-3 text-[#F5F5DC] focus:outline-none focus:border-[#FFD700] transition-colors appearance-none">
                    <option>Wealth Accumulation & Growth</option>
                    <option>Retirement Distribution Strategy</option>
                    <option>Business Exit Planning</option>
                    <option>Generational Wealth Transfer</option>
                  </select>
                </div>
                <button type="submit" disabled={status === 'submitting'} className="w-full mt-6 bg-[#FFD700] text-[#2C5F2D] font-bold uppercase tracking-widest p-4 hover:bg-[#F5F5DC] transition-colors disabled:opacity-50">
                  {status === 'submitting' ? 'Encrypting Data...' : 'Submit Profile'}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}`;
  fs.writeFileSync('./src/app/iron-summit/page.tsx', pageCode);
  console.log("✅ Frontend Form rewritten and hardwired to API.");

  // 4. Force git push to Vercel
  console.log("🚀 Blasting payload to Vercel...\n");
  execSync('git add .');
  execSync('git commit -m "BRUTE FORCE: Forge Iron Summit API & Form"');
  execSync('git push');
  
  console.log("🟢 MISSION ACCOMPLISHED. Give Vercel 30 seconds to build.");

} catch (err) {
  console.error("⚠️ SCRIPT HALTED. Git message: ", err.stdout ? err.stdout.toString() : err.message);
}