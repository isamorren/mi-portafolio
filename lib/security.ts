// Utilidades de seguridad para validación y sanitización

/**
 * Sanitiza texto removiendo caracteres potencialmente peligrosos
 */
export function sanitizeText(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') return ''
  
  return input
    .trim()
    .slice(0, maxLength)
    // Remover caracteres de control
    .replace(/[\x00-\x1F\x7F]/g, '')
    // Escapar caracteres HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  
  // Regex más estricto para emails
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Valida que un string solo contenga caracteres alfanuméricos y espacios
 */
export function isAlphanumericWithSpaces(input: string): boolean {
  if (!input || typeof input !== 'string') return false
  
  const regex = /^[a-zA-Z0-9\s\-\.]+$/
  return regex.test(input)
}

/**
 * Genera un token CSRF seguro
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Hashea una IP para privacidad
 */
export async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(ip + process.env.SALT || 'default-salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Valida y limpia headers HTTP
 */
export function sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
  const sanitized: Record<string, string> = {}
  
  for (const [key, value] of Object.entries(headers)) {
    // Solo permitir caracteres seguros en headers
    if (/^[a-zA-Z0-9\-]+$/.test(key) && typeof value === 'string') {
      // Limitar longitud del valor
      sanitized[key] = value.slice(0, 8192)
    }
  }
  
  return sanitized
}

/**
 * Detecta patrones de SQL injection básicos
 */
export function containsSQLInjectionPattern(input: string): boolean {
  if (!input || typeof input !== 'string') return false
  
  const sqlPatterns = [
    /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b.*\b(from|into|where|table)\b)/i,
    /(\b(or|and)\b.*=.*)/i,
    /(--|#|\/\*|\*\/)/,
    /(\bsleep\b|\bbenchmark\b)/i,
    /(\'|\")\s*(or|and)\s*(\'|\").*=/i,
  ]
  
  return sqlPatterns.some(pattern => pattern.test(input))
}

/**
 * Detecta patrones de XSS básicos
 */
export function containsXSSPattern(input: string): boolean {
  if (!input || typeof input !== 'string') return false
  
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick=, onload=, etc.
    /<img[^>]*onerror=/gi,
    /<svg[^>]*onload=/gi,
  ]
  
  return xssPatterns.some(pattern => pattern.test(input))
}

/**
 * Limita la tasa de intentos por key (útil para login, etc.)
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map()
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutos
  ) {}
  
  check(key: string): { allowed: boolean; remainingAttempts: number; resetTime: number } {
    const now = Date.now()
    const record = this.attempts.get(key)
    
    if (!record || now > record.resetTime) {
      this.attempts.set(key, {
        count: 1,
        resetTime: now + this.windowMs
      })
      
      return {
        allowed: true,
        remainingAttempts: this.maxAttempts - 1,
        resetTime: now + this.windowMs
      }
    }
    
    if (record.count >= this.maxAttempts) {
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime: record.resetTime
      }
    }
    
    record.count++
    this.attempts.set(key, record)
    
    return {
      allowed: true,
      remainingAttempts: this.maxAttempts - record.count,
      resetTime: record.resetTime
    }
  }
  
  reset(key: string): void {
    this.attempts.delete(key)
  }
  
  cleanup(): void {
    const now = Date.now()
    for (const [key, record] of this.attempts.entries()) {
      if (now > record.resetTime) {
        this.attempts.delete(key)
      }
    }
  }
}