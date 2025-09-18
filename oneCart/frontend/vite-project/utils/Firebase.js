import { getAuth, GoogleAuthProvider } from "firebase/auth" // ✅ correct

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-d088a.firebaseapp.com",
  projectId: "loginonecart-d088a",
  storageBucket: "loginonecart-d088a.firebasestorage.app",
  messagingSenderId: "364603140930",
  appId: "1:364603140930:web:f01a9a91c4ca0eb36cb6db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)


const provider = new GoogleAuthProvider() // ✅ correct


export {auth,provider}
 