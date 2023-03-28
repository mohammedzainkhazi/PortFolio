import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxqxReaMDWVhbPwnArjTQf1R39vJD4-JM",
  authDomain: "aicriminaldetector.firebaseapp.com",
  projectId: "aicriminaldetector",
  storageBucket: "aicriminaldetector.appspot.com",
  messagingSenderId: "926273086465",
  appId: "1:926273086465:web:c6462a77fc1f3443cc4c00",
  measurementId: "G-81P1WRZ2T8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);