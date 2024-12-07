import React from 'react';
import { Link } from 'react-router-dom';
import { Sliders, CheckSquare, Clock, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
function CustomCleaning() {
  const customOptions = [
    "Choose specific rooms or areas",
    "Select cleaning frequency",
    "Add special requests or focus areas",
    "Pick eco-friendly product options",
    "Schedule at your convenience",
    "Tailor service duration"
  ];
  console.log('CustomCleaning component rendered');
  return (
    
    <div className="bg-gradient-to-b from-yellow-50 to-orange-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <BackButton to="/residential" /> 
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Custom <span className="text-orange-600">Cleaning</span> Service
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Tailored cleaning solutions designed to meet your unique needs and preferences.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Your home, your rules</span>
                <span className="block text-orange-600">Cleaning your way</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Our custom cleaning service puts you in control. Tell us exactly what you need, and we'll create a cleaning plan that's perfect for your home and lifestyle.
              </p>
              <Link
                to="./CustomBooking"
                className="mt-8 bg-orange-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-orange-700 transition-colors duration-150"
              >
                Create Your Custom Plan
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <ul className="space-y-4">
              {customOptions.map((option, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckSquare className="h-6 w-6 text-orange-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">{option}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-orange-100 rounded-2xl p-8 text-center">
            <Sliders className="h-12 w-12 text-orange-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Customizable Services</h3>
            <p className="text-gray-700">
              Mix and match our cleaning services to create the perfect package for your needs.
            </p>
          </div>
          <div className="bg-yellow-100 rounded-2xl p-8 text-center">
            <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Scheduling</h3>
            <p className="text-gray-700">
              Choose the frequency and timing that works best for your busy lifestyle.
            </p>
          </div>
          <div className="bg-red-100 rounded-2xl p-8 text-center">
            <CheckSquare className="h-12 w-12 text-red-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Guaranteed</h3>
            <p className="text-gray-700">
              Our professional team ensures top-notch results, tailored to your specifications.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to create your custom cleaning plan?</h3>
          <Link
            to="/CustomBooking"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            Get Started Now
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomCleaning;