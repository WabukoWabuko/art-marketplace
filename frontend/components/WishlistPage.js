import ArtworkCard from './ArtworkCard'

export default function WishlistPage({ wishlist }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </main>
  )
}