export default function Tutorials() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Art Tutorials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Sample Tutorial</h3>
          <p className="text-gray-600 mb-4">Learn basic painting techniques</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Watch Now</button>
        </div>
      </div>
    </main>
  )
}