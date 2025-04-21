import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQuf00ZgSDJ-c3xllPcwGrdzXaCb7xz54",
  authDomain: "tick-tick-3370c.firebaseapp.com",
  projectId: "tick-tick-3370c",
  storageBucket: "tick-tick-3370c.firebasestorage.app",
  messagingSenderId: "518650115104",
  appId: "1:518650115104:web:d98dfd6ea701e971f33845",
  measurementId: "G-T6VKKXRFNW"
};

// Debug logging
console.log('Initializing Firebase with config:', {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Verify initialization
console.log('Firebase initialized:', {
  authInitialized: auth !== null,
  dbInitialized: db !== null
});
