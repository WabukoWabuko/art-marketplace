export default function Profile({ params }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <img src="/placeholder-avatar.jpg" alt="Profile" className="w-20 h-20 rounded-full mr-6" />
            <div>
              <h1 className="text-3xl font-bold">{params.username}</h1>
              <p className="text-gray-600">Artist</p>
            </div>
          </div>
          <p className="text-gray-700">Bio and description...</p>
        </div>
        <h2 className="text-2xl font-bold mb-6">Artworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="/placeholder.jpg" alt="Artwork" className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold">Artwork Title</h3>
          </div>
        </div>
      </div>
    </main>
  )
}