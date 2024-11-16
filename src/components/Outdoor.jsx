import React from 'react';
import { Link } from 'react-router-dom';
import { Trees, Building, Home, Truck, Umbrella, Droplets, ArrowRight } from 'lucide-react';

const outdoorServices = [
  {
    id: 'street-cleaning',
    title: 'Street Cleaning',
    description: 'Keep your community streets clean and well-maintained with our professional street cleaning services.',
    icon: Truck,
    color: 'bg-gray-100',
  },
  {
    id: 'residential-exterior',
    title: 'Residential Exterior Cleaning',
    description: 'Enhance your home curb appeal with our comprehensive exterior cleaning solutions',
    icon: Home,
    color: 'bg-blue-100',
  },
  {
    id: 'commercial-exterior',
    title: 'Commercial Exterior Cleaning',
    description: 'Maintain a professional appearance for your business with our commercial exterior cleaning services.',
    icon: Building,
    color: 'bg-green-100',
  },
  {
    id: 'park-cleaning',
    title: 'Park and Recreation Area Cleaning',
    description: 'Keep public spaces clean and inviting for community enjoyment.',
    icon: Trees,
    color: 'bg-yellow-100',
  },
  {
    id: 'parking-lot-cleaning',
    title: 'Parking Lot Cleaning',
    description: 'Ensure a clean and safe parking environment for your customers and employees.',
    icon: Umbrella,
    color: 'bg-red-100',
  },
  {
    id: 'pressure-washing',
    title: 'Pressure Washing Services',
    description: 'Remove tough stains and grime from various outdoor surfaces with our pressure washing expertise.',
    icon: Droplets,
    color: 'bg-purple-100',
  },
];

function OutdoorCleaningListing() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Outdoor <span className="text-green-600">Cleaning</span> Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Professional outdoor cleaning solutions for a cleaner, safer, and more beautiful environment
          </p>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {outdoorServices.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-2xl ${service.color} p-8 transition-all hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-white shadow-sm">
                  <service.icon className="h-8 w-8 text-green-500" aria-hidden="true" />
                </div>
                <h2 className="ml-4 text-2xl font-semibold text-gray-900">{service.title}</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">{service.description}</p>
              <Link
                to={`/outdoor-services/${service.id}`}
                className="inline-flex items-center text-lg font-medium text-green-600 hover:text-green-500 transition-colors"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn more
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white hover:bg-green-500 transition-colors shadow-md hover:shadow-lg"
          >
            Request a Quote
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OutdoorCleaningListing;