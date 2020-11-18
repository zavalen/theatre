// Look for .hamburger
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu__list");

// On click
hamburger.addEventListener("click", function () {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  menu.classList.toggle("menu__list_active");


});
