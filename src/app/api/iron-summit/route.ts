import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { data, error } = await supabase.from('iron_summit').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from('iron_summit').insert([body]);
    if (error) throw error;

    await resend.emails.send({
      from: 'Apex Intelligence <onboarding@resend.dev>',
      to: 'YOUR_EMAIL@GMAIL.COM', // REPLACE THIS
      subject: `🚨 NEW DOSSIER: ${body.name}`,
      html: `<div style="background:#060D09;color:white;padding:40px;border:1px solid #FFD700;"><h2>New Intake</h2><p><strong>Name:</strong> ${body.name}</p></div>`
    });

    return NextResponse.json({ success: true });
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { error } = await supabase.from('iron_summit').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}