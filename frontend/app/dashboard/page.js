'use client'

import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { api } from '../../lib/api'
import DynamicBackground from '../../components/DynamicBackground'
import { CurrencyContext } from '../../lib/currencyContext'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { currency, convertPrice, currencySymbols } = useContext(CurrencyContext)

  const roleLabel = user?.is_artist ? 'Artist' : 'Buyer'

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [ordersData, userData] = await Promise.all([
          api.getOrders().catch(() => []),
          api.getCurrentUser().catch(() => null)
        ])
        const normalizedOrders = Array.isArray(ordersData)
          ? ordersData
          : Array.isArray(ordersData?.results)
          ? ordersData.results
          : []
        setOrders(normalizedOrders)
        setUser(userData)
      } catch (e) {
        setError(e.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <DynamicBackground>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </DynamicBackground>
    )
  }

  return (
    <DynamicBackground>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back{user?.first_name ? `, ${user.first_name}` : ''}!
            </h1>
            <p className="text-slate-300">Manage your art collection and orders</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg mb-6">
              Error: {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-xl">
              <h3 className="text-2xl font-semibold text-white mb-4">My Orders</h3>
              {orders.length === 0 ? (
                <p className="text-slate-300">No orders yet. Start exploring our marketplace!</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="font-semibold text-white">Order #{order.id}</p>
                      <p className="text-slate-300">{order.artwork_title} — {currencySymbols[currency] || currency} {convertPrice ? convertPrice(order.total_price, 'USD', currency) : order.total_price}</p>
                      <p className="text-sm text-slate-400">Status: {order.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-xl">
              <h3 className="text-2xl font-semibold text-white mb-4">My Artworks</h3>
              <p className="text-slate-300 mb-4">
                {user?.is_artist
                  ? "Publish artworks and track your inventory from the artist dashboard."
                  : "Browse and collect amazing artworks from talented artists."
                }
              </p>
              <div className="space-y-3">
                <Link
                  href="/marketplace"
                  className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-transform text-center"
                >
                  Explore Marketplace
                </Link>
                {user?.is_artist && (
                  <Link
                    href="/dashboard/artworks"
                    className="block w-full bg-white/20 text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/30 transition-colors text-center"
                  >
                    Manage My Artworks
                  </Link>
                )}
                {user?.is_staff || user?.is_superuser ? (
                  <Link
                    href="/admin/dashboard"
                    className="block w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center"
                  >
                    Admin Control Panel
                  </Link>
                ) : null}
              </div>
              <p className="mt-4 text-sm text-slate-400">Role: {roleLabel}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 mt-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/marketplace" className="block rounded-xl border border-white/10 bg-blue-600 px-4 py-4 text-center text-white font-semibold hover:bg-blue-700 transition-colors">
              Browse Marketplace
            </Link>
            {user?.is_artist ? (
              <Link href="/dashboard/artworks" className="block rounded-xl border border-white/10 bg-purple-600 px-4 py-4 text-center text-white font-semibold hover:bg-purple-700 transition-colors">
                Manage My Artworks
              </Link>
            ) : (
              <Link href="/wishlist" className="block rounded-xl border border-white/10 bg-indigo-600 px-4 py-4 text-center text-white font-semibold hover:bg-indigo-700 transition-colors">
                View Wishlist
              </Link>
            )}
            <Link href="/orders" className="block rounded-xl border border-white/10 bg-slate-900 px-4 py-4 text-center text-white font-semibold hover:bg-slate-800 transition-colors">
              Review My Orders
            </Link>
            {(user?.is_staff || user?.is_superuser) && (
              <Link href="/admin/dashboard" className="block rounded-xl border border-white/10 bg-green-600 px-4 py-4 text-center text-white font-semibold hover:bg-green-700 transition-colors">
                Open Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </DynamicBackground>
  )
}
