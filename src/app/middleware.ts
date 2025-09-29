import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from "./utils/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);


  if (!user && request.nextUrl.pathname.startsWith("/library")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}