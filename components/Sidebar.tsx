
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryFilter: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
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

export const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <aside className="lg:w-1/4 space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Categories</h4>
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Newsletter</h4>
        <Newsletter />
      </div>
    </aside>
  );
};
