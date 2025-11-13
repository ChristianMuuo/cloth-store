
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  priceRange: { min: number; max: number };
  onPriceChange: (newRange: { min: number; max: number }) => void;
  minPrice: number;
  maxPrice: number;
}

const CategoryFilter: React.FC<{ selectedCategory: string; onSelectCategory: (categoryId: string) => void; }> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="space-y-2">
      {CATEGORIES.map((category) => (
        <a
          key={category.id}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory(category.id);
          }}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-md font-medium
            ${selectedCategory === category.id
              ? 'bg-indigo-500 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
          <category.icon className="h-6 w-6" />
          <span>{category.name}</span>
        </a>
      ))}
    </div>
  );
};

const PriceRangeFilter: React.FC<{
  minPrice: number;
  maxPrice: number;
  priceRange: { min: number; max: number };
  onPriceChange: (newRange: { min: number; max: number }) => void;
}> = ({ minPrice, maxPrice, priceRange, onPriceChange }) => {

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), priceRange.max);
    onPriceChange({ ...priceRange, min: newMin });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), priceRange.min);
    onPriceChange({ ...priceRange, max: newMax });
  };

  const rangeInputStyle = "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800";

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="min-price" className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <span>Min Price</span>
          <span className="font-bold text-gray-900 dark:text-white">${priceRange.min}</span>
        </label>
        <input
          id="min-price"
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.min}
          onChange={handleMinChange}
          className={rangeInputStyle}
          aria-label="Minimum price"
        />
      </div>
      <div>
        <label htmlFor="max-price" className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <span>Max Price</span>
          <span className="font-bold text-gray-900 dark:text-white">${priceRange.max}</span>
        </label>
        <input
          id="max-price"
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.max}
          onChange={handleMaxChange}
          className={rangeInputStyle}
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
};

const Newsletter: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(email && email.includes('@')) {
            setMessage('Thank you for subscribing!');
            setEmail('');
            setTimeout(() => setMessage(''), 3000);
        } else {
            setMessage('Please enter a valid email.');
             setTimeout(() => setMessage(''), 3000);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Get weekly updates on the latest trends and exclusive offers</p>
            <div className="flex flex-col space-y-3">
                 <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-gray-100 dark:bg-gray-700 border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg py-2 px-4 w-full"
                    required
                />
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
                    Subscribe
                </button>
            </div>
            {message && <p className="text-sm mt-3 text-center text-indigo-500">{message}</p>}
        </form>
    )
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, priceRange, onPriceChange, minPrice, maxPrice }) => {
  const handleResetPrice = () => {
    onPriceChange({ min: minPrice, max: maxPrice });
  };

  return (
    <aside className="lg:w-1/4 space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Categories</h4>
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">Price Range</h4>
            <button
                onClick={handleResetPrice}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
                Reset
            </button>
        </div>
        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          priceRange={priceRange}
          onPriceChange={onPriceChange}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Newsletter</h4>
        <Newsletter />
      </div>
    </aside>
  );
};
