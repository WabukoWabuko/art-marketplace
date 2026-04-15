'use client'

import { useState, useEffect } from 'react'

export default function EventCounter({ eventDate, eventTitle }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(eventDate).getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true
        })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [eventDate])

  if (timeLeft.isPast) {
    return (
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-4 text-center">
        <p className="text-red-400 font-semibold text-lg">This event has passed</p>
        <p className="text-gray-400 text-sm mt-1">{eventTitle}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4">
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-black/30 rounded p-2">
          <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
          <div className="text-xs text-blue-100 mt-1">Days</div>
        </div>
        <div className="bg-black/30 rounded p-2">
          <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
          <div className="text-xs text-blue-100 mt-1">Hours</div>
        </div>
        <div className="bg-black/30 rounded p-2">
          <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
          <div className="text-xs text-blue-100 mt-1">Minutes</div>
        </div>
        <div className="bg-black/30 rounded p-2">
          <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
          <div className="text-xs text-blue-100 mt-1">Seconds</div>
        </div>
      </div>
    </div>
  )
}
