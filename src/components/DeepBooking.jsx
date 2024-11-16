import React from 'react';
import BookingScreen from './BookingScreen';

const DeepCleaningBooking = () => {
  return (
    <BookingScreen
      serviceTitle="Deep Cleaning"
      defaultLocation="123 Main St, San Francisco, CA 94102"
      addonsOptions={[
        'Kitchen Appliance Cleaning',
        'Grout Scrubbing',
        'Furniture Polishing',
        'Window Cleaning'
      ]}
    />
  );
};

export default DeepCleaningBooking;
