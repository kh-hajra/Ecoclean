import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingSummaryModal from './BookingSummaryModal';
import BackButton from './ui/BackButton';
const BookingSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    console.log('Current Booking ID:', bookingId);
  }, [bookingId]);

  const handleEdit = () => {
    const previousPath = location.state?.previousPath || '/services';
    navigate(previousPath);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const formattedDate = new Date(bookingData.bookingDetails.date);

      if (!bookingData.selectedCleaner || !bookingData.selectedCleaner.id) {
        throw new Error('Cleaner information is missing');
      }

      const locationData = {
        type: 'Point',
        coordinates: bookingData.bookingDetails.coordinates || [0, 0],
        address: bookingData.bookingDetails.location,
      };

      const payload = {
        userId: localStorage.getItem('userId'),
        cleanerId: bookingData.selectedCleaner.id,
        service: bookingData.service.name,
        packageDetails: {
          name: bookingData.selectedPackage.name,
          price: bookingData.selectedPackage.price,
        },
        date: formattedDate,
        time: bookingData.bookingDetails.time,
        location: locationData,
        totalPrice: bookingData.selectedPackage.price,
        status: 'Pending',
      };

      console.log('Sending payload:', payload);

      const response = await fetch('http://localhost:8080/api/bookings/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to confirm booking');
      }

      const data = await response.json();
      console.log('API Response:', data);

      const newBookingId = data.bookingId || (data.booking && data.booking._id);

      if (!newBookingId) {
        throw new Error('No booking ID received from server');
      }

      console.log('Setting booking ID to:', newBookingId);
      setBookingId(newBookingId);
      setShowPayment(true);

      toast.success('Booking Created. Proceeding to payment...');
    } catch (error) {
      console.error('Error confirming booking:', {
        message: error.message,
        stack: error.stack,
      });
      toast.error(error.message || 'Error confirming booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentClick = async () => {
    console.log('Payment clicked, current bookingId:', bookingId);
    if (!bookingId) {
      await handleConfirm(); // Create the booking if bookingId is not set
    } else {
      setShowPayment(true); // Proceed to payment if bookingId is set
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">No booking data found.</p>
          <button
            onClick={() => navigate('/services')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            Start New Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] p-4">
      <BackButton to={location.state?.previousPath || '/services'} />
      {showModal && (
      <BookingSummaryModal
      
        selectedCleaner={bookingData.selectedCleaner}
        service={bookingData.service}
        bookingDetails={bookingData.bookingDetails}
        selectedPackage={bookingData.selectedPackage}
        onEdit={handleEdit}
        bookingId={bookingId}
        showPayment={showPayment}
        setShowPayment={setShowPayment}
        isSubmitting={isSubmitting}
        onPaymentClick={handlePaymentClick} // Pass the function here
        onClose={() => setShowModal(false)}
      />
    )}
    </div>
  );
};

export default BookingSummaryPage;