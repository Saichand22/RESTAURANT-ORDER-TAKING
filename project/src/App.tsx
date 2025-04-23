import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import About from './components/About';
import Footer from './components/Footer';
import Cart from './components/Cart';
import MobileMenu from './components/MobileMenu';
import { CartProvider } from './context/CartContext';

function App() {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />
        
        <Hero />
        
        <MenuSection 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        <About />
        
        <Footer />
        
        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;