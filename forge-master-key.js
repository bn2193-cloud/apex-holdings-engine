const fs = require('fs');
const { execSync } = require('child_process');

console.log("\n🔑 ROTATING SECURITY KEYS FOR NEXT.JS 16...\n");

try {
  // 1. Rewrite Proxy to satisfy the new export requirements
  const proxyCode = `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next.js 16 now requires the function to be named 'proxy'
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication Required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user !== 'apex' || pass !== 'summit2026') {
      return new NextResponse('Invalid Credentials', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }
  }

  return NextResponse.next();
}

// Ensure the config still targets the right paths
export const config = {
  matcher: ['/admin/:path*'],
};`;

  fs.writeFileSync('./src/proxy.ts', proxyCode);
  console.log("✅ src/proxy.ts updated with correct 'proxy' function export.");

  // 2. Clean up next.config.mjs to remove the rejected 'eslint' key
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;`;
  fs.writeFileSync('./next.config.mjs', nextConfig);
  console.log("✅ next.config.mjs cleaned.");

  // 3. BLAST IT
  console.log("🚀 FORCING MASTER KEY TO VERCEL...");
  execSync('git add .');
  execSync('git commit -m "FIX: Satisfy Next 16 proxy export requirements"');
  execSync('git push');
  
  console.log("\n🟢 DONE. Refresh Vercel and watch the deployment.");

} catch (err) {
  console.error("⚠️ HALTED: ", err.message);
}