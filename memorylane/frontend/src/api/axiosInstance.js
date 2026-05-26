import axios from 'axios'

/**
 * Axios instance configured with baseURL and auth header
 * @returns {import('axios').AxiosInstance}
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000
})

// Attach Authorization header from localStorage if present
api.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch (e) {
    // ignore
  }
  return config
})

export default api
