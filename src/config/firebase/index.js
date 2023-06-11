// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";

// import {} from 'firebase/auth';
// import {} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAa_MKCSl91aKdXaPUxiCAifwtWj1fepM",
  authDomain: "fitglasses-f300a.firebaseapp.com",
  projectId: "fitglasses-f300a",
  storageBucket: "fitglasses-f300a.appspot.com",
  messagingSenderId: "979860240579",
  appId: "1:979860240579:web:99375d446f60eabf3a0a76",
  measurementId: "G-Z6HKLD3QJW"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app, GoogleAuthProvider,signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
