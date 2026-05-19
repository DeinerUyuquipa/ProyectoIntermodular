import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { updateSession, decrypt } from './lib/auth';

let locales = ['es', 'en', 'eu'];
let defaultLocale = 'es';

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return matchLocale(languages, locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Proteger rutas de administración
  if (pathname.includes('/admin')) {
    const session = request.cookies.get('session')?.value;
    let isAdmin = false;
    
    if (session) {
      try {
        const parsed = await decrypt(session);
        if (parsed?.role === 'admin') {
          isAdmin = true;
        }
      } catch (error) {
        // Ignorar error de descifrado
      }
    }
    
    if (!isAdmin) {
      const locale = getLocale(request);
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Check if there is any supported locale in the pathname
  
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  let response: NextResponse;

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    response = NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  } else {
    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }

  // Update Supabase session
  return await updateSession(request, response);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.webp).*)'],
};
