// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaJwvobwtTcKL3_jVEBFABJH_W_7RLPvU",
  authDomain: "ecotrack-web.firebaseapp.com",
  projectId: "ecotrack-web",
  storageBucket: "ecotrack-web.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app; 