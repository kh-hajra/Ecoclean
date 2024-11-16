import React from 'react';
import BookingScreen from './BookingScreen';

const IndustrialBooking= () => {
  return (
    <BookingScreen
      serviceTitle="Industrial Cleaning"
      defaultLocation="789 Construction Ave, San Francisco, CA 94102"
      addonsOptions={[
        'Debris Removal',
        'Dust Removal',
        'Window Cleaning',
        'Wall Cleaning'
      ]}
    />
  );
};

export default IndustrialBooking;
