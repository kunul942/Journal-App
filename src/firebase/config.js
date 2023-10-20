import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDybP0yDhh7fqY0XuMEY4mDty72gI54gmc",
  authDomain: "react-course-2023.firebaseapp.com",
  projectId: "react-course-2023",
  storageBucket: "react-course-2023.appspot.com",
  messagingSenderId: "669098875857",
  appId: "1:669098875857:web:2de8da00ca35e43a371ef0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )

