import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCe0NDklfTF6lN1LnkFczFem67fS0zJA88',
  authDomain: 'insta-6669d.firebaseapp.com',
  projectId: 'insta-6669d',
  storageBucket: 'insta-6669d.appspot.com',
  messagingSenderId: '423589677211',
  appId: '1:423589677211:web:83d8872294e0560495de3e',
  measurementId: 'G-VMLGS6H5F8',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage()
