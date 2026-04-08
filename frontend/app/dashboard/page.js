export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">My Orders</h3>
          <p className="text-gray-600">View and manage your purchases</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">My Artworks</h3>
          <p className="text-gray-600">Manage your listed artworks</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
          <p className="text-gray-600">Update your profile information</p>
        </div>
      </div>
    </main>
  )
}