import {initializeApp, getApps, getApp} from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  collectionGroup,
  onSnapshot,
  where,
  query,
  limit,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAPejXc3k1xIZQSprAP6Z1n1t2aCv4gW7k',
  authDomain: 'chillove-app-2307.firebaseapp.com',
  projectId: 'chillove-app-2307',
  storageBucket: 'chillove-app-2307.appspot.com',
  messagingSenderId: '1033876932259',
  appId: '1:1033876932259:web:b02030863534b4a3766116',
};

// Initialize Firebase
getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();
const db = getFirestore();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
  db,
  doc,
  setDoc,
  addDoc,
  collection,
  collectionGroup,
  onSnapshot,
  where,
  query,
  limit,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
  Timestamp,
};
