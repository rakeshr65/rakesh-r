/* ==========================================================================
   Main interactivity
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavScroll();
  initMobileNav();
  initActiveNavLink();
  initScrollProgress();
  initBackToTop();
  initCustomCursor();
  initContactForm();
  initFooterYear();
});

/* --------------------------------------------------------- Navbar scroll */
function initNavScroll() {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ------------------------------------------------------------ Mobile nav */
function initMobileNav() {
  const toggler = document.querySelector(".navbar-toggler-custom");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector(".mobile-nav-close");
  const backdrop = document.querySelector(".nav-backdrop");
  if (!toggler || !mobileNav) return;

  function open() {
    mobileNav.classList.add("is-open");
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    mobileNav.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  toggler.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
}

/* ------------------------------------------------------- Active nav link */
function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav ul a");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35, rootMargin: "-90px 0px -40% 0px" });

  sections.forEach(section => observer.observe(section));
}

/* ---------------------------------------------------------- Scroll bar */
function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ----------------------------------------------------------- Back to top */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  function toggle() {
    btn.classList.toggle("is-visible", window.scrollY > 600);
  }
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* --------------------------------------------------------- Custom cursor */
function initCustomCursor() {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch || prefersReducedMotion || window.innerWidth < 992) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(dot, ring);
  document.body.classList.add("has-custom-cursor");

  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactiveSelector = "a, button, input, textarea, .project-card, .skill-card, .filter-btn";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) ring.classList.add("is-active");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) ring.classList.remove("is-active");
  });
}

/* --------------------------------------------------------- Contact form */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");

  function validateField(field) {
    const value = field.value.trim();
    let valid = true;

    if (field.hasAttribute("required") && value === "") valid = false;
    if (field.type === "email" && value !== "") {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    field.classList.toggle("is-invalid", !valid);
    return valid;
  }

  form.querySelectorAll(".form-control").forEach(field => {
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = Array.from(form.querySelectorAll(".form-control"));
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      status.textContent = "Please check the highlighted fields before sending.";
      status.style.color = "#d98686";
      status.classList.add("is-visible");
      return;
    }

    // NOTE: No backend/email service is configured in this static build.
    // To enable real submissions, connect this form to a service such as
    // Formspree, EmailJS, or a custom API endpoint, or use the mailto
    // fallback below.
    const name = form.querySelector("#contact-name").value.trim();
    const email = form.querySelector("#contact-email").value.trim();
    const message = form.querySelector("#contact-message").value.trim();

    const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(
      "Portfolio inquiry from " + name
    )}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")")}`;

    status.style.color = "";
    status.textContent = "No email service is connected yet — opening your mail app instead.";
    status.classList.add("is-visible");

    window.location.href = mailtoLink;
    form.reset();
  });
}

/* -------------------------------------------------------------- Footer */
function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}
