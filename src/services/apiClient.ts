import axios from 'axios'
import { ENV } from '@/config/env'

const api = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
)

export default api