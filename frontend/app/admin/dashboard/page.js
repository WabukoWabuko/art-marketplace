'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../../../lib/api'
import { useToast } from '../../../components/Toast'

const BACKEND_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '')

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalStaff: 0,
    totalArtworks: 0,
    totalOrders: 0,
    totalReviews: 0,
  })
  const [latestUsers, setLatestUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { showError } = useToast()

  const fetchUserProfile = useCallback(async () => {
    try {
      const userData = await api.getCurrentUser()
      setUser(userData)

      if (!userData.is_staff && !userData.is_superuser) {
        router.push('/')
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
      })
    } catch (error) {
      console.error('Error fetching admin stats:', error)
      showError(error.message || 'Unable to load admin stats')
    }
  }, [showError])

  const fetchLatestUsers = useCallback(async () => {
    try {
      const users = await api.getAdminUsers()
      setLatestUsers(users.slice(0, 5))
    } catch (error) {
      console.error('Error fetching latest users:', error)
      showError(error.message || 'Unable to load user list')
    }
  }, [showError])

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/login')
      return
    }

    Promise.all([fetchUserProfile(), fetchStats(), fetchLatestUsers()])
      .finally(() => setLoading(false))
  }, [fetchUserProfile, fetchStats, fetchLatestUsers, router])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#082c30,_#051f45)] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
          <p className="mt-4 text-lg">Loading UrbanKreative admin console…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#082c30,_#051f45)] text-white pb-12">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Vision 2030</p>
              <h1 className="mt-3 text-4xl font-bold text-white">UrbanKreative Admin Control</h1>
              <p className="mt-3 max-w-3xl text-slate-300">Powerful system control built for Kenyan growth. Manage users, artists, marketplace flows and admin settings from a single executive console.</p>
            </div>
            <button onClick={handleLogout} className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.75fr_1fr] mb-8">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-[1.5rem] bg-slate-950/80 p-6">
                <p className="text-sm text-slate-400">Total Users</p>
                <p className="mt-4 text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-950/80 p-6">
                <p className="text-sm text-slate-400">Artist Profiles</p>
                <p className="mt-4 text-3xl font-bold text-white">{stats.totalArtists.toLocaleString()}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-950/80 p-6">
                <p className="text-sm text-slate-400">Order Volume</p>
                <p className="mt-4 text-3xl font-bold text-white">{stats.totalOrders.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-950/80 p-6">
                <p className="text-sm text-slate-400">Artworks in catalog</p>
                <p className="mt-4 text-3xl font-bold text-white">{stats.totalArtworks.toLocaleString()}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-950/80 p-6">
                <p className="text-sm text-slate-400">Reviews recorded</p>
                <p className="mt-4 text-3xl font-bold text-white">{stats.totalReviews.toLocaleString()}</p>
              </div>
            </div>
          </section>

          <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Admin Shortcuts</p>
              <h2 className="mt-3 text-2xl font-bold text-white">System Tasks</h2>
            </div>
            <div className="grid gap-3">
              <a href={`${BACKEND_ROOT}/admin/auth/user/`} target="_blank" rel="noreferrer" className="block rounded-3xl bg-emerald-500 px-5 py-4 text-white transition hover:bg-emerald-600">
                Manage Users
              </a>
              <a href={`${BACKEND_ROOT}/admin/artworks/artwork/`} target="_blank" rel="noreferrer" className="block rounded-3xl bg-sky-600 px-5 py-4 text-white transition hover:bg-sky-700">
                Manage Artworks
              </a>
              <a href={`${BACKEND_ROOT}/admin/orders/order/`} target="_blank" rel="noreferrer" className="block rounded-3xl bg-violet-600 px-5 py-4 text-white transition hover:bg-violet-700">
                Manage Orders
              </a>
              <a href={`${BACKEND_ROOT}/admin/`} target="_blank" rel="noreferrer" className="block rounded-3xl bg-white/10 px-5 py-4 text-white transition hover:bg-white/20">
                Open Django Admin
              </a>
            </div>
          </aside>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">User Management</p>
              <h3 className="mt-3 text-2xl font-bold text-white">Latest Registered Users</h3>
            </div>
            <p className="text-sm text-slate-400">Showing the newest accounts in the platform.</p>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/80">
            <table className="min-w-full divide-y divide-white/5 text-left text-sm text-white">
              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-6 py-4">Username</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/80">
                {latestUsers.length > 0 ? (
                  latestUsers.map((latestUser) => (
                    <tr key={latestUser.id}>
                      <td className="px-6 py-4 text-white">{latestUser.username}</td>
                      <td className="px-6 py-4 text-slate-300">{latestUser.email}</td>
                      <td className="px-6 py-4 text-slate-300">{latestUser.is_artist ? 'Artist' : 'Collector'}</td>
                      <td className="px-6 py-4 text-slate-300">{latestUser.is_staff ? 'Admin' : 'Active'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-slate-400">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
