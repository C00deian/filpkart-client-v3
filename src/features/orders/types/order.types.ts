export interface OrderItemDto {
  productId: number;
  productName: string;
  productImage: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderDto {
  id: string;
  customerId: string;
  orderStatus: string;
  paymentStatus: string;
  totalPrice: number;
  orderDate: string;
  items: OrderItemDto[];
}

export interface Order {
  id: string;
  customerId: string;
  totalPrice: number;
  paymentStatus: "SUCCESS" | "PENDING" | "FAILED";
  orderStatus: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  orderDate: string;
}



export interface CheckoutResponse {
  orderId: string;
  checkoutUrl: string;
  sessionId?: string;
  hostedPageUrl?: string;
}
