const fs = require('fs');
const { execSync } = require('child_process');

console.log("\n☢️ INITIATING DIRECT TAILWIND V4 INJECTION...\n");

try {
  // 1. Delete the old engines (PostCSS and Tailwind Config)
  if (fs.existsSync('./postcss.config.mjs')) fs.unlinkSync('./postcss.config.mjs');
  if (fs.existsSync('./tailwind.config.ts')) fs.unlinkSync('./tailwind.config.ts');
  console.log("✅ Old config files nuked.");

  // 2. Install the correct Next.js Tailwind package
  console.log("📦 Installing Tailwind V4 Next.js integration...");
  execSync('npm install tailwindcss @tailwindcss/postcss', { stdio: 'inherit' });

  // 3. Directly inject Tailwind into globals.css
  const globalsCss = `@import "tailwindcss";

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: transparent;
}`;
  fs.writeFileSync('./src/app/globals.css', globalsCss);
  console.log("✅ src/app/globals.css injected with direct V4 import.");

  // 4. Force push to Vercel
  console.log("\n🚀 Blasting Direct Injection to Vercel...\n");
  execSync('git add .');
  execSync('git commit -m "BRUTE FORCE: Direct Tailwind V4 Injection"');
  execSync('git push');
  
  console.log("🟢 INJECTION COMPLETE. Watch the Vercel logs.");

} catch (err) {
  console.error("⚠️ SCRIPT HALTED. Error: ", err.message);
}