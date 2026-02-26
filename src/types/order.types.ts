export interface CartItemDto {
  productId: number
  productName: string
  productImage: string | null
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface CartDto {
  id: string
  userId: string
  items: CartItemDto[]
  totalPrice: number
}

export interface AddToCartRequest {
  productId: number
  quantity?: number
}

export interface OrderItemDto {
  productId: number
  productName: string
  productImage: string | null
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface OrderDto {
  id: string
  customerId: string
  orderStatus: string
  paymentStatus: string
  totalPrice: number
  orderDate: string
  items: OrderItemDto[]
}

export type OrderStatus =
  | 'PENDING' | 'CONFIRMED' | 'PROCESSING'
  | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED'

export interface CheckoutRequest { cartId: string }
export interface CheckoutResponse { orderId: string; checkoutUrl: string }
