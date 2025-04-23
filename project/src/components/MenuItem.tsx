import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';
import { formatPrice } from '../utils/formatters';
import ItemDetailsModal from './ItemDetailsModal';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-48 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif font-medium text-gray-900">{item.name}</h3>
            <span className="font-medium text-amber-600">{formatPrice(item.price)}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
          <button 
            className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm font-medium transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <PlusIcon size={16} className="mr-1" /> Add to Order
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ItemDetailsModal item={item} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default MenuItem;