// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5CR_1nO5Cm3GhCZyWfH4ieXAP7MVxkQ8",
  authDomain: "vite-contact-82347.firebaseapp.com",
  projectId: "vite-contact-82347",
  storageBucket: "vite-contact-82347.firebasestorage.app",
  messagingSenderId: "204571332116",
  appId: "1:204571332116:web:a063250ef1fad7271a2101",
  measurementId: "G-VGKZ2EYC15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);
 export const db= getFirestore(app);