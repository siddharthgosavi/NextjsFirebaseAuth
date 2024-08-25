import { initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTuJXEsq4Of8XFmw2dW1h7h3FenY_BBws",
  authDomain: "nextjs-firebase-ath.firebaseapp.com",
  projectId: "nextjs-firebase-ath",
  storageBucket: "nextjs-firebase-ath.appspot.com",
  messagingSenderId: "1072390411550",
  appId: "1:1072390411550:web:bc04dedd0ebebf4355250f",
  measurementId: "G-JB1X1EGPLE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
