import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set, get, onValue } from "firebase/database";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { getStorage, ref as storageRef, getBytes, getDownloadURL, ref } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDM6SmyInNcCzfjks_RGnxrfXgw2UxAMX8",
  authDomain: "myblog-296608.firebaseapp.com",
  databaseURL: "https://myblog-296608.firebaseio.com",
  projectId: "myblog-296608",
  storageBucket: "myblog-296608.appspot.com",
  messagingSenderId: "562756650931",
  appId: "1:562756650931:web:a0efc939eb58e00210edc6",
  measurementId: "G-WWYHTTDWQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database
const database = getDatabase(app);

// Firestore
const firestore = getFirestore(app);

// --- Realtime Database Methods ---
export const writeRealtimeData = (path: string, data: any) => {
    return set(dbRef(database, path), data);
};

export const readRealtimeData = (path: string) => {
    return get(dbRef(database, path));
};

export const onRealtimeValue = (path: string, callback: (snapshot: any) => void) => {
    return onValue(dbRef(database, path), callback);
};

// --- Firestore Methods ---
export const writeFirestoreData = (collection: string, id: string, data: any) => {
    return setDoc(doc(firestore, collection, id), data);
};

export const readFirestoreData = (collection: string, id: string) => {
    return getDoc(doc(firestore, collection, id));
};

export const onFirestoreSnapshot = (collection: string, id: string, callback: (doc: any) => void) => {
    return onSnapshot(doc(firestore, collection, id), callback);
};

// Download a Doc from Firebase Storage
const storage = getStorage(app);

export const downloadPDFFromStorage = async (filepath:string, fileName: string) => {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, `${filepath}/${fileName}`);
      const url = await getDownloadURL(fileRef);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank'; // Make it open in new window
      link.setAttribute('download', fileName); // Set the desired file name for the download
      document.body.appendChild(link);
      link.click(); // Programmatically click the link to trigger the download
      document.body.removeChild(link); // Clean up the DOM

    } catch (error) {
      console.error("Error downloading file:", error);
      // You can add more user-friendly error handling here, e.g., display a toast message
      alert("Failed to download file. Please try again or check the file name.");
    }
};


export { app, database, firestore };