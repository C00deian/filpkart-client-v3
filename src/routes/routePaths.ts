export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  WISHLIST: '/wishlist',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  ADMIN: {
    ROOT: '/admin',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    USERS: '/admin/users',
    CATEGORIES: '/admin/categories',
  },
} as const