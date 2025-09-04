'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Download, Play } from 'lucide-react'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const mouseX = useSpring(mousePosition.x, springConfig)
  const mouseY = useSpring(mousePosition.y, springConfig)

  useEffect(() => {
    const element = containerRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 25,
          y: (e.clientY - rect.top - rect.height / 2) / 25,
        })
      }
    }

    element?.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      element?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center hero-gradient text-text overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary-500/5"></div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6"
        style={{ y, opacity }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div 
          variants={textVariants}
          className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 glass-effect rounded-full border border-accent/20 text-xs sm:text-sm text-off-white mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          <span className="hidden sm:inline">Computer Science Engineer & Full-Stack Developer</span>
          <span className="sm:hidden">CS Engineer & Full-Stack Dev</span>
        </motion.div>

        <motion.h1
          variants={textVariants}
          className="font-display font-bold leading-tight mb-4 sm:mb-6 whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F3F3 50%, #0D4D6E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: 'clamp(1.5rem, 8vw, 5rem)', // Responsive font size
            overflow: 'visible',
          }}
        >
          PRUTHVI SUVARNA K M
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-base sm:text-lg md:text-xl text-text-muted mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2"
        >
          Building secure, scalable, and impactful digital solutions. 
          Cybersecurity enthusiast with expertise in web development, 
          penetration testing, and AI-driven applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4"
        >
          <motion.a
            href="#projects"
            className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 bg-accent text-background font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Play size={16} className="sm:size-[18px]" />
              View My Work
            </span>
            <div className="absolute inset-0 bg-accent-dark translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </motion.a>

          <motion.a
            href="/PRUTHVI SUVARNA RESUME.pdf"
            download
            className="w-full sm:w-auto group px-6 sm:px-8 py-3 glass-effect border border-accent/30 text-text font-semibold rounded-lg transition-all duration-300 hover:border-accent hover:bg-accent/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Download size={16} className="sm:size-[18px]" />
              Download Resume
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Parallax elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
        style={{
          x: useTransform(mouseX, (value) => value * -0.5),
          y: useTransform(mouseY, (value) => value * -0.5),
        }}
      />
    </section>
  )
}