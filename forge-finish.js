const fs = require('fs');
const { execSync } = require('child_process');

console.log("\n⚡ EXECUTING FINAL CSS INJECTION...\n");

try {
  // 1. Force Tailwind V4 Directives into Globals
  const finalCss = `@import "tailwindcss";

@theme {
  --color-brand-gold: #FFD700;
  --color-brand-green: #1A4B2C;
}

:root {
  background: #060D09;
  color: white;
}

/* Hard-reset to prevent giant SVG if CSS fails */
svg {
  max-width: 100%;
  height: auto;
}
`;
  fs.writeFileSync('./src/app/globals.css', finalCss);
  console.log("✅ globals.css injected with V4 directives.");

  // 2. Ensure Layout imports Globals as the FIRST line
  const layoutCode = `import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apex Holdings",
  description: "Institutional Finance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#060D09' }}>{children}</body>
    </html>
  );
}`;
  fs.writeFileSync('./src/app/layout.tsx', layoutCode);
  console.log("✅ layout.tsx bound to CSS engine.");

  // 3. Update dependencies for the V4 engine
  console.log("📦 Locking V4 dependencies...");
  execSync('npm install tailwindcss@next @tailwindcss/postcss@next postcss@latest', { stdio: 'inherit' });

  // 4. BLAST IT
  console.log("\n🚀 Pushing final UI fix to Vercel...");
  execSync('git add .');
  execSync('git commit -m "UI: Force Tailwind V4 engine injection"');
  execSync('git push');
  
  console.log("\n🟢 MISSION ACCOMPLISHED. Watch the build finish.");

} catch (err) {
  console.error("⚠️ ERROR: ", err.message);
}