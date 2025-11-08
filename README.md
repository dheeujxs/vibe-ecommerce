# 🛍️ Vibe Commerce - Full Stack E-Commerce Application

A modern, responsive e-commerce shopping cart application built with React, Node.js, Express, MongoDB, and Tailwind CSS.

![Vibe Commerce](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-22.18.0-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🚀 Live Demo

- **Frontend**: [https://vibe-commerce.vercel.app](https://vibe-ecommerce-ten.vercel.app/))
- **Backend API**: [[https://vibe-commerce-backend.onrender.com](https://vibe-commerce-backend.onrender.com)]

- ## ✨ Features

### ✅ Core Requirements
- **Product Catalog** - Display 5-10+ products with details
- **Shopping Cart** - Add, remove, and update item quantities
- **Checkout Process** - Customer information form and order confirmation
- **Responsive Design** - Works on desktop, tablet, and mobile

### 🎁 Bonus Features
- **Database Persistence** - MongoDB with user session management
- **Fake Store API Integration** - Fallback product data source
- **Enhanced Error Handling** - Comprehensive validation and user feedback
- **Order History** - Track customer orders and purchase history
- **Stock Management** - Prevent checkout for out-of-stock items
- **Professional UI/UX** - Modern design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **RESTful API** - Clean API architecture

## 📦 Project Structure
vibe-ecommerce/
├── frontend/ # React frontend application
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── contexts/ # React contexts (Cart, etc.)
│ │ ├── hooks/ # Custom React hooks
│ │ ├── lib/ # Utilities and API
│ │ └── types/ # TypeScript definitions
│ └── package.json
├── backend/ # Node.js backend API
│ ├── controllers/ # Route controllers
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── middleware/ # Custom middleware
│ └── server.js # Entry point
└── README.md

text

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   https://github.com/dheeujxs/vibe-ecommerce.git
   cd vibe-ecommerce
Backend Setup

bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "PORT=8000" >> .env
echo "FRONTEND_URL=http://localhost:5173" >> .env

# Start backend
npm run dev
Frontend Setup

bash
cd ../frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start frontend
npm run dev
Access the application

Frontend: http://localhost:5173

Backend API: http://localhost:8000/api

📚 API Endpoints
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get single product
GET	/api/cart	Get user cart
POST	/api/cart	Add item to cart
PUT	/api/cart/:id	Update cart item quantity
DELETE	/api/cart/:id	Remove item from cart
POST	/api/checkout	Process order checkout
GET	/api/orders	Get order history
🎯 Assignment Requirements Status
✅ All 5 Core Backend APIs Implemented
GET /api/products - Returns 16+ products with full details

POST /api/cart - Add items to cart with validation

DELETE /api/cart/:id - Remove items from cart

GET /api/cart - Get cart with calculated totals

POST /api/checkout - Mock receipt with order details

✅ All 4 Frontend Requirements Met
Products Grid - Responsive grid with "Add to Cart"

Cart View - Manage items, quantities, and totals

Checkout Form - Customer information with receipt modal

Responsive Design - Mobile-first responsive layout

✅ All Bonus Features Implemented
Database persistence with MongoDB

Enhanced error handling and validation

Fake Store API integration

Professional UI/UX with modern design

🏗️ Architecture Decisions
Frontend Architecture
Component-based - Reusable, maintainable components

TypeScript - Type safety and better developer experience

Context API - State management for cart and user sessions

Custom Hooks - Reusable logic for API calls and state

Backend Architecture
RESTful API - Clean, predictable endpoints

MVC Pattern - Separation of concerns

Middleware - Authentication, logging, and error handling

MongoDB - Scalable document database

🐛 Troubleshooting
Common Issues
MongoDB Connection Error

Ensure your IP is whitelisted in MongoDB Atlas

Verify connection string in .env file

CORS Errors

Check FRONTEND_URL in backend .env matches your frontend URL

Build Errors

Clear node_modules and reinstall: rm -rf node_modules && npm install

🤝 Contributing
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add amazing feature'

Push to the branch: git push origin feature/amazing-feature

Open a Pull Request
