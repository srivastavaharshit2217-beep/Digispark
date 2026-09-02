// DigiSpark Frontend JavaScript
const API_URL = "https://digispark-v0hl.onrender.com";
const BUSINESS_PHONE = "919236368939";

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

// Make every service card tappable/clickable, while keeping its Learn More link.
document.querySelectorAll(".service-card").forEach(function (card) {
  const link = card.querySelector('a[href*="service.html"]');
  if (!link) return;
  card.style.cursor = "pointer";
  card.setAttribute("role", "link");
  card.setAttribute("tabindex", "0");
  card.addEventListener("click", function (event) {
    if (event.target.closest("a,button,input,select,textarea")) return;
    window.location.href = link.href;
  });
  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.href = link.href;
    }
  });
});

// WhatsApp + Call lead buttons
(function addLeadButtons() {
  const style = document.createElement("style");
  style.textContent = `
    .ds-lead-actions{position:fixed;right:20px;bottom:20px;z-index:9999;display:flex;flex-direction:column;gap:10px}
    .ds-lead-btn{display:flex;align-items:center;gap:9px;padding:12px 16px;border-radius:999px;font:800 13px Inter,Arial,sans-serif;text-decoration:none;box-shadow:0 10px 30px rgba(0,0,0,.22);transition:.25s ease;border:1px solid rgba(255,255,255,.15)}
    .ds-lead-btn:hover{transform:translateY(-3px);box-shadow:0 15px 35px rgba(0,0,0,.28)}
    .ds-wa{background:#25D366;color:#fff}.ds-call{background:#111;color:#fff}
    .ds-lead-icon{width:28px;height:28px;display:grid;place-items:center;border-radius:50%;font-size:15px}
    .ds-wa .ds-lead-icon{background:rgba(255,255,255,.18)}.ds-call .ds-lead-icon{background:#f5b72b;color:#111}
    @media(max-width:600px){.ds-lead-actions{right:12px;bottom:12px}.ds-lead-btn{width:48px;height:48px;padding:0;justify-content:center;border-radius:50%}.ds-lead-btn span:last-child{display:none}.ds-lead-icon{width:30px;height:30px}}
  `;
  document.head.appendChild(style);

  const wrap = document.createElement("div");
  wrap.className = "ds-lead-actions";
  wrap.innerHTML = `
    <a class="ds-lead-btn ds-wa" href="https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent("Hello DigiSpark, I want to discuss a digital project.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><span class="ds-lead-icon">☘</span><span>WhatsApp</span></a>
    <a class="ds-lead-btn ds-call" href="tel:+${BUSINESS_PHONE}" aria-label="Call DigiSpark"><span class="ds-lead-icon">☎</span><span>Call Now</span></a>
  `;
  document.body.appendChild(wrap);
})();

// Contact / enquiry form
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
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = "Sending..."; }

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, project_type: projectType, budget, message })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to submit enquiry.");

      const whatsappMessage = `Hello DigiSpark, I submitted an enquiry.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nProject Type: ${projectType}\nBudget: ${budget}\nProject: ${message}`;
      const whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;
      const trackingUrl = `client-status.html?token=${encodeURIComponent(data.trackingToken || "")}`;
      if (formMessage) formMessage.innerHTML = `✅ Enquiry #${data.enquiryId} submitted successfully!<br><a href="${trackingUrl}" style="color:#a87508;font-weight:800">Track Enquiry Status →</a> &nbsp; <a href="${whatsappUrl}" target="_blank" rel="noopener" style="color:#a87508;font-weight:800">Continue on WhatsApp →</a>`;
      contactForm.reset();
    } catch (error) {
      console.error("DigiSpark API Error:", error);
      if (formMessage) formMessage.textContent = "❌ Unable to submit right now. Please try again or contact us on WhatsApp.";
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = "Send Enquiry →"; }
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

// Premium homepage hero based on the user's uploaded reference image.
(function applyReferenceHomepage() {
  const path = window.location.pathname;
  const isHome = path.endsWith("/") || path.endsWith("/index.html") || path === "";
  const hero = document.querySelector("main .hero");
  if (!isHome || !hero) return;

  document.body.classList.add("home-ref");
  if (!document.querySelector('link[data-digispark-reference]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "homepage-reference.css";
    link.dataset.digisparkReference = "true";
    document.head.appendChild(link);
  }

  hero.innerHTML = `
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="hero-badge"><span>🚀</span> DIGITAL SOLUTIONS THAT DRIVE RESULTS</div>
        <h1>We Build, Grow &amp; Scale Your Business <span>Digitally</span></h1>
        <p class="hero-text">From stunning websites to powerful marketing strategies, we provide end-to-end digital solutions to help your brand stand out and succeed online.</p>
        <div class="buttons">
          <a href="services.html" class="btn primary">Explore Services <span>→</span></a>
          <a href="#contact" class="btn secondary">▣ &nbsp; Get Free Consultation</a>
        </div>
        <div class="ref-trust">
          <div class="trust-plus">+</div>
          <div class="trust-text"><strong>Trusted by 500+</strong><span>businesses worldwide</span></div>
        </div>
      </div>
      <div class="hero-visual">
        <img class="hero-photo" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85" alt="Digital business team working together">
        <div class="hero-photo-shade"></div>
        <div class="ref-line"></div>
        <div class="hero-brand-card"><div class="mark"><span>D</span><b>S</b></div><div class="name"><b>DIGI</b><strong>SPARK</strong></div><small>SPARK YOUR DIGITAL FUTURE</small></div>
        <div class="floating-ref ref-web"><div class="ico">◎</div><div>Web<br>Development</div></div>
        <div class="floating-ref ref-marketing"><div class="ico">⌁</div><div>Digital<br>Marketing</div></div>
        <div class="floating-ref ref-seo"><div class="ico">↗</div><div>SEO<br><small>Optimization</small></div></div>
        <div class="floating-ref ref-design"><div class="ico">✎</div><div>Graphic<br>Designing</div></div>
      </div>
    </div>
    <div class="hero-statbar">
      <div class="hero-stat"><div class="stat-icon">☺</div><div><strong>500+</strong><span>Happy Clients</span></div></div>
      <div class="hero-stat"><div class="stat-icon">▣</div><div><strong>850+</strong><span>Projects Completed</span></div></div>
      <div class="hero-stat"><div class="stat-icon">🏆</div><div><strong>5+</strong><span>Years of Experience</span></div></div>
      <div class="hero-stat"><div class="stat-icon">◉</div><div><strong>24/7</strong><span>Support Available</span></div></div>
    </div>`;
})();
