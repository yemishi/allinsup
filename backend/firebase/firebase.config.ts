import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  projectId: "allinsup-2b48a",
  storageBucket: "allinsup-2b48a.appspot.com",
  messagingSenderId: "1080229865616",
  appId: "1:1080229865616:web:24ba9f9a4e8fe936381015",
  measurementId: "G-YS18QRHRKN",
};

const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);
