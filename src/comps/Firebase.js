// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxqxReaMDWVhbPwnArjTQf1R39vJD4-JM",
  authDomain: "aicriminaldetector.firebaseapp.com",
  projectId: "aicriminaldetector",
  storageBucket: "aicriminaldetector.appspot.com",
  messagingSenderId: "926273086465",
  appId: "1:926273086465:web:c6462a77fc1f3443cc4c00",
  measurementId: "G-81P1WRZ2T8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);