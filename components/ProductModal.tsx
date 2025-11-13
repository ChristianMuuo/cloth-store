
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { HeartIcon, StarIcon } from './Icons';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: number) => void;
  isInWishlist: boolean;
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center text-yellow-400">
            {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="w-5 h-5" />)}
            {halfStar && <StarIcon key="half" className="w-5 h-5" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />}
            {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />)}
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({rating.toFixed(1)})</span>
        </div>
    );
};

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="mb-4">
             <RatingStars rating={product.rating} />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{product.description}</p>
          
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-indigo-500">${product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="text-lg text-gray-400 line-through ml-3">${product.originalPrice.toFixed(2)}</span>}
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="font-semibold text-gray-700 dark:text-gray-200">Quantity:</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-lg font-bold text-gray-600 dark:text-gray-300">-</button>
              <input type="number" id="quantity" value={quantity} readOnly className="w-12 text-center bg-transparent focus:outline-none" />
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-lg font-bold text-gray-600 dark:text-gray-300">+</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onAddToCart(product, quantity)}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Add to Cart
            </button>
            <button 
              onClick={() => onToggleWishlist(product.id)}
              className={`w-full font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center ${isInWishlist ? 'bg-red-100 dark:bg-red-900/50 text-red-500 border border-red-500' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              <HeartIcon className="w-5 h-5 mr-2" />
              {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
