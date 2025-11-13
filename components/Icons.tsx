
import React from 'react';

export const AllCategoriesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const WomenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4a5 5 0 110 10 5 5 0 010-10zm0 10v6m-3-3h6" />
  </svg>
);

export const MenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4a5 5 0 110 10 5 5 0 010-10zm-7 13h14M8 17v4h8v-4" />
  </svg>
);

export const ShoesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export const TShirtIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 4h6l2 5-2 1-3-4-3 4-2-1 2-5zM9 14v6a2 2 0 002 2h2a2 2 0 002-2v-6m-6 0h6"/>
    </svg>
);

export const JewelryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.172C12.962 3.443 14.156 3 15.5 3c2.485 0 4.5 2.015 4.5 4.5 0 1.344-.443 2.538-1.172 3.5L12 18.828l-6.828-6.828C4.443 11.038 4 9.844 4 8.5 4 6.015 6.015 4 8.5 4c1.344 0 2.538.443 3.5 1.172z"/>
    </svg>
);

export const PercentIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 7a2 2 0 114 0 2 2 0 01-4 0zm4 6a2 2 0 11-4 0 2 2 0 014 0zM7 17l10-10"/>
    </svg>
);

export const ShippingIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z"/>
    </svg>
);

export const GiftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 012-2h2a2 2 0 012 2v2m-6 0V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2m6 0h2a2 2 0 012 2v2h-4v-2a2 2 0 012-2zm-6 0h2a2 2 0 002-2V8H6v2a2 2 0 002 2z"/>
    </svg>
);

// fix: Update StarIcon to accept and apply a `style` prop to allow inline styling.
export const StarIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);
