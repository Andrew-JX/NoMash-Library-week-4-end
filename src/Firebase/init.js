// src/Firebase/init.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB9UX5f6Jlah2CEI7G0CcLmNZlYR5gw7v0',
  authDomain: 'fit5032-minyu-week7.firebaseapp.com',
  projectId: 'fit5032-minyu-week7',
  storageBucket: 'fit5032-minyu-week7.firebasestorage.app',
  messagingSenderId: '210934679522',
  appId: '1:210934679522:web:b9b3c751f01f61d149dbbb'
};

const app = initializeApp(firebaseConfig);

// export both
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
