
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/contexts/CartContext';
import { Header } from '@/components/layout/Header';
import { ProductGrid } from '@/components/products/ProductGrid';
import { CartView } from '@/components/cart/CartView';

import { Toaster } from 'sonner';
import { CheckoutPage } from './components/checkout/CheckoutPage';


function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Vibe Commerce</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover amazing products with the best prices and quality guaranteed.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;