import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock, Repeat, Shield } from 'lucide-react';

function StandardCleaning() {
  const standardServices = [
    "Dusting and wiping of all surfaces",
    "Vacuuming and mopping of floors",
    "Bathroom cleaning and sanitization",
    "Kitchen cleaning, including appliance exteriors",
    "Emptying trash bins",
    "Making beds (linens must be provided)"
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Standard <span className="text-green-600">Cleaning</span> Service
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Our comprehensive standard cleaning service keeps your home fresh, clean, and comfortable.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Maintain a clean home</span>
                <span className="block text-green-600">without lifting a finger</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Our standard cleaning service covers all the essentials to keep your home clean and tidy. Perfect for regular maintenance and creating a healthy living environment.
              </p>
              <Link
                to="/StandardBooking"
                className="mt-8 bg-green-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-green-700 transition-colors duration-150"
              >
                Book Standard Cleaning
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <ul className="space-y-4">
              {standardServices.map((service, index) => (
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
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-green-100 rounded-2xl p-8 text-center">
            <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Time-Saving</h3>
            <p className="text-gray-700">
              Free up your time for the things you love. Let us handle the cleaning while you focus on what's important.
            </p>
          </div>
          <div className="bg-blue-100 rounded-2xl p-8 text-center">
            <Repeat className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Consistent Quality</h3>
            <p className="text-gray-700">
              Our trained professionals deliver high-quality cleaning results every time, maintaining a consistent standard.
            </p>
          </div>
          <div className="bg-teal-100 rounded-2xl p-8 text-center">
            <Shield className="h-12 w-12 text-teal-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Peace of Mind</h3>
            <p className="text-gray-700">
              Rest easy knowing your home is being cared for by insured and background-checked cleaning experts.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">How often should I schedule standard cleaning?</h4>
              <p className="text-gray-700">We recommend weekly or bi-weekly cleaning for most homes, but we can customize the frequency based on your needs.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Do I need to provide cleaning supplies?</h4>
              <p className="text-gray-700">No, our team brings all necessary cleaning supplies and equipment. If you have specific products you prefer, just let us know.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Is your standard cleaning service customizable?</h4>
              <p className="text-gray-700">Yes, while we have a set list of tasks for our standard cleaning, we're happy to adjust our service to meet your specific needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StandardCleaning;