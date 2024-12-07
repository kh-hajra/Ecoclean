import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Recycle, Building, Calendar, Truck, Leaf, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const GarbageCollection = () => {
  const services = [
    {
      icon: Trash2,
      title: 'Residential Garbage Collection',
      description: 'Regular collection of household waste from residential areas, ensuring clean and hygienic neighborhoods.',
      link: '/outdoor/garbage-collection/residential'
    },
    {
      icon: Recycle,
      title: 'Recycling Services',
      description: 'Specialized collection and processing of recyclable materials to promote environmental sustainability.',
      link: '/outdoor/garbage-collection/recycling'
    },
   
    {
      icon: Calendar,
      title: 'Scheduled Pickups',
      description: 'Flexible scheduling options for waste collection to meet your specific needs and preferences.',
      link: '/outdoor/garbage-collection/scheduled-pickups'
    },
   
    {
      icon: Leaf,
      title: 'Green Waste Collection',
      description: 'Collection and proper disposal of yard waste, leaves, and other organic materials.',
      link: '/garbage-collection/green-waste'
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
       <BackButton to="/outdoor" /> 
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Garbage Collection <span className="text-green-600">Services</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Efficient and eco-friendly waste management solutions for residential and commercial needs.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <service.icon className="h-10 w-10 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">{service.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link to={service.link} className="font-medium text-green-600 hover:text-green-500">
                      Learn more<span className="sr-only"> about {service.title}</span>
                      <ArrowRight className="inline-block ml-2 h-5 w-5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Request a Quote
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GarbageCollection;

