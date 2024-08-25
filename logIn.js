export function logIn() {
  const logIn = document.getElementById("log-in");
  const logInClose = document.getElementById("formClose");
  const logInForm = document.getElementById("logInForm");
  const overlay = document.getElementById("overlay");

  logIn.addEventListener("click", () => {
    logInForm.style.display = "block";
    overlay.style.display = "block";
  });
  logInClose.addEventListener("click", () => {
    logInForm.style.display = "none";
    overlay.style.display = "none";
  });
}
