const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.sessionId });
    if (!cart) {
      cart = { items: [], total: 0, totalItems: 0 };
    }

    res.json({
      success: true,
      data: {
        items: cart.items,
        total: cart.total,
        totalItems: cart.totalItems
      }
    });
  } catch (error) {
    console.error('❌ Get Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: error.message
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    if (quantity < 1 || quantity > 10) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be between 1 and 10'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.inStock) {
      return res.status(400).json({
        success: false,
        message: 'Product is currently out of stock'
      });
    }

    let cart = await Cart.findOne({ sessionId: req.sessionId });
    if (!cart) {
      cart = new Cart({ sessionId: req.sessionId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > 10) {
        return res.status(400).json({
          success: false,
          message: 'Cannot add more than 10 items of the same product'
        });
      }
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: 'Product added to cart successfully',
      data: {
        items: cart.items,
        total: cart.total,
        totalItems: cart.totalItems
      }
    });
  } catch (error) {
    console.error('❌ Add to Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product to cart',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.sessionId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.productId !== req.params.id);

    if (cart.items.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in your cart'
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: {
        items: cart.items,
        total: cart.total,
        totalItems: cart.totalItems
      }
    });
  } catch (error) {
    console.error('❌ Remove from Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1 || quantity > 10) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be between 1 and 10'
      });
    }

    const cart = await Cart.findOne({ sessionId: req.sessionId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.find(item => item.productId === req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    item.quantity = quantity;
    await cart.save();

    res.json({
      success: true,
      message: 'Cart updated successfully',
      data: {
        items: cart.items,
        total: cart.total,
        totalItems: cart.totalItems
      }
    });
  } catch (error) {
    console.error('❌ Update Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart',
      error: error.message
    });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ sessionId: req.sessionId });
    
    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: { items: [], total: 0, totalItems: 0 }
    });
  } catch (error) {
    console.error('❌ Clear Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
};