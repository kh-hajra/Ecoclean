import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Warehouse, ShoppingCart, Hotel, School, Briefcase, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const commercialServices = [
  {
    id: 'office-cleaning',
    title: 'Office Cleaning',
    description: 'Keep your workplace pristine and productive with our comprehensive office cleaning services.',
    icon: Building2,
    color: 'bg-blue-100',
  },
  {
    id: 'industrial-cleaning',
    title: 'Industrial Cleaning',
    description: 'Specialized cleaning solutions for factories, warehouses, and industrial facilities.',
    icon: Warehouse,
    color: 'bg-gray-100',
  },
  {
    id: 'retail-cleaning',
    title: 'Retail Cleaning',
    description: 'Maintain a spotless shopping environment that attracts and retains customers.',
    icon: ShoppingCart,
    color: 'bg-green-100',
  },
  {
    id: 'hospitality-cleaning',
    title: 'Hospitality Cleaning',
    description: 'Elevate guest experiences with our meticulous cleaning services for hotels and resorts.',
    icon: Hotel,
    color: 'bg-yellow-100',
  },
  {
    id: 'educational-facility-cleaning',
    title: 'Educational Facility Cleaning',
    description: 'Create a clean and healthy learning environment for students and staff.',
    icon: School,
    color: 'bg-red-100',
  },
  {
    id: 'commercial-specialty-cleaning',
    title: 'Commercial Specialty Cleaning',
    description: 'Tailored cleaning solutions for unique commercial spaces and requirements.',
    icon: Briefcase,
    color: 'bg-purple-100',
  },
];

function CommercialCleaningListing() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24 lg:py-32">
       <BackButton to="/" /> 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Commercial <span className="text-blue-600">Cleaning</span> Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Professional cleaning solutions tailored for businesses of all sizes and industries
          </p>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {commercialServices.map((service) => (
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
                to={`/commercial/${service.id}`}
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
            Request a Quote
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CommercialCleaningListing;