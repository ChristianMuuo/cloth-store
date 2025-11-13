
import React from 'react';
import { Product } from '../types';
import { HeartIcon, StarIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  onViewDetails: (product: Product) => void;
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


export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist, onViewDetails, isInWishlist }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group relative transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="relative">
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 cursor-pointer" onClick={() => onViewDetails(product)}>
           <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
        </div>
        
        {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                SALE
            </div>
        )}

        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-300 ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white/70 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'}`}
          aria-label="Add to wishlist"
        >
          <HeartIcon className="w-5 h-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
             <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
                Add to Cart
            </button>
        </div>

      </div>
      <div className="p-4 cursor-pointer" onClick={() => onViewDetails(product)}>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{product.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 h-10 overflow-hidden">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>}
          </div>
          <RatingStars rating={product.rating} />
        </div>
      </div>
    </div>
  );
};
