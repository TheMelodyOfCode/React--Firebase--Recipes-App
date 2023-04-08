const functions = require("firebase-functions");
const admin = require("firebase-admin");

const FIREBASE_STORAGE_BUCKET = "recepies-64384.appspot.com";

const apiFirebaseOptions = {
  ...functions.config().firebase,
  credential: admin.credential.applicationDefault(),
};

admin.initializeApp(apiFirebaseOptions);

const firestore = admin.firestore();
const storageBucket = admin.storage().bucket(FIREBASE_STORAGE_BUCKET);
const auth = admin.auth();

module.exports = {
  functions,
  auth,
  firestore,
  storageBucket,
  admin,
};
