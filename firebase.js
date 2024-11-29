import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyArTNLVbfdqJ3yuHTvqoRb0ZUzd0PJnM0E",
    authDomain: "dash-2df2f.firebaseapp.com",
    projectId: "dash-2df2f",
    storageBucket: "dash-2df2f.firebasestorage.app",
    messagingSenderId: "236229937884",
    appId: "1:236229937884:web:2ce2ea7b9797ee85e04219",
    // measurementId: "YOUR - measurementId"
  };


  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app,auth };
