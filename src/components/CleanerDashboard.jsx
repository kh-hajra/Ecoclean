// src/components/CleanerDashboard.js
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFCMToken } from "../firebase";
import { useNavigate } from "react-router-dom";
const CleanerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem('userRole');
  const cleanerId = localStorage.getItem('cleanerId');
  const navigate = useNavigate(); 
  
  useEffect(() => {
    // Check if user is actually a cleaner
    
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/cleaner/${cleanerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [cleanerId, userRole, navigate]);

  const handleConfirmation = async (bookingId, confirmation) => {
    try {
      const fcmToken = await getFCMToken();
      const response = await fetch("http://localhost:8080/api/bookings/cleaner-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, cleanerId, confirmation, fcmToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm booking");
      }

      const data = await response.json();
      toast.success(`Booking ${confirmation.toLowerCase()} successfully`);
      setBookings(bookings.map((b) => (b._id === bookingId ? data.booking : b)));
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="border p-4 mb-4 rounded-lg">
          <p><strong>Service:</strong> {booking.service}</p>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Status:</strong> {booking.cleanerConfirmation}</p>
          {booking.cleanerConfirmation === "Pending" && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleConfirmation(booking._id, "Accepted")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Accept
              </button>
              <button
                onClick={() => handleConfirmation(booking._id, "Rejected")}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CleanerDashboard;