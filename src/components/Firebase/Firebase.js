import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDlO_rByuhu_F8ogdmQ9UjzXoHt9qmg9vo",
  authDomain: "exp-tracker-343f8.firebaseapp.com",
  projectId: "exp-tracker-343f8",
  storageBucket: "exp-tracker-343f8.appspot.com",
  messagingSenderId: "243752295962",
  appId: "1:243752295962:web:abf8a79115584a7121bba3",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
