const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("btnToggleSidebar");

function updateToggleBtnPosition() {
  toggleBtn.style.left = sidebar.classList.contains("minimized")
    ? "60px"
    : "270px";
}

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("minimized");
  updateToggleBtnPosition();
});

// Set initial position on page load
updateToggleBtnPosition();

document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.add("show");
    overlay.classList.add("active");
    sidebarToggle.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("active");
    sidebarToggle.style.display = "";
  });
});
