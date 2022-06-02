import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQ1nj7LTWn3X-jU70fHmc0PWXQQpUczZk",
  authDomain: "idata-2f41b.firebaseapp.com",
  projectId: "idata-2f41b",
  storageBucket: "idata-2f41b.appspot.com",
  messagingSenderId: "152036012001",
  appId: "1:152036012001:web:69021be4e31e2e89e5eca0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
