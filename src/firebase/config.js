import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAsCnShH89kLED8MhvE9nwZhA4DJ6oSic",
  authDomain: "ece-events.firebaseapp.com",
  projectId: "ece-events",
  storageBucket: "ece-events.appspot.com",
  messagingSenderId: "882402256262",
  appId: "1:882402256262:web:55ad7cd4fb52afbde4f807",
  measurementId: "G-7B27CKNDLZ"
};

const firebaseApp =firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();
const storageRef = firebase.storage().ref();

const projectFunctions = firebase.functions();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp, firebaseAuth, provider, storage, storageRef, projectFunctions };
