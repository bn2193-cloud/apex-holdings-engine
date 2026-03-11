import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Forces Next.js to always fetch fresh data, never cache it
export const revalidate = 0; 

export default async function MissionControl() {
  // Initialize the secure connection
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Pull the dossiers from the vault
  const { data: leads, error } = await supabase
    .from('iron_summit_leads')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-[#E0E0E0] font-sans selection:bg-[#007FFF] selection:text-white p-8">
      
      {/* Abstract Blueprint Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#007FFF 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <header className="flex justify-between items-end border-b border-[#007FFF]/30 pb-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-widest uppercase text-[#E0E0E0]">
              Mission <span className="text-[#007FFF]">Control</span>
            </h1>
            <p className="text-xs tracking-[0.3em] text-[#E0E0E0]/50 uppercase">
              Apex Holdings Central CRM • Live Feed
            </p>
          </div>
          <Link href="/" className="text-xs tracking-widest uppercase text-[#007FFF] hover:text-white transition-colors border border-[#007FFF]/30 px-4 py-2 bg-[#007FFF]/10">
            Exit to Lobby
          </Link>
        </header>

        {/* CRM Data Grid */}
        <div className="bg-black/50 border border-[#333] backdrop-blur-md overflow-hidden">
          <div className="p-4 border-b border-[#333] bg-[#111] flex justify-between items-center">
            <h2 className="text-sm font-bold tracking-widest uppercase text-[#007FFF]">Iron Summit • Active Dossiers</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-[#E0E0E0]/50 tracking-widest uppercase">System Online</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#1C1C1C] text-[#E0E0E0]/60 text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-normal">Timestamp</th>
                  <th className="px-6 py-4 font-normal">Principal Name</th>
                  <th className="px-6 py-4 font-normal">Secure Contact</th>
                  <th className="px-6 py-4 font-normal">Advisory Focus</th>
                  <th className="px-6 py-4 font-normal text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {error ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-red-500 tracking-widest">
                      Vault Access Error: {error.message}
                    </td>
                  </tr>
                ) : leads && leads.length > 0 ? (
                  leads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-[#007FFF]/5 transition-colors group">
                      <td className="px-6 py-4 text-[#E0E0E0]/50">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#E0E0E0]">{lead.name}</td>
                      <td className="px-6 py-4 text-[#007FFF]">{lead.email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#333] px-3 py-1 text-xs rounded-sm tracking-wide">
                          {lead.focus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs border border-yellow-500/50 text-yellow-500 px-2 py-1 bg-yellow-950/30 uppercase tracking-widest">
                          Pending Review
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-[#E0E0E0]/50 tracking-widest uppercase">
                      No Active Dossiers Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}