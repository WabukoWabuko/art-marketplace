export default function ArtworkCard({ artwork }) {
  const imageSrc = artwork.image || '/placeholder.jpg'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageSrc} alt={artwork.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{artwork.title}</h3>
        <p className="text-gray-600 mb-2">By {artwork.artist_name}</p>
        <p className="text-xl font-bold text-blue-600">{artwork.currency} {artwork.price}</p>
        <a href={`/marketplace/${artwork.id}`} className="text-blue-600 hover:underline mt-2 inline-block">View Details</a>
      </div>
    </div>
  )
}