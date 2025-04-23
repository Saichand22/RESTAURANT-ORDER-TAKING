import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { MenuItem, MenuItemOption } from '../types';
import { formatPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';

interface ItemDetailsModalProps {
  item: MenuItem;
  onClose: () => void;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ optionId: string; choiceId: string }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate the current price including options
  const calculateCurrentPrice = () => {
    let total = item.price;
    
    selectedOptions.forEach(selected => {
      const option = item.options?.find(opt => opt.id === selected.optionId);
      if (option) {
        const choice = option.choices.find(c => c.id === selected.choiceId);
        if (choice) {
          total += choice.price;
        }
      }
    });
    
    return total * quantity;
  };

  const handleOptionChange = (optionId: string, choiceId: string) => {
    setSelectedOptions(prev => {
      // Remove previous selection for this option if any
      const filtered = prev.filter(opt => opt.optionId !== optionId);
      // Add new selection
      return [...filtered, { optionId, choiceId }];
    });
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedOptions, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Item Image */}
        <div className="relative h-64">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <div className="text-xl font-medium text-amber-600 mb-6">{formatPrice(item.price)}</div>
          
          {/* Item Options */}
          {item.options && item.options.length > 0 && (
            <div className="mb-6">
              {item.options.map((option: MenuItemOption) => (
                <div key={option.id} className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">{option.name}</h4>
                  <div className="space-y-2">
                    {option.choices.map((choice) => (
                      <label key={choice.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={option.id}
                          checked={selectedOptions.some(
                            opt => opt.optionId === option.id && opt.choiceId === choice.id
                          )}
                          onChange={() => handleOptionChange(option.id, choice.id)}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                        />
                        <span>{choice.name}</span>
                        {choice.price > 0 && (
                          <span className="text-gray-500 text-sm">(+{formatPrice(choice.price)})</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Special Instructions */}
          <div className="mb-6">
            <label htmlFor="instructions" className="block font-medium text-gray-900 mb-2">
              Special Instructions
            </label>
            <textarea
              id="instructions"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Any special requests?"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            ></textarea>
          </div>
          
          {/* Quantity */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-medium text-gray-900">Quantity</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-1 text-center w-12">{quantity}</span>
              <button
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Total and Add Button */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Total: {formatPrice(calculateCurrentPrice())}</span>
            <button
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-colors duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;