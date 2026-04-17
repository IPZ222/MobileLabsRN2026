import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGfRHCdv9AYc1RgDf90rEWVOher2Y4gWw",
  authDomain: "lab-6-dd3ae.firebaseapp.com",
  projectId: "lab-6-dd3ae",
  storageBucket: "lab-6-dd3ae.firebasestorage.app",
  messagingSenderId: "312948335798",
  appId: "1:312948335798:web:07ffc2592fcaadeb337217"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);