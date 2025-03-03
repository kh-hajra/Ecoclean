// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBVfsDN55UFPpHNutVcW5cUuBDlprWkZ4c",
  authDomain: "clean-da97b.firebaseapp.com",
  databaseURL: "https://clean-da97b-default-rtdb.firebaseio.com",
  projectId: "clean-da97b",
  storageBucket: "clean-da97b.firebasestorage.app",
  messagingSenderId: "776172864432",
  appId: "1:776172864432:web:d54488419ce3d001818c75",
  measurementId: "G-6M038YLDZK"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  return Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      return getToken(messaging, {
        vapidKey: "BPxr43Ey1Jb1UtdrvSBjsCQOv-nhXZsdqEacEoRjAwQe2MHb4X7r_AuJypOuKdpsbfd-ySHTRoa3z10DoKemq6k",
      });
    } else {
      throw new Error("Permission not granted.");
    }
  });
};

export const getFCMToken = async () => {
  try {
    const token = await requestPermission();
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      resolve(payload);
    });
  });
};