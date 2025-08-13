// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXL-BYU8sZGvmjHBEtPzE5tjPl2Y2D5js",
  authDomain: "search360-v2.firebaseapp.com",
  projectId: "search360-v2",
  storageBucket: "search360-v2.firebasestorage.app",
  messagingSenderId: "241645635570",
  appId: "1:241645635570:web:3abdc5931faa19b3804d6b",
  measurementId: "G-XJRCLEKQBX"

  // apiKey: "AIzaSyCeOt-FuINuduGne1ce_ieUSPtUjhEo7Zg",
  // authDomain: "test-search-7af39.firebaseapp.com",
  // projectId: "test-search-7af39",
  // storageBucket: "test-search-7af39.firebasestorage.app",
  // messagingSenderId: "923596895207",
  // appId: "1:923596895207:web:85cd93c0d8031ed4f68342"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);const db = getFirestore(app);

// Exporta a instância do Firestore para ser usada no projeto
export { db };