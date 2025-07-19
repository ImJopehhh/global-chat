import { auth } from './firebase.js';
import { db } from './firebase.js';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-lite.js';
import {
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const form = document.getElementById("chatForm");

// Kirim pesan
function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  const user = auth.currentUser;
  const guestName = localStorage.getItem("guestName");

  if (!user && !guestName) {
    alert("Kamu harus login terlebih dahulu untuk mengirim pesan.");
    return;
  }

  const name = user ? user.displayName : guestName;

  addDoc(collection(db, "messages"), {
    name: name,
    text: message,
    timestamp: serverTimestamp()
  });

  messageInput.value = "";
}

// Tampilkan pesan real-time
const messagesQuery = query(
  collection(db, "messages"),
  orderBy("timestamp", "desc"),
  limit(300)
);

onSnapshot(messagesQuery, (snapshot) => {
  chatMessages.innerHTML = "";
  const messages = [];
  snapshot.forEach((doc) => {
    messages.push(doc.data());
  });
  messages.reverse().forEach((msg) => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<strong>${msg.name}:</strong> ${msg.text}`;
    chatMessages.appendChild(div);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Sembunyikan form jika belum login
function checkAuthStatus() {
  const user = auth.currentUser;
  const guestName = localStorage.getItem("guestName");

  if (!user && !guestName) {
    form.style.display = "none";
  } else {
    form.style.display = "flex";
  }
}

onAuthStateChanged(auth, checkAuthStatus);
window.addEventListener("load", checkAuthStatus);

// Expose sendMessage to global scope
window.sendMessage = sendMessage;
