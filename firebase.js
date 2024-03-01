// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBizp9WMyGQmrpCIa_sdSJU--uPwENZAFQ",
  authDomain: "vidmind-907d3.firebaseapp.com",
  projectId: "vidmind-907d3",
  storageBucket: "vidmind-907d3.appspot.com",
  messagingSenderId: "1081274250636",
  appId: "1:1081274250636:web:19f54762f6fb764c01d2a9",
};
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD5o5olilWjFV0m4ohLHvjL-WhMhSbm8M4",
//   authDomain: "financemodule-f8519.firebaseapp.com",
//   projectId: "financemodule-f8519",
//   storageBucket: "financemodule-f8519.appspot.com",
//   messagingSenderId: "420071538481",
//   appId: "1:420071538481:web:042065f5f8d50de6853a10",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();