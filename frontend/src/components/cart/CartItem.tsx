
import type { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, loading } = useCart();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity === 0) {
      await removeItem(item.productId);
    } else {
      await updateQuantity(item.productId, newQuantity);
    }
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
        <p className="text-muted-foreground text-sm">${item.price}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={loading || item.quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={loading || item.quantity >= 10}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="text-right min-w-20">
        <p className="font-semibold">${subtotal.toFixed(2)}</p>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item.productId)}
        disabled={loading}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}