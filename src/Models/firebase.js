import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjlxrpTrm1icDSBYk7EEoYFmU3ga-3liQ",
  authDomain: "mini-core-gr.firebaseapp.com",
  projectId: "mini-core-gr",
  storageBucket: "mini-core-gr.appspot.com",
  messagingSenderId: "306904837104",
  appId: "1:306904837104:web:51fced0219b9a517cd8b35",
  measurementId: "G-NMN8R7G1T0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("app: ", app);
// Get a Firestore instance
const db = getFirestore();




export { db, collection, getDocs  };
