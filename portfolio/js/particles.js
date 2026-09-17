/* ==========================================================================
   Subtle ambient particle grid — performance-friendly, respects reduced motion
   ========================================================================== */

(function () {
  const canvas = document.getElementById("bg-particles");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  let width, height, particles;
  const DENSITY = 14000; // px^2 per particle — keep sparse

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight * 0.3);
    const count = Math.min(70, Math.floor((width * height) / DENSITY));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.1 + 0.4,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      o: Math.random() * 0.35 + 0.12
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#C8A96B";
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.globalAlpha = p.o;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(tick);
})();
