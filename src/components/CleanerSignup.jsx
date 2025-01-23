import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, MapPin, FileText, Calendar, Plus, X, UserPlus, Menu } from 'lucide-react';
import Button from "./ui/button"
import logo from "../assets/images/logo.svg"
import { registerCleaner } from '../store/actions/auth/index.js';
import { useDispatch } from 'react-redux';
const servicesBySpecialization = {
  Outdoor: ["Street Cleaning", "Sewage Cleaning", "Garbage Collection", "Residential Exterior Cleaning"],
  Residential: ["Kitchen Cleaning", "Bathroom Cleaning", "Living Room Cleaning", "Bedroom Cleaning"],
  Commercial: ["Office Cleaning", "Industrial Cleaning", "Hospitality Cleaning", "Retail Cleaning"],
  Additional: ["Pest Control", "Carpet Cleaning", "Furniture Polishing"],
};

const SignUpCleaner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    experience: '',
    location: '',
    latitude: '',
    longitude: '',
    verificationDocument: null,
    cleanerName: '',
    promotionalHeadline: '',
    specialization: '',
    desc: '',
    services: [],
    experienceYears: '',
    city: ''
  });
  
  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState({ 
    day: 'Monday', 
    startTime: '', 
    endTime: '',
    city: '',
    location: '',
    lat: '',
    lng: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUsingGeolocation, setIsUsingGeolocation] = useState(false);
  const [locationError, setLocationError] = useState('');

 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear related errors
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    if (name === "specialization") {
      setFormData((prev) => ({ ...prev, services: [] })); // Reset services if specialization changes
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsUsingGeolocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
          setLocationError('');
          setIsUsingGeolocation(false);
        },
        (error) => {
          setLocationError('Failed to get location. Please enter manually.');
          setIsUsingGeolocation(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.specialization) newErrors.specialization = "Specialization is required";
    if (formData.services.length === 0) newErrors.services = "At least one service must be selected";
    if (availabilities.length === 0) newErrors.availabilities = "Please add at least one availability";
    if (!formData.latitude) newErrors.latitude = "Latitude is required";
    if (!formData.longitude) newErrors.longitude = "Longitude is required";
    return newErrors;
  };
  
  // In your SignUpCleaner component, update the handleSubmit function:
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
  
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('latitude', formData.latitude);
      formDataToSend.append('longitude', formData.longitude);
      formDataToSend.append('specialization', formData.specialization);
      formDataToSend.append('services', JSON.stringify(formData.services));
      formDataToSend.append('availabilities', JSON.stringify(availabilities));
  
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }
      console.log('Selected File:', formData.profileImage);

      console.log('FormData frontend:', Array.from(formDataToSend.entries()));

      await dispatch(registerCleaner(formDataToSend)).unwrap();
      navigate("/dashboard", { state: { message: "Registration successful!" } });
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: error.message || "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };
  

// Update the handleServiceChange function:
const handleServiceChange = (e) => {
  const { value, checked } = e.target;

  setFormData((prev) => {
    const updatedServices = checked
      ? [...prev.services, value]
      : prev.services.filter((service) => service !== value);

    return {
      ...prev,
      services: updatedServices,
    };
  });
};

const addAvailability = () => {
  if (newAvailability.startTime && newAvailability.endTime) {
    // Add availability and clear errors
    const updatedAvailability = { ...newAvailability, id: Date.now() };
    setAvailabilities((prev) => [...prev, updatedAvailability]);
    setErrors((prevErrors) => ({ ...prevErrors, availabilities: "" }));  // Clear availability errors
    setNewAvailability({ day: '', startTime: '', endTime: '' }); // Reset form
  } else {
    setErrors((prevErrors) => ({
      ...prevErrors,
      availabilities: "Start and End time are required for availability",
    }));
  }
};


  const removeAvailability = (id) => {
    setAvailabilities(availabilities.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-background shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1 items-center">
              <Button variant="ghost" size="icon" className="mr-4" aria-label="Go back" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Link to="/" className="flex items-center">
                <span className="sr-only">EcoClean</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src={logo}
                  alt="EcoClean Logo"
                />
                <span className="ml-2 text-xl font-bold text-primary">EcoClean</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link to="/home" className="text-base font-medium text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link to="/about" className="text-base font-medium text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link to="/services" className="text-base font-medium text-muted-foreground hover:text-primary">
                Services
              </Link>
              <Link to="/contact" className="text-base font-medium text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link to="/signup" className="whitespace-nowrap text-base font-medium text-muted-foreground hover:text-primary">
                Sign up
              </Link>
              <Button className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700" onClick={() => navigate('/login')}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="EcoClean Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign up as a Cleaner
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join our eco-friendly cleaning community
            </p>
          </div>

          {errors.submit && (
            <div className="text-red-600 text-center mb-4">
              {errors.submit}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    required
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`appearance-none block w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required

                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
              {/* Phone Number Input */}
              <div>
                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">Phone number</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="phone-number"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    required
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
              </div>

              {/* Experience Input */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <textarea
                    id="experience"
                    name="experience"
                    rows={3}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.experience ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                    placeholder="Brief summary of your cleaning experience"
                    value={formData.experience}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {errors.experience && <p className="mt-2 text-sm text-red-600">{errors.experience}</p>}
              </div>
              <div>
  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
  <div className="mt-1 relative rounded-md shadow-sm">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
    </div>
    <input
      id="location"
      name="location"
      type="text"
      required
      className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.location ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
      placeholder="Your location or operating area"
      value={formData.location}
      onChange={handleChange}
    />
  </div>
  
  {/* Latitude Input */}
  <div className="mt-4">
    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
    <input
      id="latitude"
      name="latitude"
      type="text"
      required
      className={`appearance-none block w-full px-3 py-2 border ${errors.latitude ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
      placeholder="Enter latitude"
      value={formData.latitude}
      onChange={handleChange}
    />
    {errors.latitude && <p className="mt-2 text-sm text-red-600">{errors.latitude}</p>}
  </div>

  {/* Longitude Input */}
  <div className="mt-4">
    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
    <input
      id="longitude"
      name="longitude"
      type="text"
      required
      className={`appearance-none block w-full px-3 py-2 border ${errors.longitude ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
      placeholder="Enter longitude"
      value={formData.longitude}
      onChange={handleChange}
    />
    {errors.longitude && <p className="mt-2 text-sm text-red-600">{errors.longitude}</p>}
  </div>

  <button
    type="button"
    onClick={getCurrentLocation}
    className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
  >
    {isUsingGeolocation ? 'Getting Location...' : 'Use Current Location'}
  </button>

  {/* Display Auto-filled Coordinates */}
  {formData.latitude && formData.longitude && (
    <div className="mt-2 text-sm text-gray-500">
      Coordinates (Auto-filled): {formData.latitude}, {formData.longitude}
    </div>
  )}

  {locationError && <p className="mt-2 text-sm text-red-600">{locationError}</p>}
</div>

             {/* Specialization */}
<div className="mb-4">
  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
    Specialization
  </label>
  <select
    name="specialization"
    value={formData.specialization}
    onChange={handleChange}
    className="w-full px-4 py-2 mt-1 border rounded-md"
  >
    <option value="">Select Specialization</option>
    {Object.keys(servicesBySpecialization).map((specialization) => (
      <option key={specialization} value={specialization}>
        {specialization}
      </option>
    ))}
  </select>
  {errors.specialization && <p className="text-sm text-red-500">{errors.specialization}</p>}
</div>

{/* Services */}
{formData.specialization && (
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-700">Select Services:</p>
    {servicesBySpecialization[formData.specialization].map((service) => (
      <label key={service} className="block text-sm">
        <input
          type="checkbox"
          value={service}
          onChange={handleServiceChange}
          checked={formData.services.includes(service)}
          className="mr-2"
        />
        {service}
      </label>
    ))}
    {errors.services && <p className="text-sm text-red-500">{errors.services}</p>}
  </div>
)}
{/* Availability Section */}
<div className="space-y-4">
  <h3 className="text-lg font-medium text-gray-900">Availability</h3>
  <div className="flex flex-wrap gap-2">
    <select
      className="appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      value={newAvailability.day}
      onChange={(e) => setNewAvailability({ ...newAvailability, day: e.target.value })}
    >
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
        <option key={day} value={day}>{day}</option>
      ))}
    </select>
    <input
      type="time"
      className="appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      value={newAvailability.startTime}
      onChange={(e) => setNewAvailability({ ...newAvailability, startTime: e.target.value })}
    />
    <input
      type="time"
      className="appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      value={newAvailability.endTime}
      onChange={(e) => setNewAvailability({ ...newAvailability, endTime: e.target.value })}
    />
    <button
      type="button"
      onClick={addAvailability}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      <Plus className="h-5 w-5 mr-1" /> Add
    </button>
  </div>
  {errors.availabilities && <p className="mt-2 text-sm text-red-600">{errors.availabilities}</p>}
  <ul className="space-y-2">
    {availabilities.map((availability) => (
      <li key={availability.id} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md shadow-sm">
        <span>{availability.day}: {availability.startTime} - {availability.endTime}</span>
        <button
          type="button"
          onClick={() => removeAvailability(availability.id)}
          className="text-red-600 hover:text-red-800 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </li>
    ))}
  </ul>
</div>

              {/* Verification Document Upload */}
              <div>
  <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
    Profile Image (Optional)
  </label>
  <input
    type="file"
    id="profileImage"
    name="profileImage"
    accept=".jpg,.jpeg,.png"
    onChange={(e) => {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setErrors((prev) => ({ ...prev, profileImage: "" })); // Clear errors if any
    }}
    className={`appearance-none block w-full px-3 py-2 border ${
      errors.profileImage ? "border-red-300" : "border-gray-300"
    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
  />
  {errors.profileImage && (
    <p className="mt-2 text-sm text-red-600">{errors.profileImage}</p>
  )}
</div>


              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  {isLoading ? 'Registering...' : 'Sign up as Cleaner'}
                </button>
              </div>
            </div>
          </form>

          <div className="text-sm text-center">
            <Link 
              to="/login" 
              className="font-medium text-green-600 hover:text-green-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCleaner;






