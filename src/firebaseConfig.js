// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firebase SDK for Cloud Firestore
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCg8L5uvD957JmaVhuaWj7iNq3OuDPFf5A",
    authDomain: "assignment-r-727f5.firebaseapp.com",
    projectId: "assignment-r-727f5",
    storageBucket: "assignment-r-727f5.firebasestorage.app",
    messagingSenderId: "1084042585198",
    appId: "1:1084042585198:web:e001462d018c6092b5f27f",
    measurementId: "G-Z73KTJ0EME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initualize Firestore
const db = getFirestore(app);
// Initialize Authentication
const auth = getAuth(app);

export { db, auth };