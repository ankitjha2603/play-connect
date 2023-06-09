// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAtLx-a0pA8gbJUDsVLZHc3hc4s6MAtxsg",
  authDomain: "play-connect-2603.firebaseapp.com",
  projectId: "play-connect-2603",
  storageBucket: "play-connect-2603.appspot.com",
  messagingSenderId: "817117365781",
  appId: "1:817117365781:web:d773e4c26254a438e4301c",
  measurementId: "G-05RGH8JWYX",
  databaseURL:
    "https://play-connect-2603-default-rtdb.asia-southeast1.firebasedatabase.app",
};
const app = initializeApp(firebaseConfig);
export const firebaseApp = app;
export const auth = getAuth(app);

export const db = getFirestore(app);
