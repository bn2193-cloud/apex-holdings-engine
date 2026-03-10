import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // 👇 You can change 'admin' and 'Apex2026' to whatever credentials you want
    if (user === 'admin' && pwd === 'Apex2026') {
      return NextResponse.next();
    }
  }

  // If the password is wrong or missing, Vercel instantly drops the connection
  return new NextResponse('ACCESS DENIED: Mission Control Locked.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Apex Secure Area"',
    },
  });
}

// This tells the bouncer to ONLY protect the admin folder and its sub-pages
export const config = {
  matcher: ['/admin/:path*'],
};