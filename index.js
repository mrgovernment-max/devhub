// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  // Change icon when menu is open
  if (navLinks.classList.contains("active")) {
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Contact form submission
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    try {
      const res = await fetch(
        "https://backendroutes-lcpt.onrender.com/contactme",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        }
      );

      let data;

      try {
        data = await res.json();
      } catch {
        console.error("Response was not JSON");
        showMessage("Message failed. Please try again.", "error");
        return;
      }

      // Handle backend response
      if (res.ok && data.success) {
        showMessage("Your message has been sent successfully!", "success");
        this.reset();
      } else {
        showMessage(
          data.message || "Something went wrong. Try again.",
          "error"
        );
      }
    } catch (err) {
      console.error("Fetch error:", err);
      showMessage("Network error. Please check your connection.", "error");
    }
  });

// function to show messages
function showMessage(text, type) {
  loader.style.display = "none";
  const msg = document.createElement("div");
  msg.className = `form-message ${type}`;
  msg.textContent = text;

  document.querySelector(".form-status")?.remove();
  msg.classList.add("form-status");
  document.getElementById("contactForm").appendChild(msg);

  setTimeout(() => msg.remove(), 4000);
}
