export default function Events() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Art Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Sample Event</h3>
          <p className="text-gray-600 mb-2">Date: April 15, 2026</p>
          <p className="text-gray-600 mb-4">Location: Art Gallery</p>
          <p className="mb-4">Description of the event...</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Learn More</button>
        </div>
      </div>
    </main>
  )
}