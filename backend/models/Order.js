const mongoose = require('mongoose');

// Define the cart item schema directly in Order model
const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1, max: 10 },
  image: { type: String }
});

const orderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true,
    default: () => 'VIBE' + Date.now() + '_' + Math.random().toString(36).substr(2, 5).toUpperCase()
  },
  sessionId: { type: String, required: true },
  items: [cartItemSchema],
  total: { type: Number, required: true },
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped'], default: 'confirmed' }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);