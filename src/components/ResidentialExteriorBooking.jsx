import React from 'react';
import BookingScreen from './BookingScreen';

const ResidentialExteriorBooking = () => {
  const serviceDetails = {
    title: 'ResidentailExterior Cleaning',
    addons: [
      { label: 'Pathway cleaning', key: 'pathwayCleaning' },
      { label: 'Trash removal', key: 'trashRemoval' },
      { label: 'Common area sanitization', key: 'commonAreaSanitization' },
      { label: 'Lift disinfection', key: 'liftDisinfection' },
    ],
    recurring: 'Monthly',
  };

  return <BookingScreen {...serviceDetails} />;
};

export default ResidentialExteriorBooking;
