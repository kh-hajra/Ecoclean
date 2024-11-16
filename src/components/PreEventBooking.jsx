import React from 'react';
import BookingScreen from './BookingScreen';

const PreEventBooking = () => {
  const serviceDetails = {
    title: 'Pre-Event Cleaning',
    addons: [
      { label: 'Surface dusting', key: 'surfaceDusting' },
      { label: 'Trash removal', key: 'trashRemoval' },
      { label: 'Floor polishing', key: 'floorPolishing' },
      { label: 'Bathroom sanitation', key: 'bathroomSanitation' },
    ],
    recurring: 'One-time service',
  };

  return <BookingScreen {...serviceDetails} />;
};

export default PreEventBooking;
