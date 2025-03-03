import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  MessageSquare, 
  Clock, 
  Home,
  Star
} from 'lucide-react';
import logo from '../../assets/images/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import useLogout from "../../hooks/useLogout";
import { getFCMToken } from "../../firebase";

const Header = ({ scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  
  // Get user and cleaner data from Redux store
  const user = useSelector((state) => state.user.user);
  const cleaner = useSelector((state) => state.cleaner.cleaner);
  
  // Check either user or cleaner is logged in
  const isAuthenticated = useSelector(
    (state) => state.user.isAuthenticated || state.cleaner.isAuthenticated
  );
  
  // Determine user role
  const [userRole, setUserRole] = useState('');
  
  // Get stored username from localStorage (fallback)
  const [displayName, setDisplayName] = useState('');
  
  const { onLogout } = useLogout();

  useEffect(() => {
    // Determine the correct display name and role
    if (user?.username) {
      setDisplayName(user.username);
      setUserRole('user');
    } else if (cleaner?.username) {
      setDisplayName(cleaner.username);
      setUserRole('cleaner');
    } else {
      const storedUsername = localStorage.getItem("username");
      const role = localStorage.getItem("userRole");
      
      if (storedUsername) {
        setDisplayName(storedUsername);
      }
      
      if (role) {
        setUserRole(role);
      }
    }
  }, [user, cleaner]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateFCMToken = async () => {
      if (isAuthenticated) {
        try {
          const userId = localStorage.getItem('userId');
          const fcmToken = await getFCMToken();
          
          if (userId && fcmToken) {
            const response = await fetch("http://localhost:8080/api/v1/users/update-fcm-token", {
              method: "POST",
              headers: { 
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ userId, fcmToken }),
            });
            
            if (!response.ok) {
              throw new Error("Failed to update FCM token");
            }
            
            console.log("FCM token updated successfully");
          }
        } catch (error) {
          console.error("Error updating FCM token:", error);
        }
      }
    };
    
    updateFCMToken();
  }, [isAuthenticated]);

  const navigateToDashboard = () => {
    setIsProfileOpen(false);
    console.log('Current userRole:', userRole, 'from localStorage:', localStorage.getItem('userRole'));
    if (userRole === 'user') {
      console.log('Navigating to dashboard');
      navigate('/dashboard');
    } else {
      console.log('Navigating to / cleaner dashboard');
      navigate('/cleaner-dashboard');
    }
  };

  const navigateToFeedback = () => {
    setIsProfileOpen(false);
    navigate('/feedback');
  };
  console.log('User:', user);
  console.log('Cleaner:', cleaner);
  console.log('isAuthenticated:', isAuthenticated);
  console.log('userRole:', userRole);
  console.log('displayName:', displayName);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            className="h-8 w-auto sm:h-10"
            src={logo}
            alt="EcoClean Logo"
          />
          <span className="text-2xl font-bold text-green-800">EcoClean</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          {['Home', 'Services', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
        
        {!isAuthenticated ? (
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4" ref={profileRef}>
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="bg-white rounded-full p-2 border border-purple-200 shadow-sm hover:shadow-md transition-all">
                <User className="text-purple-500 h-6 w-6" />
              </div>
              <div className="text-green-800 font-semibold hidden md:block">
                Welcome, <span>{displayName}</span>
              </div>
            </div>
            
            {/* Profile Dropdown */}
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-4 top-16 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{displayName}</p>
                  <p className="text-sm text-gray-500 capitalize">{userRole}</p>
                </div>
                <ul className="py-2">
                  <li>
                    <button 
                      onClick={navigateToDashboard}
                      className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-50"
                    >
                      <Home className="w-5 h-5 mr-3 text-gray-500" />
                      <span>{userRole === 'cleaner' ? 'Cleaner Dashboard' : 'My Dashboard'}</span>
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/bookings');
                      }}
                      className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-50"
                    >
                      <Clock className="w-5 h-5 mr-3 text-gray-500" />
                      <span>My Bookings</span>
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={navigateToFeedback}
                      className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-50"
                    >
                      <Star className="w-5 h-5 mr-3 text-gray-500" />
                      <span>Give Feedback</span>
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/profile');
                      }}
                      className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-50"
                    >
                      <Settings className="w-5 h-5 mr-3 text-gray-500" />
                      <span>Settings</span>
                    </button>
                  </li>
                  
                  <li className="border-t border-gray-100 mt-2">
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        onLogout();
                      }}
                      className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-50 text-red-600"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        )}
        
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg rounded-b-2xl mx-4 mt-2"
        >
          <nav className="flex flex-col p-4 space-y-4">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-green-800 hover:text-green-600 transition-colors"
              >
                {item}
              </Link>
            ))}
            
            {isAuthenticated && (
              <>
                <Link
                  to={userRole === 'cleaner' ? '/cleaner-dashboard' : '/dashboard'}
                  className="flex items-center text-green-800 hover:text-green-600"
                >
                  <Home className="w-5 h-5 mr-2" />
                  <span>{userRole === 'cleaner' ? 'Cleaner Dashboard' : 'Dashboard'}</span>
                </Link>
                
                <Link
                  to="/bookings"
                  className="flex items-center text-green-800 hover:text-green-600"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  <span>My Bookings</span>
                </Link>
                
                <Link
                  to="/feedback"
                  className="flex items-center text-green-800 hover:text-green-600"
                >
                  <Star className="w-5 h-5 mr-2" />
                  <span>Give Feedback</span>
                </Link>
              </>
            )}
            
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-center text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-center bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={onLogout}
                className="px-4 py-2 text-center text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors"
              >
                Logout
              </button>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;