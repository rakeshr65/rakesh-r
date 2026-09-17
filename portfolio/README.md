# Rakesh R — Developer Portfolio

A premium, minimal developer portfolio built with plain HTML5, CSS3, vanilla JavaScript and Bootstrap 5. No build step required — open `index.html` directly or serve the folder with any static file server.

## Project structure

```
portfolio/
├── index.html                 Main single-page site
├── README.md
├── projects/                  Case study pages
│   ├── event-management.html
│   ├── lms.html
│   ├── billing-system.html
│   └── upskill.html
├── assets/
│   ├── images/
│   │   ├── profile/            rakesh-profile.svg (portrait placeholder)
│   │   ├── projects/            project preview placeholders (.svg)
│   │   ├── experience/
│   │   └── icons/
│   └── resume/
│       └── README-resume.txt   instructions for adding Rakesh_Resume.pdf
├── css/
│   ├── style.css               design tokens + component styles
│   ├── responsive.css          breakpoints
│   └── animations.css          scroll reveal + hero entrance
└── js/
    ├── main.js                 navbar, mobile menu, cursor, contact form
    ├── animations.js           scroll reveal + typing effect
    ├── projects.js              project data + filtering
    └── particles.js            ambient background canvas
```

## Customizing content

- **Personal details** (email, phone) are placeholders in `index.html` — search for `example.com` and `XXXXX` and replace them.
- **Projects**: edit the `projects` array in `js/projects.js`. Cards, tags, and links are generated from this array automatically.
- **Resume**: add your PDF at `assets/resume/Rakesh_Resume.pdf`. The "Download Resume" button already points there.
- **Profile photo / project images**: replace the `.svg` placeholders in `assets/images/` with real photos/screenshots (jpg/png/webp). Update the `src` paths in `index.html` and `js/projects.js` accordingly.
- **Colors**: all colors are CSS custom properties at the top of `css/style.css` under `:root`.

## Contact form

The contact form validates input client-side but does **not** send email on its own — there is no backend configured. On submit, it currently opens a `mailto:` link as a fallback. To wire up real submissions:

- Connect it to a form service (Formspree, EmailJS, Getform, etc.) and update the `fetch`/action logic in `js/main.js` (`initContactForm`), or
- Point it at your own backend API endpoint.

## Notes on accuracy

This portfolio intentionally avoids inventing experience, employers, metrics, or certifications. Java/Spring Boot are presented as current learning focus and personal projects, not as professional employment history — see the Experience and Currently Exploring sections.
