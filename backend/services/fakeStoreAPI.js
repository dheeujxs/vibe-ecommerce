const axios = require('axios');

const fetchFromFakeStoreAPI = async () => {
  try {
    console.log('🔄 Attempting to fetch from Fake Store API...');
    const response = await axios.get('https://fakestoreapi.com/products?limit=8');
    console.log('✅ Successfully fetched from Fake Store API');
    return response.data.map(product => ({
      name: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      rating: product.rating?.rate || 0,
      reviewCount: product.rating?.count || 0
    }));
  } catch (error) {
    console.log('❌ Fake Store API unavailable, will use local data');
    return null;
  }
};

// Export local products directly for immediate use
const getLocalProducts = () => {
  const localProducts = [
    {
      name: "Wireless Bluetooth Headphones",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
      category: "Electronics",
      rating: 4.5,
      reviewCount: 128
    },
    {
      name: "Smart Watch Series 5",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      description: "Advanced smartwatch with health monitoring, GPS, and water resistance",
      category: "Electronics",
      rating: 4.3,
      reviewCount: 89
    },
    {
      name: "Laptop Backpack",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      description: "Durable laptop backpack with USB charging port and water-resistant material",
      category: "Accessories",
      rating: 4.7,
      reviewCount: 204
    },
    {
      name: "Mechanical Keyboard",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
      description: "RGB mechanical keyboard with blue switches and customizable lighting effects",
      category: "Electronics",
      rating: 4.6,
      reviewCount: 156
    },
    {
      name: "Gaming Mouse",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
      description: "High-precision gaming mouse with customizable DPI and ergonomic design",
      category: "Electronics",
      rating: 4.4,
      reviewCount: 98
    },
    {
      name: "USB-C Hub Adapter",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1598940603846-a1edd0ef2574?w=500&h=500&fit=crop",
      description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card slots",
      category: "Accessories",
      rating: 4.2,
      reviewCount: 76
    },
   
    {
      name: "4K Ultra HD Monitor",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
      description: "27-inch 4K monitor with HDR support and 144Hz refresh rate",
      category: "Electronics",
      rating: 4.8,
      reviewCount: 189
    },
   
    {
      name: "Smart Home Speaker",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&h=500&fit=crop",
      description: "Voice-controlled smart speaker with premium sound quality and AI assistant",
      category: "Electronics",
      rating: 4.6,
      reviewCount: 167
    },
    {
      name: "Tablet Pro 12.9\"",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
      description: "Professional tablet with stunning display, powerful processor, and Apple Pencil support",
      category: "Electronics",
      rating: 4.9,
      reviewCount: 98
    },
    {
      name: "Digital Camera DSLR",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop",
      description: "Professional DSLR camera with 24MP sensor and 4K video recording",
      category: "Electronics",
      rating: 4.7,
      reviewCount: 143
    },
   
    {
      name: "Noise Cancelling Headphones",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      description: "Premium over-ear headphones with industry-leading noise cancellation",
      category: "Electronics",
      rating: 4.8,
      reviewCount: 198
    },
    {
      name: "Fitness Tracker Watch",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
      description: "Advanced fitness tracker with heart rate monitoring and GPS",
      category: "Electronics",
      rating: 4.4,
      reviewCount: 324
    },
    {
      name: "Portable Bluetooth Speaker",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
      description: "Waterproof portable speaker with 360° sound and 12-hour battery",
      category: "Electronics",
      rating: 4.6,
      reviewCount: 176
    }
  ];
  
  console.log(`📦 Returning ${localProducts.length} local products`);
  return localProducts;
};

module.exports = { fetchFromFakeStoreAPI, getLocalProducts };