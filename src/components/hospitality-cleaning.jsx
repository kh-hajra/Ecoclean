import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Bed, UtensilsCrossed, Dumbbell, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const HospitalityCleaning = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white py-16 sm:py-24 lg:py-32">
         <BackButton to="/commercial" /> 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Hospitality <span className="text-yellow-600">Cleaning</span> Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Elevate guest experiences with our meticulous cleaning services
          </p>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Room Turnover', icon: Bed, description: 'Swift and thorough room cleaning between guests' },
            { title: 'Public Area Maintenance', icon: Hotel, description: 'Keep lobbies and common areas immaculate' },
            { title: 'Restaurant & Bar Cleaning', icon: UtensilsCrossed, description: 'Ensure dining areas meet health standards' },
            { title: 'Fitness Center Sanitation', icon: Dumbbell, description: 'Maintain a clean and hygienic workout environment' },
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <service.icon className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="./BookingScreen"
            className="inline-flex items-center justify-center rounded-md bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
          >
            Book Our Hospitality Cleaning
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalityCleaning;

