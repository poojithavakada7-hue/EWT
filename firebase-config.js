// Firebase App
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Firebase Authentication
import { getAuth } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Your Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyCCgKwFcXrFb6B388gj9FftFr7tCer2XwM",

    authDomain: "aahara360.firebaseapp.com",

    projectId: "aahara360",

    storageBucket: "aahara360.firebasestorage.app",

    messagingSenderId: "142835596371",

    appId: "1:142835596371:web:11c35d8182dfa8fe45daa6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Authentication
const auth = getAuth(app);


// Export Authentication
export { auth };