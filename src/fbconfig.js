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

const db = firebase.firestore();


export const createCar = ({model, year, transmission}) =>{
  db.collection("cars").add({
    model,
    year, 
    transmission 
})
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });

console.log(model, year, transmission);
}

export default firebaseConfig