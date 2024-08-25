export function toggleActive() {
  //   const toggleBtn = document.getElementById("toggleBtn");
  const menu = document.getElementById("menu");
  const header = document.querySelector("header");
  const navbar = document.getElementById("navbar");
  const logIn = document.getElementById("log-in");

  menu.classList.add("menu-active");
  menu.style.display = "flex";

  header.appendChild(menu);

  const toggleClose = document.createElement("div");
  toggleClose.classList.add("bi", "bi-x", "toggle-close");
  menu.appendChild(toggleClose);

  toggleClose.addEventListener("click", () => {
    menu.classList.remove("menu-active");
    menu.style.display = "none";
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      menu.classList.remove("menu-active");
      menu.style.display = "flex";
      toggleClose.classList.remove("bi", "bi-x", "toggle-close");
      navbar.appendChild(menu);
      navbar.appendChild(logIn);
    } else {
      menu.style.display = "none";
    }
  });
}
