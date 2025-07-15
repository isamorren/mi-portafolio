'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { sanitizeText, isValidEmail } from '@/lib/security'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  // Honeypot field ref
  const honeypotRef = useRef<HTMLInputElement>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre es demasiado largo'
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido'
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
    } else if (formData.message.length > 1000) {
      newErrors.message = 'El mensaje es demasiado largo (máximo 1000 caracteres)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Verificar honeypot (anti-spam)
    if (honeypotRef.current?.value) {
      console.warn('Honeypot triggered')
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizeText(formData.name, 100),
          email: sanitizeText(formData.email, 254),
          message: sanitizeText(formData.message, 1000)
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 429) {
          setErrorMessage('Has enviado demasiados mensajes. Por favor, intenta más tarde.')
        } else {
          setErrorMessage(data.error || 'Error al enviar el mensaje')
        }
        setSubmitStatus('error')
        return
      }
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage('Error de conexión. Por favor, intenta nuevamente.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Honeypot field (hidden from users) */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />
      
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
          disabled={isSubmitting}
          maxLength={100}
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.name}
          </motion.p>
        )}
      </div>
      
      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
          disabled={isSubmitting}
          maxLength={254}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.email}
          </motion.p>
        )}
      </div>
      
      {/* Message field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none`}
          disabled={isSubmitting}
          maxLength={1000}
        />
        <div className="flex justify-between mt-1">
          <div>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {errors.message}
              </motion.p>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {formData.message.length}/1000
          </span>
        </div>
      </div>
      
      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </motion.button>
      
      {/* Status messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-green-800">¡Mensaje enviado exitosamente!</p>
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-red-800">{errorMessage}</p>
        </motion.div>
      )}
    </motion.form>
  )
}