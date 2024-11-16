import React from 'react';
import BookingScreen from './BookingScreen';

const DuringEventBooking = () => {
  const serviceDetails = {
    title: 'During Event Cleaning',
    addons: [
      { label: 'Setup area cleaning', key: 'setupAreaCleaning' },
      { label: 'Pathway sweeping', key: 'pathwaySweeping' },
      { label: 'Trash removal', key: 'trashRemoval' },
      { label: 'Restroom sanitation', key: 'restroomSanitation' },
    ],
    recurring: 'One-time service',
  };

  return <BookingScreen {...serviceDetails} />;
};

export default DuringEventBooking;
