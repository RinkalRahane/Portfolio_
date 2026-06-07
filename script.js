// ======================
// DARK MODE TOGGLE
// ======================

const toggleBtn = document.getElementById("mode-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.innerHTML = "☀️";
  } else {
    toggleBtn.innerHTML = "🌙";
  }
});

// ======================
// TYPING EFFECT
// ======================

const text = "AI & ML Developer | Python Developer | Web Developer";
const typingElement = document.querySelector(".typing");

let index = 0;

function typeWriter() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 80);
  }
}

window.onload = () => {
  typeWriter();
};

// ======================
// SCROLL REVEAL ANIMATION
// ======================

const revealElements = document.querySelectorAll(
  ".glass-card, .skill-card, .project-card, .stat-card"
);

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// ======================
// ACTIVE NAVBAR LINK
// ======================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// ======================
// COUNTER ANIMATION
// ======================

const counters = document.querySelectorAll(".stat-card h2");

const runCounter = () => {
  counters.forEach((counter) => {
    const target = parseInt(counter.innerText);

    let count = 0;

    const speed = target / 50;

    const updateCount = () => {
      if (count < target) {
        count += speed;
        counter.innerText = Math.ceil(count) + "+";
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });
};

runCounter();

// ======================
// SMOOTH SCROLL
// ======================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});