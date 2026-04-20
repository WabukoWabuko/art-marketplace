'use client'

import { useState, useEffect } from 'react'

const artBackgrounds = [
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop'
]

export default function DynamicBackground({ children, className = '' }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % artBackgrounds.length)
      setNextImageIndex((prev) => (prev + 2) % artBackgrounds.length)
    }, 8000) // Change every 8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Background Images */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ease-in-out"
          style={{
            backgroundImage: `url(${artBackgrounds[currentImageIndex]})`,
            opacity: 1
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ease-in-out"
          style={{
            backgroundImage: `url(${artBackgrounds[nextImageIndex]})`,
            opacity: 0
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}