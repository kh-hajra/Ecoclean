import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

function ConfirmationScreen() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-orange-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8">
          Booking <span className="text-orange-600">Confirmed</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Your cleaning service has been successfully booked! We'll see you soon.
        </p>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-6">
              Your booking has been confirmed!
            </h2>
            <p className="text-center text-lg text-gray-700">
              We look forward to cleaning your space at your selected time. Thank you for choosing us!
            </p>

            <Link
              to="/"
              className="mt-8 bg-green-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-green-700 transition-colors duration-150"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationScreen;
