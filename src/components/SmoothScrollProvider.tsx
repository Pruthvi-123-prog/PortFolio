'use client'

import { useEffect, ReactNode } from 'react'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // We'll implement smooth scrolling later with CSS scroll-behavior: smooth
    // For now, just return the children
  }, [])

  return <div>{children}</div>
}
