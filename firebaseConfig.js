import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBy5Any2DBWiA3l0Qnk4FNldu36SqzDSho',
  authDomain: 'expense-split-track.firebaseapp.com',
  projectId: 'expense-split-track',
  storageBucket: 'expense-split-track.appspot.com',
  messagingSenderId: '1025463496826',
  appId: '1:1025463496826:web:40b3d1c0474c4892910bc3',
  measurementId: 'G-SEE6N59KSX',
};

export const app = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(app);
