import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCM5cbYlFA1JpACE9LTZzxg9hH3tg4EPfI",
  authDomain: "qrytube-2b3dc.firebaseapp.com",
  projectId: "qrytube-2b3dc",
  storageBucket: "qrytube-2b3dc.firebasestorage.app",
  messagingSenderId: "131039163083",
  appId: "1:131039163083:web:7db7c52d837cb70e21614e",
  measurementId: "G-VFBG6JEKR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export default app;
