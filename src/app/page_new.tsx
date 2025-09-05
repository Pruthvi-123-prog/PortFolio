'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen w-full bg-background">
        {/* Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation />
        </div>

        {/* Main Content */}
        <motion.div
          className="relative w-full pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <section id="home" className="relative z-10 min-h-screen">
            <HeroSection />
          </section>
          
          {/* About Section */}
          <section id="about" className="relative z-10 min-h-screen">
            <AboutSection />
          </section>
          
          {/* Skills Section */}
          <section id="skills" className="relative z-10 min-h-screen">
            <SkillsSection />
          </section>
          
          {/* Projects Section */}
          <section id="projects" className="relative z-10 min-h-screen">
            <ProjectsSection />
          </section>
          
          {/* Experience Section */}
          <section id="experience" className="relative z-10 min-h-screen">
            <ExperienceSection />
          </section>
          
          {/* Contact Section */}
          <section id="contact" className="relative z-10 min-h-screen">
            <ContactSection />
          </section>
          
          {/* Footer */}
          <footer className="relative z-10">
            <Footer />
          </footer>
        </motion.div>
      </div>
    </SmoothScrollProvider>
  )
}
