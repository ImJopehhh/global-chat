function showPopup(id) {
  document.querySelectorAll(".popup").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function closePopup() {
  document.querySelectorAll(".popup").forEach(p => p.classList.add("hidden"));
}

function openPopup(id) {
  showPopup(id);
}
