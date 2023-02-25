// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { 
  getAuth, 
  sendSignInLinkToEmail ,
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyBkqqaJrByonmoW2d5k1RqJWxdzX_18sWU",
  authDomain: "recepies-64384.firebaseapp.com",
  projectId: "recepies-64384",
  storageBucket: "recepies-64384.appspot.com",
  messagingSenderId: "84435704733",
  appId: "1:84435704733:web:01404c28e5ad9b14992d74",
  measurementId: "G-5B84BWCMYN"

};



// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();


const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://recepies-64384.web.app',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};


export const sendNewUserSignInLink = async (email)=>{
  if(!email ) return;
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
      console.log('Error Message:', error.message, 'Error Code:', error.code);
  });
};



