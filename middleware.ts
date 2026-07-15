import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect /admin routes (except the login page itself)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('prathana_admin')?.value;
    if (!token) {
      // Not authenticated — redirect to login
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }
    // Token present → allow through (Firebase ID token is validated client-side)
    return NextResponse.next();
  }

  // 2. Allow API, static, and already-locale-prefixed paths through
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // 3. Locale redirect — add /en prefix if missing
  const hasLocale = ['/en', '/mr'].some(
    (locale) => pathname === locale || pathname.startsWith(`${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
