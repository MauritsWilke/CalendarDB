import { onAuthStateChanged, type User } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "./firebase";

