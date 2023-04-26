import { initializeApp } from "firebase/app";
import { getDatabase, update, ref as dbRef } from "firebase/database";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAxqxReaMDWVhbPwnArjTQf1R39vJD4-JM",
  authDomain: "aicriminaldetector.firebaseapp.com",
  databaseURL: "https://aicriminaldetector-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aicriminaldetector",
  storageBucket: "aicriminaldetector.appspot.com",
  messagingSenderId: "926273086465",
  appId: "1:926273086465:web:c6462a77fc1f3443cc4c00",
  measurementId: "G-81P1WRZ2T8"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage();

export const uploadImage = async (file, name) => {
  const storageRef = ref(storage, 'criminal/' + name + '.jpg');
  try {
    await uploadBytes(storageRef, file);
    getDownloadURL(storageRef).then((url) => {
      update(dbRef(database,'criminals/'), {[name]:url});
    });
    return "Uploaded Criminal Image"
  } catch (error) {
    return error;
  }
}