'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { PostMeta } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote'

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface BlogPostProps {
  frontmatter: PostMeta
  mdxSource: any
}

export default function BlogPost({ frontmatter, mdxSource }: BlogPostProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = window.scrollY
      const progress = (currentProgress / totalScroll) * 100
      setReadingProgress(Math.min(progress, 100))
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F6F4F9] via-white to-[#E5E3F6] relative overflow-hidden">
      {/* Barra de progreso de lectura */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B4A7D6] to-[#E4C7D6] z-50 origin-left"
        style={{ scaleX: readingProgress / 100 }}
      />

      {/* Elementos decorativos flotantes que siguen el mouse */}
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

      <article className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        {/* Header con navegación */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex justify-between items-start mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-[#6667AB] hover:text-[#322F68] transition-all duration-300 group"
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
              <span className="font-script italic">Volver al blog</span>
            </Link>

            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-[#6667AB] hover:text-[#322F68] transition-all duration-300 group"
            >
              <span className="font-script italic">Inicio</span>
              <motion.svg 
                className="w-5 h-5" 
                whileHover={{ x: 3 }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </motion.svg>
            </Link>
          </div>

          {/* Título con diseño único */}
          <div className="relative">
            <motion.div
              className="absolute -top-12 -left-8 text-9xl font-serif-display font-bold text-[#B4A7D6]/10 select-none"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {frontmatter.tags?.[0]?.[0] || 'T'}
            </motion.div>
            
            <motion.h1 
              className="relative text-5xl md:text-7xl font-serif-display font-bold text-[#1A1A2F] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {frontmatter.title}
            </motion.h1>
            
            <motion.div 
              className="flex items-center gap-6 text-[#6667AB]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <time className="font-script text-lg italic">
                {formatDate(frontmatter.date)}
              </time>
              <span className="w-16 h-px bg-[#D9D7EC]" />
              <span className="font-script text-sm italic">
                {Math.ceil(mdxSource.compiledSource.length / 1500)} min de lectura
              </span>
            </motion.div>

            {/* Tags flotantes */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <motion.div 
                className="flex flex-wrap gap-3 mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {frontmatter.tags.map((tag: string, index: number) => (
                  <motion.span 
                    key={tag}
                    className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-[#F6F4F9] to-[#E5E3F6] text-[#6667AB] rounded-full border border-[#D9D7EC] shadow-soft"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Contenido del artículo con diseño especial */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Decoración lateral */}
          <div className="absolute -left-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D9D7EC] to-transparent hidden lg:block" />
          
          {/* Número de artículo decorativo */}
          <motion.div 
            className="absolute -left-32 top-0 w-16 h-16 bg-gradient-to-br from-[#B4A7D6] to-[#E4C7D6] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg hidden lg:flex"
            animate={{
              y: readingProgress * 2,
            }}
          >
            {'#'}
          </motion.div>

          <div className="prose prose-lg prose-purple max-w-none
            prose-headings:font-serif-display prose-headings:text-[#1A1A2F]
            prose-p:text-[#4A4865] prose-p:leading-relaxed
            prose-a:text-[#6667AB] prose-a:no-underline hover:prose-a:text-[#322F68] prose-a:transition-colors
            prose-strong:text-[#322F68] prose-strong:font-semibold
            prose-code:text-[#6667AB] prose-code:bg-[#F6F4F9] prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-medium
            prose-pre:bg-[#1A1A2F] prose-pre:shadow-xl prose-pre:rounded-2xl prose-pre:overflow-hidden
            prose-blockquote:border-l-[#B4A7D6] prose-blockquote:border-l-4 prose-blockquote:italic prose-blockquote:font-script prose-blockquote:text-[#6667AB]
            prose-img:rounded-2xl prose-img:shadow-xl
            prose-hr:border-[#D9D7EC]"
          >
            <MDXRemote {...mdxSource} />
          </div>
        </motion.div>

        {/* Navegación entre posts con diseño único */}
        <motion.nav 
          className="relative mt-24 pt-12 border-t-2 border-[#D9D7EC]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Decoración central */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <motion.div 
              className="w-6 h-6 bg-gradient-to-br from-[#B4A7D6] to-[#E4C7D6] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {frontmatter.prev ? (
              <motion.div whileHover={{ x: -5 }}>
                <Link 
                  href={`/blog/${frontmatter.prev}`}
                  className="group block p-6 bg-white rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <span className="flex items-center gap-3 text-[#6667AB] font-medium mb-2">
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-script italic text-sm">Artículo anterior</span>
                  </span>
                  <span className="text-[#1A1A2F] font-serif-display text-lg font-semibold group-hover:text-[#6667AB] transition-colors">
                    Ver post anterior
                  </span>
                </Link>
              </motion.div>
            ) : (
              <div />
            )}
            
            {frontmatter.next ? (
              <motion.div whileHover={{ x: 5 }} className="md:text-right">
                <Link 
                  href={`/blog/${frontmatter.next}`}
                  className="group block p-6 bg-white rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <span className="flex items-center gap-3 text-[#6667AB] font-medium mb-2 md:justify-end">
                    <span className="font-script italic text-sm">Artículo siguiente</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="text-[#1A1A2F] font-serif-display text-lg font-semibold group-hover:text-[#6667AB] transition-colors">
                    Ver post siguiente
                  </span>
                </Link>
              </motion.div>
            ) : (
              <div />
            )}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F6F4F9] to-[#E5E3F6] text-[#6667AB] font-medium rounded-full border border-[#D9D7EC] shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-7-7m7 7l-7 7" />
              </svg>
              <span>Ver todos los artículos</span>
            </Link>
          </motion.div>
        </motion.nav>

        {/* Decoración flotante inferior */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full border-2 border-[#D9D7EC]/30"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </article>
    </main>
  )
}