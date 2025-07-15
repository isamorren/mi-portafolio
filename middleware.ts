import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Lista de IPs bloqueadas (puedes mantener esto en una base de datos en producción)
const blockedIPs = new Set<string>()

// Patrones de User-Agent sospechosos
const suspiciousUserAgents = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /go-http-client/i,
]

// Excepciones para bots legítimos
const allowedBots = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i, // Yahoo
  /duckduckbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
]

export function middleware(request: NextRequest) {
  // Obtener información de la solicitud
  const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  const url = request.nextUrl
  
  // Verificar si la IP está bloqueada
  if (blockedIPs.has(ip)) {
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  // Solo aplicar verificaciones adicionales a rutas API
  if (url.pathname.startsWith('/api/')) {
    // Verificar User-Agent sospechoso
    const isBot = suspiciousUserAgents.some(pattern => pattern.test(userAgent))
    const isAllowedBot = allowedBots.some(pattern => pattern.test(userAgent))
    
    if (isBot && !isAllowedBot) {
      // Log para monitoreo
      console.warn(`Blocked suspicious bot: ${userAgent} from IP: ${ip}`)
      
      return new NextResponse('Forbidden', { 
        status: 403,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow'
        }
      })
    }
    
    // Verificar método HTTP para endpoints específicos
    if (url.pathname === '/api/contact' && request.method !== 'POST' && request.method !== 'OPTIONS') {
      return new NextResponse('Method Not Allowed', { 
        status: 405,
        headers: {
          'Allow': 'POST, OPTIONS'
        }
      })
    }
  }
  
  // Agregar headers de seguridad adicionales
  const response = NextResponse.next()
  
  // Headers de seguridad que complementan las de next.config.js
  response.headers.set('X-Request-ID', crypto.randomUUID())
  response.headers.set('X-Response-Time', Date.now().toString())
  
  // Prevenir clickjacking en páginas sensibles
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api')) {
    response.headers.set('X-Frame-Options', 'DENY')
  }
  
  return response
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}