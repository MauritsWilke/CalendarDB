import { getApps, initializeApp, type FirebaseApp, getApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyACoYjfCQYnjVbwG5pUfKDkkSKVKFGnw2k",
	authDomain: "calendardb-464bf.firebaseapp.com",
	projectId: "calendardb-464bf",
	storageBucket: "calendardb-464bf.appspot.com",
	messagingSenderId: "578861734588",
	appId: "1:578861734588:web:592c8b5e563091e109ceb9",
	measurementId: "G-N91HBXJ6H8"
};

let app: FirebaseApp;
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp();
	deleteApp(app);
	app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getFirestore()

export {
	app,
	auth,
	db
}
