

import React from 'react';
import { Link,Outlet } from 'react-router-dom';
import { Home, Sparkles, Clock, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const residentialCleaningServices = [
  {
    id: 'custom-cleaning',
    title: 'Custom Cleaning',
    description: 'Tailored cleaning solutions to meet your specific needs and preferences.',
    icon: Home,
    color: 'bg-blue-100',
  },
  {
    id: 'standard-cleaning',
    title: 'Standard Cleaning',
    description: 'Our comprehensive regular cleaning service to keep your home fresh and tidy.',
    icon: Sparkles,
    color: 'bg-green-100',
  },
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    description: 'Thorough, intensive cleaning for a spotless and rejuvenated living space.',
    icon: Clock,
    color: 'bg-yellow-100',
  },
];

function Residential() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-green-50 py-16 sm:py-24 lg:py-32">
     <BackButton to="/" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Residential <span className="text-blue-600">Cleaning</span> Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Professional cleaning solutions for your home, ensuring a clean, comfortable, and healthy living environment.
          </p>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {residentialCleaningServices.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-2xl ${service.color} p-8 transition-all hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-white shadow-sm">
                  <service.icon className="h-8 w-8 text-blue-500" aria-hidden="true" />
                </div>
                <h2 className="ml-4 text-2xl font-semibold text-gray-900">{service.title}</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">{service.description}</p>
              <Link
  to={`/residential/${service.id}`}
  className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-500 transition-colors"
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
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg"
          >
            Book a Cleaning
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default Residential;
