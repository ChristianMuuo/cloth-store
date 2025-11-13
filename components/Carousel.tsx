
import React, { useState, useEffect, useCallback } from 'react';
import { CAROUSEL_SLIDES } from '../constants';

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === CAROUSEL_SLIDES.length - 1 ? 0 : prevIndex + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? CAROUSEL_SLIDES.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);
  
  const colorVariants: { [key: string]: string } = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    red: 'bg-red-500 hover:bg-red-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900',
  };

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-2xl">
      {CAROUSEL_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-4">
            <div className="text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 animate-fade-in-down">{slide.title}</h2>
              <p className="text-sm md:text-lg mb-4 animate-fade-in-up">{slide.description}</p>
              <a href="#" className={`text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105 ${colorVariants[slide.buttonColor] || 'bg-indigo-500 hover:bg-indigo-600'}`}>
                {slide.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}

      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white focus:outline-none transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white focus:outline-none transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}></button>
        ))}
      </div>
    </div>
  );
};

