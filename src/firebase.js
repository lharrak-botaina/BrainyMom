import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSruOgAXRowqgnb5RfC2Lp85LyyI_lDW4",
  authDomain: "brainymom-de663.firebaseapp.com",
  projectId: "brainymom-de663",
  storageBucket: "brainymom-de663.firebasestorage.app",
  messagingSenderId: "846615173682",
  appId: "1:846615173682:web:80f39d49f4ce502ac17a2b",
  measurementId: "G-6EVP83VEGN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
