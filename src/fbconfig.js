import firebase from 'firebase';
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCKNbX9uSq1SqlzA8Tzd8e-8gXi3wLz3U0",
  authDomain: "fir-admin-21f90.firebaseapp.com",
  projectId: "fir-admin-21f90",
  storageBucket: "fir-admin-21f90.appspot.com",
  messagingSenderId: "764600890533",
  appId: "1:764600890533:web:ce05efd87b0ead70eb094c",
  measurementId: "G-BLT195BFDG"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

