import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwMT-dvQ4Q1nT6r5LR4UilPjlOHYJJ93U",
  authDomain: "realty-chain.firebaseapp.com",
  projectId: "realty-chain",
  storageBucket: "realty-chain.appspot.com",
  messagingSenderId: "649095744808",
  appId: "1:649095744808:web:98c613a919562f5eded41d",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
