import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Truck, Recycle, Clock, Shield } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
function StreetCleaning() {
  const services = [
    "Mechanical sweeping of streets and roads",
    "Litter and debris removal",
    "Gutter and curb cleaning",
    "Stormwater drain maintenance",
    "Graffiti removal",
    "Leaf collection and disposal",
    "Snow and ice removal (seasonal)",
    "Special event clean-up",
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
       <BackButton to="/outdoor" /> 
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Exterior <span className="text-green-600">Cleaning</span> Services
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Keep your community streets clean, safe, and beautiful with our professional  cleaning solutions.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Clean streets,</span>
                <span className="block text-green-600">happy communities</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Our  cleaning services are designed to maintain the cleanliness and safety of your community's roads and public spaces. From regular sweeping to specialized cleaning, we ensure your streets stay in top condition year-round.
              </p>
              <Link
                to="./ResidentialExteriorBooking"
                className="mt-8 bg-green-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-green-700 transition-colors duration-150"
              >
                Schedule Exterior Cleaning
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
            <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Equipment</h3>
            <p className="text-gray-700">
              We use state-of-the-art street sweepers and cleaning equipment for efficient and thorough cleaning.
            </p>
          </div>
          <div className="bg-green-100 rounded-2xl p-8 text-center">
            <Recycle className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly Practices</h3>
            <p className="text-gray-700">
              Our cleaning methods prioritize environmental sustainability and responsible waste management.
            </p>
          </div>
          <div className="bg-yellow-100 rounded-2xl p-8 text-center">
            <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Scheduling</h3>
            <p className="text-gray-700">
              We offer 24/7 services to minimize disruption to traffic and community activities.
            </p>
          </div>
          <div className="bg-red-100 rounded-2xl p-8 text-center">
            <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Safety First</h3>
            <p className="text-gray-700">
              Our team follows strict safety protocols to ensure the well-being of our workers and the public.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-gray-100 rounded-2xl p-8 md:p-12 lg:p-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Street Cleaning Service?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Experienced Team</h4>
              <p className="text-gray-700">Our skilled professionals have years of experience in municipal cleaning services.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Customized Cleaning Plans</h4>
              <p className="text-gray-700">We tailor our services to meet the specific needs of your community or municipality.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Comprehensive Solutions</h4>
              <p className="text-gray-700">From routine maintenance to specialized cleaning, we offer a full range of street cleaning services.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Reliable and Consistent</h4>
              <p className="text-gray-700">Count on us for dependable, high-quality cleaning services that keep your streets consistently clean.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreetCleaning;