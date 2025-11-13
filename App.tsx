
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Product, Notification } from './types';
import { PRODUCTS } from './constants';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Carousel } from './components/Carousel';
import { Offers } from './components/Offers';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { FashionAssistant } from './components/FashionAssistant';

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};

const App: React.FC = () => {
    const [products] = useState<Product[]>(PRODUCTS);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
    const [wishlist, setWishlist] = useLocalStorage<number[]>('wishlist', []);
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const addNotification = (message: string, type: Notification['type']) => {
        const newNotification: Notification = { id: Date.now(), message, type };
        setNotifications(prev => [...prev, newNotification]);
        setTimeout(() => {
            setNotifications(n => n.filter(notif => notif.id !== newNotification.id));
        }, 3000);
    };

    const handleAddToCart = useCallback((product: Product, quantity: number = 1) => {
        setCart(prevCart => {
            // For simplicity, we just add new items. A real cart would handle quantities.
            const newItems = Array(quantity).fill(product);
            return [...prevCart, ...newItems];
        });
        addNotification(`${quantity} x ${product.name} added to cart!`, 'success');
    }, [setCart]);

    const handleToggleWishlist = useCallback((productId: number) => {
        setWishlist(prev => {
            if (prev.includes(productId)) {
                addNotification('Removed from wishlist.', 'info');
                return prev.filter(id => id !== productId);
            } else {
                addNotification('Added to wishlist!', 'success');
                return [...prev, productId];
            }
        });
    }, [setWishlist]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.categories.includes(selectedCategory);
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchTerm]);

    const cartItemCount = cart.length;

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <Header cartItemCount={cartItemCount} onSearchChange={setSearchTerm} onCheckout={() => addNotification("Checkout is not yet implemented.", "info")} />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                    
                    <section className="lg:w-3/4 space-y-8">
                        <Carousel />
                        <Offers />
                        
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Products</h2>
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {filteredProducts.map(product => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onAddToCart={handleAddToCart}
                                            onToggleWishlist={handleToggleWishlist}
                                            onViewDetails={setSelectedProduct}
                                            isInWishlist={wishlist.includes(product.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            
            <footer className="bg-white dark:bg-gray-800 mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Gemini Fashion Store. All rights reserved.
                </div>
            </footer>

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isInWishlist={!!selectedProduct && wishlist.includes(selectedProduct.id)}
            />

            <div className="fixed bottom-6 left-6 z-40">
                <button
                    onClick={toggleTheme}
                    className="bg-gray-800 dark:bg-yellow-400 text-white dark:text-gray-900 rounded-full p-3 shadow-lg hover:bg-gray-700 dark:hover:bg-yellow-500 transition-transform transform hover:scale-110"
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    }
                </button>
            </div>

            <FashionAssistant />

            <div className="fixed top-20 right-4 z-50 space-y-3 w-80">
                {notifications.map(n => (
                    <div key={n.id} className={`p-4 rounded-lg shadow-xl text-white animate-fade-in-right
                        ${n.type === 'success' ? 'bg-green-500' : ''}
                        ${n.type === 'error' ? 'bg-red-500' : ''}
                        ${n.type === 'info' ? 'bg-blue-500' : ''}`}>
                        {n.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
