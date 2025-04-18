"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics = void 0;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    projectId: "allinsup-2b48a",
    storageBucket: "allinsup-2b48a.appspot.com",
    messagingSenderId: "1080229865616",
    appId: "1:1080229865616:web:24ba9f9a4e8fe936381015",
    measurementId: "G-YS18QRHRKN",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.analytics = (0, storage_1.getStorage)(app);
