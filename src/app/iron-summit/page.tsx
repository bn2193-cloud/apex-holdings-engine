'use client';
import { useState } from 'react';
export default function ISFG() {
const [status, setStatus] = useState('idle');
const handleSubmit = async (e) => {
e.preventDefault();
setStatus('loading');
const res = await fetch('/api/intake', {
method: 'POST',
body: JSON.stringify({ ...Object.fromEntries(new FormData(e.currentTarget)), type: 'Quote', source: 'ISFG_Portal' }),
});
if (res.ok) setStatus('success'); else setStatus('error');
};
return (
<div className="min-h-screen bg-[#FDFCF8] text-[#3E2723] flex items-center justify-center p-6 font-serif">
<div className="max-w-md w-full bg-white border border-[#E8E4D8] p-10 rounded-sm">
<h1 className="text-2xl text-center mb-10 uppercase tracking-tighter">IRON<span className="text-[#A6894A]">SUMMIT</span></h1>
{status === 'success' ? <div className="text-center py-10 italic">Request secured.</div> : (
<form onSubmit={handleSubmit} className="space-y-6">
<input name="email" type="email" placeholder="Email" required className="w-full bg-transparent border-b border-[#E8E4D8] p-3 outline-none focus:border-[#A6894A]" />
<select name="coverage" required className="w-full bg-transparent border-b border-[#E8E4D8] p-3 outline-none text-sm text-gray-500">
<option value="Life">Family Legacy / Life</option>
<option value="Estate">Private Estate</option>
</select>
<button className="w-full bg-[#3E2723] text-white py-4 uppercase tracking-widest text-[10px] font-bold">Initialize Consultation</button>
</form>
)}
</div>
</div>
);
}
