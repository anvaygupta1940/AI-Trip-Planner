// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBReFCatFclBvXTkWeMgurcr9rbVx3DxvY",
    authDomain: "react-projects-519a8.firebaseapp.com",
    projectId: "react-projects-519a8",
    storageBucket: "react-projects-519a8.appspot.com",
    messagingSenderId: "59911519770",
    appId: "1:59911519770:web:9f466bb55249dd829fdba3",
    measurementId: "G-9ZGBKQNX2Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
