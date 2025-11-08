
import { useCart } from '@/contexts/CartContext';
import { CartItem } from './CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CartView() {
  const { cart, loading, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12 ">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6">Add some products to get started!</p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <Button
          variant="outline"
          onClick={clearCart}
          disabled={loading}
        >
          Clear Cart
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-6">
          {cart.items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>
        
        <div className="border-t p-6 space-y-4">
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Total Items:</span>
            <span>{cart.totalItems}</span>
          </div>
          
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>Total Amount:</span>
            <span className="text-primary">${cart.total.toFixed(2)}</span>
          </div>
          
          <Button asChild size="lg" className="w-full gap-2">
            <Link to="/checkout">
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}