import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRQhhQ5_nv8hSxh1y-GMrBCu20fpz_y10",
  authDomain: "clone-66248.firebaseapp.com",
  projectId: "clone-66248",
  storageBucket: "clone-66248.firebasestorage.app",
  messagingSenderId: "668408506437",
  appId: "1:668408506437:web:1eb4ab3f6855fe783f5b2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

