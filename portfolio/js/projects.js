/* ==========================================================================
   Project data + filtering
   ========================================================================== */

const projects = [
  {
    id: "event-management",
    title: "Event Management System",
    badge: "Java Backend Project",
    category: "java",
    description: "A backend-focused event management application designed to manage events, users, registrations and related data through RESTful APIs.",
    technologies: ["Java", "Spring Boot", "MySQL", "REST API", "Postman"],
    highlight: "Built to strengthen practical Java backend development and API design.",
    image: "assets/images/projects/event-management.png",
    github: "https://github.com/rakeshr65/",
    liveDemo: "",
    caseStudy: "projects/event-management.html"
  },
  {
    id: "lms",
    title: "Learning Management System",
    badge: "Web Application",
    category: "dotnet",
    description: "A web-based learning management application for managing courses, learning content and related administrative workflows.",
    technologies: ["C#", "ASP.NET", "SQL Server", "JavaScript", "AJAX", "jQuery", "Bootstrap"],
    highlight: "Demonstrates hands-on experience building database-driven business applications.",
    image: "assets/images/projects/learning-management.png",
    github: "https://github.com/rakeshr65/",
    liveDemo: "",
    caseStudy: "projects/lms.html"
  },
  {
    id: "billing-system",
    title: "Cracker Admin & Billing System",
    badge: "Business Application",
    category: "dotnet",
    description: "An internal administrative and billing application focused on managing business operations, records and billing workflows.",
    technologies: ["C#", "ASP.NET", "SQL Server", "HTML", "CSS", "JavaScript", "Bootstrap"],
    highlight: "Built around practical business workflows and database-driven operations.",
    image: "assets/images/projects/cracker-billing-system.png",
    github: "https://github.com/rakeshr65/",
    liveDemo: "",
    caseStudy: "projects/billing-system.html"
  },
  {
    id: "upskill",
    title: "Upskill Mini Project",
    badge: "Java Backend Project",
    category: "java",
    description: "A practical Spring Boot application created to strengthen backend development fundamentals, CRUD operations and API testing.",
    technologies: ["Java", "Spring Boot", "MySQL", "REST APIs", "Postman"],
    highlight: "Hands-on project focused on building confidence with the Java backend ecosystem.",
    image: "assets/images/projects/upskill-mini-project.png",
    github: "https://github.com/rakeshr65/",
    liveDemo: "",
    caseStudy: "projects/upskill.html"
  }
];

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = projects.map((p, i) => {
    const liveDemoBtn = p.liveDemo
      ? `<a class="project-link-btn" href="${p.liveDemo}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Live Demo</a>`
      : `<span class="project-link-btn disabled" aria-disabled="true"><i class="bi bi-box-arrow-up-right"></i> Demo unavailable</span>`;

    return `
    <div class="project-card" data-category="${p.category}" data-reveal data-reveal-delay="${(i % 2) + 1}">
      <div class="project-image">
        <img src="${p.image}" alt="${p.title} project preview" loading="lazy" width="800" height="500">
      </div>
      <div class="project-body">
        <span class="project-badge">${p.badge}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.technologies.map(t => `<span class="project-tag">${t}</span>`).join("")}
        </div>
        <p class="project-highlight">${p.highlight}</p>
        <div class="project-links">
          <a class="project-link-btn" href="${p.github}" target="_blank" rel="noopener"><i class="bi bi-github"></i> GitHub</a>
          ${liveDemoBtn}
         <!-- <a class="project-link-btn" href="${p.caseStudy}"><i class="bi bi-file-earmark-text"></i> Case Study</a> -->
        </div>
      </div>
    </div>`;
  }).join("");

  if (window.initReveal) window.initReveal();
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("project-grid");
  if (!filterButtons.length || !grid) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      grid.querySelectorAll(".project-card").forEach(card => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initProjectFilters();
});
