import React, { useState } from 'react';
import { X, CreditCard, Clock, Home } from 'lucide-react';
import { formatPrice, calculateTax, calculateTotal } from '../utils/formatters';

interface CheckoutModalProps {
  subtotal: number;
  onClose: () => void;
  onCheckoutComplete: () => void;
}

type DeliveryMethod = 'delivery' | 'pickup';
type PaymentMethod = 'card' | 'cash';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  subtotal, 
  onClose,
  onCheckoutComplete
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      onCheckoutComplete();
      
      // Show success notification
      alert('Your order has been placed successfully! It will be ready in 25-35 minutes.');
    }, 1500);
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-2xl font-medium">Checkout</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Contact Information */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          {/* Delivery Method */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">Delivery Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                className={`p-4 border rounded-lg flex items-center ${
                  deliveryMethod === 'delivery' 
                    ? 'border-amber-600 bg-amber-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setDeliveryMethod('delivery')}
              >
                <Home size={24} className={deliveryMethod === 'delivery' ? 'text-amber-600' : 'text-gray-500'} />
                <div className="ml-3 text-left">
                  <div className={`font-medium ${deliveryMethod === 'delivery' ? 'text-amber-600' : 'text-gray-900'}`}>
                    Delivery
                  </div>
                  <div className="text-sm text-gray-500">30-45 minutes</div>
                </div>
              </button>
              
              <button
                type="button"
                className={`p-4 border rounded-lg flex items-center ${
                  deliveryMethod === 'pickup' 
                    ? 'border-amber-600 bg-amber-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setDeliveryMethod('pickup')}
              >
                <Clock size={24} className={deliveryMethod === 'pickup' ? 'text-amber-600' : 'text-gray-500'} />
                <div className="ml-3 text-left">
                  <div className={`font-medium ${deliveryMethod === 'pickup' ? 'text-amber-600' : 'text-gray-900'}`}>
                    Pickup
                  </div>
                  <div className="text-sm text-gray-500">15-20 minutes</div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Address (for delivery) */}
          {deliveryMethod === 'delivery' && (
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4">Delivery Address</h4>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          
          {/* Payment Method */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">Payment Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                className={`p-4 border rounded-lg flex items-center ${
                  paymentMethod === 'card' 
                    ? 'border-amber-600 bg-amber-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={24} className={paymentMethod === 'card' ? 'text-amber-600' : 'text-gray-500'} />
                <div className="ml-3 text-left">
                  <div className={`font-medium ${paymentMethod === 'card' ? 'text-amber-600' : 'text-gray-900'}`}>
                    Credit Card
                  </div>
                  <div className="text-sm text-gray-500">Pay now securely</div>
                </div>
              </button>
              
              <button
                type="button"
                className={`p-4 border rounded-lg flex items-center ${
                  paymentMethod === 'cash' 
                    ? 'border-amber-600 bg-amber-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('cash')}
              >
                <div className={`text-xl font-bold ${paymentMethod === 'cash' ? 'text-amber-600' : 'text-gray-500'}`}>$</div>
                <div className="ml-3 text-left">
                  <div className={`font-medium ${paymentMethod === 'cash' ? 'text-amber-600' : 'text-gray-900'}`}>
                    Cash
                  </div>
                  <div className="text-sm text-gray-500">Pay on delivery/pickup</div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Card Details (if card payment) */}
          {paymentMethod === 'card' && (
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4">Card Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    placeholder="•••• •••• •••• ••••"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    required
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    required
                    placeholder="•••"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Order Summary */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2">Order Summary</h4>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax</span>
              <span>{formatPrice(calculateTax(subtotal))}</span>
            </div>
            {deliveryMethod === 'delivery' && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span>{formatPrice(5.99)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 text-lg font-medium border-t border-gray-200 mt-2 pt-2">
              <span>Total</span>
              <span>{formatPrice(calculateTotal(subtotal) + (deliveryMethod === 'delivery' ? 5.99 : 0))}</span>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-colors duration-300 flex items-center justify-center disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span>Place Order</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;