import React from 'react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      
      <div 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold text-amber-600">Gusto</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Menu Links */}
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <a 
                href="#menu" 
                className="block py-2 text-gray-800 hover:text-amber-600 transition-colors"
                onClick={onClose}
              >
                Menu
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="block py-2 text-gray-800 hover:text-amber-600 transition-colors"
                onClick={onClose}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="block py-2 text-gray-800 hover:text-amber-600 transition-colors"
                onClick={onClose}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Contact Info */}
        <div className="mt-8 p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2">Contact Us</h4>
          <p className="text-gray-600 text-sm mb-2">(555) 123-4567</p>
          <p className="text-gray-600 text-sm">info@gustorestaurant.com</p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;