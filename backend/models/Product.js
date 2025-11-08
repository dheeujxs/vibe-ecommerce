const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'] },
  price: { type: Number, required: [true, 'Product price is required'], min: [0, 'Price cannot be negative'] },
  image: { type: String, required: [true, 'Product image is required'] },
  description: { type: String, required: [true, 'Product description is required'] },
  category: { type: String, required: [true, 'Product category is required'] },
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);