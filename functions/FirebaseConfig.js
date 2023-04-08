const firebaseFunctions = require("firebase-functions");
const admin = require("firebase-admin");

const FIREBASE_STORAGE_BUCKET = "recepies-64384.appspot.com";

const apiFirebaseOptions = {
  ...firebaseFunctions.config().firebase,
  credential: admin.credential.applicationDefault(),
};

admin.initializeApp(apiFirebaseOptions);

const firestore = admin.firestore();
const storageBucket = admin.storage().bucket(FIREBASE_STORAGE_BUCKET);
const auth = admin.auth();

const functions = firebaseFunctions.region('europe-west1');

module.exports = {
  functions,
  auth,
  firestore,
  storageBucket,
  admin,
};
