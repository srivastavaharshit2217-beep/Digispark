```javascript
// ===============================
// DigiSpark Website JavaScript
// ===============================


// MOBILE MENU
const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuButton) {
  menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
}


// CLOSE MOBILE MENU AFTER CLICKING LINK
document.querySelectorAll(".nav-links a").forEach(function (link) {

  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });

});


// CURRENT YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("formMessage");


    // BASIC VALIDATION

    if (name === "" || email === "" || service === "" || message === "") {

      formMessage.textContent =
        "Please fill in all the details.";

      return;
    }


    // SUCCESS MESSAGE

    formMessage.textContent =
      "Thank you " +
      name +
      "! Your enquiry has been received.";


    // RESET FORM

    contactForm.reset();

  });

}


// CLOSE MENU WHEN CLICKING OUTSIDE

document.addEventListener("click", function (event) {

  if (
    navLinks &&
    menuButton &&
    !navLinks.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {

    navLinks.classList.remove("open");

  }

});


// SIMPLE SCROLL ANIMATION

const cards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver(
  function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });

  },
  {
    threshold: 0.15
  }
);


cards.forEach(function (card) {

  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

  observer.observe(card);

});
```
