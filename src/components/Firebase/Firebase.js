import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDrD-pmnug1H_17ppuJYlkOGE1AssRqZqE",
  authDomain: "expense-tracker-54c98.firebaseapp.com",
  projectId: "expense-tracker-54c98",
  storageBucket: "expense-tracker-54c98.appspot.com",
  messagingSenderId: "594508790458",
  appId: "1:594508790458:web:aec6208f13aab216e4e083"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
