export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    inStock: boolean;
    rating: number;
    reviewCount: number;
  }
  
  export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface Cart {
    items: CartItem[];
    total: number;
    totalItems: number;
  }
  
  export interface CustomerInfo {
    name: string;
    email: string;
  }
  
  export interface OrderReceipt {
    orderId: string;
    customer: CustomerInfo;
    items: CartItem[];
    total: number;
    timestamp: string;
    status: string;
    message: string;
    estimatedDelivery: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    count?: number;
  }