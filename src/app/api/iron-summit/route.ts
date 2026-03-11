import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Save to Supabase (This will still work!)
    const { data, error } = await supabase.from('iron_summit').insert([body]);
    if (error) throw error;

    // 2. Only try to email if the key is present
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Apex Intelligence <onboarding@resend.dev>',
        to: 'YOUR_EMAIL@GMAIL.COM', 
        subject: `🚨 NEW DOSSIER: ${body.name}`,
        html: `<div style="background:#060D09;color:white;padding:40px;border:1px solid #FFD700;"><h2>New Intake</h2><p><strong>Name:</strong> ${body.name}</p></div>`
      });
    } else {
      console.log("Skipping email: No RESEND_API_KEY found in Environment Variables.");
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Ensure GET and DELETE remain below
export async function GET() {
  const { data } = await supabase.from('iron_summit').select('*').order('created_at', { ascending: false });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await supabase.from('iron_summit').delete().eq('id', id);
  return NextResponse.json({ success: true });
}