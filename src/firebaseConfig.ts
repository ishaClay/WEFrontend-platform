// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/messaging";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firebase Messaging and get a reference to the service
const messaging = async () => (await isSupported()) && getMessaging(app);

export { getToken, messaging };

export default app;

export const getDeviceToken = async () => {
  // const permission = await Notification.requestPermission();

  // if (permission === "granted") {
  // }
  try {
    const message = await messaging();
    if (!message) return;

    const token = await getToken(message, {
      vapidKey: import.meta.env.VITE_CLOUD_MESSAGE_VAPIDKEY,
    });

    return token;
  } catch (error) {
    console.error("Error: ", error);
  }
};
export const onMessageListener = async () => {
  const message = await messaging();
  if (!message) return;
  return new Promise((resolve) => {
    onMessage(message, (payload) => {
      resolve(payload);
    });
  });
};

async function requestPermission() {
  try {
    await Notification.requestPermission();
  } catch (error) {
    console.error("Error requesting notification permission", error);
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../public/firebase-messaging-sw.js")
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

// Call function to request permission
requestPermission();
