import Link from 'next/link';

export default function ApexLobby() {
  return (
    <div className="min-h-screen bg-[#141414] text-[#F5F5DC] flex flex-col items-center justify-center p-8 font-sans selection:bg-[#FFD700] selection:text-black">
      
      {/* Subtle Mountain/Peak Background Element */}
      <div className="fixed inset-0 pointer-events-none opacity-20 flex justify-center items-end overflow-hidden z-0">
         <div className="w-[150vw] h-[50vh] bg-gradient-to-t from-[#2C5F2D]/10 to-transparent transform -rotate-6 translate-y-32"></div>
         <div className="w-[150vw] h-[50vh] bg-gradient-to-t from-[#5A5A5A]/20 to-transparent transform rotate-12 translate-y-48 absolute"></div>
      </div>

      <div className="max-w-5xl w-full space-y-16 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-8">
             {/* CSS Geometric Shield/Summit Icon */}
             <div className="w-16 h-20 border-t border-l border-r border-[#FFD700]/60 flex items-end justify-center pb-2 shadow-[0_0_30px_rgba(255,215,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 w-full h-full bg-gradient-to-b from-[#FFD700]/10 to-transparent"></div>
                <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-[#5A5A5A]/80 z-10"></div>
             </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#F5F5DC] to-[#FFD700]">
            Apex Holdings
          </h1>
          
          <p className="text-[#A0A0A0] text-xs md:text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-4">
            <span className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#FFD700]/50"></span>
            Enduring Strength. Everlasting Legacy.
            <span className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#FFD700]/50"></span>
          </p>
        </div>

        {/* Division Routing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PortalCard 
            title="Iron Summit" 
            desc="Financial Services & Wealth Management. Ascend with precision." 
            link="/iron-summit" 
            accent="#FFD700"
          />
          <PortalCard 
            title="Tektite Industries" 
            desc="Technology Operations & Software Ventures." 
            link="/tektite" 
            accent="#E0E0E0"
          />
          <PortalCard 
            title="Anthracite Engine" 
            desc="Secure Lead Intake & Client Vulnerability Audit." 
            link="/anthracite" 
            accent="#2C5F2D"
          />
          <PortalCard 
            title="Mission Control" 
            desc="Encrypted Admin Dashboard & Generated Dossiers." 
            link="/admin" 
            accent="#5A5A5A"
            locked={true}
          />
        </div>
      </div>
    </div>
  );
}

// Reusable card component mapped to the brand palette
function PortalCard({ title, desc, link, accent, locked = false }: { title: string, desc: string, link: string, accent: string, locked?: boolean }) {
  return (
    <Link href={link} className="block group">
      <div className="border border-[#333] bg-[#0a0a0a]/80 backdrop-blur-md p-8 h-full transition-all duration-500 hover:border-[#FFD700]/50 hover:bg-[#111] hover:shadow-[0_0_30px_rgba(255,215,0,0.05)] relative overflow-hidden flex flex-col justify-between">
        
        {/* Animated top accent line matching the specific division */}
        <div 
          className="absolute top-0 left-0 h-[2px] w-0 transition-all duration-700 ease-out group-hover:w-full"
          style={{ backgroundColor: accent }}
        ></div>

        <div>
            <h2 className="text-xl md:text-2xl font-light mb-3 tracking-widest uppercase flex items-center justify-between text-[#F5F5DC]">
              {title}
              {locked && (
                  <span className="text-[9px] text-red-400 border border-red-900/50 bg-red-950/30 px-3 py-1 tracking-[0.2em]">
                  LOCKED
                  </span>
              )}
            </h2>
            <p className="text-[#888] text-sm leading-relaxed tracking-wide">{desc}</p>
        </div>
        
        <div 
          className="mt-8 flex items-center text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ color: accent }}
        >
            Access Portal <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  );
}