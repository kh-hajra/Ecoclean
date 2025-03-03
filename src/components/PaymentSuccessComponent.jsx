import React from 'react';
import { CheckCircle, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/card';
import  Button  from '../components/ui/button';

const PaymentSuccess = ({ booking, onViewBookings, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <Card className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all">
        <div className="p-8">
          {/* Success Animation and Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">Your booking has been confirmed</p>
          </div>

          {/* Booking Details */}
          <div className="space-y-4 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl mb-8 border border-gray-100">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium">{booking?.date} at {booking?.time}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium">{booking?.location?.address}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
          <Button
              onClick={onViewBookings}
              className="group relative flex-1 overflow-hidden rounded-2xl bg-purple-600 py-4 text-lg font-semibold text-white shadow-[0_4px_0px_0px] shadow-purple-800 active:translate-y-1 active:shadow-[0_2px_0px_0px] active:shadow-purple-800"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="flex items-center justify-center gap-2">
                View My Bookings
                <ArrowRight className="w-5 h-5 transform transition-all duration-200 group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 p-6 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;