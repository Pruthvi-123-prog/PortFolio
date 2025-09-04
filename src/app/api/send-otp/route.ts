import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

// In-memory storage for OTPs (in production, use Redis or database)
const otpStorage = new Map<string, { otp: string; expires: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || 
        process.env.EMAIL_USER === 'your-email@gmail.com' || 
        process.env.EMAIL_PASS === 'your-16-character-app-password') {
      console.error('Email credentials not configured properly')
      return NextResponse.json({ 
        error: 'Email service not configured. Please contact the administrator.' 
      }, { status: 500 })
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString()
    
    // Store OTP with 5-minute expiration
    otpStorage.set(email, {
      otp,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    })

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    })

    // Email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Portfolio Contact Form - Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #3b82f6; margin: 0;">Portfolio Contact Verification</h1>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; border-radius: 10px; border-left: 4px solid #3b82f6;">
            <h2 style="color: #1e293b; margin-top: 0;">Email Verification Required</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              To verify your email address and send your message to Pruthvi Suvarna, please use the following verification code:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #3b82f6; color: white; font-size: 32px; font-weight: bold; padding: 20px; border-radius: 8px; letter-spacing: 4px; display: inline-block;">
                ${otp}
              </div>
            </div>
            
            <p style="color: #ef4444; font-size: 14px; text-align: center;">
              ⚠️ This code will expire in 5 minutes
            </p>
            
            <p style="color: #475569; font-size: 14px; margin-top: 30px;">
              If you didn't request this verification, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 12px;">
            <p>This is an automated message from Pruthvi Suvarna's Portfolio</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully',
      expiresIn: 300 // 5 minutes
    })

  } catch (error) {
    console.error('Error sending OTP:', error)
    
    // Check if it's an authentication error
    if (error instanceof Error && error.message.includes('Invalid login')) {
      return NextResponse.json({ 
        error: 'Email authentication failed. Please check email configuration.' 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to send OTP. Please try again or contact support.' 
    }, { status: 500 })
  }
}

// Clean up expired OTPs periodically
setInterval(() => {
  const now = Date.now()
  for (const [email, data] of otpStorage.entries()) {
    if (data.expires < now) {
      otpStorage.delete(email)
    }
  }
}, 60000) // Clean up every minute
