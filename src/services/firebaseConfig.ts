import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAAjVOJdtz7HpsyuBMK1MGkHWGGEuT36JE",
  authDomain: "colinhas-app.firebaseapp.com",
  projectId: "colinhas-app",
  storageBucket: "colinhas-app.appspot.com",
  messagingSenderId: "143822596981",
  appId: "1:143822596981:web:fe860a6ecbb1ce01e4c13c",
};

export const firebaseApp = initializeApp(firebaseConfig);
