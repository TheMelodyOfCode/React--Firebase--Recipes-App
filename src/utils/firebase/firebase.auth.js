// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { 
  getAuth, 
  // signInWithRedirect, 
  sendEmailVerification,
  signInWithPopup, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};


// Initialize Firebase
export const initApp = initializeApp(firebaseConfig);

// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(initApp);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGooglePopup =()=> signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect =()=> signInWithRedirect(auth, googleProvider);

const githubProvider = new GithubAuthProvider();
export const signInWithGithubPopup =()=> signInWithPopup(auth, githubProvider);


export const createAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((auth) => {
        const user = auth.user;
        sendEmailVerification(user);
  })
  .catch((error) => {
    console.log(error);
  });
};


export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
  // TODO: set up customized verification email with a link to the app
      if(!email || !password) return;
      onAuthStateChangeListener((user)=>{
        if (!user.emailVerified) {
          alert(`
          Please verify your email. 
          We have re-send you a verification email to: 
          ${user.email}.
          check your Inbox or Spam folder.
          Otherwise just refresh the Page
          `)
          .then((auth) => {
            const user = auth.user;
            sendEmailVerification(user);
      })
      .catch((error) => {
        console.log(error);
      });
    }
})
  return await signInWithEmailAndPassword(auth, email, password)
};

// export const VerifyNotification = () => {

// //....

// }

// ############################################################################################################
export const sendAuthUserPasswordReset = async (email)=>{
  if(!email) return;
  return await sendPasswordResetEmail(auth, email)
};

export const signOutUser = async () => await signOut(auth); 


export const onAuthStateChangeListener = (callback)=> 
{
  onAuthStateChanged(auth, callback);
}
