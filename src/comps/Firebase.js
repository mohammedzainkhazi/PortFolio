import { initializeApp } from "firebase/app";
import { getDatabase} from 'firebase/database';
import firebase from 'firebase/compat/app';
const firebaseConfig = {
//     Configuration  
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
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;


export const db = getDatabase();
