// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2PG_gNWsk49f2pPoPefbl9miPaTwgais",
  authDomain: "globalchat-d21b9.firebaseapp.com",
  projectId: "globalchat-d21b9",
  storageBucket: "globalchat-d21b9.firebasestorage.app",
  messagingSenderId: "931608339291",
  appId: "1:931608339291:web:c316d09995906a8660707e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
