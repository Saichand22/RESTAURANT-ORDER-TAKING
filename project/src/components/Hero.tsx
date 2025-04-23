import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  // Scroll to menu section
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight">
          Delicious Food, <br />Delivered to Your Door
        </h1>
        <p className="text-xl text-white mb-8 max-w-xl">
          Enjoy our award-winning cuisine from the comfort of your home. 
          Order online for pickup or delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={scrollToMenu}
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors duration-300 flex items-center justify-center"
          >
            Order Now
          </button>
          <a 
            href="#about" 
            className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium rounded-full transition-colors duration-300"
          >
            About Us
          </a>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <button 
          onClick={scrollToMenu}
          className="flex flex-col items-center"
          aria-label="Scroll to menu"
        >
          <span className="text-sm mb-2">Explore Our Menu</span>
          <ArrowDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default Hero;