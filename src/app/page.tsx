'use client';
export default function ApexHub() {
return (
<div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 font-sans">
<div className="text-center mb-20">
<h1 className="text-4xl font-light tracking-[0.3em] uppercase mb-4">APEX<span className="font-bold">HOLDINGS</span></h1>
<div className="w-12 h-[1px] bg-black mx-auto mb-4"></div>
<p className="text-gray-400 tracking-[0.4em] uppercase text-[8px] font-bold">Consolidated Strategic Infrastructure</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 max-w-5xl w-full border border-gray-100">
<a href="/iron-summit" className="group p-16 bg-white hover:bg-gray-50 transition-all">
<h2 className="text-xs font-bold mb-4 uppercase tracking-[0.2em] text-[#3E2723]">Iron Summit</h2>
<p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mb-8">Institutional wealth defense and generational asset fortification.</p>
<span className="text-[9px] font-bold uppercase tracking-widest text-[#A6894A]">Access Portal →</span>
</a>
<a href="/anthracite" className="group p-16 bg-white hover:bg-gray-50 transition-all">
<h2 className="text-xs font-bold mb-4 uppercase tracking-[0.2em]">Anthracite</h2>
<p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mb-8">Strategic vulnerability assessment and high-fidelity risk intelligence.</p>
<span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Initialize Audit →</span>
</a>
</div>
</div>
);
}
