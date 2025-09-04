'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, ContactTemplateParams } from '@/lib/emailjs'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      // Prepare template parameters for EmailJS
      const templateParams: ContactTemplateParams = {
        sender_name: formData.name,
        sender_email: formData.email,
        message_subject: formData.subject,
        message_content: formData.message,
        current_date: new Date().toLocaleDateString(),
        email: formData.email,
        to_email: formData.email,
        user_email: formData.email,
        reply_to: formData.email,
        from_email: formData.email
      }

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Email sending error:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to send message. Please try again or contact me directly.')
    }
  }

  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:pruthvis2004@gmail.com',
      icon: Mail,
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/PruthviSuvarna',
      icon: Github,
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/pruthvisuvarna',
      icon: Linkedin,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/pruthvisuvarna',
      icon: Twitter,
      color: 'hover:text-blue-400'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I&apos;d love to hear from you. 
              Let&apos;s create something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-text mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-text font-medium">Email</p>
                      <a 
                        href="mailto:pruthvis2004@gmail.com"
                        className="text-text-muted hover:text-accent transition-colors duration-300"
                      >
                        pruthvis2004@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-text font-medium">Phone</p>
                      <a 
                        href="tel:+919148950026"
                        className="text-text-muted hover:text-accent transition-colors duration-300"
                      >
                        +91 91489 50026
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-text font-medium">Location</p>
                      <p className="text-text-muted">Mangalore, Karnataka, India</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-xl font-semibold text-text mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className={`w-12 h-12 glass-effect rounded-lg flex items-center justify-center text-text-muted transition-all duration-300 hover:bg-accent/10 ${social.color}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="pt-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-effect p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-accent">24h</div>
                    <div className="text-sm text-text-muted">Response Time</div>
                  </div>
                  <div className="glass-effect p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-accent">100%</div>
                    <div className="text-sm text-text-muted">Commitment</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-effect p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-text mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-neutral-700 rounded-lg text-text placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-neutral-700 rounded-lg text-text placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-neutral-700 rounded-lg text-text placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-neutral-700 rounded-lg text-text placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    submitStatus === 'loading'
                      ? 'bg-accent/70 text-background cursor-not-allowed'
                      : 'bg-accent text-background hover:bg-accent-dark'
                  }`}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-accent text-sm"
                  >
                    <CheckCircle size={16} />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle size={16} />
                    {errorMessage || 'Something went wrong. Please try again or contact me directly.'}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
