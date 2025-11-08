const Product = require('../models/Product');
const { getLocalProducts } = require('../services/fakeStoreAPI');

const getProducts = async (req, res) => {
  try {
    console.log('🔄 Starting product loading process...');
    
    // Force clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');
    
    // ALWAYS use local products (skip Fake Store API)
    console.log('📦 Loading local products...');
    const localProducts = getLocalProducts();
    const products = await Product.insertMany(localProducts);
    
    console.log(`✅ SUCCESS: Loaded ${products.length} local products`);
    
    res.json({
      success: true,
      data: products,
      count: products.length,
      source: 'Local Data'
    });
  } catch (error) {
    console.error('❌ Products Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

module.exports = { getProducts, getProductById };