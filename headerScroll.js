export function ScrollHeader() {
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 44) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}
