import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Calendar, Clock, MapPin } from "lucide-react";
import BackButton from '../components/ui/BackButton';
import CleanerModal from './CleanerModal';
import BookingDetails from './BookingDetail';
import ServiceHeader from '../components/ServiceHeader';
import BookingForm from '../components/BookingForm';
import ServiceMap from '../components/ServiceMap';
import street from "../assets/images/street2.png";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from 'react-toastify';
import BookingSummaryModal from './BookingSummaryModal';
import { useNavigate } from 'react-router-dom';
mapboxgl.accessToken = 'pk.eyJ1Ijoia2gtaGFqcmEiLCJhIjoiY202M2N4dHI0MTcyaDJqc28yMnNrZG02byJ9.jUssFJPm7xaP0qGAttJxzg';

const packageDescriptions = {
  basic: "Essential maintenance during small events",
  standard: "Active cleaning crew for medium events",
  premium: "Full-service team for large events",
};

const DuringEventCleaning = () => {
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    location: '',
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
 const [cleaners, setCleaners] = useState([]);
 const [showMap, setShowMap] = useState(false);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [gettingCurrentLocation, setGettingCurrentLocation] = useState(false);
 const [selectedCleaner, setSelectedCleaner] = useState(null);
 const [selectedMarker, setSelectedMarker] = useState(null);
 const [showCleanerModal, setShowCleanerModal] = useState(false);
 const [currentCleaner, setCurrentCleaner] = useState(null);
 const [popupZIndex, setPopupZIndex] = useState({});
 const popupRefs = useRef({});
 const [isBookingSummaryOpen, setIsBookingSummaryOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [bookingId, setBookingId] = useState(null);

 useEffect(() => {
   const fetchServiceDetails = async () => {
     try {
       const response = await fetch('http://localhost:8080/api/services/post-event-cleaning');
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

 const handleCleanerSelect = (cleaner) => {
   setSelectedCleaner(cleaner.id === selectedCleaner?.id ? null : cleaner);
   setShowCleanerModal(false);
 };

 const handleChangeCleaner = () => {
   setSelectedCleaner(null);
 };

 const handleLocationInput = async (e) => {
  const value = e.target.value;
  console.log('Input value:', value);
  setBookingDetails(prev => ({ ...prev, location: value }));

  if (value.length > 2) {
    try {
      const searchText = encodeURIComponent(value.trim());
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`;

      // Enhanced parameters for more detailed results
      const params = new URLSearchParams({
        access_token: mapboxgl.accessToken,
        country: 'PK', // Limit to Pakistan
        types: 'address,poi,neighborhood,locality,place', // Include more specific types
        limit: '10', // Increase the number of results
        language: 'en', // Set language to English
        proximity: bookingDetails.coordinates ? 
          `${bookingDetails.coordinates.longitude},${bookingDetails.coordinates.latitude}` : 
          '74.3587,31.5204', // Default to Lahore coordinates
        autocomplete: 'true', // Enable autocomplete
        fuzzyMatch: 'true', // Enable fuzzy matching
      });

      const response = await fetch(`${url}?${params}`);

      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.features) {
        const suggestions = data.features.map(feature => {
          // Extract context information
          const contextParts = feature.context || [];
          const neighborhood = contextParts.find(c => c.id.startsWith('neighborhood'))?.text;
          const locality = contextParts.find(c => c.id.startsWith('locality'))?.text;
          const place = contextParts.find(c => c.id.startsWith('place'))?.text;

          // Create a more detailed place description
          const mainText = feature.text;
          let secondaryText = [
            neighborhood,
            locality,
            place,
            feature.properties?.address,
            feature.context?.map(c => c.text).join(', ')
          ]
            .filter(Boolean)
            .join(', ')
            .replace(/,\s*,/g, ',')
            .replace(/^,\s*/, '')
            .replace(/\s*,\s*$/, '');

          // Remove redundant information
          secondaryText = secondaryText.replace(new RegExp(`^${mainText},\\s*`), '');

          return {
            place_name: feature.place_name,
            main_text: mainText,
            secondary_text: secondaryText,
            coordinates: {
              longitude: feature.center[0],
              latitude: feature.center[1]
            },
            // Add additional metadata for better display
            type: feature.place_type[0],
            relevance: feature.relevance,
            properties: feature.properties
          };
        })
        // Sort by relevance
        .sort((a, b) => b.relevance - a.relevance)
        // Filter out duplicate places
        .filter((suggestion, index, self) => 
          index === self.findIndex(s => s.place_name === suggestion.place_name)
        );

        setLocationSuggestions(suggestions);
      }
    } catch (err) {
      console.error('Error in handleLocationInput:', err);
      toast.error('Unable to fetch location suggestions. Please try again.');
      setLocationSuggestions([]);
    }
  } else {
    setLocationSuggestions([]);
  }
};

const handleSelectLocation = (suggestion) => {
  if (!suggestion) return;

  setBookingDetails(prev => ({
    ...prev,
    location: suggestion.place_name,
    coordinates: {
      longitude: suggestion.coordinates.longitude,
      latitude: suggestion.coordinates.latitude
    }
  }));

  setLocationSuggestions([]);
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
        
        if (!response.ok) {
          throw new Error('Failed to fetch location details');
        }
        
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          setBookingDetails(prev => ({
            ...prev,
            location: data.features[0].place_name,
            coordinates: {
              longitude: longitude,
              latitude: latitude
            }
          }));
        }
      } catch (error) {
        console.error('Error getting location:', error);
        toast.error('Error getting your location. Please try entering it manually.');
      } finally {
        setGettingCurrentLocation(false);
      }
    }, (error) => {
      console.error('Geolocation error:', error);
      toast.error('Unable to get your location. Please try entering it manually.');
      setGettingCurrentLocation(false);
    });
  } else {
    toast.error('Geolocation is not supported by your browser');
    setGettingCurrentLocation(false);
  }
};


 const handleSearchCleaners = async () => {
   if (bookingDetails.date && bookingDetails.time && bookingDetails.location) {
     try {
       const queryParams = new URLSearchParams({
         location: bookingDetails.location,
         specialization: "Additional Services",
         service: "During-Event Cleaning",
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


 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error: {error}</div>;
 const services = serviceData?.features || [
   "Thorough venue inspection",
 "Deep cleaning of all surfaces",
 "Furniture arrangement",
 "Restroom preparation",
 "Air quality management",
 "Equipment sanitization",
 ];
 const handleConfirmBooking = async () => {
    console.log("handleConfirmBooking started");
    setIsSubmitting(true);
    
    try {
      // Validate required data
      if (!selectedCleaner?.id || !selectedPackage?.price || !bookingDetails?.date || !bookingDetails?.duration) {
        throw new Error('Missing required booking information');
      }
  
      // Validate coordinates
      if (!bookingDetails.coordinates || 
          typeof bookingDetails.coordinates.longitude !== 'number' || 
          typeof bookingDetails.coordinates.latitude !== 'number') {
        throw new Error('Invalid location coordinates. Please select a valid location.');
      }
  
      const formattedDate = new Date(bookingDetails.date);
      
      // Structure location data properly
      const locationData = {
        type: 'Point',
        coordinates: [
          bookingDetails.coordinates.longitude,
          bookingDetails.coordinates.latitude
        ],
        address: bookingDetails.location
      };
  
      const totalPrice = selectedPackage.price * bookingDetails.duration;
  
      const payload = {
        userId: localStorage.getItem('userId'),
        cleanerId: selectedCleaner.id,
        service: serviceData.name,
        packageDetails: {
          name: selectedPackage.name,
          price: selectedPackage.price,
          duration: bookingDetails.duration
        },
        date: formattedDate,
        time: bookingDetails.time,
        duration: bookingDetails.duration,
        location: locationData,
        totalPrice: totalPrice,
        status: 'Pending'
      };
  
      console.log("Sending payload:", payload);
  
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:8080/api/bookings/confirm', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      console.log("Response received:", response.status);
  
      const data = await response.json();
      console.log("Response data:", data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking');
      }
  
     // After receiving the booking response:
const bookingId = data._id || data.booking?._id;
if (!bookingId) {
  throw new Error('No booking ID received from server');
}

// Store both the ID and totalPrice
localStorage.setItem('bookingId', bookingId);
localStorage.setItem('totalPrice', totalPrice.toString());

// Add detailed logging to help with debugging
console.log('Booking created with ID:', bookingId);
console.log('Total price:', totalPrice);
  
      console.log("Booking successful, stored data:", {
        bookingId: localStorage.getItem('bookingId'),
        totalPrice: localStorage.getItem('totalPrice')
      });
  
      toast.success('Booking created successfully');
      setIsBookingSummaryOpen(false);
      navigate('/payment');
      return true;
  
    } catch (error) {
      console.error('Error confirming booking:', error);
      toast.error(error.message || 'Error creating booking. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleProceedToCheckout = (packageDetails) => {
    console.log("handleProceedToCheckout called with:", packageDetails);
    setSelectedPackage(packageDetails);
    setIsBookingSummaryOpen(true);
  };
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
   <BackButton to="/event" />
    <div className="relative lg:h-[400px] flex items-center justify-center overflow-hidden">
      <img
        src={street}
        alt="pre event Cleaning"
        className="mt-20 w-[800px] sm:w-[900px] lg:w-[1000px] object-contain"
      />
      <div className="absolute z-10 text-center  max-w-10xl mt-2">
        <p className="text-sm font-medium mb-3 text-white tracking-wide">We are</p>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-wide leading-tight font-serif whitespace-nowrap" style={{ fontFamily: 'Rische, serif' }}>
        <span className="text-black">D</span>
        <span className="text-white">uring-Event </span>
  <span className="text-black">Clea</span>
  <span className="text-white">nin</span>
  <span className="text-black">g</span>
</h1>
<p className="text-lg sm:text-xl lg:text-2xl text-gray-200 pt-5 max-w-3xl mx-auto text-center">
  <span className="text-black">Profess</span>ional cleaning supp<span className="text-black">ort to maint</span>ain tidiness and hygiene throu<span className="text-black">ghout your ev</span>ent
</p>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <BookingForm
          bookingDetails={bookingDetails}
          setBookingDetails={setBookingDetails}
          handleSearchCleaners={handleSearchCleaners}
          gettingCurrentLocation={gettingCurrentLocation}
          locationSuggestions={locationSuggestions}
          handleLocationInput={handleLocationInput}
          handleSelectLocation={handleSelectLocation}
          getCurrentLocation={getCurrentLocation}
          services={services}
        />
      </div>
      {showMap && (
        <div className="space-y-8">
          <div>
            <ServiceMap
              cleaners={cleaners}
              setCurrentCleaner={setCurrentCleaner}
              setShowCleanerModal={setShowCleanerModal}
            />
          </div>
          {selectedCleaner && (
              <div>
                <BookingDetails
                  selectedCleaner={selectedCleaner}
                  service={serviceData}
                  bookingDetails={bookingDetails}
                  onChangeCleaner={handleChangeCleaner}
                  packageDescriptions={packageDescriptions}
                  onProceed={handleProceedToCheckout}
                />
              </div>
            )}
        </div>
      )}
    </div>
    <CleanerModal
      cleaner={currentCleaner}
      isOpen={showCleanerModal}
      onClose={() => setShowCleanerModal(false)}
      onSelect={handleCleanerSelect}
      isSelected={selectedCleaner?.id === currentCleaner?.id}
    />
     {isBookingSummaryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <BookingSummaryModal
            onPaymentClick={handleConfirmBooking} // Ensure this is passed correctly
            selectedCleaner={selectedCleaner}
            service={serviceData}
            bookingDetails={bookingDetails}
            selectedPackage={selectedPackage}
            onEdit={() => setIsBookingSummaryOpen(false)}
            isSubmitting={isSubmitting}
            onClose={() => setIsBookingSummaryOpen(false)}
          />
        </div>
      )}
  </div>
  );
};

export default DuringEventCleaning;