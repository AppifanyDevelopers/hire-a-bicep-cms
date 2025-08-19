// password validation
document
  .getElementById("new-password")
  .addEventListener("input", validatePassword);

function validatePassword() {
  const password = document.getElementById("new-password").value;

  // Rules
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isValidLength = password.length >= 8;

  // Update UI
  updateValidation("check-1", hasUppercase);
  updateValidation("check-2", hasNumber);
  updateValidation("check-3", isValidLength);
}
s;

function updateValidation(elementId, isValid) {
  const element = document.getElementById(elementId);
  if (isValid) {
    element.style.textDecorationLine = "line-through";
    element.style.textUnderlinePosition = "from-font";
    element.style.textDecorationSkipInk = "none";
    element.style.color = "#5BC67D";
  } else {
    element.style.textDecorationLine = "none";
    element.style.color = "#D0D8DF";
  }
}
