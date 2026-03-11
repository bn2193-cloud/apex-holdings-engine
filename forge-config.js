const fs = require('fs');
const { execSync } = require('child_process');

console.log("\n🔧 PURIFYING NEXT.JS CONFIGURATION...\n");

try {
  // Purify next.config.mjs to Next 16 standards
  const nextConfigCode = `/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;`;

  fs.writeFileSync('./next.config.mjs', nextConfigCode);
  console.log("✅ next.config.mjs purified.");

  // Force push to Vercel
  console.log("🚀 Blasting pure config to Vercel...\n");
  execSync('git add .');
  execSync('git commit -m "BRUTE FORCE: Purify next.config.mjs for Next 16"');
  execSync('git push');
  
  console.log("🟢 CONFIG RESTORED. Watch the Vercel logs.");

} catch (err) {
  console.error("⚠️ SCRIPT HALTED. Git message: ", err.stdout ? err.stdout.toString() : err.message);
}