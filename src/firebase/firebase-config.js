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
	initializeFirestore,
	DocumentReference,
	CollectionReference,
} from 'firebase/firestore'
import {getStorage, ref, uploadBytes, getDownloadURL, UploadResult} from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyAW2bpiCsQStH_U-sYUYaovXmEcO5W5v28',
	authDomain: 'chillove.firebaseapp.com',
	projectId: 'chillove',
	storageBucket: 'chillove.appspot.com',
	messagingSenderId: '970756846741',
	appId: '1:970756846741:web:712039f97e4124b4e5579c',
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
// const db = getFirestore()
const db = initializeFirestore(app, {
	experimentalForceLongPolling: true,
})
const storage = getStorage(app)

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
	getDownloadURL,
	UploadResult,
	DocumentReference,
	CollectionReference,
}
