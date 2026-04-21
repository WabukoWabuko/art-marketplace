'use client'

// updated

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { api } from '../../lib/api'
import DynamicBackground from '../../components/DynamicBackground'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const ordersData = await api.getOrders()
      const normalizedOrders = Array.isArray(ordersData)
        ? ordersData
        : Array.isArray(ordersData?.results)
        ? ordersData.results
        : []
      setOrders(normalizedOrders)
    } catch (error) {
      setError('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'processing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'shipped':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'delivered':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

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
            <h1 className="text-4xl font-bold text-white mb-2">My Orders</h1>
            <p className="text-slate-300">Track your art purchases and order history</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-12 text-center shadow-xl">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-semibold text-white mb-4">No Orders Yet</h3>
              <p className="text-slate-300 mb-6">You haven&apos;t placed any orders yet. Start exploring our marketplace!</p>
              <Link
                href="/marketplace"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Browse Artworks
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        Order #{order.id}
                      </h3>
                      <p className="text-slate-300 text-sm">
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {order.status || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Items</h4>
                        {order.items?.length > 0 ? (
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-slate-300 text-sm">
                                {item.artwork_title || 'Artwork'} × {item.quantity || 1}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 text-sm">No items details available</p>
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Total</h4>
                        <p className="text-white text-lg font-semibold">
                          ${order.total_amount || '0.00'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DynamicBackground>
  )
}