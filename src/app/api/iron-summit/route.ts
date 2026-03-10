import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase using the environment variables already in your Vercel/local config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    // Parse the incoming lead data
    const body = await request.json();
    const { name, email, focus } = body;

    // Fire it into the Supabase vault
    const { data, error } = await supabase
      .from('iron_summit_leads') // Make sure this table exists in Supabase!
      .insert([
        { name, email, focus, created_at: new Date().toISOString() }
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Dossier securely filed.' });
    
  } catch (error: any) {
    console.error('Vault insertion failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}