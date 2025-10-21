// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1etzJ9A7m_FDP1ALh5nYjEnm9zn47Hu0",
  authDomain: "bmt-app-e9670.firebaseapp.com",
  databaseURL: "https://bmt-app-e9670-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bmt-app-e9670",
  storageBucket: "bmt-app-e9670.firebasestorage.app",
  messagingSenderId: "618300254101",
  appId: "1:618300254101:web:6891570904602064d0b89c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };