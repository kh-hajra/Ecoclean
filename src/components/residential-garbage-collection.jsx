import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const ResidentialGarbageCollection = () => {
  const features = [
    "Weekly curbside collection",
    "Proper waste segregation guidance",
    "Environmentally friendly disposal methods",
    "Flexible container options",
    "Holiday schedule adjustments",
    "Special pickups for large items"
  ];

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
         <BackButton to="/garbage-collection" /> 
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <Trash2 className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Residential Garbage Collection
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Keeping your neighborhood clean with reliable and efficient waste collection services.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gray-900">Our Residential Services Include:</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                </div>
                <p className="ml-3 text-lg text-gray-500">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gray-900">How It Works</h2>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>
              Our residential garbage collection service is designed to make waste management easy and hassle-free for homeowners. Here's how it works:
            </p>
            <ol>
              <li>Schedule your regular pickup day</li>
              <li>Place your waste bins at the curbside on the designated day</li>
              <li>Our team collects and properly disposes of your waste</li>
              <li>We return your empty bins to their original location</li>
            </ol>
            <p>
              We also provide guidelines on proper waste segregation to promote recycling and reduce environmental impact.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="./BookingScreen"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowRight className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
            Schedule a service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResidentialGarbageCollection;

