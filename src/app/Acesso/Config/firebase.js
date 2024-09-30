// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUNsjBqkOidPrm34fvaSxgMFxcXBKml2U",
  authDomain: "search360-6233a.firebaseapp.com",
  projectId: "search360-6233a",
  storageBucket: "search360-6233a.appspot.com",
  messagingSenderId: "558515280248",
  appId: "1:558515280248:web:fd481adbb27e20b775908d",
  measurementId: "G-YTRY1YJ6W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);