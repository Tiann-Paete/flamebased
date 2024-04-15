
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC41G_FIAOswdfspESnBiIeqgFd84U7O9g",
  authDomain: "nextapp-b2b97.firebaseapp.com",
  projectId: "nextapp-b2b97",
  storageBucket: "nextapp-b2b97.appspot.com",
  messagingSenderId: "213036848382",
  appId: "1:213036848382:web:05e1bd02956e85aa7a01af",
  measurementId: "G-14N8JJ594T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
