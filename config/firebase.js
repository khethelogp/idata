// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ1nj7LTWn3X-jU70fHmc0PWXQQpUczZk",
  authDomain: "idata-2f41b.firebaseapp.com",
  projectId: "idata-2f41b",
  storageBucket: "idata-2f41b.appspot.com",
  messagingSenderId: "152036012001",
  appId: "1:152036012001:web:69021be4e31e2e89e5eca0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";
// import { getAuth } from "firebase/auth";

// const app = initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
// });

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export default app;