// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRqT00xi0eVqoLSEykhbDsA5WRnj23PWM",
    authDomain: "cpsmobile-a526d.firebaseapp.com",
    projectId: "cpsmobile-a526d",
    storageBucket: "cpsmobile-a526d.appspot.com",
    messagingSenderId: "212219934287",
    appId: "1:212219934287:web:70acd2d1504e53a7639c3a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get };
