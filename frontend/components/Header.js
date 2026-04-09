'use client'

import CurrencySelector from './CurrencySelector'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            ArtMarket
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <a href="/" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </a>
            </li>
            <li>
              <a href="/marketplace" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Marketplace
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </a>
            </li>
            <li>
              <a href="/events" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Events
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </a>
            </li>
            <li>
              <a href="/tutorials" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Tutorials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </a>
            </li>
            <li>
              <a href="/dashboard" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </a>
            </li>
            <li className="ml-4">
              <CurrencySelector />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}