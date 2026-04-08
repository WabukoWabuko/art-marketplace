import { useState } from 'react'

export default function ReviewForm({ artworkId, onSubmit }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ rating, comment })
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Rating</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)} className="border rounded px-3 py-2 w-full">
          {[1,2,3,4,5].map(num => <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded px-3 py-2 w-full h-24"
          placeholder="Write your review..."
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Review</button>
    </form>
  )
}