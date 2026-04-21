'use client'

import { useState } from 'react'

export default function ReviewList({ reviews }) {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayedReviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">{review.user_name}</span>
            <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-gray-500 text-sm mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
        </div>
      ))}
      
      {reviews.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            {showAll ? 'Show Less Reviews' : `Show All Reviews (${reviews.length})`}
          </button>
        </div>
      )}
    </div>
  )
}