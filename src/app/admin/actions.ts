'use server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://aktbbqvxtwyernosxphh.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function getLeads() {
  const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getLeadById(id) {
  const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}
