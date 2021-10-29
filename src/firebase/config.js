import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGC6UhTQLDQGqETcTUMbcYhRB8f2uN-7k",
  authDomain: "ece-events.firebaseapp.com",
  projectId: "ece-events",
  storageBucket: "ece-events.appspot.com",
  messagingSenderId: "882402256262",
  appId: "1:882402256262:web:56b88b4a66903e88e4f807",
  measurementId: "G-EBR6WPCGQ9"
};

const firebaseApp =firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();
const storageRef = firebase.storage().ref();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp, firebaseAuth, provider, storage, storageRef };
