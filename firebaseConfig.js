import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1SG9a6bOrQAOXek2D_aaCZxyao-SnccU",
  authDomain: "crud-ef1d1.firebaseapp.com",
  projectId: "crud-ef1d1",
  storageBucket: "crud-ef1d1.firebasestorage.app",
  messagingSenderId: "234765056585",
  appId: "1:234765056585:web:79c0dc25a4d7b07303dd98"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
