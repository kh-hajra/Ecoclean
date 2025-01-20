import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Custom popup styles remain the same
const customPopupStyle = `
  .custom-popup {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 0;
    min-width: 180px;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .custom-popup .mapboxgl-popup-content {
    padding: 0;
    background: transparent;
  }
  .custom-popup .mapboxgl-popup-close-button {
    right: 4px;
    top: 4px;
    color: #fff;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    padding: 0;
  }
  .popup-header {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    padding: 8px 12px;
    border-radius: 8px 8px 0 0;
    font-size: 0.9em;
  }
  .popup-content {
    padding: 8px 12px;
    font-size: 0.85em;
  }
  .popup-info-item {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
    color: #374151;
  }
  .popup-rating {
    font-size: 0.8em;
    margin-top: 2px;
  }
`;

// Add styles to document
const addCustomStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = customPopupStyle;
  document.head.appendChild(styleSheet);
};

mapboxgl.accessToken = 'pk.eyJ1Ijoia2gtaGFqcmEiLCJhIjoiY202M2N4dHI0MTcyaDJqc28yMnNrZG02byJ9.jUssFJPm7xaP0qGAttJxzg';

function StreetCleaning() {
  const [serviceData, setServiceData] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    location: '',
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [map, setMap] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add custom styles on mount
  useEffect(() => {
    addCustomStyles();
  }, []);

  // Fetch service details on component mount
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/services/services/street-cleaning');
        if (!response.ok) throw new Error('Failed to fetch service details');
        const data = await response.json();
        console.log('Service data:', data);
        setServiceData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, []);

  // Initialize map
  useEffect(() => {
    if (showMap && !map) {
      try {
        const mapInstance = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [0, 0],
          zoom: 13,
          minZoom: 3,
          maxZoom: 18,
          scrollZoom: true,
        });

        mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

        mapInstance.on('load', () => {
          console.log('Map loaded successfully');
        });

        setMap(mapInstance);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [showMap]);

  // Handle markers
  useEffect(() => {
    if (map && cleaners && cleaners.length > 0) {
      // Clear existing markers
      const markers = document.getElementsByClassName('mapboxgl-marker');
      while(markers[0]) {
        markers[0].parentNode.removeChild(markers[0]);
      }

      cleaners.forEach((cleaner) => {
        if (cleaner.coordinates) {
          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false,
            className: 'custom-popup',
            maxWidth: '200px'
          })
          .setHTML(`
            <div>
              <div class="popup-header">
                <div style="font-weight: 600;">
                  ${cleaner.cleanerName || 'Cleaner'}
                </div>
                <div class="popup-rating">
                  ★ ${cleaner.rating || '5.0'} • ${cleaner.distance?.toFixed(1) || 0}km
                </div>
              </div>
              <div class="popup-content">
                <div class="popup-info-item">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  ${cleaner.phone || 'N/A'}
                </div>
                <div class="popup-info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12" y2="17"></line>
                  </svg>
                  ${cleaner.specialization || 'General Cleaning'}
                </div>
              </div>
            </div>
          `);

          new mapboxgl.Marker({
            color: '#22c55e',
            scale: 0.8
          })
          .setLngLat([cleaner.coordinates.longitude, cleaner.coordinates.latitude])
          .setPopup(popup)
          .addTo(map);

          popup.addTo(map);
        }
      });

      if (cleaners[0]?.coordinates) {
        const bounds = new mapboxgl.LngLatBounds();
        cleaners.forEach(cleaner => {
          if (cleaner.coordinates) {
            bounds.extend([cleaner.coordinates.longitude, cleaner.coordinates.latitude]);
          }
        });
        map.fitBounds(bounds, { padding: 50 });
      }
    }
  }, [map, cleaners]);

  // Location suggestions handler
  const handleLocationInput = async (e) => {
    const value = e.target.value;
    setBookingDetails({ ...bookingDetails, location: value });

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${mapboxgl.accessToken}&types=address`
        );
        const data = await response.json();
        setLocationSuggestions(data.features.map(feature => ({
          place_name: feature.place_name,
          coordinates: feature.center
        })));
      } catch (err) {
        console.error('Error fetching location suggestions:', err);
      }
    } else {
      setLocationSuggestions([]);
    }
  };

  // Select location from suggestions
  const handleSelectLocation = (suggestion) => {
    setBookingDetails({
      ...bookingDetails,
      location: suggestion.place_name
    });
    setLocationSuggestions([]);
  };

  const handleSearchCleaners = async () => {
    if (bookingDetails.date && bookingDetails.time && bookingDetails.location) {
      try {
        const queryParams = new URLSearchParams({
          location: bookingDetails.location,
          specialization: "Outdoor",
          service: "Street Cleaning",
          date: bookingDetails.date,
          time: bookingDetails.time,
        }).toString();

        const response = await fetch(
          `http://localhost:8080/api/cleaners/nearby?${queryParams}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch cleaners');
        }

        const data = await response.json();
        
        if (data.cleaners && Array.isArray(data.cleaners) && data.cleaners.length > 0) {
          setCleaners(data.cleaners);
          setShowMap(true);

          if (map && data.cleaners[0]?.coordinates) {
            const bounds = new mapboxgl.LngLatBounds();
            data.cleaners.forEach((cleaner) => {
              if (cleaner.coordinates) {
                bounds.extend([
                  cleaner.coordinates.longitude,
                  cleaner.coordinates.latitude,
                ]);
              }
            });
            map.fitBounds(bounds, { padding: 50 });
          }
        } else {
          alert('No cleaners found matching your criteria.');
          setCleaners([]);
          setShowMap(false);
        }
      } catch (error) {
        console.error('Error fetching cleaners:', error);
        alert(error.message || 'Error loading cleaners. Please try again.');
      }
    } else {
      alert('Please fill all booking details!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const services = serviceData?.features || [
    "Mechanical sweeping of streets and roads",
    "Litter and debris removal",
    "Gutter and curb cleaning",
    "Stormwater drain maintenance",
    "Graffiti removal",
    "Leaf collection and disposal",
    "Snow and ice removal (seasonal)",
    "Special event clean-up",
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <BackButton to="/outdoor" />
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
              <span>Street </span>
              <span className="text-green-600">Cleaning</span>
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              {serviceData?.description || 'Professional street cleaning services for your community'}
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
  <img
    src={serviceData?.imageUrl || '/api/placeholder/600/400'}
    alt="Street Cleaning Service"
    className="w-2/3 max-w-xs rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
  />
</div>


        </div>

        {!showMap ? (
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Book Your Cleaning Service</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={bookingDetails.date}
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      date: e.target.value
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={bookingDetails.time}
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      time: e.target.value
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-700 font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter full address (e.g., 123 Main St, City, Country)"
                    value={bookingDetails.location}
                    onChange={handleLocationInput}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {locationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg">
                      {locationSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectLocation(suggestion)}
                        >
                          {suggestion.place_name}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Please enter a complete address for accurate results
                  </p>
                </div>
              </div>
              <button
                onClick={handleSearchCleaners}
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition-colors"
              >
                Look for Cleaners
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Cleaners</h2>
            <div id="map" className="w-full h-96 rounded-lg shadow-lg"></div>
          </div>
        )}

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4 mt-12">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Clean streets,</span>
                <span className="block text-green-600">happy communities</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                {serviceData?.additionalDetails || 'Our street cleaning services are designed to maintain the cleanliness and safety of your communitys roads and public spaces. From regular sweeping to specialized cleaning, we ensure your streets stay in top condition year-round.'}
              </p>
            </div>
          </div>
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">{service}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreetCleaning;