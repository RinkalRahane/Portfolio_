/**
 * RINKAL RAHANE PORTFOLIO - JAVASCRIPT
 * Accessible, lightweight interactions: theme toggle, mobile navigation,
 * scrollspy navigation, scroll-reveal animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------------------
  // 2. Theme Toggle (Light / Dark Mode)
  // -------------------------------------------------------------------------
  const themeToggles = [
    document.getElementById("theme-toggle"),
    document.getElementById("mobile-theme-toggle"),
  ].filter(Boolean);

  const STORAGE_KEY = "rinkal-portfolio-theme";

  // Determine initial theme: saved preference -> system preference -> default light
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    themeToggles.forEach((btn) => {
      const isDark = theme === "dark";
      btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  // Apply on load
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Listen for clicks on both toggles
  themeToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  });

  // Listen for OS preference changes if user hasn't explicitly set preference
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Menu
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function openMobileMenu() {
    if (!hamburgerBtn || !mobileMenu) return;
    hamburgerBtn.classList.add("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute("aria-label", "Close navigation menu");
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
  }

  function closeMobileMenu() {
    if (!hamburgerBtn || !mobileMenu) return;
    hamburgerBtn.classList.remove("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Open navigation menu");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
  }

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("is-open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking any nav link
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside menu or header
    document.addEventListener("click", (e) => {
      const header = document.getElementById("header");
      if (header && !header.contains(e.target) && mobileMenu.classList.contains("is-open")) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        closeMobileMenu();
        hamburgerBtn.focus();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 4. Scrollspy (Active Navigation Link Highlighting)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const desktopNavLinks = document.querySelectorAll(".desktop-nav .nav-link");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  // -------------------------------------------------------------------------
  // 5. Scroll Reveal Animations (Respects Reduced Motion)
  // -------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const animatables = document.querySelectorAll(
      ".about-grid, .experience-grid, .skills-grid, .projects-grid, .education-card, .contact-card"
    );

    animatables.forEach((el) => {
      el.classList.add("fade-in-section");
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    animatables.forEach((el) => observer.observe(el));
  }
});
