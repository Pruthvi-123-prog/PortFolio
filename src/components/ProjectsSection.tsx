'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Eye, Code, ArrowRight, Globe, Shield, Smartphone, Brain } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  liveUrl?: string
  githubUrl: string
  category: 'web' | 'mobile' | 'ai' | 'security'
  featured: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "DIGANTHADEEPA Design.Build",
    description: "Single-page commercial website for a structural firm with smooth scroll and animated timeline.",
    longDescription: "A modern, responsive website built for a structural engineering firm featuring smooth scrolling, animated timeline, project carousel, and OTP-verified contact form. Implemented with advanced animations and optimized performance.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    image: "/Diganthadeepa_project.png",
    liveUrl: "https://diganthadeepa.vercel.app/",
    githubUrl: "https://github.com/Pruthvi-123-prog/DIGANTHADEEPA_DESIGN.BUILD",
    category: "web",
    featured: true
  },
  {
    id: 2,
    title: "Crime Analysis System",
    description: "Crime visualization app with regional stats, live alerts, and map-based dashboards.",
    longDescription: "Comprehensive crime analysis platform featuring interactive maps, real-time data visualization, regional statistics, and alert systems. Built with modern web technologies for law enforcement agencies.",
    technologies: ["React.js", "Node.js", "Express", "MapTiler SDK", "Material-UI", "MongoDB"],
    image: "/crime_analysis_system_project.png",
    liveUrl: "https://pruthvi-123-prog.github.io/crime-analysis-system/",
    githubUrl: "https://github.com/Pruthvi-123-prog/crime-analysis-system",
    category: "web",
    featured: true
  },
  {
    id: 3,
    title: "Audit-X",
    description: "Advanced Website Security & Performance Analyzer built with NextJS and TypeScript.",
    longDescription: "Comprehensive security and performance analysis tool for websites. Features automated vulnerability scanning, performance metrics, SEO analysis, and detailed reporting dashboard.",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    image: "/AuditX_Project.png",
    liveUrl: "https://audit-x.vercel.app/",
    githubUrl: "https://github.com/Pruthvi-123-prog/AuditX",
    category: "security",
    featured: true
  },
  {
    id: 4,
    title: "E-Corp",
    description: "Privacy-first login system using Zero-Knowledge Proofs with cyberpunk UI.",
    longDescription: "Innovative authentication system implementing Zero-Knowledge Proofs for enhanced privacy and security. Features a futuristic cyberpunk-inspired interface with advanced cryptographic implementations.",
    technologies: ["Node.js", "JavaScript", "Cryptographic Libraries", "MongoDB"],
    image: "/E-Corp_project.png",
    githubUrl: "https://github.com/Pruthvi-123-prog/E-CORP",
    category: "security",
    featured: false
  },
  {
    id: 5,
    title: "Face Track Attendance",
    description: "Facial recognition attendance system with Django backend and real-time camera input.",
    longDescription: "Automated attendance management system using facial recognition technology. Built with Django backend, OpenCV for image processing, and real-time camera integration for seamless attendance tracking.",
    technologies: ["Django", "Python", "OpenCV", "face_recognition", "MySQL"],
    image: "/face_recognition_project.png",
    githubUrl: "https://github.com/Pruthvi-123-prog/Face-Track-Attendance",
    category: "ai",
    featured: false
  },
  {
    id: 6,
    title: "Steganography App",
    description: "Web app to hide and extract messages in images using LSB technique.",
    longDescription: "Advanced steganography application that allows users to hide secret messages within images using the Least Significant Bit (LSB) technique. Features an intuitive interface for both encoding and decoding operations.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/steganography.png",
    liveUrl: "https://pruthvi-123-prog.github.io/Steganography/",
    githubUrl: "https://github.com/Pruthvi-123-prog/Steganography",
    category: "security",
    featured: false
  }
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const categories = [
    { id: 'all', name: 'All Projects', icon: Code },
    { id: 'web', name: 'Web Dev', icon: Globe },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'ai', name: 'AI/ML', icon: Brain },
    { id: 'mobile', name: 'Mobile', icon: Smartphone }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            A showcase of my technical expertise across web development, cybersecurity, and emerging technologies
          </p>
        </motion.div>

        {/* Featured Projects Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-text mb-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-accent" />
            </div>
            Featured Work
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative glass-effect rounded-xl overflow-hidden hover:bg-accent/5 transition-all duration-300"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  
                  {/* Overlay on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    className="absolute inset-0 bg-accent/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-accent text-background rounded-full hover:scale-110 transition-transform duration-200"
                        >
                          <Eye size={20} />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-text text-background rounded-full hover:scale-110 transition-transform duration-200"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.category === 'web' ? 'bg-accent/20 text-accent' :
                      project.category === 'security' ? 'bg-primary-500/20 text-primary-500' :
                      project.category === 'ai' ? 'bg-accent/20 text-accent' :
                      'bg-accent/20 text-accent'
                    }`}>
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h4>
                  
                  <p className="text-text-muted text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-800 text-text-muted text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent-dark transition-colors duration-200"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text transition-colors duration-200"
                      >
                        <Github size={16} />
                      </a>
                    </div>
                    <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-accent text-background'
                  : 'glass-effect text-text-muted hover:text-accent border border-accent/20'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass-effect rounded-xl overflow-hidden hover:bg-accent/5 transition-all duration-300 group"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                    project.category === 'web' ? 'bg-accent/20 text-accent' :
                    project.category === 'security' ? 'bg-primary-500/20 text-primary-500' :
                    project.category === 'ai' ? 'bg-accent/20 text-accent' :
                    'bg-accent/20 text-accent'
                  }`}>
                    {project.category === 'web' ? <Globe className="w-3 h-3" /> :
                     project.category === 'security' ? <Shield className="w-3 h-3" /> :
                     project.category === 'ai' ? <Brain className="w-3 h-3" /> :
                     <Smartphone className="w-3 h-3" />}
                    {project.category.toUpperCase()}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent">
                      FEATURED
                    </span>
                  )}
                </div>
                
                <h4 className="text-lg font-bold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h4>
                
                <p className="text-text-muted text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent hover:text-accent-dark transition-colors duration-200 text-sm"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-text-muted hover:text-text transition-colors duration-200 text-sm"
                  >
                    <Code size={14} />
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/Pruthvi-123-prog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 glass-effect border border-accent/30 text-accent font-semibold rounded-lg hover:bg-accent/5 transition-all duration-300"
          >
            <Github size={18} />
            View All Projects on GitHub
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
