import { useState } from 'react'

export default function TestimonialCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((currentIndex + 1) % testimonials.length)
  const prev = () => setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 italic mb-4">"{testimonials[currentIndex].text}"</p>
        <p className="font-semibold">- {testimonials[currentIndex].author}</p>
      </div>
      <button onClick={prev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">‹</button>
      <button onClick={next} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">›</button>
    </div>
  )
}