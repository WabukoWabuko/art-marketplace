export default function ReviewList({ reviews }) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">{review.user_name}</span>
            <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-gray-500 text-sm mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )
}