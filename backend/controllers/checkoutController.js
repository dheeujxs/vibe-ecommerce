const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const checkout = async (req, res) => {
  console.log('🛒 Checkout process started for session:', req.sessionId);

  try {
    const { name, email } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const cart = await Cart.findOne({ sessionId: req.sessionId });
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty'
      });
    }

    console.log(`📦 Processing checkout with ${cart.items.length} items`);

    for (let item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.inStock) {
        return res.status(400).json({
          success: false,
          message: `Sorry, ${item.name} is no longer available`
        });
      }
    }

    const order = new Order({
      sessionId: req.sessionId,
      items: cart.items,
      total: cart.total,
      customerInfo: {
        name: name.trim(),
        email: email.toLowerCase().trim()
      }
    });

    console.log('💾 Saving order...');
    await order.save();
    console.log(' Order created with ID:', order.orderId);

    const receipt = {
      orderId: order.orderId,
      customer: order.customerInfo,
      items: order.items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        subtotal: item.price * item.quantity
      })),
      total: order.total,
      timestamp: order.createdAt.toISOString(),
      status: order.status,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      message: 'Thank you for your order! You will receive a confirmation email shortly.'
    };

    // FIXED: Send response FIRST, then clear cart asynchronously
    console.log('🎉 Sending checkout response to frontend...');
    res.json({
      success: true,
      message: 'Order placed successfully!',
      data: receipt
    });

    // Cart clearing happens AFTER response is sent
    console.log('🗑️ Clearing cart after response sent...');
    await Cart.findOneAndDelete({ sessionId: req.sessionId });
    console.log(' Cart cleared successfully');

  } catch (error) {
    console.error('💥 Checkout Error:', error);
    
    let errorMessage = 'Checkout failed. Please try again.';
    if (error.name === 'ValidationError') {
      errorMessage = 'Order validation failed. Please check your information.';
    } else if (error.name === 'MongoError' && error.code === 11000) {
      errorMessage = 'Order ID conflict. Please try again.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
    });
  }
};

module.exports = { checkout };