import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAz5huf5rbXBYuHrs-wzDCMrYWFNKTjO3M",
  authDomain: "sesc-votes.firebaseapp.com",
  projectId: "sesc-votes",
  storageBucket: "sesc-votes.appspot.com",
  messagingSenderId: "14874330511",
  appId: "1:14874330511:web:65f8a9b033b0a8cd8af7fa",
  measurementId: "G-G5GBSSN9RM",
};

export const app = initializeApp(firebaseConfig);
