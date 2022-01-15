import { initializeApp } from "firebase/app";
import { getDatabase} from 'firebase/database';
import firebase from 'firebase/compat/app';
const firebaseConfig = {
    // firebaseConfig
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;


export const db = getDatabase();