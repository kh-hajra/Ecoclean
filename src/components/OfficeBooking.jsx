import React from 'react';
import BookingScreen from './BookingScreen';

const OfficeBooking = () => {
  const serviceDetails = {
    title: 'Office Cleaning',
    addons: [
      { label: 'Pathway sweeping', key: 'pathwaySweeping' },
      { label: 'Trash removal', key: 'trashRemoval' },
      { label: 'Garden maintenance', key: 'gardenMaintenance' },
      { label: 'Disinfection of seating areas', key: 'disinfection' },
    ],
    recurring: 'Every 2 weeks',
  };

  return <BookingScreen {...serviceDetails} />;
};

export default OfficeBooking;
