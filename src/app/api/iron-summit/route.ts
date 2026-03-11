import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// 🔑 Grab a free API key at resend.com
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Insert into Vault
    const { data, error } = await supabase.from('iron_summit').insert([body]);
    if (error) throw error;

    // 2. Blast Alert to Admin
    await resend.emails.send({
      from: 'Apex Intelligence <onboarding@resend.dev>',
      to: 'YOUR_PERSONAL_EMAIL@GMAIL.COM', // <--- PUT YOUR EMAIL HERE
      subject: `🚨 NEW DOSSIER: ${body.name}`,
      html: `
        <div style="background: #060D09; color: white; padding: 40px; font-family: sans-serif; border: 1px solid #FFD700;">
          <h2 style="color: #FFD700;">New Principal Intake Detected</h2>
          <hr style="border: 0; border-top: 1px solid #333;" />
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Focus:</strong> ${body.focus}</p>
          <br/>
          <a href="https://apex-holdings-engine.vercel.app/admin" 
             style="background: #1A4B2C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
             ACCESS MISSION CONTROL
          </a>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // We try 'iron_summit' first (standard SQL naming). 
    // If you named it 'intake' in Supabase, change it here.
    const { data, error } = await supabase
      .from('iron_summit') 
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('iron_summit')
      .insert([body]);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) throw new Error('ID required for purge');

    const { error } = await supabase
      .from('iron_summit')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}