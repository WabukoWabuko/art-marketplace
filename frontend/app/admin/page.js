'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../../lib/api'
import { useToast } from '../../components/Toast'

const BACKEND_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '')

export default function AdminPanel() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalStaff: 0,
    totalArtworks: 0,
    totalOrders: 0,
    totalReviews: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
  })
  const [users, setUsers] = useState([])
  const [artworks, setArtworks] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { showError, showSuccess } = useToast()

  const fetchUserProfile = useCallback(async () => {
    try {
      const userData = await api.getCurrentUser()
      setUser(userData)

      if (!userData.is_staff && !userData.is_superuser) {
        router.push('/')
        return
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      router.push('/login')
    }
  }, [router])

  const fetchStats = useCallback(async () => {
    try {
      const data = await api.getAdminStats()
      setStats({
        totalUsers: data.total_users,
        totalArtists: data.total_artists,
        totalStaff: data.total_staff,
        totalArtworks: data.total_artworks,
        totalOrders: data.total_orders,
        totalReviews: data.total_reviews,
        totalRevenue: data.total_revenue || 0,
        pendingApprovals: data.pending_approvals || 0,
      })
    } catch (error) {
      console.error('Error fetching admin stats:', error)
      showError(error.message || 'Unable to load admin stats')
    }
  }, [showError])

  const fetchUsers = useCallback(async () => {
    try {
      const usersData = await api.getAdminUsers()
      setUsers(usersData)
    } catch (error) {
      console.error('Error fetching users:', error)
      showError(error.message || 'Unable to load users')
    }
  }, [showError])

  const fetchArtworks = useCallback(async () => {
    try {
      const artworksData = await api.getArtworks({ limit: 10 })
      setArtworks(artworksData.results || artworksData)
    } catch (error) {
      console.error('Error fetching artworks:', error)
      showError(error.message || 'Unable to load artworks')
    }
  }, [showError])

  const fetchOrders = useCallback(async () => {
    try {
      const ordersData = await api.getOrders()
      setOrders(ordersData.slice(0, 10))
    } catch (error) {
      console.error('Error fetching orders:', error)
      showError(error.message || 'Unable to load orders')
    }
  }, [showError])

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/login')
      return
    }

    Promise.all([fetchUserProfile(), fetchStats(), fetchUsers(), fetchArtworks(), fetchOrders()])
      .finally(() => setLoading(false))
  }, [fetchUserProfile, fetchStats, fetchUsers, fetchArtworks, fetchOrders, router])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'artworks', label: 'Artworks', icon: '🎨' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-xl text-white">Loading UrbanKreative Admin Panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">UrbanKreative</h1>
                <p className="text-xs text-slate-400">Admin Control Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-300">Welcome, {user?.first_name || user?.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <a
                  href={`${BACKEND_ROOT}/admin/`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-center"
                >
                  Django Admin
                </a>
                <button className="w-full px-3 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                  Export Data
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-300">Total Users</p>
                        <p className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">👥</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-emerald-300">Total Revenue</p>
                        <p className="text-3xl font-bold text-white">KES {(stats.totalRevenue * 100).toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">💰</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-300">Artworks</p>
                        <p className="text-3xl font-bold text-white">{stats.totalArtworks.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🎨</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-amber-300">Pending Approvals</p>
                        <p className="text-3xl font-bold text-white">{stats.pendingApprovals.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">⏳</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <span className="text-green-400">✓</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">New user registered</p>
                        <p className="text-slate-400 text-sm">John Doe joined the platform</p>
                      </div>
                      <span className="text-slate-400 text-sm">2 hours ago</span>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400">🎨</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Artwork uploaded</p>
                        <p className="text-slate-400 text-sm">New piece by Sarah Johnson</p>
                      </div>
                      <span className="text-slate-400 text-sm">4 hours ago</span>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="text-purple-400">📦</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Order completed</p>
                        <p className="text-slate-400 text-sm">Order #1234 processed successfully</p>
                      </div>
                      <span className="text-slate-400 text-sm">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">User Management</h2>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                    Add User
                  </button>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-800/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {users.slice(0, 10).map((user) => (
                        <tr key={user.id} className="hover:bg-white/5">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                {user.first_name?.[0] || user.username?.[0] || 'U'}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">{user.first_name} {user.last_name}</div>
                                <div className="text-sm text-slate-400">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              user.is_artist ? 'bg-purple-500/20 text-purple-300' :
                              user.is_staff ? 'bg-emerald-500/20 text-emerald-300' :
                              'bg-slate-500/20 text-slate-300'
                            }`}>
                              {user.is_artist ? 'Artist' : user.is_staff ? 'Admin' : 'Collector'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              user.is_active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                            }`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                            {new Date(user.date_joined).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                            <button className="text-red-400 hover:text-red-300">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'artworks' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Artwork Management</h2>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                    Add Artwork
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artworks.map((artwork) => (
                    <div key={artwork.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                      <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <span className="text-4xl">🎨</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-white mb-1">{artwork.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">by {artwork.artist?.username || 'Unknown'}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-400 font-medium">KES {artwork.price}</span>
                          <div className="flex space-x-2">
                            <button className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded">Edit</button>
                            <button className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Order Management</h2>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-800/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/5">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{order.buyer?.username || 'Unknown'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">KES {order.total_amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              order.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                            <button className="text-emerald-400 hover:text-emerald-300">Update</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Revenue Trends</h3>
                    <div className="h-64 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-slate-400">Chart will be implemented</span>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
                    <div className="h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-slate-400">Chart will be implemented</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
