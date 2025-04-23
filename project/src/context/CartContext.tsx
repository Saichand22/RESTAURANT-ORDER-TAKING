import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (menuItem: MenuItem, quantity: number, selectedOptions?: { optionId: string; choiceId: string }[], specialInstructions?: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  // Calculate totals whenever cart changes
  useEffect(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(itemCount);

    const total = items.reduce((sum, item) => {
      let itemTotal = item.menuItem.price * item.quantity;
      
      // Add option prices
      if (item.selectedOptions) {
        item.selectedOptions.forEach(selected => {
          const option = item.menuItem.options?.find(opt => opt.id === selected.optionId);
          if (option) {
            const choice = option.choices.find(c => c.id === selected.choiceId);
            if (choice) {
              itemTotal += choice.price * item.quantity;
            }
          }
        });
      }
      
      return sum + itemTotal;
    }, 0);
    
    setSubtotal(total);
  }, [items]);

  const addToCart = (
    menuItem: MenuItem, 
    quantity: number, 
    selectedOptions: { optionId: string; choiceId: string }[] = [],
    specialInstructions?: string
  ) => {
    setItems(prevItems => [...prevItems, { menuItem, quantity, selectedOptions, specialInstructions }]);
  };

  const removeFromCart = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    setItems(prevItems => 
      prevItems.map((item, i) => 
        i === index ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};