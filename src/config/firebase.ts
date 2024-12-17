import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "card-game-400.firebaseapp.com",
  databaseURL: "https://card-game-400-default-rtdb.firebaseio.com",
  projectId: "card-game-400",
  storageBucket: "card-game-400.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);