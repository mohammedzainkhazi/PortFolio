import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Read config from environment variables (set in project root .env)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "dummy_key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "dummy_domain",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://dummy.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "dummy_project",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "dummy_bucket",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "dummy_sender",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "dummy_app_id",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "dummy_id",
};

// Initialize Firebase app and database (modular SDK)
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export default app;
