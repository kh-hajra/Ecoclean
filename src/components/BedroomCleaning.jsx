import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import CleanerModal from './CleanerModal';
import BookingDetails from './BookingDetail';
import BookingForm from '../components/BookingForm';
import ServiceMap from '../components/ServiceMap';
import bedroomCleaningImage from "../assets/images/street2.png";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from 'react-toastify';
import BookingSummaryModal from './BookingSummaryModal';
mapboxgl.accessToken = 'pk.eyJ1Ijoia2gtaGFqcmEiLCJhIjoiY202M2N4dHI0MTcyaDJqc28yMnNrZG02byJ9.jUssFJPm7xaP0qGAttJxzg';


const packageDescriptions = {
  basic: "Basic bedroom cleaning including dusting and vacuuming",
  standard: "Comprehensive cleaning including bed making and furniture cleaning",
  premium: "Deep cleaning with sanitization and upholstery cleaning",
};

const BedroomCleaning = () => {
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
  const [showCleanerModal, setShowCleanerModal] = useState(false);
  const [currentCleaner, setCurrentCleaner] = useState(null);
 const [isBookingSummaryOpen, setIsBookingSummaryOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [bookingId, setBookingId] = useState(null);
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/services/bedroom-cleaning');
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
          specialization: "Residential",
          service: "Bedroom Cleaning",
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
    "Dusting and vacuuming",
    "Bed making",
    "Furniture cleaning",
    "Closet organization",
    "Floor mopping and sanitization",
    "Trash removal",
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
      <BackButton to="/residential" />
      <div className="relative lg:h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={bedroomCleaningImage}
          alt="Bedroom Cleaning"
          className="mt-20 w-[800px] sm:w-[900px] lg:w-[1000px] object-contain"
        />
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
            <ServiceMap
              cleaners={cleaners}
              setCurrentCleaner={setCurrentCleaner}
              setShowCleanerModal={setShowCleanerModal}
            />
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

export default BedroomCleaning;
