import React from 'react';
import { Link } from 'react-router-dom';
import { School, BookOpen, Microscope, Ruler, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
const EducationalFacilityCleaning = () => {
  return (
    <div className="bg-gradient-to-b from-red-50 to-white py-16 sm:py-24 lg:py-32">
         <BackButton to="/commercial" /> 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Educational Facility <span className="text-red-600">Cleaning</span> Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Create a clean and healthy learning environment for students and staff
          </p>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Classroom Cleaning', icon: BookOpen, description: 'Thorough cleaning of learning spaces' },
            { title: 'Laboratory Sanitation', icon: Microscope, description: 'Specialized cleaning for science labs' },
            { title: 'Common Area Maintenance', icon: School, description: 'Keep shared spaces clean and inviting' },
            { title: 'Sports Facility Cleaning', icon: Ruler, description: 'Maintain cleanliness in gyms and sports areas' },
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <service.icon className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="./BookingScreen"
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
          >
            Book Our Educational Cleaning Services
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationalFacilityCleaning;

