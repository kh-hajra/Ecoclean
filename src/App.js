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

// Residential Cleaning Pages
import CustomCleaning from './components/CustomCleaning';
import CustomBooking from './components/CustomBooking';
import StandardCleaning from './components/StandardCleaning';
import StandardBooking from './components/StandardBooking';
import DeepCleaning from './components/DeepCleaning';
import DeepBooking from './components/DeepBooking';
import MoveInMoveOutCleaning from './components/MoveinMoveoutCleaning';
import MoveInMoveOutBooking from './components/MoveinMoveoutBooking';

// Commercial Cleaning Pages
import OfficeCleaning from './components/OfficeCleaning';
import OfficeBooking from './components/OfficeBooking';
import IndustrialCleaning from './components/IndustrialCleaning';
import IndustrialBooking from './components/IndustrialBooking';

// Outdoor Cleaning Pages
import StreetCleaning from './components/StreetCleaning';
import StreetBooking from './components/StreetBooking';
import ResidentialExteriorCleaning from './components/ResidentialExteriorCleaning';
import ResidentialExteriorBooking from './components/ResidentialExteriorBooking';

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
function App() {
  return (
    <Router>
      <Routes>
        {/* Main Listings */}
         {/* Main Listings */}
    <Route path="/" element={<HomeScreen />} />
    
    {/* Services Routes */}
    <Route path="/residential" element={<Residential />}>
  {/* Nested routes for Residential Cleaning */}
  <Route path="CustomCleaning" element={<CustomCleaning />} />
  <Route path="standard-cleaning" element={<StandardCleaning />} />
  <Route path="deep-cleaning" element={<DeepCleaning />} />
</Route>
    <Route path="/commercial" element={<Commercial />} />
    <Route path="/event" element={<Event />}>
          {/* Nested Event Cleaning Routes */}
          <Route path="PreEventCleaning" element={<PreEventCleaning />} />
          <Route path="pre-event-booking" element={<PreEventBooking />} />
          <Route path="DuringEventCleaning" element={<DuringEventCleaning />} />
          <Route path="during-event-booking" element={<DuringEventBooking />} />
          <Route path="PostEventCleaning" element={<PostEventCleaning />} />
          <Route path="post-event-booking" element={<PostEventBooking />} />
        </Route>
    <Route path="/outdoor" element={<Outdoor />} />
        
        <Route path="/ServiceSummary" element={<ServiceSummary />} />
        <Route path="/BookingConfirmation" element={<BookingConfirmation />} />
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-cleaner" element={<SignUpCleaner />} />
        {/* Residential Cleaning Routes */}
        {/* <Route path="/CustomCleaning" element={<CustomCleaning />} />
        <Route path="/CustomBooking" element={<CustomBooking />} />
        <Route path="/StandardCleaning" element={<StandardCleaning />} />
        <Route path="/StandardBooking" element={<StandardBooking />} />
        <Route path="/DeepCleaning" element={<DeepCleaning />} />
        <Route path="DeepBooking" element={<DeepBooking />} />
        <Route path="/MoveinMoveoutCleaning" element={<MoveInMoveOutCleaning />} />
        <Route path="/MoveinMoveoutBooking" element={<MoveInMoveOutBooking />} /> */}
{/* Commercial Cleaning Routes */}
<Route path="OfficeCleaning" element={<OfficeCleaning />} />
<Route path="OfficeBooking" element={<OfficeBooking />} />
<Route path="IndustrialCleaning" element={<IndustrialCleaning />} />
<Route path="IndustrialBooking" element={<IndustrialBooking />} />

{/* Outdoor Cleaning Routes */}
<Route path="/StreetCleaning" element={<StreetCleaning />} />
<Route path="/StreetBooking" element={<StreetBooking />} />
<Route path="/ResidentialExteriorCleaning" element={<ResidentialExteriorCleaning />} />
<Route path="/ResidentialExteriorBooking" element={<ResidentialExteriorBooking />} />
{/* Event Cleaning Routes */}
{/* <Route path="/event-services" element={<Event />}>
          <Route path="pre-event-cleaning" element={<PreEventCleaning />} />
          <Route path="pre-event-booking" element={<PreEventBooking />} />
          <Route path="during-event-cleaning" element={<DuringEventCleaning />} />
          <Route path="during-event-booking" element={<DuringEventBooking />} />
          <Route path="post-event-cleaning" element={<PostEventCleaning />} />
          <Route path="post-event-booking" element={<PostEventBooking />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
