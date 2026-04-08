export default function Marketplace() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Art Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Placeholder for artworks */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src="/placeholder.jpg" alt="Artwork" className="w-full h-48 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">Sample Artwork</h3>
          <p className="text-gray-600">$100</p>
          <a href="/marketplace/1" className="text-blue-600 hover:underline">View Details</a>
        </div>
      </div>
    </main>
  )
}