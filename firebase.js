//Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import {getAuth} from '@firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAuVRM1qCS90QEHZAAtj-ixaLLwX6ofYlo",
  authDomain: "job-listing-e0315.firebaseapp.com",
  projectId: "job-listing-e0315",
  storageBucket: "job-listing-e0315.appspot.com",
  messagingSenderId: "999987851852",
  appId: "1:999987851852:web:5f3e01deafb599dd9ebae9",
  measurementId: "G-NY5GTE0SQG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)