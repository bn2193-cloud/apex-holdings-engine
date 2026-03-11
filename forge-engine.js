const fs = require('fs');
const { execSync } = require('child_process');

console.log("\n⚙️ FORGING POSTCSS ENGINE & TAILWIND RADAR...\n");

try {
  // 1. Forge the missing PostCSS Translator
  const postCssConfig = `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;`;
  fs.writeFileSync('./postcss.config.mjs', postCssConfig);
  console.log("✅ postcss.config.mjs (CSS Engine) restored.");

  // 2. Expand Tailwind's radar to catch EVERYTHING in the src folder
  const tailwindConfig = `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;`;
  fs.writeFileSync('./tailwind.config.ts', tailwindConfig);
  console.log("✅ tailwind.config.ts radar expanded.");

  // 3. Force push to Vercel
  console.log("🚀 Blasting Engine payload to Vercel...\n");
  execSync('git add .');
  execSync('git commit -m "BRUTE FORCE: Restore PostCSS engine and expand Tailwind content"');
  execSync('git push');
  
  console.log("🟢 ENGINE RESTORED. Give Vercel 45 seconds to compile the CSS.");

} catch (err) {
  console.error("⚠️ SCRIPT HALTED. Git message: ", err.stdout ? err.stdout.toString() : err.message);
}