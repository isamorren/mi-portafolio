import { NextRequest, NextResponse } from 'next/server'

// Almacén en memoria para rate limiting
const rateLimitStore = new Map<string, { count: number; firstRequestTime: number }>()

// Configuración de rate limiting
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 minutos en milisegundos
const MAX_REQUESTS = 3 // Máximo 3 solicitudes por ventana de tiempo

// Función para limpiar entradas antiguas del store
function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now - data.firstRequestTime > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(ip)
    }
  }
}

// Función para obtener la IP del cliente
function getClientIp(request: NextRequest): string {
  // En Vercel, la IP real está en estos headers
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp.trim()
  }
  
  // Fallback para desarrollo local
  return '127.0.0.1'
}

// Función de rate limiting
function checkRateLimit(ip: string): { allowed: boolean; remainingRequests: number; resetTime: number } {
  cleanupRateLimitStore()
  
  const now = Date.now()
  const clientData = rateLimitStore.get(ip)
  
  if (!clientData) {
    // Primera solicitud de este IP
    rateLimitStore.set(ip, { count: 1, firstRequestTime: now })
    return { 
      allowed: true, 
      remainingRequests: MAX_REQUESTS - 1,
      resetTime: now + RATE_LIMIT_WINDOW
    }
  }
  
  const timeSinceFirstRequest = now - clientData.firstRequestTime
  
  if (timeSinceFirstRequest > RATE_LIMIT_WINDOW) {
    // La ventana de tiempo ha expirado, reiniciar contador
    rateLimitStore.set(ip, { count: 1, firstRequestTime: now })
    return { 
      allowed: true, 
      remainingRequests: MAX_REQUESTS - 1,
      resetTime: now + RATE_LIMIT_WINDOW
    }
  }
  
  if (clientData.count >= MAX_REQUESTS) {
    // Límite alcanzado
    return { 
      allowed: false, 
      remainingRequests: 0,
      resetTime: clientData.firstRequestTime + RATE_LIMIT_WINDOW
    }
  }
  
  // Incrementar contador
  clientData.count++
  rateLimitStore.set(ip, clientData)
  
  return { 
    allowed: true, 
    remainingRequests: MAX_REQUESTS - clientData.count,
    resetTime: clientData.firstRequestTime + RATE_LIMIT_WINDOW
  }
}

// Validación de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitización básica de input
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover caracteres HTML básicos
    .slice(0, 1000) // Limitar longitud
}

export async function POST(request: NextRequest) {
  try {
    // Obtener IP del cliente
    const clientIp = getClientIp(request)
    
    // Verificar rate limit
    const { allowed, remainingRequests, resetTime } = checkRateLimit(clientIp)
    
    if (!allowed) {
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)
      
      return NextResponse.json(
        { 
          error: 'Demasiadas solicitudes. Por favor, intenta nuevamente más tarde.',
          message: 'Rate limit exceeded'
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(resetTime).toISOString(),
            'Retry-After': retryAfter.toString()
          }
        }
      )
    }
    
    // Parsear body
    const body = await request.json()
    const { name, email, message } = body
    
    // Validación de campos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }
    
    // Validar email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }
    
    // Sanitizar inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
      timestamp: new Date().toISOString(),
      ip: clientIp
    }
    
    // Aquí puedes agregar la lógica para enviar el email
    // Por ejemplo, usando SendGrid, Resend, o cualquier servicio de email
    
    // Por ahora, solo logueamos en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', sanitizedData)
    }
    
    // Respuesta exitosa con headers de rate limit
    return NextResponse.json(
      { 
        success: true,
        message: 'Mensaje enviado exitosamente'
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': remainingRequests.toString(),
          'X-RateLimit-Reset': new Date(resetTime).toISOString()
        }
      }
    )
    
  } catch (error) {
    console.error('Error en formulario de contacto:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Método OPTIONS para CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}