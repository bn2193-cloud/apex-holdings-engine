const fs = require('fs');
const { execSync } = require('child_process');

console.log("\n🔨 FORGING CORE UI & TAILWIND PIPELINE...\n");

try {
  // 1. Hardwire Tailwind Config
  const tailwindConfig = `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;`;
  fs.writeFileSync('./tailwind.config.ts', tailwindConfig);
  console.log("✅ tailwind.config.ts hardwired.");

  // 2. Hardwire Global CSS
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

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
  console.log("✅ src/app/globals.css hardwired.");

  // 3. Reconnect the Layout to the CSS
  const layoutCode = `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apex Holdings",
  description: "Generational Wealth & Technology Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}`;
  fs.writeFileSync('./src/app/layout.tsx', layoutCode);
  console.log("✅ src/app/layout.tsx wired to global CSS.");

  // 4. Force push to Vercel
  console.log("🚀 Blasting UI payload to Vercel...\n");
  execSync('git add .');
  execSync('git commit -m "BRUTE FORCE: Fix Tailwind CSS wiring"');
  execSync('git push');
  
  console.log("🟢 MISSION ACCOMPLISHED. Give Vercel 45 seconds to build.");

} catch (err) {
  console.error("⚠️ SCRIPT HALTED. Git message: ", err.stdout ? err.stdout.toString() : err.message);
}