// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth}from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyAelXCPV6wM6LUQi-KhR4U0GSCi97ExfjA",
    authDomain: "projet-auth-valid.firebaseapp.com",
    projectId: "projet-auth-valid",
    storageBucket: "projet-auth-valid.appspot.com",
    messagingSenderId: "227461307915",
    appId: "1:227461307915:web:8fb398ce0b7549d5f3b10e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);