const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Add auth token if available
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, config)
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }
  return response.json()
}

export const api = {
  // Auth
  login: (credentials) => apiRequest('/token/', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => apiRequest('/users/register/', { method: 'POST', body: JSON.stringify(userData) }),

  // Artworks
  getArtworks: (params) => apiRequest(`/artworks/?${new URLSearchParams(params)}`),
  getArtwork: (id) => apiRequest(`/artworks/${id}/`),
  createArtwork: (data) => apiRequest('/artworks/', { method: 'POST', body: JSON.stringify(data) }),

  // Events
  getEvents: () => apiRequest('/events/'),
  getEvent: (id) => apiRequest(`/events/${id}/`),

  // Tutorials
  getTutorials: () => apiRequest('/tutorials/'),
  getTutorial: (id) => apiRequest(`/tutorials/${id}/`),

  // Orders
  getOrders: () => apiRequest('/orders/'),
  createOrder: (data) => apiRequest('/orders/', { method: 'POST', body: JSON.stringify(data) }),

  // Payments
  getPayments: () => apiRequest('/payments/'),
  convertCurrency: (params) => apiRequest(`/payments/convert/?${new URLSearchParams(params)}`),

  // Profiles
  getProfile: (username) => apiRequest(`/profiles/${username}/`),

  // Reviews
  getReviews: (artworkId) => apiRequest(`/reviews/artwork/${artworkId}/`),
  createReview: (data) => apiRequest('/reviews/', { method: 'POST', body: JSON.stringify(data) }),
}