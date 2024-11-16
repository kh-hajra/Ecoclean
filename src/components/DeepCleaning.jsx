import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

function DeepCleaning() {
  const features = [
    "Thorough dusting and wiping of all surfaces",
    "Deep carpet and upholstery cleaning",
    "Detailed kitchen appliance cleaning",
    "Bathroom deep scrub and sanitization",
    "Window and glass cleaning",
    "Baseboards and trim cleaning"
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-green-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Deep <span className="text-blue-600">Cleaning</span> Service
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Our deep cleaning service goes beyond the surface, tackling those hard-to-reach areas and stubborn grime for a truly refreshing clean.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Transform your space</span>
                <span className="block text-blue-600">with our deep clean</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Our professional team uses advanced techniques and eco-friendly products to deliver a thorough, deep clean that will leave your home feeling refreshed and revitalized.
              </p>
              <Link
                to="/DeepCleaning"
                className="mt-8 bg-blue-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-blue-700 transition-colors duration-150"
              >
                Book Deep Cleaning
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 bg-blue-100 rounded-2xl p-8 md:p-12 lg:p-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Deep Cleaning Service?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Experienced Professionals</h4>
              <p className="text-gray-700">Our team of skilled cleaners is trained in the latest deep cleaning techniques.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Eco-Friendly Products</h4>
              <p className="text-gray-700">We use environmentally safe cleaning solutions that are tough on dirt but gentle on your home.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Customized Cleaning Plans</h4>
              <p className="text-gray-700">We tailor our deep cleaning service to meet your specific needs and preferences.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Satisfaction Guaranteed</h4>
              <p className="text-gray-700">We're not happy unless you're completely satisfied with our service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeepCleaning;