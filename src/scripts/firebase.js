import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Properties
const firebaseConfig = {
  apiKey: "AIzaSyCl1z-dX99OvpdCoKjZV-0mKyKa823dt30",
  authDomain: "englishworld-lms.firebaseapp.com",
  projectId: "englishworld-lms",
  storageBucket: "englishworld-lms.appspot.com",
  messagingSenderId: "74448674301",
  appId: "1:74448674301:web:7316721dbb0ec5c5c40d94",
};
const firebaseApp = initializeApp(firebaseConfig);

export const fireStore = getFirestore(firebaseApp);
export const cloudStorage = getStorage(firebaseApp);
export const authentification = getAuth(firebaseApp);
