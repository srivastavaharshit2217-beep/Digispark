```javascript
// ==========================================
// DigiSpark JavaScript
// ==========================================


// Backend API URL
// Render par deploy karne ke baad is URL ko change karenge.

const API_URL = "http://localhost:5000";


// ==========================================
// MOBILE MENU
// ==========================================

const menuButton =
  document.querySelector(".menu-btn");

const navLinks =
  document.querySelector(".nav-links");


if (menuButton && navLinks) {

  menuButton.addEventListener(
    "click",
    function () {

      navLinks.classList.toggle("open");

    }
  );

}


// ==========================================
// CLOSE MOBILE MENU
// ==========================================

document
  .querySelectorAll(".nav-links a")
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        if (navLinks) {

          navLinks.classList.remove("open");

        }

      }
    );

  });


// ==========================================
// CURRENT YEAR
// ==========================================

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm =
  document.getElementById("contactForm");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      const name =
        document
          .getElementById("name")
          .value
          .trim();


      const email =
        document
          .getElementById("email")
          .value
          .trim();


      const service =
        document
          .getElementById("service")
          .value;


      const message =
        document
          .getElementById("message")
          .value
          .trim();


      const formMessage =
        document.getElementById(
          "formMessage"
        );


      // Validation

      if (
        !name ||
        !email ||
        !service ||
        !message
      ) {

        formMessage.textContent =
          "Please fill in all details.";

        return;

      }


      formMessage.textContent =
        "Sending your enquiry...";


      // Send data to backend

      try {

        const response =
          await fetch(
            `${API_URL}/api/enquiries`,
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                name: name,

                email: email,

                service: service,

                message: message

              })

            }
          );


        const data =
          await response.json();


        if (response.ok) {

          formMessage.textContent =
            "✅ Enquiry submitted successfully!";

          contactForm.reset();

        } else {

          formMessage.textContent =
            data.message ||
            "Something went wrong.";

        }


      } catch (error) {

        console.error(
          "Backend Error:",
          error
        );


        formMessage.textContent =
          "❌ Backend server is not connected.";

      }

    }
  );

}


// ==========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener(
  "click",
  function (event) {

    if (
      navLinks &&
      menuButton &&
      !navLinks.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {

      navLinks.classList.remove("open");

    }

  }
);


// ==========================================
// SERVICE CARD ANIMATION
// ==========================================

const cards =
  document.querySelectorAll(
    ".service-card"
  );


if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (
              entry.isIntersecting
            ) {

              entry.target.style.opacity =
                "1";

              entry.target.style.transform =
                "translateY(0)";

            }

          }
        );

      },
      {
        threshold: 0.15
      }
    );


  cards.forEach(
    function (card) {

      card.style.opacity = "0";

      card.style.transform =
        "translateY(20px)";

      card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

      observer.observe(card);

    }
  );

}
```
