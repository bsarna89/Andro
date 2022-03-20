// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAgVw9kZ813F5C7itdO-5vSwOIdPxqT4ao",
    authDomain: "trial-27a0e.firebaseapp.com",
    databaseURL: "https://trial-27a0e-default-rtdb.firebaseio.com",
    projectId: "trial-27a0e",
    storageBucket: "trial-27a0e.appspot.com",
    messagingSenderId: "1073716693490",
    appId: "1:1073716693490:web:e800a31ce79a56b1a6c36b",
    measurementId: "G-HT4EDBT0YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };