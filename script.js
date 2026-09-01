// DigiSpark Frontend JavaScript

// Production backend deployed on Render.
const API_URL = "https://digispark-v0hl.onrender.com";

// Mobile navigation
const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", navLinks.classList.contains("open") ? "true" : "false");
  });
}

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    if (navLinks) navLinks.classList.remove("open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
  });
});

// Close mobile menu when clicking outside it
document.addEventListener("click", function (event) {
  if (
    navLinks &&
    menuButton &&
    !navLinks.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// Dynamic footer year
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Contact / enquiry form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!name || !email || !service || !message) {
      if (formMessage) formMessage.textContent = "Please fill in all details.";
      return;
    }

    if (formMessage) formMessage.textContent = "Sending your enquiry...";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit enquiry.");
      }

      if (formMessage) {
        formMessage.textContent = "✅ Enquiry submitted successfully! We will contact you soon.";
      }
      contactForm.reset();
    } catch (error) {
      console.error("DigiSpark API Error:", error);
      if (formMessage) {
        formMessage.textContent = "❌ Unable to submit right now. Please try again.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Enquiry →";
      }
    }
  });
}

// Service-card reveal animation
const cards = document.querySelectorAll(".service-card");

if ("IntersectionObserver" in window && cards.length) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(function (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}
