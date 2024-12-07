import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, HardHat, Zap, Recycle, Shield } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
function IndustrialCleaning() {
  const services = [
    "Heavy-duty floor cleaning and maintenance",
    "High-ceiling and wall cleaning",
    "Equipment and machinery cleaning",
    "Dust and debris removal",
    "Chemical spill cleanup",
    "Pressure washing services",
    "Waste management and recycling",
    "HVAC system cleaning",
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
       <BackButton to="/commercial" /> 
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Industrial <span className="text-gray-600">Cleaning</span> Services
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Specialized cleaning solutions for factories, warehouses, and industrial facilities.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Tough on grime,</span>
                <span className="block text-gray-600">gentle on your facility</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Our industrial cleaning services are designed to tackle the toughest cleaning challenges while ensuring the safety and efficiency of your operations. From heavy machinery to expansive warehouse floors, we've got you covered.
              </p>
              <Link
                to="./IndustrialBooking"
                className="mt-8 bg-gray-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-gray-700 transition-colors duration-150"
              >
                Request a Quote
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
          <div className="bg-yellow-100 rounded-2xl p-8 text-center">
            <HardHat className="h-12 w-12 text-yellow-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Safety First</h3>
            <p className="text-gray-700">
              Our team is trained in industrial safety protocols to ensure a secure cleaning process.
            </p>
          </div>
          <div className="bg-blue-100 rounded-2xl p-8 text-center">
            <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Powerful Equipment</h3>
            <p className="text-gray-700">
              We use industrial-grade cleaning equipment to tackle even the toughest jobs.
            </p>
          </div>
          <div className="bg-green-100 rounded-2xl p-8 text-center">
            <Recycle className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly Solutions</h3>
            <p className="text-gray-700">
              Our cleaning methods and products are designed to minimize environmental impact.
            </p>
          </div>
          <div className="bg-red-100 rounded-2xl p-8 text-center">
            <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance Assured</h3>
            <p className="text-gray-700">
              We ensure adherence to industry regulations and standards in our cleaning processes.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-gray-100 rounded-2xl p-8 md:p-12 lg:p-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Industrial Cleaning Process</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">1. Site Assessment</h4>
              <p className="text-gray-700">We conduct a thorough evaluation of your facility to identify specific cleaning needs and challenges.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">2. Customized Plan</h4>
              <p className="text-gray-700">We develop a tailored cleaning strategy that addresses your unique industrial environment.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">3. Specialized Cleaning</h4>
              <p className="text-gray-700">Our team executes the cleaning plan using advanced techniques and industrial-grade equipment.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">4. Quality Assurance</h4>
              <p className="text-gray-700">We perform rigorous inspections to ensure all cleaning tasks meet our high standards and your expectations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustrialCleaning;