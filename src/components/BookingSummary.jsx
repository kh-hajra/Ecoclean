import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import Button from '../components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { User, Clock, MapPin, Edit, CreditCard } from 'lucide-react';
import PaymentForm from '../components/Payment';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_51QiAhuJryT1TvQzxw2Ayb2MRzIedFYkMm1kMqX18LCq3cxN0jgPuLlIeo16bMBOOH1QrsL2z5RuCX0icOeQynP7600IGUSIcqn');

const BookingSummary = ({
  selectedCleaner,
  service,
  bookingDetails,
  selectedPackage,
  onEdit,
  bookingId,
  showPayment,
  setShowPayment,
  isSubmitting,
  onPaymentClick
}) => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const getServiceInfo = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment);
    
    const formatSegment = (segment) => {
      return segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    const serviceCategory = service?.category || formatSegment(segments[0] || '');
    const serviceName = service?.name || formatSegment(segments[1] || '');

    return { serviceCategory, serviceName };
  };

  const { serviceCategory, serviceName } = getServiceInfo();

  const handlePaymentComplete = () => {
    setIsPaymentComplete(true);
    setTimeout(() => {
      window.location.href = '/booking-success';
    }, 2000);
  };

  return (
    <Card className="p-6 mt-8 border-2">
      <div className="space-y-6">
        {/* Service Category and Sub-Service */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Service Details</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Category: {serviceCategory}</p>
            <p className="text-gray-600">Service: {serviceName}</p>
            {service?.description && (
              <p className="text-gray-600">Description: {service.description}</p>
            )}
          </div>
        </div>

        {/* Cleaner Details */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Cleaner Details</h3>
          {selectedCleaner ? (
            <div className="flex items-center gap-3">
              <img
                src={selectedCleaner.profileImage}
                alt={selectedCleaner.cleanerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{selectedCleaner.cleanerName}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-1" />
                  <span>Rating: {selectedCleaner.rating}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No cleaner selected</p>
          )}
        </div>

        {/* Selected Package */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Selected Package</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Package: {selectedPackage?.name}</p>
            <p className="text-gray-600">Price: ${selectedPackage?.price}</p>
            {selectedPackage?.description && (
              <p className="text-gray-600">
                Description: {selectedPackage.description}
              </p>
            )}
          </div>
        </div>

        {/* Date, Time, and Location */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Service Schedule</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {bookingDetails.date} at {bookingDetails.time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{bookingDetails.location}</span>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        {showPayment ? (
          <Elements stripe={stripePromise}>
            <PaymentForm
              bookingId={bookingId}
              totalPrice={selectedPackage?.price}
              onPaymentComplete={handlePaymentComplete}
              onCancel={() => setShowPayment(false)}
            />
          </Elements>
        ) : (
          <div className="flex items-center justify-between">
            <Button
              onClick={onEdit}
              className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 shadow-md"
              disabled={isSubmitting}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              onClick={onPaymentClick}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BookingSummary;