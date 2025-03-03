// components/ServiceHeader.jsx
import React from 'react';

const ServiceHeader = ({ image, title, description, ratings }) => {
  return (
    <div className="relative lg:h-[400px] flex items-center justify-center overflow-hidden">
      <img
        src={image}
        alt={title}
        className="mt-20 w-[800px] sm:w-[900px] lg:w-[1000px] object-contain"
      />
      <div className="absolute z-10 text-center px-8 max-w-4xl mt-2">
        <p className="text-sm font-medium mb-3 text-white tracking-wide">We are</p>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-wide leading-tight font-serif" style={{ fontFamily: 'Rische, serif' }}>
          {title}
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 pt-5 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((star) => (
              <svg
                key={star}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-black-300 ml-2">{ratings}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeader;