import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlb74C6H2xmpyOnmF2OmHN0j9dqtmvfLQ",
  authDomain: "g-realize.firebaseapp.com",
  projectId: "g-realize",
  storageBucket: "g-realize.appspot.com",
  messagingSenderId: "117512973327",
  appId: "1:117512973327:web:ea35f3e48bff8a48e2477a",
  measurementId: "G-6G17Z5MVQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;


