'use client'

import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await api.getOrders()
        setOrders(data)
      } catch (e) {
        setError(e.message)
      }
    }
    loadOrders()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">My Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {orders.map((order) => (
                <li key={order.id} className="border rounded-lg p-3">
                  <p className="font-semibold">Order #{order.id}</p>
                  <p>{order.artwork_title} — {order.currency} {order.total_price}</p>
                  <p className="text-sm text-gray-600">Status: {order.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">My Artworks</h3>
          <p className="text-gray-600">Publish artworks and track inventory from the artist dashboard.</p>
        </div>
      </div>
    </main>
  )
}
