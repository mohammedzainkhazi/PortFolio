import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref as dbRef, set, get, onValue } from "firebase/database";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const database = getDatabase(app);
const firestore = getFirestore(app);

export const writeRealtimeData = (path: string, data: any) => set(dbRef(database, path), data);
export const readRealtimeData = (path: string) => get(dbRef(database, path));
export const onRealtimeValue = (path: string, callback: (snapshot: any) => void) => onValue(dbRef(database, path), callback);

export const writeFirestoreData = (collection: string, id: string, data: any) => setDoc(doc(firestore, collection, id), data);
export const readFirestoreData = (collection: string, id: string) => getDoc(doc(firestore, collection, id));
export const onFirestoreSnapshot = (collection: string, id: string, callback: (doc: any) => void) => onSnapshot(doc(firestore, collection, id), callback);

export const downloadPDFFromStorage = async (filepath: string, fileName: string) => {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `${filepath}/${fileName}`);
    const url = await getDownloadURL(fileRef);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
    alert("Failed to download file. Please try again or check the file name.");
  }
};

export { app, database, firestore };
