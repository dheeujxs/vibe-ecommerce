
import type { OrderReceipt } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Calendar, Package, Truck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ReceiptModalProps {
  receipt: OrderReceipt | null;
  open: boolean;
  onClose: () => void;
}

export function ReceiptModal({ receipt, open, onClose }: ReceiptModalProps) {
  if (!receipt) return null;

  const orderDate = new Date(receipt.timestamp).toLocaleDateString();
  const orderTime = new Date(receipt.timestamp).toLocaleTimeString();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <Check className="h-6 w-6" />
            Order Confirmed!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order #{receipt.orderId}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Customer Information</h4>
                  <div className="space-y-2">
                    <p className="font-medium">{receipt.customer.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {receipt.customer.email}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Order Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{orderDate} at {orderTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      <span className="capitalize text-green-600 font-semibold">
                        {receipt.status || 'confirmed'}
                      </span>
                    </div>
                    {receipt.estimatedDelivery && (
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        <span>Est. Delivery: {receipt.estimatedDelivery}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items with Images */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {receipt.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start gap-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                        onError={(e) => {
                          // Fallback image if product image fails to load
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">{item.name}</p>
                        <p className="text-muted-foreground text-sm mt-1">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-right whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-6 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Items:</span>
                  <span>{receipt.items.length}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-2">
                  <span>Total Amount:</span>
                  <span className="text-primary text-xl">${receipt.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Message */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-medium">
                  {receipt.message || 'Thank you for your order! Your order has been confirmed and will be shipped soon.'}
                </p>
                {receipt.estimatedDelivery && (
                  <p className="text-green-700 text-sm mt-2">
                    Estimated delivery: {receipt.estimatedDelivery}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Button onClick={onClose} className="w-full gap-2" size="lg">
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}