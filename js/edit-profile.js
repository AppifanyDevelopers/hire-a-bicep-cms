const editButton = document.querySelector("#profile-details-text button");
const profileDetailsText = document.getElementById("profile-details-text");
const profileDetailsForm = document.getElementById("profile-details-form");
const cancelButton = profileDetailsForm.querySelector("button.btn-1-basic");

profileDetailsForm.style.display = "none";

editButton.addEventListener("click", () => {
  profileDetailsText.style.display = "none";
  profileDetailsForm.style.display = "flex";
});

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  profileDetailsText.style.display = "flex";
  profileDetailsForm.style.display = "none";
});
