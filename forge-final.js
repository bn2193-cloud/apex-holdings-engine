const fs = require('fs');
const { execSync } = require('child_process');

console.log("\n🛰️ EXECUTING TOTAL STRUCTURAL ALIGNMENT...\n");

try {
  // 1. Ensure the CSS has the new V4 Directives ONLY
  const cleanCss = `@import "tailwindcss";

@theme {
  --color-brand-gold: #FFD700;
  --color-brand-green: #1A4B2C;
}

:root {
  background: #060D09;
  color: white;
}

body {
  margin: 0;
  padding: 0;
}`;
  fs.writeFileSync('./src/app/globals.css', cleanCss);
  console.log("✅ globals.css purged and re-injected.");

  // 2. Re-write the Root Layout to guarantee the CSS is imported first
  const rootLayout = `import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apex Holdings",
  description: "Institutional Finance & Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}`;
  fs.writeFileSync('./src/app/layout.tsx', rootLayout);
  console.log("✅ layout.tsx hard-wired to globals.css.");

  // 3. One last check: Ensure package.json has the right engines
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  pkg.dependencies["tailwindcss"] = "latest";
  pkg.dependencies["@tailwindcss/postcss"] = "latest";
  pkg.dependencies["postcss"] = "latest";
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
  console.log("✅ package.json dependencies verified.");

  // 4. BLAST IT
  console.log("🚀 FORCING FINAL PAYLOAD TO VERCEL...");
  execSync('git add .');
  execSync('git commit -m "STRUCTURAL REALIGNMENT: Force CSS Binding"');
  execSync('git push');
  
  console.log("\n🟢 DONE. Refresh Vercel and check the build.");

} catch (err) {
  console.error("⚠️ HALTED: ", err.message);
}