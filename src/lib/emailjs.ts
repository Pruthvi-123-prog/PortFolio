// EmailJS Configuration
// Get these values from your EmailJS dashboard: https://dashboard.emailjs.com/

export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
  OTP_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID || 'template_otp_verify',
  CONTACT_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || 'template_contact_msg',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key',
}

// Debug logging for development
if (typeof window !== 'undefined') {
  console.log('EmailJS Config Debug:', {
    SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
    CONTACT_TEMPLATE_ID: EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
    OTP_TEMPLATE_ID: EMAILJS_CONFIG.OTP_TEMPLATE_ID,
    PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY ? 'Set' : 'Missing'
  })
}

// OTP email template parameters
export interface OTPTemplateParams extends Record<string, unknown> {
  user_name: string
  otp_code: string
  to_email: string
  email: string
  user_email: string
  reply_to: string
  from_email: string
}

// Contact message email template parameters
export interface ContactTemplateParams extends Record<string, unknown> {
  sender_name: string
  sender_email: string
  message_subject: string
  message_content: string
  current_date: string
  email: string
  to_email: string
  user_email: string
  reply_to: string
  from_email: string
}
