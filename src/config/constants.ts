export const APP_NAME = 'Flipkart'
export const DEFAULT_PAGE_SIZE = 20
export const DEBOUNCE_DELAY = 400

export const SECOND = 1000
export const MINUTE = 60 * SECOND

export const QUERY_TIMES = {
  SHORT: 2 * MINUTE,
  DEFAULT: 5 * MINUTE,
  LONG: 10 * MINUTE,
  EXTENDED: 30 * MINUTE,
  ADMIN: 1 * MINUTE,
} as const

export const QUERY_GC_TIME = 10 * MINUTE

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  USERS: {
    PROFILE: '/users/profile',
    ROOT: '/users',
    ADDRESSES: '/users/me/addresses',
  },
  PRODUCTS: {
    ROOT: '/products',
    CATEGORIES: '/products/categories',
  },
} as const
