import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIiFk61_wkLGel1yC51jMc97o3brNU7iM",
  authDomain: "blockyards.firebaseapp.com",
  projectId: "blockyards",
  storageBucket: "blockyards.appspot.com",
  messagingSenderId: "61562330938",
  appId: "1:61562330938:web:a0450b7ad16394222cfa03",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
