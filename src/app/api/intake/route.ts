import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://aktbbqvxtwyernosxphh.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY || '');
export async function POST(req: Request) {
try {
const body = await req.json();
await supabase.from('leads').insert([{ email: body.email, primary_concern: body.type, source: body.source }]);
return NextResponse.json({ success: true });
} catch (err) { return NextResponse.json({ error: 'Sync Error' }, { status: 500 }); }
}
