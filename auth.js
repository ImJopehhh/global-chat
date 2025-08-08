import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

document.getElementById("loginBtn").onclick = async () => {
  const email = loginEmail.value;
  const password = loginPassword.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user", auth.currentUser.displayName || auth.currentUser.email);
    location.href = "chat.html";
  } catch (err) {
    alert("Login gagal: " + err.message);
  }
};

document.getElementById("registerBtn").onclick = async () => {
  const name = registerName.value;
  const email = registerEmail.value;
  const password = registerPassword.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    localStorage.setItem("user", name);
    location.href = "chat.html";
  } catch (err) {
    alert("Registrasi gagal: " + err.message);
  }
};
