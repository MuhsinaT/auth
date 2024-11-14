import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQhmajEOPMdyQ4vVvAScBFHmqRarLYNlY",
  authDomain: "phone-auth-2e442.firebaseapp.com",
  projectId: "phone-auth-2e442",
  storageBucket: "phone-auth-2e442.firebasestorage.app",
  messagingSenderId: "160537705956",
  appId: "1:160537705956:web:c225f13664e56ceb1bdbf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
