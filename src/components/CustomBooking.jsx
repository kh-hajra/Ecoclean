import React from 'react';
import BookingScreen from './BookingScreen';

const CustomBooking = () => {
  const serviceDetails = {
    title: 'Custom Cleaning',
    addons: [
      { label: ' scrubbing', key: 'tileScrubbing' },
      { label: 'cleaning', key: 'mirrorCleaning' },
      { label: 'Grout removal', key: 'groutRemoval' },
      { label: 'Toilet sanitization', key: 'toiletSanitization' },
    ],
    recurring: ' weekly',
  };

  return <BookingScreen {...serviceDetails} />;
};

export default CustomBooking;
