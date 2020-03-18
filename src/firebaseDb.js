import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyALRiOO_k0TmM8828DLe-2imRWH-h7fT6A",
  authDomain: "react-comment-section-24a69.firebaseapp.com",
  databaseURL: "https://react-comment-section-24a69.firebaseio.com",
  projectId: "react-comment-section-24a69",
  storageBucket: "react-comment-section-24a69.appspot.com",
  messagingSenderId: "832157701210",
  appId: "1:832157701210:web:7c4f233c9d20efe10a7463"
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();

export { db };
