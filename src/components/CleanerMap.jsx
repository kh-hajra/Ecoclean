import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function CleanerMap({ availableCleaners }) {
  const mapRef = useRef();

  useEffect(() => {
    if (availableCleaners.length > 0) {
      mapRef.current.leafletElement.fitBounds(
        availableCleaners.map(cleaner => [cleaner.location.coordinates[1], cleaner.location.coordinates[0]])
      );
    }
  }, [availableCleaners]);

  return (
    <div className="mt-8">
      <MapContainer
        center={[51.505, -0.09]} 
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {availableCleaners.map((cleaner) => (
          <Marker
            key={cleaner._id}
            position={[cleaner.location.coordinates[1], cleaner.location.coordinates[0]]}
          >
            <Popup>
              <div>
                <h4>{cleaner.name}</h4>
                <p>Rating: {cleaner.rating}</p>
                <p>Availability: {cleaner.availability}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CleanerMap;
