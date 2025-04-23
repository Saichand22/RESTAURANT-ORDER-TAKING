import React from 'react';
import { categories, getItemsByCategory, getPopularItems } from '../data/menu';
import MenuItem from './MenuItem';

interface MenuSectionProps {
  activeCategory: string;
  setActiveCategory: (categoryId: string) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ 
  activeCategory, 
  setActiveCategory 
}) => {
  // Get items based on active category
  const displayedItems = activeCategory === 'popular' 
    ? getPopularItems() 
    : getItemsByCategory(activeCategory);

  return (
    <section id="menu" className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center mb-12">
          Our Menu
        </h2>
        
        {/* Category Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <div className="flex space-x-2 mx-auto">
            <button
              className={`whitespace-nowrap px-6 py-2 rounded-full transition-colors duration-300 ${
                activeCategory === 'popular'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('popular')}
            >
              Popular
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                className={`whitespace-nowrap px-6 py-2 rounded-full transition-colors duration-300 ${
                  activeCategory === category.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;