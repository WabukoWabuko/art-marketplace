export default function ArtistProfileCard({ artist }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img src={artist.profile_picture || '/placeholder-avatar.jpg'} alt={artist.username} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h3 className="text-xl font-semibold">{artist.username}</h3>
          <p className="text-gray-600">{artist.location}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{artist.bio}</p>
      <a href={`/profiles/${artist.username}`} className="text-blue-600 hover:underline">View Profile</a>
    </div>
  )
}