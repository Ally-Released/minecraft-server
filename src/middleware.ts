import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image, favicon
     * - static assets including integrity pack zip (Minecraft clients must download this)
     */
    '/((?!_next/static|_next/image|favicon.ico|packs/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|zip)$).*)',
  ],
}
