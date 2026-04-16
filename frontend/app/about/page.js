'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">About ArtMarket</h1>
          <p className="text-xl text-blue-100">Connecting artists and collectors worldwide</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              ArtMarket is a premier digital platform dedicated to celebrating and promoting contemporary art in all its forms. Founded in 2024, we believe that art has the power to inspire, transform, and connect people across the globe. Our mission is to bridge the gap between talented artists and passionate collectors, making fine art accessible to everyone.
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-12">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-3">For Artists</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Global marketplace for your creations</li>
                  <li>✓ Build your artist profile and portfolio</li>
                  <li>✓ Direct connection with collectors</li>
                  <li>✓ Secure payment processing</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-3">For Collectors</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Curated selection of original artworks</li>
                  <li>✓ Direct support for emerging artists</li>
                  <li>✓ Build your personal art collection</li>
                  <li>✓ Secure transactions and authentication</li>
                </ul>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-12">Our Values</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Authenticity</h3>
                <p>We maintain strict quality standards to ensure every artwork is genuine and meets our community standards.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Accessibility</h3>
                <p>Art should be accessible to everyone. We strive to make fine art available at various price points for all collectors.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Community</h3>
                <p>We foster a supportive community where artists and collectors can connect, collaborate, and celebrate art together.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Innovation</h3>
                <p>We continuously expand our platform to include new art forms, digital exhibitions, and immersive experiences.</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-12">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">5000+</div>
                <p className="text-gray-600 mt-2">Artworks</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">2300+</div>
                <p className="text-gray-600 mt-2">Artists</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600">18K+</div>
                <p className="text-gray-600 mt-2">Collectors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">$2.5M+</div>
                <p className="text-gray-600 mt-2">Sales</p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
            <p className="text-xl mb-8">Be part of a global art movement</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?type=artist" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
                Become an Artist
              </Link>
              <Link href="/register?type=buyer" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors">
                Start Collecting
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
