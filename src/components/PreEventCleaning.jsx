import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Shield, Clock, Users } from 'lucide-react';

function PreEventCleaning() {
  const services = [
    "Deep cleaning of the entire venue",
    "Carpet and upholstery cleaning",
    "Window and glass surface cleaning",
    "Restroom sanitation and stocking",
    "Dusting and polishing of surfaces",
    "Floor cleaning and polishing",
    "Setting up waste bins and recycling stations",
    "Odor elimination and air freshening",
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Pre-Event <span className="text-blue-600">Cleaning</span> Services
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Ensure your venue is immaculate and ready to impress before your event begins.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Set the stage for</span>
                <span className="block text-blue-600">a perfect event</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Our pre-event cleaning services ensure that your venue is spotless, sanitized, and ready to welcome your guests. We pay attention to every detail to create the perfect first impression for your event.
              </p>
              <Link
                to="/ PreEventBooking"
                className="mt-8 bg-blue-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-blue-700 transition-colors duration-150"
              >
                Schedule Pre-Event Cleaning
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
        
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-blue-100 rounded-2xl p-8 text-center">
            <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Thorough Cleaning</h3>
            <p className="text-gray-700">
              We leave no corner untouched, ensuring a pristine environment for your event.
            </p>
          </div>
          <div className="bg-green-100 rounded-2xl p-8 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sanitization</h3>
            <p className="text-gray-700">
              We use hospital-grade disinfectants to ensure a safe and hygienic venue.
            </p>
          </div>
          <div className="bg-yellow-100 rounded-2xl p-8 text-center">
            <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Timely Service</h3>
            <p className="text-gray-700">
              We work efficiently to complete cleaning well before your event starts.
            </p>
          </div>
          <div className="bg-purple-100 rounded-2xl p-8 text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Experienced Team</h3>
            <p className="text-gray-700">
              Our skilled professionals know how to prepare venues for any type of event.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Pre-Event Cleaning Process</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">1. Initial Assessment</h4>
              <p className="text-gray-700">We inspect the venue to create a tailored cleaning plan.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">2. Deep Cleaning</h4>
              <p className="text-gray-700">We thoroughly clean all areas, including hard-to-reach spots.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">3. Sanitization</h4>
              <p className="text-gray-700">We disinfect high-touch surfaces to ensure guest safety.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">4. Final Inspection</h4>
              <p className="text-gray-700">We do a final walk-through to ensure everything is perfect.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreEventCleaning;