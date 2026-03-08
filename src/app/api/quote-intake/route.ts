import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error } = await supabase.from('leads').insert([{ 
      email: body.email, 
      primary_concern: 'Quote: ' + body.coverage + ' | ' + (body.details || 'None'),
      source: body.source,
      created_at: new Date().toISOString()
    }]);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) { return NextResponse.json({ error: 'System Offline' }, { status: 500 }); }
}
