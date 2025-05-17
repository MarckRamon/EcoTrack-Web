import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  // When using the Vite proxy, we can use relative URLs
  // The proxy in vite.config.js will handle forwarding /api requests to the actual backend
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Helper function to decode JWT tokens
 * @param {string} token - JWT token
 * @returns {Object|null} The decoded token payload or null if invalid
 */
const decodeJwt = (token) => {
  try {
    // JWT format: header.payload.signature
    const base64Payload = token.split('.')[1];
    if (!base64Payload) return null;
    
    // Replace characters for base64 URL encoding
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
    
    // Decode and parse
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (error) {
    console.error('❌ Error decoding JWT:', error);
    return null;
  }
};

/**
 * Check if a token is expired
 * @param {Object} decodedToken - The decoded JWT token
 * @returns {boolean} Whether the token is expired
 */
const isTokenExpired = (decodedToken) => {
  if (!decodedToken || !decodedToken.exp) return true;
  
  // Token expiration time is in seconds
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  const timeUntilExpiry = expirationTime - currentTime;
  
  // Log expiration information for debugging
  if (timeUntilExpiry > 0) {
    const minutesUntilExpiry = Math.floor(timeUntilExpiry / 60000);
    console.log(`🔐 Token expires in ${minutesUntilExpiry} minutes`);
  }
  
  // Return true if expired
  return currentTime >= expirationTime;
};

/**
 * Clear all auth tokens from local storage
 */
const clearAuthTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('firestoreAuthToken');
  localStorage.removeItem('firestoreAuthClaims');
};

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Check if token is expired
      const decoded = decodeJwt(token);
      if (decoded && isTokenExpired(decoded)) {
        console.warn('⚠️ Token expired, clearing auth');
        clearAuthTokens();
        // Allow this request to proceed without token, it will likely fail with 401
      } else {
        // Token is valid, add it to the request
        console.log('🔑 Adding auth token to request');
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      console.log('⚠️ No auth token found for request to:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response for ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    // Log the error details
    console.error(`❌ API Error for ${error.config?.url || 'unknown endpoint'}:`, 
      error.response?.status, error.response?.data);
    
    if (error.response) {
      // Handle different error types differently
      const status = error.response.status;
      const url = error.config.url;
      
      // Handle auth errors (401/403) for non-login endpoints
      if ((status === 401 || status === 403) && !url.includes('/users/login')) {
        console.warn('🔄 Auth failure, redirecting to login');
        // Clear all auth tokens
        clearAuthTokens();
        
        // Redirect to login only if not already on login page
        if (!window.location.pathname.includes('/')) {
          window.location.href = '/';
        }
      } 
      // For 404 errors, just log them but don't redirect
      else if (status === 404) {
        console.warn(`⚠️ Endpoint not found: ${url}`);
      }
      // For 405 errors (method not allowed), log them
      else if (status === 405) {
        console.warn(`⚠️ Method not allowed for endpoint: ${url}`);
      }
      // For network errors, provide more helpful messages
      else if (status === 0 || !status) {
        console.error('❌ Network error: Unable to connect to the server');
      }
      // For 500 server errors, log them
      else if (status >= 500) {
        console.error(`❌ Server error (${status}): The server encountered an error processing the request`);
      }
    }
    
    return Promise.reject(error);
  }
);

// Add method to check if user is authenticated
api.isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  // Check if token is valid and not expired
  const decoded = decodeJwt(token);
  if (!decoded || isTokenExpired(decoded)) {
    clearAuthTokens();
    return false;
  }
  
  return true;
};

// Add method to get user info from JWT
api.getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  const decoded = decodeJwt(token);
  if (!decoded || isTokenExpired(decoded)) {
    clearAuthTokens();
    return null;
  }
  
  return decoded;
};

// Add method to get user role (admin, user, etc.)
api.getUserRole = () => {
  const user = api.getCurrentUser();
  return user?.role || null;
};

// Add method to attempt different HTTP methods for the same URL
api.tryAlternativeMethods = async (url, data = null, preferredMethods = ['get', 'post', 'put']) => {
  // Try different HTTP methods in order of preference
  for (const method of preferredMethods) {
    try {
      console.log(`🔄 Trying ${method.toUpperCase()} request to ${url}`);
      
      if (method === 'get') {
        const response = await api.get(url);
        return response;
      } else if (method === 'post') {
        const response = await api.post(url, data);
        return response;
      } else if (method === 'put') {
        const response = await api.put(url, data);
        return response;
      }
    } catch (error) {
      console.log(`❌ ${method.toUpperCase()} request failed:`, error.response?.status || error.message);
      // If it's the last method in the array, rethrow the error
      if (method === preferredMethods[preferredMethods.length - 1]) {
        throw error;
      }
      // Otherwise continue to the next method
    }
  }
};

export default api; 