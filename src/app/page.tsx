import Link from 'next/link';

export default function ApexLobby() {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-[#E0E0E0] flex flex-col items-center justify-center p-8 font-sans">
      
      {/* Blueprint/Grid Background Motif */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#007FFF 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="max-w-5xl w-full space-y-16 relative z-10">
        <div className="text-center space-y-4">
          {/* Central Node Icon */}
          <div className="w-20 h-20 mx-auto mb-6 border-2 border-[#007FFF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,127,255,0.3)]">
            <div className="w-10 h-10 bg-[#007FFF] rounded-sm rotate-45"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic">
            Apex <span className="text-[#007FFF]">Holdings</span>
          </h1>
          <p className="text-[#E0E0E0]/60 text-sm tracking-[0.4em] uppercase font-light">
            Central Command & Orchestration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PortalCard 
            title="Tektite Industries" 
            desc="Digital Mastery & AI Innovation" 
            link="/tektite" 
            color="#00FFF5" // Neon Cyan
          />
          <PortalCard 
            title="Iron Summit" 
            desc="Financial Services & Legacy Growth" 
            link="/iron-summit" 
            color="#FFD700" // Warm Gold
          />
          <PortalCard 
            title="Anthracite" 
            desc="Secure Intake & Vulnerability Audit" 
            link="/anthracite" 
            color="#007FFF" // Apex Blue
          />
          <PortalCard 
            title="Mission Control" 
            desc="Encrypted Operations Vault" 
            link="/admin" 
            color="#E0E0E0" // Platinum
            locked={true}
          />
        </div>
      </div>
    </div>
  );
}

function PortalCard({ title, desc, link, color, locked = false }: { title: string, desc: string, link: string, color: string, locked?: boolean }) {
  return (
    <Link href={link} className="group block relative">
      <div className="border border-white/10 bg-black/40 backdrop-blur-xl p-8 h-full transition-all duration-500 hover:border-white/30">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500" style={{ backgroundColor: color }}></div>
        
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {locked && <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-[#007FFF]">SECURE</span>}
        </div>
        <p className="text-white/50 text-sm leading-relaxed mb-6">{desc}</p>
        <span className="text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: color }}>
          Initialize Portal →
        </span>
      </div>
    </Link>
  );
}