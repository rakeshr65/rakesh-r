/* ==========================================================================
   Animation helpers: scroll reveal + typing effect
   ========================================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------- Scroll reveal */
window.initReveal = function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]:not(.is-revealed)");
  if (prefersReducedMotion) {
    targets.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(el => observer.observe(el));
};




/* ------------------------------------------------------------ Typing role */
function initTypedRoles() {
  const el = document.getElementById("typed-role");
  if (!el) return;

  const roles = ["Java Backend Developer", "Full-Stack Developer", "Software Developer"];

  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function step() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(step, 1600);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(step, deleting ? 35 : 65);
  }

  step();
}

document.addEventListener("DOMContentLoaded", () => {
  initTypedRoles();
  window.initReveal();
});


// Hero load-in sequence
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Scroll-triggered reveal
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("in-view"), i * 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
}



// Rotating role text
function initRotator() {
  const el = document.getElementById("rotator");
  if (!el) return;
  const roles = ["Java backend development", "Full-stack development", "Web applications"];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % roles.length;
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = roles[i];
      el.style.opacity = 1;
    }, 300);
  }, 2800);
  el.style.transition = "opacity 0.3s ease";
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initRotator();
});

