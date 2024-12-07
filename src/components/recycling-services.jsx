import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const RecyclingServices = () => {
  const materials = [
    "Paper and cardboard",
    "Glass bottles and jars",
    "Plastic containers",
    "Metal cans and aluminum",
    "Electronics",
    "Batteries"
  ];

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
         <BackButton to="/garbage-collection" /> 
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <Recycle className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Recycling Services
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Promoting sustainability through efficient recycling programs.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gray-900">Materials We Recycle:</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {materials.map((material, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                </div>
                <p className="ml-3 text-lg text-gray-500">{material}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gray-900">Our Recycling Process</h2>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>
              Our comprehensive recycling service ensures that recyclable materials are properly processed and repurposed:
            </p>
            <ol>
              <li>Collection of recyclables from homes and businesses</li>
              <li>Sorting of materials at our state-of-the-art recycling facility</li>
              <li>Processing of materials for reuse</li>
              <li>Distribution to manufacturers for creation of new products</li>
            </ol>
            <p>
              By choosing our recycling services, you're contributing to a more sustainable future and reducing landfill waste.
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

export default RecyclingServices;

