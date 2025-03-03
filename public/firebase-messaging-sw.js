// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBVfsDN55UFPpHNutVcW5cUuBDlprWkZ4c",
  authDomain: "clean-da97b.firebaseapp.com",
  databaseURL: "https://clean-da97b-default-rtdb.firebaseio.com",
  projectId: "clean-da97b",
  storageBucket: "clean-da97b.firebasestorage.app",
  messagingSenderId: "776172864432",
  appId: "1:776172864432:web:d54488419ce3d001818c75",
  measurementId: "G-6M038YLDZK"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});