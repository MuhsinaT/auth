// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   RecaptchaVerifier,
//   signInWithPhoneNumber


// } from "firebase/auth";
// import { auth } from "../firebase";

// const userAuthContext = createContext();

// export function UserAuthContextProvider({ children }) {
//   const [user, setUser] = useState({});

//   function logIn(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }
//   function signUp(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }
//   function logOut() {
//     return signOut(auth);
//   }
//   function googleSignIn() {
//     const googleAuthProvider = new GoogleAuthProvider();
//     return signInWithPopup(auth, googleAuthProvider);
//   }

//   function setUpRecaptcha(number){
//     const recaptchaVerifier =new RecaptchaVerifier(
//       "recaptcha-container",
//       {},
//       auth
//     );
//     recaptchaVerifier.render();
//     return signInWithPhoneNumber(auth,number,recaptchaVerifier)


//   }


//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
//       console.log("Auth", currentuser);
//       setUser(currentuser);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <userAuthContext.Provider
//       value={{ user, logIn, signUp, logOut, googleSignIn ,setUpRecaptcha}}
//     >
//       {children}
//     </userAuthContext.Provider>
//   );
// }

// export function useUserAuth() {
//   return useContext(userAuthContext);
// }


import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  
  // Function to set up reCAPTCHA and request OTP
  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();

    // Return the confirmation result for OTP verification
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  // Other authentication methods (login, signup, etc.)
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  // Observe authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut, googleSignIn, setUpRecaptcha }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
