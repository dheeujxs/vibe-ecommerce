import { useState, useEffect } from 'react';
import  type { Product } from '@/types';
import { commerceAPI } from '@/lib/api';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await commerceAPI.getProducts();
      
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        throw new Error(response.message || 'Failed to load products');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Return refetch function
  return { products, loading, error, refetch: fetchProducts };
}