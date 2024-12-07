import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
function ServiceSummary() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-orange-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Service <span className="text-orange-600">Summary</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Review your selected options before confirming the booking.
        </p>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Booking Summary</span>
                <span className="block text-orange-600">Review your Details</span>
              </h2>
              <div className="mt-6 space-y-6">
                <div className="flex items-center">
                  <CheckSquare className="h-6 w-6 text-orange-500" />
                  <p className="ml-3 text-lg text-gray-700">Date: 25th November, 2024</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-orange-500" />
                  <p className="ml-3 text-lg text-gray-700">Time: 10:00 AM</p>
                </div>
                <div className="flex items-center">
                  <CheckSquare className="h-6 w-6 text-orange-500" />
                  <p className="ml-3 text-lg text-gray-700">Service: Home Cleaning</p>
                </div>
              </div>
            </div>

            <Link
              to="/BookingConfirmation"
              className="mt-8 bg-orange-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-orange-700 transition-colors duration-150"
            >
              Confirm Booking
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceSummary;
