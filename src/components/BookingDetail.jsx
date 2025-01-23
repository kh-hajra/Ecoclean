import React from 'react';
import { Card } from '../components/ui/card';
import  Button  from '../components/ui/button';
import { X, User, Clock, MapPin } from 'lucide-react';

const BookingDetails = ({ selectedCleaner, service, bookingDetails, onChangeCleaner }) => {
  const calculatePrice = () => {
    const basePrice = service.price || 0;
    const tax = basePrice * 0.1; // 10% tax
    return {
      basePrice,
      tax,
      total: basePrice + tax
    };
  };

  const pricing = calculatePrice();

  return (
    <Card className="p-6 mt-8">
      <div className="space-y-6">
        {/* Cleaner Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Selected Cleaner</h3>
          {selectedCleaner ? (
            <div className="flex items-center justify-between">
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
            <Button
  variant="outline"
  size="m"
  onClick={onChangeCleaner}
  className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 shadow-md"
>
  Change
</Button>

            </div>
          ) : (
            <p className="text-gray-500">No cleaner selected</p>
          )}
        </div>

        {/* Service Details */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Service Details</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{bookingDetails.date} at {bookingDetails.time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{bookingDetails.location}</span>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pricing Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>${pricing.basePrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (10%)</span>
              <span>${pricing.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${pricing.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center ">
  <Button
    className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 shadow-md"
  >
    Proceed to Checkout
  </Button>
</div>

      </div>
    </Card>
  );
};

export default BookingDetails;