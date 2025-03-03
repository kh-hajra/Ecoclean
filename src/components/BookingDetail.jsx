import React, { useState } from "react";
import { Card } from "../components/ui/card";
import Button from "../components/ui/button";
import { X, User, Clock, MapPin } from "lucide-react";
import BookingSummaryModal from "./BookingSummaryModal";
const BookingDetails = ({
  selectedCleaner,
  service,
  bookingDetails,
  onChangeCleaner,
  packageDescriptions,
  onProceed,
}) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    { 
      id: 1, 
      name: "Basic Package", 
      description: packageDescriptions.basic, 
      price: service?.pricing?.basic?.price || 50,
      priceUnit: 'per hour'
    },
    { 
      id: 2, 
      name: "Standard Package", 
      description: packageDescriptions.standard, 
      price: service?.pricing?.standard?.price || 100,
      priceUnit: 'per hour'
    },
    { 
      id: 3, 
      name: "Premium/Heavy-Duty Package", 
      description: packageDescriptions.premium, 
      price: service?.pricing?.premium?.price || 200,
      priceUnit: 'per hour'
    },
  ];

  const calculateTotalPrice = (packagePrice, duration) => {
    return packagePrice * duration;
  };

  const handleProceed = () => {
    if (selectedPackage && bookingDetails.duration) {
      const totalPrice = calculateTotalPrice(selectedPackage.price, bookingDetails.duration);
      onProceed({ ...selectedPackage, totalPrice });
    }
  };

  return (
    <>
      <Card className="p-6 mt-8 border-2">
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
                <span>
                  {bookingDetails.date} at {bookingDetails.time}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{bookingDetails.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Duration: {bookingDetails.duration} hours</span>
              </div>
            </div>
          </div>

          {/* Pricing Packages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose a Package</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-lg p-4 text-center shadow-md cursor-pointer transition transform ${
                    selectedPackage?.id === pkg.id
                      ? "border-[#4338E0] bg-blue-50 shadow-lg scale-105"
                      : "hover:scale-105 hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <h4 className="font-semibold text-lg">{pkg.name}</h4>
                  <p className="text-gray-500 mt-2">{pkg.description}</p>
                  <p className="text-gray-600 mt-2">${pkg.price} {pkg.priceUnit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          {selectedPackage && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Pricing</h3>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${calculateTotalPrice(selectedPackage.price, bookingDetails.duration)}</span>
              </div>
            </div>
          )}

          {/* Proceed Button */}
          <div className="flex items-center justify-center">
            <Button
              disabled={!selectedPackage || !bookingDetails.duration}
              onClick={handleProceed}
              className={`px-6 py-2 ${
                selectedPackage && bookingDetails.duration
                  ? "border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 shadow-md"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BookingDetails;