import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n/config";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );

    if (!pathnameHasLocale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         Match all request paths except:
         - _next (static files)
         - api (API routes)
         - public files (images, favicon, etc.)
        */
        "/((?!_next|api|.*\\..*).*)",
    ],
};