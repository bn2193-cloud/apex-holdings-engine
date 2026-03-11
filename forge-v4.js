const fs = require('fs');
const { execSync } = require('child_process');

console.log("\n⚡ UPGRADING TO TAILWIND V4 ARCHITECTURE...\n");

try {
  // 1. Update PostCSS Config for Tailwind v4
  const postCssConfig = `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
export default config;`;
  fs.writeFileSync('./postcss.config.mjs', postCssConfig);
  console.log("✅ postcss.config.mjs updated for Tailwind v4.");

  // 2. Install the missing engine package
  console.log("📦 Installing @tailwindcss/postcss...");
  execSync('npm install @tailwindcss/postcss', { stdio: 'inherit' });
  
  // 3. Force push to Vercel
  console.log("\n🚀 Blasting V4 architecture to Vercel...\n");
  execSync('git add .');
  execSync('git commit -m "BRUTE FORCE: Upgrade to Tailwind v4 PostCSS architecture"');
  execSync('git push');
  
  console.log("🟢 V4 UPGRADE COMPLETE. Watch the Vercel logs.");

} catch (err) {
  console.error("⚠️ SCRIPT HALTED. Error: ", err.message);
}