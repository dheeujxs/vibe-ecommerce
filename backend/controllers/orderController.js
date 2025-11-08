const Order = require('../models/Order');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sessionId: req.sessionId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    console.error('❌ Orders Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

module.exports = { getOrders };