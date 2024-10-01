/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_API_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_API_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_API_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_API_FIREBASE_MESSAGESENDER,
  appId: import.meta.env.VITE_API_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_API_FIREBASE_MESURMENTID,
  databaseURL: import.meta.env.VITE_API_FIREBASE_DATABASEURL,
};

firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;

// messaging?.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "./logo.png",
//     default: false,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

self.addEventListener("push", (event) => {
  const payload = event.data.json();

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
