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
    <section id="projects" className="relative py-12 sm:py-20 bg-background w-full min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative glass-effect rounded-xl overflow-hidden hover:bg-accent/5 transition-all duration-300 w-full"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-text-muted mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-200"
                      >
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-text text-sm font-medium transition-colors duration-200"
                    >
                      GitHub
                    </a>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
