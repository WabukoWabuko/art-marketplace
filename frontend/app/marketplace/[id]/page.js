export default function ArtworkDetail({ params }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src="/placeholder.jpg" alt="Artwork" className="w-full rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Artwork Title</h1>
          <p className="text-gray-600 mb-4">By Artist Name</p>
          <p className="text-2xl font-semibold mb-4">$100</p>
          <p className="mb-6">Description of the artwork...</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>
    </main>
  )
}