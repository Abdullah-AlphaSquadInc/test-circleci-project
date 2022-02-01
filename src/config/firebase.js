import firebase from 'firebase';
import 'firebase/firebase-firestore';

const config = {
 apiKey: "AIzaSyBdZ1z6XM5s_UDpAMll9KZ4v-7giVSph6Y",
 authDomain: "knowme-8c8c4.firebaseapp.com",
 projectId: "knowme-8c8c4",
 storageBucket: "knowme-8c8c4.appspot.com",
 messagingSenderId: "944810391572",
 appId: "1:944810391572:web:969b0d4a9401f3fc870f01"
};

const fire = firebase.initializeApp(config);
export const firestoreDb = fire.firestore();


export default fire;

// change this according to configuration