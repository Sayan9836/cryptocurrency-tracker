// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4JNLd8qHbp7sYKE_p31NnHrmPwwI4qQg",
  authDomain: "crypto-c9899.firebaseapp.com",
  projectId: "crypto-c9899",
  storageBucket: "crypto-c9899.appspot.com",
  messagingSenderId: "485832240832",
  appId: "1:485832240832:web:a815fc53f8a726ef4e0725",
  measurementId: "G-GGEYYHYSWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
// const analytics = getAnalytics(app);