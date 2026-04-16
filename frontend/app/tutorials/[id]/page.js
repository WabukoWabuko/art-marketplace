'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function TutorialDetailPage() {
  const params = useParams()
  const [tutorial, setTutorial] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/tutorials/${params.id}/`)
        if (response.ok) {
          const data = await response.json()
          setTutorial(data)
        } else {
          console.error('Failed to fetch tutorial')
        }
      } catch (error) {
        console.error('Error fetching tutorial:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchTutorial()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutorial Not Found</h1>
          <p className="text-gray-600 mb-8">The tutorial you're looking for doesn't exist.</p>
          <Link
            href="/tutorials"
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            Back to Tutorials
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-teal-600 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{tutorial.title}</h1>
            <p className="text-xl text-green-100">{tutorial.description}</p>
          </div>
        </div>
      </section>

      {/* Tutorial Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Tutorial Image */}
              <div className="lg:col-span-1">
                <div className="relative h-64 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl overflow-hidden">
                  <img
                    src={tutorial.image || "/placeholder.jpg"}
                    alt={tutorial.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-green-900/80 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {tutorial.category || 'Tutorial'}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white text-green-600 px-4 py-2 rounded-full text-sm font-bold">
                    {tutorial.difficulty || 'Beginner'}
                  </div>
                </div>

                {/* Tutorial Meta */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                    <span className="font-semibold">Duration:</span>
                    <span className="ml-2">{tutorial.duration || '2 hours'}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="font-semibold">Difficulty:</span>
                    <span className="ml-2">{tutorial.difficulty || 'Beginner'}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 7H9v6h4V7z"></path>
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm0 5a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd"></path>
                    </svg>
                    <span className="font-semibold">Views:</span>
                    <span className="ml-2">{Math.floor(Math.random() * 5000) + 1000}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Start Tutorial
                  </button>
                  <button className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                    Save for Later
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Share Tutorial
                  </button>
                </div>
              </div>

              {/* Tutorial Details */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Tutorial Overview</h2>

                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {tutorial.content || tutorial.description}
                  </p>
                </div>

                {/* What You'll Learn */}
                <div className="bg-green-50 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700">Fundamental techniques and concepts</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700">Step-by-step guidance with examples</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700">Tips and tricks from experienced artists</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700">Practice exercises to reinforce learning</span>
                    </li>
                  </ul>
                </div>

                {/* Materials Needed */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Materials Needed</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">Basic art supplies</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">Sketchbook or paper</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">Pencils and erasers</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">Reference materials</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tutorials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mock related tutorials */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="relative h-48 bg-gradient-to-br from-green-400 to-teal-500">
                    <img src="/placeholder.jpg" alt="Related Tutorial" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Techniques Tutorial</h3>
                    <p className="text-gray-600 mb-4">Learn advanced methods to enhance your artwork.</p>
                    <Link href="#" className="text-green-600 font-semibold hover:text-green-700">
                      View Tutorial →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Tutorials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <Link
            href="/tutorials"
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-colors"
          >
            ← Back to All Tutorials
          </Link>
        </div>
      </section>
    </div>
  )
}