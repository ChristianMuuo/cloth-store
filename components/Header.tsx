
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  cartItemCount: number;
  onSearchChange: (term: string) => void;
  onCheckout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onSearchChange, onCheckout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearchChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="font-bold text-2xl text-gray-800 dark:text-white">
              Gemini<span className="text-indigo-500">Fashion</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-100 dark:bg-gray-800 border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-full py-2 pl-4 pr-10 w-64 transition-all duration-300 focus:w-80"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                 <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
              </div>
            </div>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition">Home</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition">Features</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer">
              <svg className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </div>
            <button 
              onClick={onCheckout}
              className="hidden sm:inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
                Checkout
            </button>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300 focus:outline-none">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4">
             <input
                type="search"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-100 dark:bg-gray-800 border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-full py-2 px-4 w-full mb-4"
              />
            <a href="#" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500">Home</a>
            <a href="#" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500">Features</a>
            <a href="#" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500">Pricing</a>
            <button 
              onClick={() => { onCheckout(); setIsMenuOpen(false); }}
              className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full transition">
                Checkout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
