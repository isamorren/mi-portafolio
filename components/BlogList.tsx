'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
interface PostMeta {
  title: string
  date: string
  excerpt: string
  tags: string[]
  slug: string
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F6F4F9] via-white to-[#E5E3F6] relative overflow-hidden">
      {/* Elementos decorativos flotantes */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-[#B4A7D6]/20 to-[#E4C7D6]/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", damping: 30 }}
          style={{ top: '10%', left: '5%' }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-tr from-[#6667AB]/10 to-[#9B99C9]/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.03,
            y: mousePosition.y * -0.03,
          }}
          transition={{ type: "spring", damping: 30 }}
          style={{ bottom: '20%', right: '10%' }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
        {/* Header con navegación */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#6667AB] hover:text-[#322F68] transition-all duration-300 group mb-8"
          >
            <motion.svg 
              className="w-5 h-5" 
              whileHover={{ x: -3 }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
            <span className="font-script italic">Volver al inicio</span>
          </Link>
          
          <div className="relative">
            <motion.h1 
              className="text-6xl md:text-8xl font-serif-display font-bold text-[#1A1A2F] mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Blog
            </motion.h1>
            <motion.p 
              className="font-script text-2xl text-[#6667AB] italic ml-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Pensamientos técnicos y reflexiones
            </motion.p>
            
            {/* Línea decorativa */}
            <motion.div 
              className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-[#B4A7D6] to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </div>
        </motion.div>
        
        {/* Grid de posts con diseño asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {posts.map((post, index) => {
            const isEven = index % 2 === 0
            const gridSpan = index === 0 ? 'md:col-span-12' : isEven ? 'md:col-span-7' : 'md:col-span-5'
            const isHovered = hoveredIndex === index
            
            return (
              <motion.article 
                key={post.slug}
                className={`${gridSpan} group relative`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={`/blog/${post.slug}`}>
                  <motion.div
                    className="relative bg-white rounded-3xl p-8 md:p-10 shadow-soft hover:shadow-elevated transition-all duration-500"
                    whileHover={{ y: -5 }}
                  >
                    {/* Número decorativo */}
                    <motion.div 
                      className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#B4A7D6] to-[#E4C7D6] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                      animate={{
                        rotate: isHovered ? 10 : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.div>

                    {/* Contenido */}
                    <div className={`${index === 0 ? 'md:flex md:items-center md:gap-12' : ''}`}>
                      <div className={`${index === 0 ? 'md:flex-1' : ''}`}>
                        <motion.h2 
                          className={`${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-serif-display font-bold text-[#1A1A2F] mb-3 group-hover:text-[#6667AB] transition-colors duration-300`}
                        >
                          {post.title}
                        </motion.h2>
                        
                        <time className="font-script text-sm text-[#9B99C9] italic">
                          {formatDate(post.date)}
                        </time>
                        
                        <p className="text-[#4A4865] leading-relaxed mt-4 mb-6">
                          {post.excerpt}
                        </p>
                        
                        {/* Tags con diseño único */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag, tagIndex) => (
                              <motion.span 
                                key={tag}
                                className="px-4 py-1.5 text-xs font-medium bg-gradient-to-r from-[#F6F4F9] to-[#E5E3F6] text-[#6667AB] rounded-full border border-[#D9D7EC]"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        )}
                        
                        {/* CTA único */}
                        <motion.div 
                          className="inline-flex items-center gap-3 text-[#6667AB] font-medium group/link"
                          whileHover={{ x: 5 }}
                        >
                          <span className="relative">
                            Leer artículo
                            <motion.div 
                              className="absolute -bottom-1 left-0 h-0.5 bg-[#B4A7D6]"
                              initial={{ width: 0 }}
                              animate={{ width: isHovered ? '100%' : 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                          <motion.svg 
                            className="w-5 h-5" 
                            animate={{ x: isHovered ? 5 : 0 }}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </motion.svg>
                        </motion.div>
                      </div>

                      {/* Elemento visual decorativo para el primer post */}
                      {index === 0 && (
                        <motion.div 
                          className="hidden md:block md:w-64 h-64 relative"
                          animate={{
                            rotate: isHovered ? 5 : 0,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#B4A7D6]/30 to-[#E4C7D6]/30 rounded-3xl transform rotate-6" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#6667AB]/20 to-[#9B99C9]/20 rounded-3xl transform -rotate-3" />
                          <div className="absolute inset-4 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <span className="font-script text-[#6667AB] text-6xl italic">{"</>"}</span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Efecto de hover decorativo */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-3xl pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="absolute -inset-px bg-gradient-to-r from-[#B4A7D6]/20 via-[#E4C7D6]/20 to-[#B4A7D6]/20 rounded-3xl blur-xl" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.article>
            )
          })}
        </div>
        
        {posts.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-script text-2xl text-[#9B99C9] italic">No hay artículos publicados todavía...</p>
          </motion.div>
        )}

        {/* Decoración flotante inferior */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full border-2 border-[#D9D7EC]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </main>
  )
}