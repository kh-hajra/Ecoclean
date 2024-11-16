import React from 'react';
import BookingScreen from './BookingScreen';

const StreetBooking = () => {
  const serviceDetails = {
    title: 'Sewage Cleaning',
    addons: [
      { label: 'Drain unclogging', key: 'drainUnclogging' },
      { label: 'Septic tank cleaning', key: 'septicTankCleaning' },
      { label: 'Odor control treatment', key: 'odorControl' },
      { label: 'Disinfection', key: 'disinfection' },
    ],
    recurring: 'Every 6 months',
  };

  return <BookingScreen {...serviceDetails} />;
};

export default StreetBooking;
