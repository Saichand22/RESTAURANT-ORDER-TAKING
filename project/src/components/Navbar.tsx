import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenMobileMenu }) => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic - this would be implemented in a more complete app
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            className="md:hidden mr-4 text-gray-800" 
            onClick={onOpenMobileMenu}
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
          <a href="/" className="text-2xl font-serif font-bold text-amber-600">Gusto</a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#menu" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">Menu</a>
          <a href="#about" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">About</a>
          <a href="#contact" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">Contact</a>
        </div>

        {/* Search & Cart */}
        <div className="flex items-center space-x-4">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="w-64 py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
              <button 
                type="button" 
                className="absolute right-3"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <button 
              className="text-gray-800 hover:text-amber-600 transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={22} />
            </button>
          )}
          
          <button 
            className="relative text-gray-800 hover:text-amber-600 transition-colors"
            onClick={onOpenCart}
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all transform duration-300 animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;