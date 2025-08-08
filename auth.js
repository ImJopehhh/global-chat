// auth.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

document.getElementById("loginBtn").onclick = async () => {
  const email = email.value;
  const pass = password.value;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    localStorage.setItem("user", auth.currentUser.email);
    location.href = "chat.html";
  } catch (e) {
    alert("Login gagal: " + e.message);
  }
};

document.getElementById("registerBtn").onclick = async () => {
  const email = email.value;
  const pass = password.value;
  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    localStorage.setItem("user", auth.currentUser.email);
    location.href = "chat.html";
  } catch (e) {
    alert("Registrasi gagal: " + e.message);
  }
};
