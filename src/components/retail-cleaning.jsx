import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles, Clock, Shield, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const RetailCleaning = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-16 sm:py-24 lg:py-32">
         <BackButton to="/commercial" /> 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Retail <span className="text-green-600">Cleaning</span> Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Keep your retail space spotless and inviting for customers
          </p>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[ 
            { title: 'Floor Care', icon: Sparkles, description: 'Maintain pristine floors that shine' },
            { title: 'Window Cleaning', icon: ShoppingCart, description: 'Crystal clear windows for maximum curb appeal' },
            { title: 'After-Hours Service', icon: Clock, description: 'Cleaning that doesn\'t disrupt your business hours' },
            { title: 'Sanitation', icon: Shield, description: 'Thorough disinfection for customer safety' },
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              {/* Use JSX syntax to render the icon */}
              {React.createElement(service.icon, { className: "h-12 w-12 text-green-500 mb-4" })}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
        <Link to="./BookingScreen" className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700">
  Book Our Retail Cleaning
  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
</Link>
        </div>
      </div>
    </div>
  );
};

export default RetailCleaning;
