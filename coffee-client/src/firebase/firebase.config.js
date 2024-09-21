// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOduAjnXHtNacPWVstwW67OgDjxYKHG5E",
  authDomain: "coffee-store-18809.firebaseapp.com",
  projectId: "coffee-store-18809",
  storageBucket: "coffee-store-18809.appspot.com",
  messagingSenderId: "180033297196",
  appId: "1:180033297196:web:aaeb0803a1365c21d5ea89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;