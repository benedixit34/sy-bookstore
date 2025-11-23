import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from "@/utils/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const path = request.nextUrl.pathname;

  if (!user && (path.startsWith("/library") || path.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (user && (path.startsWith("/auth/login") || path.startsWith("/auth/register") || 
              path.startsWith("/auth/forgot-password"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path.startsWith("/admin") && user?.user_metadata?.role !== "school_admin") {
    return NextResponse.redirect(new URL("/", request.url)); 
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
