import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "colinhas-app.firebaseapp.com",
  projectId: "colinhas-app",
  storageBucket: "colinhas-app.firebasestorage.app",
  messagingSenderId: "143822596981",
  appId: "1:143822596981:web:fe860a6ecbb1ce01e4c13c",
};

export const firebaseApp = initializeApp(firebaseConfig);
