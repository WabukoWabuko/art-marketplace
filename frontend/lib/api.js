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

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  if (token && !options.skipAuth) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, config)
  let responseData = null
  try {
    responseData = await response.json()
  } catch (error) {
    responseData = null
  }

  if (!response.ok) {
    const errorMessage =
      responseData?.error || responseData?.detail ||
      (typeof responseData === 'string' ? responseData : JSON.stringify(responseData)) ||
      response.statusText
    throw new Error(errorMessage)
  }

  if (response.status === 204) {
    return {}
  }

  return responseData
}

export const api = {
  // Auth
  login: (credentials) => apiRequest('/auth/login/', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => apiRequest('/auth/register/', { method: 'POST', body: JSON.stringify(userData) }),

  // Artworks
  getArtworks: (params) => apiRequest(`/artworks/?${new URLSearchParams(params)}`, { skipAuth: true }),
  getArtwork: (id) => apiRequest(`/artworks/${id}/`, { skipAuth: true }),
  createArtwork: (data) => apiRequest('/artworks/', { method: 'POST', body: JSON.stringify(data) }),

  // Events
  getEvents: () => apiRequest('/events/', { skipAuth: true }),
  getEvent: (id) => apiRequest(`/events/${id}/`, { skipAuth: true }),

  // Tutorials
  getTutorials: () => apiRequest('/tutorials/', { skipAuth: true }),
  getTutorial: (id) => apiRequest(`/tutorials/${id}/`, { skipAuth: true }),

  // Orders
  getOrders: () => apiRequest('/orders/'),
  createOrder: (data) => apiRequest('/orders/', { method: 'POST', body: JSON.stringify(data) }),

  // Payments
  getPayments: () => apiRequest('/payments/'),
  convertCurrency: (params) => apiRequest(`/payments/convert/?${new URLSearchParams(params)}`),

  // Profiles
  getProfile: (username) => apiRequest(`/profiles/${username}/`, { skipAuth: true }),
  getCurrentUser: () => apiRequest('/auth/profile/'),
  updateProfile: (data) => apiRequest('/auth/profile/', { method: 'PATCH', body: JSON.stringify(data) }),
  getAdminStats: () => apiRequest('/users/admin/stats/'),
  getAdminUsers: () => apiRequest('/users/admin/users/'),
  getArtists: (params) => apiRequest(`/profiles/artists/?${new URLSearchParams(params)}`, { skipAuth: true }),
  getWishlist: () => apiRequest('/profiles/wishlist/'),
  addToWishlist: (artworkId) => apiRequest('/profiles/wishlist/', { method: 'POST', body: JSON.stringify({ artwork: artworkId }) }),
  removeFromWishlist: (wishlistId) => apiRequest(`/profiles/wishlist/${wishlistId}/`, { method: 'DELETE' }),

  // Reviews
  getReviews: (artworkId) => apiRequest(`/reviews/artwork/${artworkId}/`),
  createReview: (data) => apiRequest('/reviews/', { method: 'POST', body: JSON.stringify(data) }),
}