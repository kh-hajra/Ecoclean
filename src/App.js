import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { setUser } from './store/reducers/user';
import { setCleaner } from "./store/reducers/cleaner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-toastify/dist/ReactToastify.css';
import { getFCMToken, onMessageListener } from "./firebase";
// Main Listing Pages
import HomeScreen from './components/home-screen';
import Residential from './components/Residential';
import Commercial from './components/Commercial';
import Outdoor from './components/Outdoor';
import Event from './components/Event';
import ServiceSummary from './components/ServiceSummary';
import BookingConfirmation from './components/BookingConfirmation';
import AboutUs from './components/AboutUs'
import BookingSummaryPage from './components/BookingSummaryPage';
import PaymentPage from './components/PaymentPage';
import CleanerDashboard from "./components/CleanerDashboard";
import UserNotification from "./components/UserNotification";
// Residential Cleaning Pages
import BookingScreen from './components/BookingScreen';
import KitchenCleaning from './components/KitchenCleaning';
import LivingRoomCleaning from './components/LivingRoomCleaning';
import SewageCleaning from './components/SewageCleaning';
import StandardBooking from './components/StandardBooking';
import BathroomCleaning from './components/BathroomCleaning';
import BedroomCleaning from './components/BedroomCleaning';
import MoveInMoveOutCleaning from './components/MoveinMoveoutCleaning';
import MoveInMoveOutBooking from './components/MoveinMoveoutBooking';

// Commercial Cleaning Pages
import OfficeCleaning from './components/OfficeCleaning';
import OfficeBooking from './components/OfficeBooking';
import IndustrialCleaning from './components/IndustrialCleaning';
import IndustrialBooking from './components/IndustrialBooking';
import RetailCleaning from './components/retail-cleaning';
import Dashboard from './components/CleanerDashboard';
import HospitalityCleaning from './components/hospitality-cleaning';
import NotificationsPage from "./components/NotificationsPage";
import EducationalFacilityCleaning from './components/educational-facility-cleaning';

import CommercialSpecialtyCleaning from './components/commercial-specialty-cleaning';
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
// Outdoor Cleaning Pages
import StreetCleaning from './components/StreetCleaning';
import StreetBooking from './components/StreetBooking';
import ResidentialExteriorCleaning from './components/ResidentialExteriorCleaning';
import ResidentialExteriorBooking from './components/ResidentialExteriorBooking';
import GarbageCollection from './components/GarbageCollection';
import ResidentialGarbageCollection from './components/residential-garbage-collection';
import RecyclingServices from './components/recycling-services';
import ScheduledPickups from './components/scheduled-pickups';
// Event Cleaning Pages
import PreEventCleaning from './components/PreEventCleaning';
import PreEventBooking from './components/PreEventBooking';
import DuringEventBooking from './components/PreEventBooking';
import DuringEventCleaning from './components/DuringEventCleaning';
import PostEventBooking from './components/PreEventBooking';
import PostEventCleaning from './components/PostEventCleaning';
import Login from './components/login';
import SignUp from './components/signup';
import SignUpCleaner from './components/CleanerSignup';
import Contact from './components/Contact';
import { Providers } from './store/Providers';
import PaymentSuccess from './components/PaymentSuccessComponent';
import BookingsPage from './components/BookingViewPage';
import FeedbackPage from './components/FeedbackPage';
import UserDashboard from './components/UserDashboard';
import GenericFeedbackPage from './components/GenericFeedbackPage'; 
function App() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');
    const cleanerToken = localStorage.getItem("cleanerToken");
    if (userId && userToken && userRole) {
      dispatch(
        setUser({
          accessToken: userToken,
          _id: userId,
          role: userRole,
        })
      );
    }
    if (cleanerToken) {
      // Fetch cleaner data using the token and dispatch setCleaner
      dispatch(setCleaner({ token: cleanerToken }));
    }
    
  }, [dispatch]);
  useEffect(() => {
    // Get the FCM token when the app loads
    getFCMToken();
    
    // Listen for incoming messages
    onMessageListener().then((payload) => {
      console.log("Notification received:", payload);
      toast.info(`${payload.notification.title}: ${payload.notification.body}`);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    });
  }, []);
  return (

    <Router>
      <Routes>
     
    <Route path="/" element={<HomeScreen />} />
    
    {/* Services Routes */}
    <Route path="/residential" element={<Residential />} />
     <Route path="/About" element={<AboutUs/>}/>
     <Route path="/Contact" element={<Contact/>}/>
     <Route path="/payment" element={<PaymentPage />} />
   
     <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/bookings" element={<BookingsPage />} />
         <Route path="/cleaner-dashboard" element={<CleanerDashboard />} />
         <Route path="/user-notifications" element={<UserNotification />} />
         <Route path="/feedback/:bookingId" element={<FeedbackPage />} />
         <Route path="/feedback" element={<GenericFeedbackPage />} />
      {/* Routes for individual service pages */}
       {/* User Dashboard */}
       <Route path="/dashboard" element={<UserDashboard />} />

{/* Notifications Page */}
<Route path="/notifications" element={<NotificationsPage />} />
      
      <Route path="/residential/bedroom-cleaning" element={<BedroomCleaning />} />
      <Route path="/residential/bathroom-cleaning" element={<BathroomCleaning />} />
      <Route path="/residential/livingroom-cleaning" element={<LivingRoomCleaning />} />
      <Route path="/residential/kitchen-cleaning" element={<KitchenCleaning />} />
    <Route path="/commercial" element={<Commercial />} />
    {/* Retail Cleaning */}
    <Route path="/commercial/retail-cleaning" element={<RetailCleaning />} />
        
    <Route path="/commercial/retail-cleaning/BookingScreen" element={<BookingScreen />} />
        {/* Hospitality Cleaning */}
        <Route path="/commercial/hospitality-cleaning" element={<HospitalityCleaning />} />
        <Route path="/commercial/hospitality-cleaning/BookingScreen" element={<BookingScreen />} />

        {/* Educational Facility Cleaning */}
        <Route path="/commercial/educational-facility-cleaning" element={<EducationalFacilityCleaning />} />
        <Route path="/commercial/educational-facility-cleaning/BookingScreen" element={<BookingScreen />} />

        {/* Commercial Specialty Cleaning */}
        <Route path="/commercial/commercial-specialty-cleaning" element={<CommercialSpecialtyCleaning />} />
        <Route path="/commercial/commercial-specialty-cleaning/BookingScreen" element={<BookingScreen />} />
        <Route path="/event" element={<Event />} />
         <Route path="/event/pre-event-cleaning" element={<PreEventCleaning />} />
        <Route path="/event/pre-event-booking/PreEventBooking" element={<PreEventBooking />} />
        <Route path="/event/during-event-cleaning" element={<DuringEventCleaning />} />
        <Route path="/event/during-event-booking/DuringEventBooking" element={<DuringEventBooking />} />
        <Route path="/event/post-event-cleaning" element={<PostEventCleaning />} />
        <Route path="/event/post-event-booking/PostEventBooking " element={<PostEventBooking />} />
        <Route path="/outdoor" element={<Outdoor />} />

        <Route path="/outdoor/street-cleaning" element={<StreetCleaning />} />
        <Route path="/outdoor/sewage-cleaning" element={<SewageCleaning />} />
        <Route path="/outdoor/residential-exterior" element={<ResidentialExteriorCleaning />} />
        <Route path="/outdoor/garbage-collection" element={<GarbageCollection />} />
        <Route path="/outdoor/residential-exterior/ResidentialExteriorBooking" element={<ResidentialExteriorBooking />} />
   
          <Route path="/outdoor/garbage-collection/residential" element={<ResidentialGarbageCollection />} />
          <Route path="/outdoor/garbage-collection/residential/BookingScreen" element={<BookingScreen />} />
          <Route path="/outdoor/garbage-collection/recycling" element={<RecyclingServices />} />
          <Route path="/outdoor/garbage-collection/recycling/BookingScreen" element={<BookingScreen />} />
          <Route path="/outdoor/garbage-collection/scheduled-pickups" element={<ScheduledPickups />} />
          <Route path="/outdoor/garbage-collection/scheduled-pickups/BookingScreen" element={<BookingScreen />} />

        <Route path="/ServiceSummary" element={<ServiceSummary />} />
        <Route path="/BookingConfirmation" element={<BookingConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-cleaner" element={<SignUpCleaner />} />
     
        {/* Commercial Cleaning Routes */}
       <Route path="/commercial/office-cleaning" element={<OfficeCleaning />} />
       <Route path="/commercial/OfficeCleaningOfficeBooking" element={<OfficeBooking />} />
       <Route path="/commercial/industrial-cleaning" element={<IndustrialCleaning />} />
       <Route path="/commercial/IndustrialCleaningIndustrialBooking" element={<IndustrialBooking />} />



      </Routes>
    </Router>

  );
}

export default App;
