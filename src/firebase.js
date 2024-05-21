import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIpsQjvOFoPKsOgZHYcaI61OjBSxjsHuM",
  authDomain: "react-final-project-5ad2f.firebaseapp.com",
  projectId: "react-final-project-5ad2f",
  storageBucket: "react-final-project-5ad2f.appspot.com",
  messagingSenderId: "681216228565",
  appId: "1:681216228565:web:bfd65d0a291872b674365c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;