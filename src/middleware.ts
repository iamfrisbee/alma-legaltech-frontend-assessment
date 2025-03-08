import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/api/login' ||
    (request.nextUrl.pathname === '/api/leads' && request.method === 'PUT')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token');
  if (!(token && token.value === '1')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
};
