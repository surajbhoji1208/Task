import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// #region Route Constants
const PROTECTED_ROUTES = ['/dashboard', '/products', '/analytics', '/import'];
const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password', '/otp-verify'];
// #endregion

// #region Middleware
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
// #endregion
