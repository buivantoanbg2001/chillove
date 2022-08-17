import {initializeApp, getApps, getApp} from 'firebase/app'
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
} from 'firebase/auth'
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
} from 'firebase/firestore'
import {getStorage, ref, uploadBytes} from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyAW2bpiCsQStH_U-sYUYaovXmEcO5W5v28',
	authDomain: 'chillove.firebaseapp.com',
	projectId: 'chillove',
	storageBucket: 'chillove.appspot.com',
	messagingSenderId: '970756846741',
	appId: '1:970756846741:web:712039f97e4124b4e5579c',
}

// Initialize Firebase
getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth()
const db = getFirestore()
const storage = getStorage()

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
	storage,
	ref,
	uploadBytes,
}
