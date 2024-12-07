import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Main Listing Pages
import HomeScreen from './components/home-screen';
import Residential from './components/Residential';
import Commercial from './components/Commercial';
import Outdoor from './components/Outdoor';
import Event from './components/Event';
import ServiceSummary from './components/ServiceSummary';
import BookingConfirmation from './components/BookingConfirmation';
import AboutUs from './components/AboutUs'
// Residential Cleaning Pages
import BookingScreen from './components/BookingScreen';
import CustomCleaning from './components/CustomCleaning';
import CustomBooking from './components/CustomBooking';
import StandardCleaning from './components/StandardCleaning';
import StandardBooking from './components/StandardBooking';
import DeepCleaning from './components/DeepCleaning';
import DeepBooking from './components/DeepBooking';
import MoveInMoveOutCleaning from './components/MoveinMoveoutCleaning';
import MoveInMoveOutBooking from './components/MoveinMoveoutBooking';
import Payment from './components/Payment';
// Commercial Cleaning Pages
import OfficeCleaning from './components/OfficeCleaning';
import OfficeBooking from './components/OfficeBooking';
import IndustrialCleaning from './components/IndustrialCleaning';
import IndustrialBooking from './components/IndustrialBooking';
import RetailCleaning from './components/retail-cleaning';

import HospitalityCleaning from './components/hospitality-cleaning';

import EducationalFacilityCleaning from './components/educational-facility-cleaning';

import CommercialSpecialtyCleaning from './components/commercial-specialty-cleaning';

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
function App() {
  return (
    <Router>
      <Routes>
    <Route path="/" element={<HomeScreen />} />
    
    {/* Services Routes */}
    <Route path="/residential" element={<Residential />} />
     <Route path="/About" element={<AboutUs/>}/>
     <Route path="/Contact" element={<Contact/>}/>
     <Route path="/Payment" element={<Payment/>}/>
      {/* Routes for individual service pages */}
      <Route path="/residential/custom-cleaning" element={<CustomCleaning />} />
      <Route path="/residential/standard-cleaning" element={<StandardCleaning />} />
      <Route path="/residential/deep-cleaning" element={<DeepCleaning />} />
      <Route path="/residential/custom-cleaning/CustomBooking" element={<CustomBooking />} />
      <Route path="/residential/custom-cleaning/StandardBooking" element={<StandardBooking />} />
      <Route path="/residential/custom-cleaning/DeepBooking" element={<DeepBooking />} />
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
        <Route path="/outdoor/street-cleaning/StreetBooking" element={<StreetBooking />} />
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
       <Route path="/commercial/OfficeCleaning" element={<OfficeCleaning />} />
       <Route path="/commercial/OfficeCleaningOfficeBooking" element={<OfficeBooking />} />
       <Route path="/commercial/IndustrialCleaning" element={<IndustrialCleaning />} />
       <Route path="/commercial/IndustrialCleaningIndustrialBooking" element={<IndustrialBooking />} />



      </Routes>
    </Router>
  );
}

export default App;
