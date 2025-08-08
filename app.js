// app.js
import { db, auth } from "./firebase.js";
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const user = localStorage.getItem("user");
if (!user) location.href = "index.html";

const messagesRef = collection(db, "messages");
const q = query(messagesRef, orderBy("createdAt", "asc"), limit(300));

onSnapshot(q, (snapshot) => {
  const messagesBox = document.getElementById("messages");
  messagesBox.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = `${data.name}: ${data.text}`;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  });
});

document.getElementById("sendBtn").onclick = async () => {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (text === "") return;
  await addDoc(messagesRef, {
    name: user,
    text: text,
    createdAt: serverTimestamp()
  });
  input.value = "";
};

document.getElementById("logout").onclick = async () => {
  await signOut(auth).catch(() => {});
  localStorage.removeItem("user");
  location.href = "index.html";
};
