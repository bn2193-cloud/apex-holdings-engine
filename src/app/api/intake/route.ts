import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://aktbbqvxtwyernosxphh.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, type, branch, concern, details, source } = body;

    // --- TEKTITE INTELLIGENCE LAYER ---
    let riskTier = 'Tier 3 (Standard)';
    let priority = 1;
    let flags = [];

    const content = (details || '').toLowerCase();

    if (content.includes('portfolio') || content.includes('homestead') || content.includes('estate')) {
      riskTier = 'Tier 2 (High Asset)';
      priority += 2;
      flags.push('ASSET_DENSITY');
    }

    if (content.includes('audit') || content.includes('lawsuit') || content.includes('compliance') || content.includes('threat')) {
      riskTier = 'Tier 1 (Critical/Urgent)';
      priority += 3;
      flags.push('SECURITY_VULNERABILITY');
    }

    if (content.includes('legacy') || content.includes('inheritance') || content.includes('trust')) {
      priority += 1;
      flags.push('LONG_TERM_ADVISORY');
    }

    const { error } = await supabase.from('leads').insert([{ 
      email: email, 
      primary_concern: (type || 'Inquiry') + ': ' + (branch || concern || 'General'),
      source: source || 'Apex_Sentinel',
      details: details,
      notes: `[SENTINEL REPORT] Tier: ${riskTier} | Score: ${priority} | Flags: ${flags.join(', ')}`,
      created_at: new Date().toISOString()
    }]);

    if (error) throw error;
    return NextResponse.json({ success: true, tier: riskTier });
  } catch (err) { 
    return NextResponse.json({ error: 'Sentinel Sync Failed' }, { status: 500 }); 
  }
}
