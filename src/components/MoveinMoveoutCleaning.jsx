import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
function MoveInMoveOutCleaning() {
  const services = [
    "Deep cleaning of all rooms",
    "Thorough kitchen and appliance cleaning",
    "Detailed bathroom sanitization",
    "Carpet and floor deep cleaning",
    "Window and blind cleaning",
    "Removal of dust and cobwebs from all areas"
  ];

  return (
    <div className="bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
       <BackButton to="/commercial" /> 
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Move-In / Move-Out <span className="text-purple-600">Cleaning</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Start fresh in your new home or leave your old one spotless with our comprehensive move-in/move-out cleaning service.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Stress-free moves</span>
                <span className="block text-purple-600">start with a clean slate</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Whether you're moving in or moving out, our specialized cleaning service ensures your space is immaculate, giving you one less thing to worry about during your transition.
              </p>
              <Link
                to="/MoveInMoveOutBooking"
                className="mt-8 bg-purple-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-purple-700 transition-colors duration-150"
              >
                Book Move-In/Out Cleaning
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">{service}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-purple-100 rounded-2xl p-8">
            <Home className="h-12 w-12 text-purple-600 mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Move-In Cleaning</h3>
            <p className="text-gray-700 mb-4">
              Ensure your new home is pristine and ready for you to settle in. We'll deep clean every nook and cranny, so you can start fresh in your new space.
            </p>
            <Link
              to="/book-service?type=move-in"
              className="text-purple-600 font-medium hover:text-purple-500 inline-flex items-center"
            >
              Book Move-In Cleaning
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <div className="bg-pink-100 rounded-2xl p-8">
            <Home className="h-12 w-12 text-pink-600 mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Move-Out Cleaning</h3>
            <p className="text-gray-700 mb-4">
              Leave your old home in perfect condition. Our thorough cleaning ensures you'll get your security deposit back and leave a great impression for the next occupants.
            </p>
            <Link
              to="/book-service?type=move-out"
              className="text-pink-600 font-medium hover:text-pink-500 inline-flex items-center"
            >
              Book Move-Out Cleaning
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoveInMoveOutCleaning;