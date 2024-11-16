import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Coffee, Monitor, Users, Clock } from 'lucide-react';

function OfficeCleaning() {
  const services = [
    "Daily janitorial services",
    "Carpet and upholstery cleaning",
    "Window and glass cleaning",
    "Restroom sanitation",
    "Breakroom and kitchen cleaning",
    "Trash removal and recycling",
    "Dusting and surface cleaning",
    "Floor care (vacuuming, mopping, waxing)",
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Office <span className="text-blue-600">Cleaning</span> Services
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Create a clean, healthy, and productive workspace for your employees and clients.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Boost productivity</span>
                <span className="block text-blue-600">with a spotless office</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Our professional office cleaning services ensure your workspace is always presentable, hygienic, and conducive to productivity. From daily maintenance to deep cleaning, we've got you covered.
              </p>
              <Link
                to="/OfficeBooking"
                className="mt-8 bg-blue-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-blue-700 transition-colors duration-150"
              >
                Schedule a Consultation
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
          <div className="bg-blue-100 rounded-2xl p-8 text-center">
            <Coffee className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Breakroom Brilliance</h3>
            <p className="text-gray-700">
              Keep communal areas clean and inviting for employee comfort and satisfaction.
            </p>
          </div>
          <div className="bg-green-100 rounded-2xl p-8 text-center">
            <Monitor className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Workstation Wellness</h3>
            <p className="text-gray-700">
              Ensure individual workspaces are dust-free and sanitized for optimal health.
            </p>
          </div>
          <div className="bg-yellow-100 rounded-2xl p-8 text-center">
            <Users className="h-12 w-12 text-yellow-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reception Ready</h3>
            <p className="text-gray-700">
              Maintain a spotless reception area to impress clients and visitors.
            </p>
          </div>
          <div className="bg-purple-100 rounded-2xl p-8 text-center">
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Availability</h3>
            <p className="text-gray-700">
              Flexible scheduling to clean your office outside of business hours.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-gray-100 rounded-2xl p-8 md:p-12 lg:p-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Office Cleaning Service?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Experienced Professionals</h4>
              <p className="text-gray-700">Our team is trained in the latest office cleaning techniques and technologies.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Customized Cleaning Plans</h4>
              <p className="text-gray-700">We tailor our services to meet the unique needs of your office space and schedule.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Eco-Friendly Options</h4>
              <p className="text-gray-700">We offer green cleaning solutions to promote a healthier environment.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Quality Assurance</h4>
              <p className="text-gray-700">Regular inspections and feedback systems ensure consistent, high-quality results.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficeCleaning;