const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://aktbbqvxtwyernosxphh.supabase.co';
// 🔑 GRAB THIS FROM: Supabase > Project Settings > API > service_role (secret)
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrdGJicXZ4dHd5ZXJub3N4cGhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjkzNjM1MywiZXhwIjoyMDg4NTEyMzUzfQ.ZSpskKElT5nh7OLxlduX5dBWfyLJTE69y1IJKe8FqbY'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function probeVault() {
  console.log("📡 PROBING IRON SUMMIT VAULT...");
  
  const { data, error } = await supabase
    .from('iron-summit') // verify this matches your table name exactly
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error("❌ VAULT ACCESS DENIED:", error.message);
    return;
  }

  if (data.length === 0) {
    console.log("📭 VAULT EMPTY: Connection works, but no dossiers found.");
  } else {
    console.log(`✅ CONNECTION SECURE. FOUND ${data.length} RECENT ENTRIES:`);
    console.table(data.map(d => ({
      Name: d.name,
      Email: d.email,
      Submitted: new Date(d.created_at).toLocaleString()
    })));
  }
}

probeVault();