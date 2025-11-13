// Added import for React
import React from 'react';

export interface ProgressStep {
  agent: 'Supervisor' | 'Repo Mapper' | 'Code Analyzer' | 'DocGenie';
  message: string;
}

export interface DocumentationResult {
  markdown: string;
  diagramUrl?: string; // Optional URL for a generated diagram
}

// FIX: Added missing e-commerce type definitions.
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
  icon: React.FC<{ className?: string }>;
}

export interface Offer {
  icon: React.FC<{ className?: string }>;
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

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
