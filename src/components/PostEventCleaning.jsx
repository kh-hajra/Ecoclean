import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Trash2, Clock, Recycle, Sparkles } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
function PostEventCleaning() {
  const services = [
    "Thorough trash collection and removal",
    "Cleaning and sanitizing of all surfaces",
    "Floor sweeping, mopping, and vacuuming",
    "Restroom deep cleaning and restocking",
    "Removal of event decorations and signage",
    "Spot cleaning of carpets and upholstery",
    "Window and glass surface cleaning",
    "Proper disposal of recyclables and compostables",
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
       <BackButton to="/event" /> 
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Post-Event <span className="text-green-600">Cleaning</span> Services
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Swift and thorough cleanup to restore your venue to its original pristine condition.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Effortless cleanup</span>
                <span className="block text-green-600">after your event</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Our post-event cleaning services ensure that your venue is quickly restored to its pre-event condition. We handle all the cleanup so you can focus on the success of your event.
              </p>
              <Link
                to="./PostEventBooking"
                className="mt-8 bg-green-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-green-700 transition-colors duration-150"
              >
                Schedule Post-Event Cleaning
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
          <div className="bg-green-100 rounded-2xl p-8 text-center">
            <Trash2 className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Cleanup</h3>
            <p className="text-gray-700">
              We handle all aspects of post-event cleanup, leaving no trace behind.
            </p>
          </div>
          <div className="bg-blue-100 rounded-2xl p-8 text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Rapid Response</h3>
            <p className="text-gray-700">
              Our team arrives promptly after your event to begin the cleanup process.
            </p>
          </div>
          <div className="bg-yellow-100 rounded-2xl p-8 text-center">
            <Recycle className="h-12 w-12 text-yellow-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly Disposal</h3>
            <p className="text-gray-700">
              We ensure proper sorting and disposal of waste, recyclables, and compostables.
            </p>
          </div>
          <div className="bg-purple-100 rounded-2xl p-8 text-center">
            <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Cleaning</h3>
            <p className="text-gray-700">
              We pay attention to every detail to restore the venue to its original condition.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Post-Event Cleaning Process</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">1. Initial Sweep</h4>
              <p className="text-gray-700">We start with a quick sweep to remove all visible debris and trash.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">2. Deep Cleaning</h4>
              <p className="text-gray-700">We thoroughly clean all surfaces, floors, and fixtures.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">3. Sanitization</h4>
              <p className="text-gray-700">We disinfect high-touch areas to ensure a hygienic environment.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">4. Final Inspection</h4>
              <p className="text-gray-700">We do a final walk-through to ensure the venue is restored to perfection.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostEventCleaning;