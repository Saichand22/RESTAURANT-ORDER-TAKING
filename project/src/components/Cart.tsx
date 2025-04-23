import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, calculateTax, calculateTotal } from '../utils/formatters';
import CheckoutModal from './CheckoutModal';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Calculate individual item price including options
  const calculateItemPrice = (index: number) => {
    const item = items[index];
    let price = item.menuItem.price;
    
    if (item.selectedOptions) {
      item.selectedOptions.forEach(selected => {
        const option = item.menuItem.options?.find(opt => opt.id === selected.optionId);
        if (option) {
          const choice = option.choices.find(c => c.id === selected.choiceId);
          if (choice) {
            price += choice.price;
          }
        }
      });
    }
    
    return price * item.quantity;
  };

  // Format selected options for display
  const formatSelectedOptions = (index: number) => {
    const item = items[index];
    if (!item.selectedOptions || item.selectedOptions.length === 0) return null;
    
    return (
      <div className="mt-1 text-xs text-gray-500">
        {item.selectedOptions.map(selected => {
          const option = item.menuItem.options?.find(opt => opt.id === selected.optionId);
          if (!option) return null;
          
          const choice = option.choices.find(c => c.id === selected.choiceId);
          if (!choice) return null;
          
          return (
            <div key={`${selected.optionId}-${selected.choiceId}`}>
              {option.name}: {choice.name}
              {choice.price > 0 && ` (+${formatPrice(choice.price)})`}
            </div>
          );
        })}
        
        {item.specialInstructions && (
          <div className="mt-1 italic">
            Note: {item.specialInstructions}
          </div>
        )}
      </div>
    );
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutModalOpen(false);
    clearCart();
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      
      <div 
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-medium flex items-center">
              <ShoppingBag className="mr-2" size={20} />
              Your Order
            </h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <ShoppingBag size={48} className="mx-auto" />
                </div>
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <button 
                  className="text-amber-600 hover:text-amber-700 font-medium"
                  onClick={onClose}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <li key={`${item.menuItem.id}-${index}`} className="py-4">
                    <div className="flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img 
                          src={item.menuItem.image} 
                          alt={item.menuItem.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">{item.menuItem.name}</h4>
                          <p className="text-gray-900 font-medium">
                            {formatPrice(calculateItemPrice(index))}
                          </p>
                        </div>
                        
                        {formatSelectedOptions(index)}
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2 py-1 text-center w-8">{item.quantity}</span>
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <button
                            className="text-red-500 hover:text-red-700 text-sm"
                            onClick={() => removeFromCart(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer/Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(calculateTax(subtotal))}</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-medium">
                <span>Total</span>
                <span>{formatPrice(calculateTotal(subtotal))}</span>
              </div>
              
              <button
                className="w-full mt-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-colors duration-300 flex items-center justify-center"
                onClick={handleCheckout}
              >
                Checkout <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <CheckoutModal 
          subtotal={subtotal}
          onClose={() => setIsCheckoutModalOpen(false)}
          onCheckoutComplete={handleCheckoutComplete}
        />
      )}
    </>
  );
};

export default Cart;