// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAXvLu2G6kUN1JeP0rszERfhTM5rHYrfNQ",
    authDomain: "alther-office.firebaseapp.com",
    projectId: "alther-office",
    storageBucket: "alther-office.firebasestorage.app",
    messagingSenderId: "778871113244",
    appId: "1:778871113244:web:d6baa6d40c75d428c241d9",
    measurementId: "G-X9CCJ8ZC3D"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, db, storage,auth, provider };
