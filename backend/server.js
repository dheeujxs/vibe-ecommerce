require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

// Middleware imports
const corsMiddleware = require('./middleware/cors');
const loggerMiddleware = require('./middleware/logger');
const sessionMiddleware = require('./middleware/session');

// Route imports
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const checkoutRoutes = require('./routes/checkout');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware);
app.use(sessionMiddleware);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: '🚀 Vibe Commerce API is running!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler - FIXED: Use proper Express syntax
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('💥 Global Error Handler:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : error.message
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`
🎉 VIBE COMMERCE BACKEND RUNNING!
📍 Port: ${PORT}
 All endpoints are available at /api/*
🚀 Backend is READY!
  `);
});