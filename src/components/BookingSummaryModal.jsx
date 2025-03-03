import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import Button from '../components/ui/button';
import { Edit, CreditCard, Loader2, MapPin, User, Clock } from "lucide-react";
import { toast } from 'react-toastify';

const BookingSummaryModal = ({
  selectedCleaner,
  service,
  bookingDetails,
  selectedPackage,
  onEdit,
  onClose,
  onPaymentClick,
  isSubmitting,
}) => {
  const navigate = useNavigate();

  const handlePaymentClick = async () => {
    try {
      if (!selectedPackage?.price) {
        toast.error('Package details are missing');
        return;
      }

      if (typeof onPaymentClick !== 'function') {
        toast.error('Payment processing is not available');
        return;
      }

      const success = await onPaymentClick();

      if (success) {
        const bookingId = localStorage.getItem('bookingId');
        const totalPrice = localStorage.getItem('totalPrice');

        if (!bookingId || !totalPrice) {
          toast.error('Booking information is incomplete');
          return;
        }

        navigate('/payment');
      }
    } catch (error) {
      console.error('Error in handlePaymentClick:', error);
      toast.error('Failed to process payment request');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-2 border-[#6D28D9] rounded-xl">
          {/* Header */}
          <h2 className="text-2xl font-bold text-[#6D28D9] text-center mb-6">Service Summary</h2>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Service Details */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#6D28D9] mb-4">Service Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-medium">Category:</span> {service?.category}</p>
                  <p className="text-gray-700"><span className="font-medium">Service:</span> {service?.name}</p>
                  {service?.description && (
                    <p className="text-gray-700"><span className="font-medium">Description:</span> {service.description}</p>
                  )}
                </div>
              </div>

              {/* Cleaner Details */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#6D28D9] mb-4">Cleaner Details</h3>
                {selectedCleaner ? (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#6D28D9]">
                      <img
                        src={selectedCleaner.profileImage}
                        alt={selectedCleaner.cleanerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedCleaner.cleanerName}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <User className="w-4 h-4 mr-1" />
                        <span>Rating: {selectedCleaner.rating}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No cleaner selected</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Selected Package */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#6D28D9] mb-4">Selected Package</h3>
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-medium">Package:</span> {selectedPackage?.name}</p>
                  <p className="text-gray-700"><span className="font-medium">Price:</span> ${selectedPackage?.price}</p>
                  {selectedPackage?.description && (
                    <p className="text-gray-700"><span className="font-medium">Description:</span> {selectedPackage.description}</p>
                  )}
                </div>
              </div>

              {/* Schedule Details */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#6D28D9] mb-4">Service Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-[#6D28D9]" />
                    <span>{bookingDetails.date} at {bookingDetails.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-[#6D28D9]" />
                    <span>{bookingDetails.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-purple-200">
            <Button
              onClick={onEdit}
              className="px-8 py-3 text-sm border border-[#6D28D9] text-[#6D28D9] bg-white rounded-lg hover:bg-purple-50 transition-all duration-300 flex items-center gap-2 font-medium shadow-sm hover:shadow"
              disabled={isSubmitting}
            >
              <Edit className="w-4 h-4" />
              <span>Edit Details</span>
            </Button>
            <Button
              onClick={handlePaymentClick}
              className="px-8 py-3 text-sm bg-[#6D28D9] text-white rounded-lg hover:bg-[#5b21b6] transition-all duration-300 flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Payment</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingSummaryModal;