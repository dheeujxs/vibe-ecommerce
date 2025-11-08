const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1, max: 10 },
  image: { type: String }
});

const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  items: [cartItemSchema],
  total: { type: Number, default: 0 },
  totalItems: { type: Number, default: 0 }
}, { timestamps: true });

// Auto-calculate totals
cartSchema.pre('save', function(next) {
  this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
  this.total = parseFloat(this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
  next();
});

module.exports = mongoose.model('Cart', cartSchema);