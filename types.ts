
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  imageUrl: string;
  categories: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Offer {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    buttonText: string;
    color: string;
}

export interface CarouselSlide {
    imageUrl: string;
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
