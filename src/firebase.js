import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvC9SH2BBpnxrN4hiU5CaUkkHz5ZqTfHs",
  authDomain: "react-crm-2bab5.firebaseapp.com",
  projectId: "react-crm-2bab5",
  storageBucket: "react-crm-2bab5.appspot.com",
  messagingSenderId: "125987682509",
  appId: "1:125987682509:web:939668b69e3a6f434ad184"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;