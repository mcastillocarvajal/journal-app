import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBBDu5W2KpNz0AOtZPjx4Y13c8fe0OhQdQ",
    authDomain: "journal-app-7111c.firebaseapp.com",
    projectId: "journal-app-7111c",
    storageBucket: "journal-app-7111c.appspot.com",
    messagingSenderId: "674228789757",
    appId: "1:674228789757:web:2eb609cfa5fc53c4813994"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}

