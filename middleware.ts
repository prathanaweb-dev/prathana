import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass static resources, API endpoints, and admin panels
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // 2. Check if path already contains a supported locale prefix
  const pathnameHasLocale = ['/en', '/mr'].some(
    (locale) => pathname === locale || pathname.startsWith(`${locale}/`)
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 3. Redirect to /en with the original pathname
  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Intercept all paths except next static folders
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
