import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};
const center = {
  lat: 37.7749, // Default center (example: San Francisco)
  lng: -122.4194,
};

const StreetBooking = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Add your key
  });

  const [cleaners, setCleaners] = useState([]);
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  const fetchCleaners = async () => {
    try {
      const response = await axios.get('/api/cleaners/nearby', {
        params: {
          longitude: center.lng,
          latitude: center.lat,
          serviceCategory: 'Outdoor', // Replace with dynamic category if needed
        },
      });
      setCleaners(response.data);
    } catch (error) {
      console.error('Error fetching cleaners:', error);
    }
  };

  useEffect(() => {
    fetchCleaners();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Available Cleaners Nearby</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        {cleaners.map((cleaner) => (
          <Marker
            key={cleaner._id}
            position={{
              lat: cleaner.location.coordinates[1],
              lng: cleaner.location.coordinates[0],
            }}
            onClick={() => setSelectedCleaner(cleaner)}
          />
        ))}

        {selectedCleaner && (
          <InfoWindow
            position={{
              lat: selectedCleaner.location.coordinates[1],
              lng: selectedCleaner.location.coordinates[0],
            }}
            onCloseClick={() => setSelectedCleaner(null)}
          >
            <div>
              <h2 className="font-bold">{selectedCleaner.name}</h2>
              <p>Availability: {selectedCleaner.availability}</p>
              <p>Rating: {selectedCleaner.rating || 'N/A'}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default StreetBooking;
