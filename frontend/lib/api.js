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
  if (token) {
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
  getCurrentUser: () => apiRequest('/auth/profile/'),
  getArtists: (params) => apiRequest(`/profiles/artists/?${new URLSearchParams(params)}`),

  // Reviews
  getReviews: (artworkId) => apiRequest(`/reviews/artwork/${artworkId}/`),
  createReview: (data) => apiRequest('/reviews/', { method: 'POST', body: JSON.stringify(data) }),
}