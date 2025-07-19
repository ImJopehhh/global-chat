// Firebase configuration
const firebaseConfig = {  
  apiKey: "AIzaSyDyF2VyiIK1DbZE29AdzkLYCSU4HB1z9qw",  
  authDomain: "form-project-da2d8.firebaseapp.com",  
  projectId: "form-project-da2d8",  
  storageBucket: "form-project-da2d8.firebasestorage.app",  
  messagingSenderId: "864862750726",  
  appId: "1:864862750726:web:5e9ed7379e633df5e0db87"  
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const loginBtn = document.getElementById('loginBtn');
const loginPopup = document.getElementById('loginPopup');
const closePopup = document.getElementsByClassName('close')[0];
const guestLoginBtn = document.getElementById('guestLoginBtn');
const emailLoginBtn = document.getElementById('emailLoginBtn');
const registerBtn = document.getElementById('registerBtn');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');

loginBtn.onclick = function() {
    loginPopup.style.display = "block";
}

closePopup.onclick = function() {
    loginPopup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == loginPopup) {
        loginPopup.style.display = "none";
    }
}

guestLoginBtn.onclick = function() {
    const guestName = document.getElementById('guestName').value;
    if (guestName) {
        // Simpan guest ke database
        database.ref('guests/' + guestName).set({ name: guestName });
        alert('Logged in as guest: ' + guestName);
        loginPopup.style.display = "none";
        loadChat();
    } else {
        alert('Please enter a guest name.');
    }
}

emailLoginBtn.onclick = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert('Logged in successfully');
            loginPopup.style.display = "none";
            loadChat();
        })
        .catch((error) => {
            alert(error.message);
        });
}

registerBtn.onclick = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUser WithEmailAndPassword(email, password)
        .then(() => {
            alert('Registered successfully');
        })
        .catch((error) => {
            alert(error.message);
        });
}

chatForm.onsubmit = function(e) {
    e.preventDefault();
    const message = messageInput.value;
    const user = auth.currentUser  ? auth.currentUser .email : 'Guest';
    database.ref('messages/').push({ user: user, message: message });
    messageInput.value = '';
}

function loadChat() {
    database.ref('messages/').limitToLast(300).on('value', (snapshot) => {
        chatBox.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const messageElement = document.createElement('div');
            messageElement.textContent = `${data.user}: ${data.message}`;
            chatBox.appendChild(messageElement);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}
