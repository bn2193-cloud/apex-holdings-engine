'use client';
import { useState } from 'react';
export default function Anthracite() {
const [status, setStatus] = useState('idle');
const handleSubmit = async (e) => {
e.preventDefault();
setStatus('loading');
const res = await fetch('/api/intake', {
method: 'POST',
body: JSON.stringify({ ...Object.fromEntries(new FormData(e.currentTarget)), type: 'Audit', source: 'Anthracite_System' }),
});
if (res.ok) setStatus('success'); else setStatus('error');
};
return (
<div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
<div className="max-w-lg w-full bg-[#111] border border-[#222] p-12">
<h1 className="text-2xl font-black mb-8 uppercase tracking-tighter">ANTHRACITE</h1>
{status === 'success' ? <div className="text-cyan-500 font-mono text-xs">THREAT MATRIX INITIALIZED.</div> : (
<form onSubmit={handleSubmit} className="space-y-8">
<input name="email" type="email" placeholder="SECURE EMAIL" required className="w-full bg-black border border-[#333] p-4 text-cyan-500 font-mono" />
<button className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-cyan-500 transition-all">Execute Audit</button>
</form>
)}
</div>
</div>
);
}
