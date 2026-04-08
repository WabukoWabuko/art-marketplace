import { useState } from 'react'

export default function WishlistButton({ artworkId, isWishlisted, onToggle }) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await onToggle(artworkId)
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-2 rounded ${isWishlisted ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'} hover:opacity-80 disabled:opacity-50`}
    >
      {loading ? '...' : (isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist')}
    </button>
  )
}