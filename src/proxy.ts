import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next.js 16 now requires the function to be named 'middleware' OR 'proxy' 
// but specifically exported for the 'proxy' convention.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication Required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }

    try {
      const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      const user = auth[0];
      const pass = auth[1];

      if (user !== 'apex' || pass !== 'summit2026') {
        throw new Error('Invalid');
      }
    } catch (e) {
      return new NextResponse('Invalid Credentials', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};