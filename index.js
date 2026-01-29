// Loading Animation
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.classList.add("loaded");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1000);
});

// Particle System
class Particles {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.createParticles(50);
    this.animate();
  }

  createParticles(count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 1}px;
          height: ${Math.random() * 4 + 1}px;
          background: rgba(108, 99, 255, ${Math.random() * 0.3 + 0.1});
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        `;

      //starting postions
      particle.x = Math.random() * 100;
      particle.y = Math.random() * 100;
      particle.vx = (Math.random() - 0.5) * 0.5;
      particle.vy = (Math.random() - 0.5) * 0.5;

      particle.style.left = `${particle.x}vw`;
      particle.style.top = `${particle.y}vh`;

      this.container.appendChild(particle);
      this.particles.push(particle);
    }
  }

  //animation

  animate() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > 100) particle.vx *= -1;
      if (particle.y < 0 || particle.y > 100) particle.vy *= -1;

      particle.style.left = `${particle.x}vw`;
      particle.style.top = `${particle.y}vh`;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Custom Cursor
class CustomCursor {
  constructor() {
    this.cursor = document.getElementById("cursor");
    this.follower = document.getElementById("cursor-follower");
    this.posX = 0;
    this.posY = 0;
    this.followerX = 0;
    this.followerY = 0;

    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.posX = e.clientX;
      this.posY = e.clientY;
      this.cursor.style.left = `${this.posX}px`;
      this.cursor.style.top = `${this.posY}px`;
    });

    this.animate();

    // Add hover effects
    const hoverElements = document.querySelectorAll("a, button, .project-card");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.cursor.style.transform = "scale(1.5)";
        this.follower.style.transform = "scale(1.5)";
      });

      el.addEventListener("mouseleave", () => {
        this.cursor.style.transform = "scale(1)";
        this.follower.style.transform = "scale(1)";
      });
    });
  }

  animate() {
    this.followerX += (this.posX - this.followerX) / 4;
    this.followerY += (this.posY - this.followerY) / 4;

    this.follower.style.left = `${this.followerX}px`;
    this.follower.style.top = `${this.followerY}px`;

    requestAnimationFrame(() => this.animate());
  }
}

// Typewriter Effect
class Typewriter {
  constructor(element, texts, speed = 100) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      setTimeout(() => (this.isDeleting = true), 1500);
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
    }

    setTimeout(
      () => this.type(),
      this.isDeleting ? this.speed / 2 : this.speed
    );
  }
}

// Animated Counter
class Counter {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number");
    this.init();
  }

  init() {
    this.counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.round(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      };

      // Start counter when in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(counter);
    });
  }
}

// Animate Skills Progress
class AnimateSkills {
  constructor() {
    this.skillBars = document.querySelectorAll(".skill-progress");
    this.init();
  }

  init() {
    this.skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              bar.style.width = `${width}%`;
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(bar);
    });
  }
}

// Theme Toggle
class ThemeToggle {
  constructor() {
    this.themeToggle = document.querySelector(".theme-toggle");
    this.themeIcon = document.getElementById("theme-icon");
    this.init();
  }

  init() {
    // Check for saved theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateIcon(savedTheme);

    this.themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      this.updateIcon(newTheme);
    });
  }

  updateIcon(theme) {
    if (theme === "dark") {
      this.themeIcon.className = "fas fa-moon";
    } else {
      this.themeIcon.className = "fas fa-sun";
    }
  }
}

// Mobile Menu
class MobileMenu {
  constructor() {
    this.menuToggle = document.getElementById("menu-toggle");
    this.navLinks = document.getElementById("nav-links");
    this.init();
  }

  init() {
    this.menuToggle.addEventListener("click", () => {
      this.menuToggle.classList.toggle("active");
      this.navLinks.classList.toggle("active");
      document.body.style.overflow = this.navLinks.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking on link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.menuToggle.classList.remove("active");
        this.navLinks.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }
}

// Header Scroll Effect
class HeaderScroll {
  constructor() {
    this.header = document.getElementById("header");
    this.backToTop = document.getElementById("back-to-top");
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        this.header.classList.add("scrolled");
      } else {
        this.header.classList.remove("scrolled");
      }

      // Back to top button
      if (window.scrollY > 300) {
        this.backToTop.classList.add("visible");
      } else {
        this.backToTop.classList.remove("visible");
      }

      // Add active class to current section
      this.highlightNav();
    });
  }

  highlightNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
}

// Projects Filter
class ProjectsFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.projectCards = document.querySelectorAll(".project-card");
    this.init();
  }

  init() {
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        this.filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        this.projectCards.forEach((card) => {
          if (
            filterValue === "all" ||
            card.getAttribute("data-category") === filterValue
          ) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }
}

// Tabs System
class Tabs {
  constructor() {
    this.tabButtons = document.querySelectorAll(".tab-btn");
    this.tabPanes = document.querySelectorAll(".tab-pane");
    this.init();
  }

  init() {
    this.tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");

        // Remove active class from all buttons and panes
        this.tabButtons.forEach((btn) => btn.classList.remove("active"));
        this.tabPanes.forEach((pane) => pane.classList.remove("active"));

        // Add active class to clicked button and corresponding pane
        button.classList.add("active");
        document.getElementById(tabId).classList.add("active");
      });
    });
  }
}

// Enhanced Contact Form
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.submitText = document.getElementById("submit-text");
    this.formLoader = document.getElementById("form-loader");
    this.formMessage = document.getElementById("form-message");
    this.init();
  }

  init() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim(),
      };

      // Validate form
      if (!this.validateForm(formData)) return;

      // Show loading state
      this.submitText.style.opacity = "0";
      this.formLoader.style.display = "flex";

      try {
        const response = await fetch(
          "https://backendroutes-lcpt.onrender.com/contactme",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          this.showMessage("Message sent successfully!", "success");
          this.form.reset();
        } else {
          this.showMessage(
            data.message || "Something went wrong. Please try again.",
            "error"
          );
        }
      } catch (error) {
        this.showMessage(
          "Network error. Please check your connection.",
          "error"
        );
      } finally {
        // Reset loading state
        this.submitText.style.opacity = "1";
        this.formLoader.style.display = "none";
      }
    });
  }

  validateForm(formData) {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      this.showMessage("Please fill in all fields.", "error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      this.showMessage("Please enter a valid email address.", "error");
      return false;
    }

    return true;
  }

  showMessage(text, type) {
    this.formMessage.textContent = text;
    this.formMessage.className = type;
    this.formMessage.style.display = "block";

    setTimeout(() => {
      this.formMessage.style.display = "none";
    }, 5000);
  }
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  // Initialize classes
  new Particles(document.getElementById("particles"));
  new CustomCursor();
  new Typewriter(
    document.getElementById("typewriter"),
    [
      "Full Stack Developer",
      "Web Developer",
      "Cloud Practitioner",
      "Problem Solver",
      "Creative Thinker",
    ],
    100
  );
  new Counter();
  new AnimateSkills();
  new ThemeToggle();
  new MobileMenu();
  new HeaderScroll();
  new ProjectsFilter();
  new Tabs();
  new ContactForm();

  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Add animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements to animate
  document
    .querySelectorAll(
      ".section-title, .project-card, .skill-category, .certificate-card, .experience-item"
    )
    .forEach((el) => {
      observer.observe(el);
    });
});

// Functions ill add later
//particles.destroy();
//particles.pause();
//particles.setCount(100);
