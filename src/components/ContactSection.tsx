'use client'

import { useState, useRef, useEffect } from 'react'
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
import { EMAILJS_CONFIG, ContactTemplateParams, OTPTemplateParams } from '@/lib/emailjs'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'
type OTPStatus = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'error'

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
  
  // OTP related state
  const [otpStatus, setOtpStatus] = useState<OTPStatus>('idle')
  const [otpCode, setOtpCode] = useState('')
  const [generatedOTP, setGeneratedOTP] = useState('')
  const [otpError, setOtpError] = useState('')
  const [showOTPSection, setShowOTPSection] = useState(false)

  // Initialize EmailJS on component mount
  useEffect(() => {
    // Validate environment variables
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
      console.error('EmailJS public key not configured properly')
      return
    }
    
    if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'your_service_id') {
      console.error('EmailJS service ID not configured properly')
      return
    }
    
    if (!EMAILJS_CONFIG.CONTACT_TEMPLATE_ID || EMAILJS_CONFIG.CONTACT_TEMPLATE_ID === 'template_contact_msg') {
      console.error('EmailJS contact template ID not configured properly')
      return
    }

    if (!EMAILJS_CONFIG.OTP_TEMPLATE_ID || EMAILJS_CONFIG.OTP_TEMPLATE_ID === 'template_otp_verify') {
      console.error('EmailJS OTP template ID not configured properly')
      return
    }

    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
      console.log('EmailJS initialized successfully with OTP support')
      console.log('Config check:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        otpTemplateId: EMAILJS_CONFIG.OTP_TEMPLATE_ID,
        contactTemplateId: EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 8) + '...'
      })
    } catch (error) {
      console.error('EmailJS initialization failed:', error)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Generate 6-digit OTP
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // Send OTP to user's email
  const sendOTP = async () => {
    if (!formData.email.trim()) {
      setOtpError('Please enter your email address first')
      return
    }

    setOtpStatus('sending')
    setOtpError('')

    try {
      const otp = generateOTP()
      setGeneratedOTP(otp)

      const otpParams: OTPTemplateParams = {
        user_name: formData.name.trim() || 'User',
        otp_code: otp,
        to_email: formData.email.trim(),
        email: formData.email.trim(),
        user_email: formData.email.trim(),
        reply_to: formData.email.trim(),
        from_email: formData.email.trim()
      }

      console.log('Sending OTP with params:', otpParams)
      console.log('Using config:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.OTP_TEMPLATE_ID,
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? 'Set' : 'Missing'
      })

      // Try sending OTP using the contact template as fallback for testing
      const templateToUse = EMAILJS_CONFIG.OTP_TEMPLATE_ID
      console.log('Attempting to send with template:', templateToUse)

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        templateToUse,
        otpParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      console.log('OTP send result:', result)
      setOtpStatus('sent')
      setShowOTPSection(true)
      console.log('OTP sent successfully')
    } catch (error) {
      console.error('OTP sending error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      setOtpStatus('error')
      
      let errorMsg = 'Failed to send OTP. Please try again.'
      if (error instanceof Error) {
        errorMsg = `OTP Error: ${error.message}`
      } else if (typeof error === 'object' && error !== null) {
        const errorObj = error as { text?: string; message?: string; status?: number }
        if (errorObj.text) {
          errorMsg = `EmailJS Error: ${errorObj.text}`
        } else if (errorObj.message) {
          errorMsg = `Error: ${errorObj.message}`
        } else if (errorObj.status) {
          errorMsg = `Service error (${errorObj.status}). Please check your email configuration.`
        }
      }
      
      setOtpError(errorMsg)
    }
  }

  // Verify OTP
  const verifyOTP = () => {
    if (otpCode.trim() === generatedOTP) {
      setOtpStatus('verified')
      setOtpError('')
      return true
    } else {
      setOtpError('Invalid OTP. Please try again.')
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if OTP is verified
    if (otpStatus !== 'verified') {
      setErrorMessage('Please verify your email with OTP first')
      return
    }

    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields')
      }

      // Validate environment configuration
      if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
        throw new Error('Email service not configured properly. Please contact me directly.')
      }

      // Prepare template parameters for EmailJS
      const templateParams: ContactTemplateParams = {
        sender_name: formData.name.trim(),
        sender_email: formData.email.trim(),
        message_subject: formData.subject.trim() || 'Contact Form Message',
        message_content: formData.message.trim(),
        current_date: new Date().toLocaleString(),
        // Contact message should go to the portfolio owner (you)
        email: 'pruthvis2004@gmail.com', // Your email where you want to receive messages
        to_email: 'pruthvis2004@gmail.com',
        user_email: 'pruthvis2004@gmail.com',
        reply_to: formData.email.trim(), // User's email for reply
        from_email: formData.email.trim()
      }

      console.log('Sending email with parameters:', templateParams)

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      console.log('Email sent successfully:', result)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset OTP state
      setOtpStatus('idle')
      setOtpCode('')
      setGeneratedOTP('')
      setShowOTPSection(false)
      setOtpError('')
    } catch (error) {
      console.error('Email sending error:', error)
      setSubmitStatus('error')
      
      // Better error handling
      let errorMsg = 'Failed to send message. Please try again or contact me directly.'
      if (error instanceof Error) {
        errorMsg = error.message
      } else if (typeof error === 'object' && error !== null) {
        const errorObj = error as { text?: string; message?: string; status?: number }
        if (errorObj.text) {
          errorMsg = `EmailJS Error: ${errorObj.text}`
        } else if (errorObj.message) {
          errorMsg = errorObj.message
        } else if (errorObj.status) {
          errorMsg = `Email service error (${errorObj.status}). Please try again.`
        }
      }
      
      setErrorMessage(errorMsg)
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
    <section id="contact" className="py-12 sm:py-20 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto px-4">
              Have a project in mind or want to collaborate? I&apos;d love to hear from you. 
              Let&apos;s create something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
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
              className="glass-effect p-4 sm:p-6 lg:p-8 rounded-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-neutral-700 rounded-lg text-text placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-sm sm:text-base"
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-neutral-700 rounded-lg text-text placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Email Verification Section */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base sm:text-lg font-semibold text-text">Email Verification</h4>
                    {otpStatus === 'verified' && (
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle size={16} />
                        Verified
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={sendOTP}
                      disabled={otpStatus === 'sending' || otpStatus === 'verified' || !formData.email.trim()}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                        otpStatus === 'verified'
                          ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                          : otpStatus === 'sending'
                          ? 'bg-accent/70 text-background cursor-not-allowed'
                          : !formData.email.trim()
                          ? 'bg-neutral-700 text-text-muted cursor-not-allowed'
                          : 'bg-accent text-background hover:bg-accent-dark'
                      }`}
                    >
                      {otpStatus === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="hidden sm:inline">Sending OTP...</span>
                          <span className="sm:hidden">Sending...</span>
                        </>
                      ) : otpStatus === 'verified' ? (
                        <>
                          <span className="hidden sm:inline">Email Verified</span>
                          <span className="sm:hidden">Verified</span>
                        </>
                      ) : (
                        'Send OTP'
                      )}
                    </button>

                    {(otpStatus === 'sent' || showOTPSection) && (
                      <div className="flex gap-2 flex-1">
                        <input
                          type="text"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          className="flex-1 px-3 sm:px-4 py-2 bg-background border border-neutral-700 rounded-lg text-text placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-sm sm:text-base"
                        />
                        
                        {otpStatus !== 'verified' && (
                          <button
                            type="button"
                            onClick={verifyOTP}
                            disabled={otpCode.length !== 6}
                            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                              otpCode.length !== 6
                                ? 'bg-neutral-700 text-text-muted cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {otpError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} />
                      {otpError}
                    </div>
                  )}

                  {otpStatus === 'sent' && !otpError && (
                    <div className="text-accent text-sm">
                      OTP sent to {formData.email}. Please check your email and enter the 6-digit code.
                    </div>
                  )}
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-neutral-700 rounded-lg text-text placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-sm sm:text-base"
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
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-neutral-700 rounded-lg text-text placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 resize-none text-sm sm:text-base sm:rows-6"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={submitStatus === 'loading' || otpStatus !== 'verified'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 sm:py-3 px-4 sm:px-6 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                    submitStatus === 'loading'
                      ? 'bg-accent/70 text-background cursor-not-allowed'
                      : otpStatus !== 'verified'
                      ? 'bg-neutral-700 text-text-muted cursor-not-allowed'
                      : 'bg-accent text-background hover:bg-accent-dark'
                  }`}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                      <span className="hidden sm:inline">Sending...</span>
                      <span className="sm:hidden">Sending...</span>
                    </>
                  ) : otpStatus !== 'verified' ? (
                    <>
                      <Send size={16} className="sm:size-[18px]" />
                      <span className="hidden sm:inline">Verify Email First</span>
                      <span className="sm:hidden">Verify Email</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} className="sm:size-[18px]" />
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
