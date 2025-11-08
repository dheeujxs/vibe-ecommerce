
import { useNavigate } from 'react-router-dom';
import  type { OrderReceipt } from '@/types';
import { CheckoutForm } from './CheckoutForm';
import { ReceiptModal } from './ReceiptModal';
import { useState } from 'react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  const handleCheckoutSuccess = (orderReceipt: OrderReceipt) => {
    setReceipt(orderReceipt);
  };

  const handleCloseModal = () => {
    setReceipt(null);
    navigate('/'); // Redirect to home page after closing modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">
          Complete your purchase with confidence
        </p>
      </div>

      <CheckoutForm onSuccess={handleCheckoutSuccess} />
      
      <ReceiptModal 
        receipt={receipt} 
        open={!!receipt} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}