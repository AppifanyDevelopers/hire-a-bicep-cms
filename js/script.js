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


  document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleBtn = document.getElementById('sidebarToggle');

    // Toggle sidebar and overlay
    toggleBtn?.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      overlay.classList.toggle('active');
    });

    // Close sidebar when overlay is clicked
    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('show');
      overlay.classList.remove('active');
    });
  });


