const sections = document.querySelectorAll(".section-reveal");
const navLinks = [...document.querySelectorAll(".nav-links a")];

document.documentElement.classList.add("js-ready");

function revealVisibleSections() {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.15) {
      section.classList.add("visible");
    }
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.18 });

sections.forEach((section) => revealObserver.observe(section));
revealVisibleSections();
window.addEventListener("load", revealVisibleSections);

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, {
  rootMargin: "-35% 0px -55% 0px",
  threshold: 0,
});

document.querySelectorAll("section[id]").forEach((section) => activeObserver.observe(section));
