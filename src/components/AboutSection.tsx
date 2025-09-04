'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Shield, Cpu, Globe } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  }

  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Proficient in React.js, Node.js, Express.js, and modern web technologies with TypeScript and JavaScript expertise."
    },
    {
      icon: Shield,
      title: "Cybersecurity Enthusiast",
      description: "Experience in bug bounty hunting, penetration testing, vulnerability assessment, and security research."
    },
    {
      icon: Cpu,
      title: "AI & Emerging Tech",
      description: "Advanced prompt engineering, AI workflow optimization, and integration of cutting-edge AI tools and APIs."
    },
    {
      icon: Globe,
      title: "Mobile Development",
      description: "Android development with Java and Kotlin, creating efficient and user-friendly mobile applications."
    }
  ]

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4">
              About Me
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Passionate about creating innovative solutions at the intersection of technology and security
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12 items-center mb-20">
            {/* Left Column - Text Content */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-text mb-6">
                Building the Future, One Line of Code at a Time
              </h3>
              
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  I&apos;m <span className="text-accent font-semibold">Pruthvi Suvarna K M</span>, 
                  a Computer Science Engineering student at Sri Devi Institute of Technology, 
                  Mangalore, currently maintaining a strong academic record with a 
                  <span className="text-accent font-semibold"> 8.65 CGPA</span>.
                </p>
                
                <p>
                  My journey in technology spans across multiple domains - from developing 
                  robust full-stack web applications to diving deep into cybersecurity 
                  research. I&apos;m particularly passionate about creating secure, scalable 
                  solutions that make a real-world impact.
                </p>
                
                <p>
                  Based in <span className="text-accent">Thirthahalli, Karnataka</span>, 
                  I actively participate in competitive programming, hackathons, and 
                  cybersecurity challenges. My recent achievements include winning the 
                  Code Breakers Challenge at YENIXA 2.0 and presenting projects at 
                  I2CONECCT-2025.
                </p>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-text-muted">Date of Birth</p>
                  <p className="text-text font-semibold">July 11, 2004</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-text-muted">Location</p>
                  <p className="text-text font-semibold">Karnataka, India</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-text-muted">Languages</p>
                  <p className="text-text font-semibold">English, Kannada, Hindi, Tulu</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-text-muted">Interests</p>
                  <p className="text-text font-semibold">Music, Badminton, Chess, Photography</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Profile Photo & Stats */}
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              {/* Profile Photo */}
              <motion.div 
                className="relative mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-72 lg:h-72">
                  <Image
                    src="/new_profile.jpg"
                    alt="Pruthvi Suvarna K M"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-accent/30 group-hover:border-accent/60 transition-colors duration-300" />
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full blur-sm"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-500/20 rounded-full blur-sm"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {[
                  { number: "8.65", label: "CGPA", description: "Current Academic Performance" },
                  { number: "8+", label: "Projects", description: "Successfully Completed" },
                  { number: "3+", label: "Years", description: "Coding Experience" },
                  { number: "5+", label: "Technologies", description: "Proficient In" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glass-effect p-4 rounded-xl text-center group hover:scale-105 transition-all duration-300"
                  >
                    <motion.div 
                      className="text-2xl md:text-3xl font-bold text-accent mb-1"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.2 + index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ 
                          duration: 1, 
                          delay: 0.4 + index * 0.1 
                        }}
                      >
                        {stat.number}
                      </motion.span>
                    </motion.div>
                    <div className="text-text font-semibold text-sm mb-1">{stat.label}</div>
                    <div className="text-xs text-text-muted">{stat.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight) => (
              <motion.div
                key={highlight.title}
                variants={itemVariants}
                className="glass-effect p-6 rounded-xl group hover:bg-accent/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <highlight.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                  {highlight.title}
                </h4>
                <p className="text-text-muted text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
