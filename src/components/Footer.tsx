'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Pruthvi-123-prog', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/pruthvi-suvarna-k-m', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:pruthvis2004@gmail.com', label: 'Email' },
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-surface-dark border-t border-neutral-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gradient mb-4">PRUTHVI SUVARNA K M</h3>
                <p className="text-text-muted mb-6 max-w-md leading-relaxed">
                  Computer Science Engineering student passionate about creating secure, 
                  scalable digital solutions. Specializing in full-stack development 
                  and cybersecurity.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-300"
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-text mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-text-muted hover:text-accent transition-colors duration-200 block py-1"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-text mb-4">Contact</h4>
                <div className="space-y-3 text-text-muted">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <span>pruthvis2004@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>+91 8762758490</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>Thirthahalli, Karnataka, India</span>
                  </div>
                  <p className="text-accent font-semibold mt-4">
                    Available for opportunities
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-text-muted text-sm"
            >
              <span>© {currentYear} Pruthvi Suvarna K M. Made with</span>
              <Heart className="w-4 h-4 text-accent animate-pulse" />
              <span>and dedication</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span className="text-text-muted text-sm">
                Built with Next.js, TypeScript & Framer Motion
              </span>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-300 group"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
      </div>
    </footer>
  )
}
