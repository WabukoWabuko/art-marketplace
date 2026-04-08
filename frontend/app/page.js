export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ArtMarket</h1>
        <p className="text-xl text-gray-600 mb-8">Discover unique artworks from talented artists worldwide</p>
        <a href="/marketplace" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Explore Marketplace</a>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Browse Artworks</h2>
          <p className="text-gray-600">Explore a wide variety of paintings, sculptures, and digital art.</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Connect with Artists</h2>
          <p className="text-gray-600">Learn about artists and their creative processes.</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Secure Payments</h2>
          <p className="text-gray-600">Safe and easy purchasing with multiple payment options.</p>
        </div>
      </section>
    </main>
  )
}