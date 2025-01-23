import React, { useState, useEffect } from 'react';

import { CheckCircle, ArrowRight, MapPin, Calendar, Clock, MapPinIcon } from "lucide-react"
import BackButton from '../components/ui/BackButton';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CleanerModal from './CleanerModal';
import BookingDetails from './BookingDetail';
import street from "../assets/images/street2.png";
// Custom popup styles remain the same
const customPopupStyle = `
 .custom-popup {
  background: transparent;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(67, 56, 224, 0.08);
  padding: 0;
  min-width: 180px;
  max-width: 200px;
  font-family: system-ui, -apple-system, sans-serif;
}

.custom-popup .mapboxgl-popup-content {
  padding: 0;
  background: white;  /* Changed from transparent to white */
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #4338E0;  /* Made border slightly thinner */
}
  .custom-popup .mapboxgl-popup-close-button {
    right: 6px;
    top: 6px;
    color: #4338E0;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    padding: 0;
    outline: none;
    transition: all 0.2s ease;
  }
 .popup-header {
  background: white;  /* Ensuring header is plain white */
  color: #111827;
  padding: 12px;
  border-bottom: 1px solid #E5E7EB;
}
  
  .popup-content {
    background: white;
    padding: 8px 12px 12px;
  }
  
  .popup-info-item {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
    color: #4B5563;
    font-size: 0.85em;
  }
  
  .popup-rating {
    color: #6B7280;
    font-size: 0.8em;
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 3px;
  }
  
  .popup-rating .star {
    color: #4338E0;
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
  const [gettingCurrentLocation, setGettingCurrentLocation] = useState(false);
// ... (previous state declarations remain the same)
const [selectedCleaner, setSelectedCleaner] = useState(null);
const [selectedMarker, setSelectedMarker] = useState(null);
const [showCleanerModal, setShowCleanerModal] = useState(false);
const [currentCleaner, setCurrentCleaner] = useState(null);
  useEffect(() => {
    addCustomStyles();
  }, []);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/services/services/street-cleaning');
        if (!response.ok) throw new Error('Failed to fetch service details');
        const data = await response.json();
        setServiceData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, []);

  useEffect(() => {
    if (showMap) {
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

  useEffect(() => {
    if (map && cleaners && cleaners.length > 0) {
      // Clear existing markers
      const markers = document.getElementsByClassName('mapboxgl-marker');
      while (markers[0]) {
        markers[0].parentNode.removeChild(markers[0]);
      }
  
      cleaners.forEach((cleaner) => {
        if (cleaner.coordinates) {
          const profileImageUrl = cleaner.profileImage || 'default-image-url.png';
          const formattedImageUrl = profileImageUrl.startsWith('http') 
            ? profileImageUrl 
            : `http://localhost:8080/uploads/${profileImageUrl}`;
      
          const popupContent = document.createElement('div');
          popupContent.innerHTML = `
          <div class="popup-container" style="cursor: pointer;">
            <div class="popup-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <img 
                  src="${formattedImageUrl}" 
                  alt="${cleaner.cleanerName || 'Cleaner'}" 
                  style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;"
                />
                <div>
                  <div style="font-weight: 600; font-size: 0.95em;">
                    ${cleaner.cleanerName || 'Cleaner'}
                  </div>
                  <div class="popup-rating">
                    <span class="star">★</span> 
                    <span>${cleaner.rating || '5.0'}</span>
                    <span style="margin: 0 2px;">•</span>
                    <span>${cleaner.distance?.toFixed(1) || 0}km</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="popup-content">
              <div class="popup-info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4338E0" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                ${cleaner.phone || 'N/A'}
              </div>
              <div class="popup-info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4338E0" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12" y2="17"></line>
                </svg>
                ${cleaner.specialization || 'General Cleaning'}
              </div>
            </div>
          </div>
        `;
  
          // Add click event to the popup content
          popupContent.querySelector('.popup-container').addEventListener('click', () => {
            setCurrentCleaner(cleaner);
            setShowCleanerModal(true);
          });
  
          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false,
            className: 'custom-popup',
            maxWidth: '250px'
          })
          .setDOMContent(popupContent);
  
          // Create marker without click handler
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
  }, [map, cleaners, selectedCleaner]);
  const handleCleanerSelect = (cleaner) => {
    setSelectedCleaner(cleaner.id === selectedCleaner?.id ? null : cleaner);
    setShowCleanerModal(false);
  };

  const handleChangeCleaner = () => {
    setSelectedCleaner(null);
  };

  const getCurrentLocation = () => {
    setGettingCurrentLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
          );
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            setBookingDetails({
              ...bookingDetails,
              location: data.features[0].place_name
            });
          }
        } catch (error) {
          console.error('Error getting location:', error);
          alert('Error getting your location. Please try entering it manually.');
        } finally {
          setGettingCurrentLocation(false);
        }
      }, (error) => {
        console.error('Error:', error);
        alert('Unable to get your location. Please try entering it manually.');
        setGettingCurrentLocation(false);
      });
    } else {
      alert('Geolocation is not supported by your browser');
      setGettingCurrentLocation(false);
    }
  };

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
        } else {
          alert('No cleaners found matching your criteria.');
          setCleaners([]);
        }
      } catch (error) {
        console.error('Error fetching cleaners:', error);
        alert(error.message || 'Error loading cleaners. Please try again.');
      }
    } else {
      alert('Please fill all booking details!');
    }
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

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
    <div className="min-h-screen bg-[#f8f9ff]">
    <BackButton to="/outdoor" />
    <div className="relative  lg:h-[400px] flex items-center justify-center overflow-hidden">
  {/* Image */}
  <img
      src={street}
      alt="Street Cleaning"
      className=" mt-20 w-[800px] sm:w-[900px] lg:w-[1000px] object-contain"
    />

  {/* Text Content */}
  <div className="absolute z-10 text-center px-8 max-w-4xl mt-2">
    <p className="text-sm font-medium mb-3 text-white tracking-wide" >We are</p>
    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-wide leading-tight font-serif"  style={{ fontFamily: 'Rische, serif' }}>
      <span className="text-white">Street Clea</span>
      <span className="text-black">nin</span>
      <span className="text-white">g</span>
    </h1>
    <p className="text-lg sm:text-xl lg:text-2xl text-gray-200  pt-5 max-w-2xl mx-auto" >
<span className="text-black">Prof </span> essional street clea<span className="text-black">ning services</span> for your community.  <span className="text-black">Making</span> your neighbor<span className="text-black">hood cleaner</span>,one street at a time.
    </p>

    {/* Ratings */}
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((star) => (
          <svg
            key={star}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-sm text-black-300 ml-2">5000+ Client reviews</span>
      </div>
    </div>
  </div>
</div>

    {/* Booking Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Book Your Cleaning Service</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Date & Time Selection */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold">Select Date & Time</h3>
              </div>
              <div className="space-y-4">
                <input
                  type="date"
                  value={bookingDetails.date}
                  min={today}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="time"
                  value={bookingDetails.time}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Location Selection */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPinIcon className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold">Select Location</h3>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={bookingDetails.location}
                  onChange={handleLocationInput}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-indigo-500 pr-10"
                />
                <button
                  onClick={getCurrentLocation}
                  disabled={gettingCurrentLocation}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <MapPin className="w-5 h-5 text-gray-400 hover:text-indigo-600" />
                </button>
              </div>
              {locationSuggestions.length > 0 && (
                <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100">
                  {locationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectLocation(suggestion)}
                      className="p-3 hover:bg-gray-50 cursor-pointer text-sm"
                    >
                      {suggestion.place_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Services List */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSearchCleaners}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Look for Cleaners
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map and Selected Cleaner */}
      {showMap && (
        <div className="mt-8 space-y-8">
          <div id="map" className="w-full h-96 rounded-xl shadow-lg" />

          {selectedCleaner && (
            <BookingDetails
              selectedCleaner={selectedCleaner}
              service={serviceData}
              bookingDetails={bookingDetails}
              onChangeCleaner={handleChangeCleaner}
            />
          )}
        </div>
      )}

      <CleanerModal
        cleaner={currentCleaner}
        isOpen={showCleanerModal}
        onClose={() => setShowCleanerModal(false)}
        onSelect={handleCleanerSelect}
        isSelected={selectedCleaner?.id === currentCleaner?.id}
      />
    </div>
  </div>
)
}

export default StreetCleaning