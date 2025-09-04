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
    // Prevent flash of unstyled content
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <SmoothScrollProvider>
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Navigation */}
        <Navigation />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Skills Section */}
        <SkillsSection />
        
        {/* Projects Section */}
        <ProjectsSection />
        
        {/* Experience Section */}
        <ExperienceSection />
        
        {/* Contact Section */}
        <ContactSection />
        
        {/* Footer */}
        <Footer />
      </motion.div>
    </SmoothScrollProvider>
  )
}
