import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { name, email, focus } = await request.json();

    const { error } = await supabase
      .from('iron_summit_leads')
      .insert([{ name, email, focus }]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Dossier securely filed.' });
  } catch (error: any) {
    console.error('Vault insertion failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}