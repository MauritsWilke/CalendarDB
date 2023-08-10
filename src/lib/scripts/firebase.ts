import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyACoYjfCQYnjVbwG5pUfKDkkSKVKFGnw2k",
	authDomain: "calendardb-464bf.firebaseapp.com",
	projectId: "calendardb-464bf",
	storageBucket: "calendardb-464bf.appspot.com",
	messagingSenderId: "578861734588",
	appId: "1:578861734588:web:592c8b5e563091e109ceb9",
	measurementId: "G-N91HBXJ6H8"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();