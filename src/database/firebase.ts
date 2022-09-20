import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCmzhBIWimLe1cGTjRx5hNcI1HBjag6S-4",
  authDomain: "nitteicyousei-65b1a.firebaseapp.com",
  projectId: "nitteicyousei-65b1a",
  storageBucket: "nitteicyousei-65b1a.appspot.com",
  messagingSenderId: "983006078393",
  appId: "1:983006078393:web:e879c4538ed380b1a3c268",
  measurementId: "G-WMNWGS2X7M",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
