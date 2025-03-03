// src/components/UserNotification.js
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { onMessageListener } from "../firebase";

const UserNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Listen for incoming messages
    onMessageListener().then((payload) => {
      setNotifications((prev) => [payload.notification, ...prev]);
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index} className="border p-4 mb-4 rounded-lg">
          <p><strong>Title:</strong> {notification.title}</p>
          <p><strong>Body:</strong> {notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default UserNotification;