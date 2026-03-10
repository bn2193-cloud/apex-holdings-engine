import Link from 'next/link';

export default function ApexLobby() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 font-mono">
      <div className="max-w-3xl w-full space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase border-b border-[#333] pb-6">
            Apex Holdings
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase flex items-center justify-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Central Operations Directory
          </p>
        </div>

        {/* Division Routing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PortalCard 
            title="Tektite Industries" 
            desc="Technology Operations & Software Ventures" 
            link="/tektite" 
          />
          <PortalCard 
            title="Iron Summit" 
            desc="Financial Services & Wealth Management" 
            link="/iron-summit" 
          />
          <PortalCard 
            title="Anthracite" 
            desc="Secure Lead Intake & Vulnerability Audit" 
            link="/anthracite" 
          />
          <PortalCard 
            title="Mission Control" 
            desc="Encrypted Admin Dashboard & Dossiers" 
            link="/admin" 
            locked={true}
          />
        </div>
      </div>
    </div>
  );
}

// Reusable card component for the grid
function PortalCard({ title, desc, link, locked = false }: { title: string, desc: string, link: string, locked?: boolean }) {
  return (
    <Link href={link} className="block group">
      <div className="border border-[#333] p-6 h-full transition-all duration-300 hover:border-gray-300 hover:bg-[#111] relative overflow-hidden bg-[#0a0a0a]">
        <h2 className="text-xl font-semibold mb-2 tracking-wider flex items-center justify-between">
          {title}
          {locked && (
            <span className="text-[10px] text-red-500 border border-red-900/50 bg-red-950/30 px-2 py-1 rounded tracking-widest">
              LOCKED
            </span>
          )}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        
        {/* Animated hover line at the bottom */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full"></div>
      </div>
    </Link>
  );
}