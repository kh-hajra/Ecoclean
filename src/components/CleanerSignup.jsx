import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, MapPin, FileText, Calendar, Plus, X, UserPlus, Menu } from 'lucide-react';
import  Button  from "./ui/button"
import logo from "../assets/images/logo.svg"
const SignUpCleaner = () => {
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
  });
  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState({ day: 'Monday', start: '', end: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience details are required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (availabilities.length === 0) newErrors.availabilities = 'At least one availability slot is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // Here you would typically send the data to your backend
    console.log('Sign up as cleaner attempt with:', { ...formData, availabilities });
    // Reset form after successful submission
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      experience: '',
      location: '',
    });
    setAvailabilities([]);
    setNewAvailability({ day: 'Monday', start: '', end: '' });
  };

  const addAvailability = () => {
    if (newAvailability.start && newAvailability.end) {
      setAvailabilities([...availabilities, { ...newAvailability, id: Date.now() }]);
      setNewAvailability({ day: 'Monday', start: '', end: '' });
      setErrors({ ...errors, availabilities: '' });
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
                  src={logo} // Correct File Reference
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
              <Button className="group relative  flex justify-center py-2 px-4 mx-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => navigate('/signup-cleaner')}>
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
                  className="h-8 w-auto sm:h-10"
                  src={logo} // Correct File Reference
                  alt="EcoClean Logo"
                />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up as a Cleaner</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join our eco-friendly cleaning community
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                    autoComplete="name"
                    required
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
              </div>
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
                {errors.location && <p className="mt-2 text-sm text-red-600">{errors.location}</p>}
              </div>
            </div>

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
                  value={newAvailability.start}
                  onChange={(e) => setNewAvailability({ ...newAvailability, start: e.target.value })}
                />
                <input
                  type="time"
                  className="appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={newAvailability.end}
                  onChange={(e) => setNewAvailability({ ...newAvailability, end: e.target.value })}
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
                    <span>{availability.day}: {availability.start} - {availability.end}</span>
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

            <div>
              <label htmlFor="verification" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Documents
              </label>
              <input
                type="file"
                id="verification"
                name="verification"
                accept=".pdf,.jpg,.jpeg,.png"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <UserPlus className="h-5 w-5 text-green-500 group-hover:text-green-400" aria-hidden="true" />
                </span>
                Sign up as Cleaner
              </button>
            </div>
          </form>

          <div className="text-sm text-center">
            <a href="/login" className="font-medium text-green-600 hover:text-green-500 transition duration-150 ease-in-out">
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCleaner;