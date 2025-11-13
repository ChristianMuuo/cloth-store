
import React from 'react';
import { OFFERS } from '../constants';
import { Offer } from '../types';

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
  const colorVariants: { [key: string]: { icon: string; button: string; } } = {
    green: { icon: 'text-green-500', button: 'bg-green-500 hover:bg-green-600' },
    blue: { icon: 'text-blue-500', button: 'bg-blue-500 hover:bg-blue-600' },
    yellow: { icon: 'text-yellow-500', button: 'bg-yellow-500 hover:bg-yellow-600' },
  };
  const colors = colorVariants[offer.color] || colorVariants.blue;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="p-6 text-center">
        <offer.icon className={`h-12 w-12 mx-auto mb-4 ${colors.icon}`} />
        <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{offer.title}</h5>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{offer.description}</p>
        <a href="#" className={`text-white font-semibold py-2 px-5 rounded-full transition-all duration-300 ${colors.button}`}>
          {offer.buttonText}
        </a>
      </div>
    </div>
  );
};

export const Offers: React.FC = () => {
  return (
    <div className="my-12">
      <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Discounts & Offers</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {OFFERS.map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>
    </div>
  );
};
