const { createClient } = require('@supabase/supabase-js');

// Hard-coded from your build logs
const SUPABASE_URL = 'https://aktbbqvxtwyernosxphh.supabase.co';
// YOU NEED THIS: Copy your "service_role" or "anon" key from Supabase Settings -> API
const SUPABASE_KEY = 'YOUR_SUPABASE_KEY_HERE'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkData() {
  console.log("📡 PROBING SUPABASE VAULT...");
  
  // Checking the 'intake' table (change name if your table is called something else)
  const { data, error } = await supabase
    .from('intake') 
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error("❌ ERROR ACCESSING VAULT:", error.message);
    return;
  }

  if (data.length === 0) {
    console.log("📭 VAULT IS EMPTY. No dossiers found.");
  } else {
    console.log(`✅ SUCCESS. FOUND ${data.length} RECENT ENTRIES:`);
    console.table(data);
  }
}

checkData();
