import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Zap, HardHat, Server, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const CommercialSpecialtyCleaning = () => {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-16 sm:py-24 lg:py-32">
        <BackButton to="/commercial" /> 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Commercial Specialty <span className="text-purple-600">Cleaning</span> Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Tailored cleaning solutions for unique commercial spaces and requirements
          </p>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Data Center Cleaning', icon: Server, description: 'Specialized cleaning for sensitive tech environments' },
            { title: 'Construction Cleanup', icon: HardHat, description: 'Post-construction cleaning and debris removal' },
            { title: 'High-Tech Facility Cleaning', icon: Zap, description: 'Cleaning for labs and high-tech manufacturing' },
            { title: 'Executive Suite Detailing', icon: Briefcase, description: 'Premium cleaning for executive offices' },
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <service.icon className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/commercial/commercial-specialty-cleaning/b"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
          >
            Book our Specialty Cleaning Services
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommercialSpecialtyCleaning;

