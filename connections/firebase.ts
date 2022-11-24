import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getFunctions /* , connectFunctionsEmulator */,
} from "firebase/functions";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(config);

const functions_ = getFunctions(app);

if (process.env.NODE_ENV !== "production") {
  // connectFunctionsEmulator(functions_, "localhost", 5001);
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = functions_;
export const storage = getStorage(app);
