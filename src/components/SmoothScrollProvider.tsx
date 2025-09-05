'use client'

import { useEffect, ReactNode } from 'react'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Add this to ensure scroll behavior works consistently
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Ensure sections are visible
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.visibility = 'visible';
      section.style.display = 'block';
    });
  }, [])

  return <>{children}</>
}
