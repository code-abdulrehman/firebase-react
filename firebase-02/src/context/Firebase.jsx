import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { get, getDatabase, ref, set } from "firebase/database";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider()
// Create a context for Firebase
const FirebaseContext = createContext(null);

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase Provider Component
export const FirebaseProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null); // State to manage current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setCurrentUser(user); // User is signed in, set the current user
      } else {
        setCurrentUser(null); // No user is signed in, reset current user
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sign up with google popup
  const signupWithGoogle = async () => {
    try {
      const googlePopup = await signInWithPopup(firebaseAuth,googleProvider);
      return googlePopup;
    } catch (error) {
      console.error("Error signing up with googlePopup:", error);
      throw error;
    }
  };
  
  // Sign out
  const signOutUser = async () => {
    try {
      const req = await signOut(firebaseAuth);
      return req;
    } catch (error) {
      console.error("Error signing up with googlePopup:", error);
      throw error;
    }
  };

  // Sign up with email and password
  const signupWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error signing up with email and password:", error);
      throw error;
    }
  };

  // Sign in/login with email and password
  const signinWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      throw error;
    }
  };

  // Put (set) data in Firebase Realtime Database
  const putData = async (key, data) => {
    try {
      await set(ref(db, key), data);
      console.log(`Data set at ${key}:`, data);
    } catch (error) {
      console.error("Error setting data in Firebase Database:", error);
      throw error;
    }
  };

  // Get data from Firebase Realtime Database
  const getData = async (key) => {
    try {
      const snapshot = await get(ref(db, key));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log(`No data available at ${key}`);
        return null;
      }
    } catch (error) {
      console.error("Error getting data from Firebase Database:", error);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider value={{currentUser, signupWithGoogle, signOutUser, signupWithEmailAndPassword, signinWithEmailAndPassword, putData, getData }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
