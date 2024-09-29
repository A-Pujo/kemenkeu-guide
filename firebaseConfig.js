// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvpEHrvJadP4FlHvSFHa64HQcKWlIhlBk",
  authDomain: "kemenkeu-guide.firebaseapp.com",
  projectId: "kemenkeu-guide",
  storageBucket: "kemenkeu-guide.appspot.com",
  messagingSenderId: "163268011840",
  appId: "1:163268011840:web:8c30bae77de09af11a3ca5",
  measurementId: "G-WE37RKPEHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);