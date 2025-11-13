
import { Product, Category, Offer, CarouselSlide } from './types';
import { AllCategoriesIcon, WomenIcon, MenIcon, ShoesIcon, TShirtIcon, JewelryIcon, PercentIcon, ShippingIcon, GiftIcon } from './components/Icons';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Categories', icon: AllCategoriesIcon },
  { id: 'women', name: 'Women', icon: WomenIcon },
  { id: 'men', name: 'Men', icon: MenIcon },
  { id: 'shoes', name: 'Shoes', icon: ShoesIcon },
  { id: 't-shirts', name: 'T-shirts', icon: TShirtIcon },
  { id: 'jewelry', name: 'Jewelry', icon: JewelryIcon },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Luxury Watch',
    description: 'Timeless elegance meets modern design. Perfect for any occasion.',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.5,
    imageUrl: 'https://picsum.photos/seed/watch/800/800',
    categories: ['women', 'jewelry'],
  },
  {
    id: 2,
    name: 'Designer Bag',
    description: 'Premium leather craftsmanship with spacious compartments.',
    price: 349.99,
    originalPrice: 399.99,
    rating: 5.0,
    imageUrl: 'https://picsum.photos/seed/bag/800/800',
    categories: ['women'],
  },
  {
    id: 3,
    name: 'Running Shoes',
    description: 'Advanced cushioning technology for ultimate comfort and performance.',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.0,
    imageUrl: 'https://picsum.photos/seed/shoes/800/800',
    categories: ['men', 'shoes'],
  },
  {
    id: 4,
    name: 'Cotton T-Shirt',
    description: 'Soft, breathable fabric perfect for everyday wear.',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.5,
    imageUrl: 'https://picsum.photos/seed/tshirt/800/800',
    categories: ['men', 't-shirts'],
  },
  {
    id: 5,
    name: 'Gold Necklace',
    description: 'Elegant 18k gold pendant necklace with delicate chain.',
    price: 299.99,
    originalPrice: 349.99,
    rating: 5.0,
    imageUrl: 'https://picsum.photos/seed/necklace/800/800',
    categories: ['women', 'jewelry'],
  },
  {
    id: 6,
    name: 'Winter Coat',
    description: 'Warm and stylish wool blend coat for cold weather.',
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.5,
    imageUrl: 'https://picsum.photos/seed/coat/800/800',
    categories: ['women'],
  },
];

export const OFFERS: Offer[] = [
    {
        icon: PercentIcon,
        title: 'Up to 50% Off',
        description: 'On all winter clothing items',
        buttonText: 'Shop Winter Sale',
        color: 'green',
    },
    {
        icon: ShippingIcon,
        title: 'Free Shipping',
        description: 'On orders over $100',
        buttonText: 'Start Shopping',
        color: 'blue',
    },
    {
        icon: GiftIcon,
        title: 'Buy 2 Get 1 Free',
        description: 'On selected jewelry items',
        buttonText: 'View Offers',
        color: 'yellow',
    }
];

export const CAROUSEL_SLIDES: CarouselSlide[] = [
    {
        imageUrl: 'https://picsum.photos/seed/winter/1200/500',
        title: 'New Winter Collection',
        description: 'Discover our latest winter fashion trends',
        buttonText: 'Shop Now',
        buttonColor: 'blue',
    },
    {
        imageUrl: 'https://picsum.photos/seed/sale/1200/500',
        title: 'Flash Sale - 50% Off',
        description: 'Limited time offer on selected items',
        buttonText: 'Grab Deal',
        buttonColor: 'red',
    },
    {
        imageUrl: 'https://picsum.photos/seed/jewelry/1200/500',
        title: 'Exclusive Jewelry Collection',
        description: 'Shine with our premium gold and silver pieces',
        buttonText: 'Explore',
        buttonColor: 'yellow',
    },
];
