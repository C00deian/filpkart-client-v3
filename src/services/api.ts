import axios from 'axios'
import { ENV } from '@/config/env'

const api = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,   // sends HttpOnly cookie automatically on every request
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// No request interceptor needed — browser handles cookie automatically

// Response interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status
    if (status === 401) window.location.href = '/login'
    return Promise.reject(err)
  }
)

export default api
