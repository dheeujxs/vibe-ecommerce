const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = require('../controllers/cartController');

const router = express.Router();

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:id', removeFromCart);
router.put('/:id', updateCartItem);
router.delete('/', clearCart);

module.exports = router;