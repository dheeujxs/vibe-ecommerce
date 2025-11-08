import axios from 'axios';
import type { Product, Cart, OrderReceipt, CustomerInfo, ApiResponse } from '@/types';

// Use environment variable with fallback for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Production configuration - minimal logging
const isDevelopment = import.meta.env.DEV;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // Set to false for production CORS
  timeout: 10000, // Shorter timeout for production
});

// Request interceptor
api.interceptors.request.use((config) => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  config.headers['X-Session-ID'] = sessionId;
  config.headers['Content-Type'] = 'application/json';
  
  // Only log in development
  if (isDevelopment) {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
  }
  
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    const sessionId = response.headers['x-session-id'];
    if (sessionId) {
      localStorage.setItem('sessionId', sessionId);
    }
    return response;
  },
  (error) => {
    // Enhanced error handling for production
    if (error.code === 'ECONNREFUSED' || error.code === 'NETWORK_ERROR') {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }
    
    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;
      
      switch (status) {
        case 400:
          throw new Error(responseData?.message || 'Invalid request. Please check your input.');
        
        case 401:
          throw new Error('Session expired. Please refresh the page.');
        
        case 404:
          throw new Error('Requested resource not found.');
        
        case 500:
          throw new Error('Server error. Please try again later.');
        
        default:
          throw new Error(responseData?.message || `Error: ${status}. Please try again.`);
      }
    } 
    
    if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } 
    
    throw new Error('Network error occurred. Please try again.');
  }
);

export const commerceAPI = {
  getProducts: (): Promise<ApiResponse<Product[]>> => 
    api.get('/products').then(res => res.data),

  getProduct: (id: string): Promise<ApiResponse<Product>> => 
    api.get(`/products/${id}`).then(res => res.data),

  getCart: (): Promise<ApiResponse<Cart>> => 
    api.get('/cart').then(res => res.data),

  addToCart: (productId: string, quantity: number = 1): Promise<ApiResponse<Cart>> => 
    api.post('/cart', { productId, quantity }).then(res => res.data),

  removeFromCart: (productId: string): Promise<ApiResponse<Cart>> => 
    api.delete(`/cart/${productId}`).then(res => res.data),

  updateCartItem: (productId: string, quantity: number): Promise<ApiResponse<Cart>> => 
    api.put(`/cart/${productId}`, { quantity }).then(res => res.data),

  clearCart: (): Promise<ApiResponse<Cart>> => 
    api.delete('/cart').then(res => res.data),

  checkout: (customerInfo: CustomerInfo): Promise<ApiResponse<OrderReceipt>> => 
    api.post('/checkout', customerInfo).then(res => res.data),

  getOrders: (): Promise<ApiResponse<any[]>> => 
    api.get('/orders').then(res => res.data),
};

// Remove debug functions for production
export default api;