// DigiSpark Frontend JavaScript
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
document.addEventListener("click", function (event) {
  if (navLinks && menuButton && !navLinks.contains(event.target) && !menuButton.contains(event.target)) {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// Dynamic footer year
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Add professional lead fields without changing the existing HTML structure.
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const serviceField = document.getElementById("service");
  const messageField = document.getElementById("message");

  function addFieldAfter(element, html) {
    if (element && element.parentElement) element.parentElement.insertAdjacentHTML("afterend", html);
  }

  addFieldAfter(serviceField, `
    <label>Project Type
      <select id="projectType" required>
        <option value="">Choose project type</option>
        <option>New Project</option>
        <option>Existing Website / Business</option>
        <option>Monthly Marketing</option>
        <option>One-Time Service</option>
        <option>Other</option>
      </select>
    </label>
    <label>Estimated Budget
      <select id="budget" required>
        <option value="">Choose budget</option>
        <option>Under ₹10,000</option>
        <option>₹10,000 – ₹25,000</option>
        <option>₹25,000 – ₹50,000</option>
        <option>₹50,000 – ₹1,00,000</option>
        <option>₹1,00,000+</option>
        <option>Not decided yet</option>
      </select>
    </label>
  `);

  addFieldAfter(document.getElementById("email"), `
    <label>Phone / WhatsApp
      <input type="tel" id="phone" placeholder="Enter your phone number" inputmode="tel" required>
    </label>
  `);

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const projectType = document.getElementById("projectType").value;
    const budget = document.getElementById("budget").value;
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!name || !email || !phone || !service || !projectType || !budget || !message) {
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
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          project_type: projectType,
          budget,
          message
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to submit enquiry.");

      if (formMessage) formMessage.textContent = `✅ Enquiry #${data.enquiryId} submitted successfully! We will contact you soon.`;
      contactForm.reset();
    } catch (error) {
      console.error("DigiSpark API Error:", error);
      if (formMessage) formMessage.textContent = "❌ Unable to submit right now. Please try again.";
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
