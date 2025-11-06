/* ===== Toggle Icon Navbar ===== */
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/* ===== Scroll Section Active Link ===== */
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // Sticky navbar
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Remove toggle icon and navbar when click navbar link (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/* ===== Read More (About Section) ===== */
document.getElementById("read-more-btn").addEventListener("click", function () {
  const moreText = document.getElementById("more-text");
  const isHidden = window.getComputedStyle(moreText).display === "none";

  if (isHidden) {
    moreText.style.display = "inline";
    this.textContent = "Read Less";
  } else {
    moreText.style.display = "none";
    this.textContent = "Read More";
  }
});

/* ===== Services Buttons ===== */
document.querySelectorAll(".read-more-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const moreText = this.previousElementSibling.querySelector(".more-text");
    const isHidden = window.getComputedStyle(moreText).display === "none";

    if (isHidden) {
      moreText.style.display = "inline";
      this.textContent = "Read Less";
    } else {
      moreText.style.display = "none";
      this.textContent = "Read More";
    }
  });
});

/* ===== Scroll Reveal Animations ===== */
ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-image, .services-container, .Portfolio-box, .portfolio-slider, .contact form",
  { origin: "top" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "left" });

/* ===== Typed JS Effect ===== */
const typed = new Typed(".multiple-text", {
  strings: [
    "Front-end Developer",
    "WordPress Developer",
    "UI/UX Developer",
    "Website Redesign Expert",
  ],
  typeSpeed: 100,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

/* ===== Multiple Users - Collect Data ===== */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const tableBody = document.querySelector("#userTable tbody");

  function updateTable() {
    tableBody.innerHTML = "";
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach((user) => {
      let row = `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
        </tr>`;
      tableBody.innerHTML += row;
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email });

    localStorage.setItem("users", JSON.stringify(users));
    updateTable();
    form.reset();
  });

  updateTable();
});

/* ===== Testimonials Slider ===== */
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");

  let current = 0;
  const total = testimonials.length;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });
  }

  showTestimonial(current);

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % total;
    showTestimonial(current);
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + total) % total;
    showTestimonial(current);
  });
});

/* ===== Contact Form Success Message ===== */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    messageDiv.classList.add("show");
    form.reset();

    setTimeout(() => {
      messageDiv.classList.remove("show");
    }, 3000);
  });
});

/* ===== Portfolio Slider ===== */
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".portfolio-slider");

  sliders.forEach((slider) => {
    const slides = slider.querySelector(".slides");
    const images = slider.querySelectorAll(".slides img");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");

    let counter = 0;

    function updateSlide() {
      const size = images[0].clientWidth;
      slides.style.transform = `translateX(${-size * counter}px)`;
    }

    next.addEventListener("click", () => {
      counter = (counter + 1) % images.length;
      updateSlide();
    });

    prev.addEventListener("click", () => {
      counter = (counter - 1 + images.length) % images.length;
      updateSlide();
    });
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll(".portfolio-slider").forEach((slider) => {
      const slides = slider.querySelector(".slides");
      const images = slider.querySelectorAll(".slides img");
      const counter = 0;
      slides.style.transform = `translateX(${
        -images[0].clientWidth * counter
      }px)`;
    });
  });
});
