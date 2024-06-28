import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCo4hyjYmPDYqOrCY8sJEshp9Gybduz7aA",
  authDomain: "workonwheels-e51e4.firebaseapp.com",
  projectId: "workonwheels-e51e4",
  storageBucket: "workonwheels-e51e4.appspot.com",
  messagingSenderId: "1052531494807",
  appId: "1:1052531494807:web:079ce0f10cbe8eec407ed2",
  measurementId: "G-HPRQVWF2R4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence:", error);
});

export { auth, db };