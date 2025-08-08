document.getElementById("guestLogin").onclick = () => {
  const name = document.getElementById("guestName").value.trim();
  if (name.length < 2) return alert("Nama terlalu pendek.");
  localStorage.setItem("user", name + " (Guest)");
  location.href = "chat.html";
};
