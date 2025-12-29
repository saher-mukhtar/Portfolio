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

/* ===== Forms Filter + Show more (collapsed view) ===== */
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const formCards = Array.from(document.querySelectorAll(".form-card"));
  const toggle = document.getElementById("forms-toggle");
  let collapsed = true;
  let currentFilter = "all";
  const MIN_VISIBLE = 9;

  function getMatchingCards() {
    return formCards.filter(
      (card) => currentFilter === "all" || card.dataset.type === currentFilter
    );
  }

  function hideCard(card) {
    // cancel pending show timers
    if (card._showTimeout) {
      clearTimeout(card._showTimeout);
      delete card._showTimeout;
    }

    // add hidden class to animate collapse
    card.classList.add("hidden");
    card.setAttribute("aria-hidden", "true");

    // clear any previous hide timeout
    if (card._hideTimeout) clearTimeout(card._hideTimeout);

    // After the transition ends (or as a fallback after 450ms), set display:none to remove from grid flow
    const onEnd = (e) => {
      if (e.propertyName === "max-height" || e.propertyName === "opacity") {
        card.style.display = "none";
        card.removeEventListener("transitionend", onEnd);
        if (card._hideTimeout) {
          clearTimeout(card._hideTimeout);
          delete card._hideTimeout;
        }
      }
    };

    card.addEventListener("transitionend", onEnd);

    // fallback in case transitionend doesn't fire
    card._hideTimeout = setTimeout(() => {
      card.style.display = "none";
      card.removeEventListener("transitionend", onEnd);
      delete card._hideTimeout;
    }, 500);
  }

  function showCard(card) {
    // cancel pending hide timers
    if (card._hideTimeout) {
      clearTimeout(card._hideTimeout);
      delete card._hideTimeout;
    }

    // ensure card is in flow before removing hidden to animate
    card.style.display = "block";

    // small delay to ensure the browser registers display:block before removing the hidden class
    card._showTimeout = setTimeout(() => {
      card.classList.remove("hidden");
      card.setAttribute("aria-hidden", "false");
      if (card._showTimeout) {
        clearTimeout(card._showTimeout);
        delete card._showTimeout;
      }
    }, 20);
  }

  function applyCollapsedView() {
    const matching = getMatchingCards();

    // First, show the matching cards that should be visible (prevents overlap issues)
    if (matching.length > MIN_VISIBLE) {
      if (collapsed) {
        // show first MIN_VISIBLE only, hide rest with animation
        matching.forEach((c, i) =>
          i < MIN_VISIBLE ? showCard(c) : hideCard(c)
        );
        if (toggle) {
          toggle.style.display = "inline-block";
          toggle.textContent = "Show more";
          toggle.setAttribute("aria-expanded", "false");
        }
      } else {
        // expanded - show all matching
        matching.forEach((c) => showCard(c));
        if (toggle) {
          toggle.style.display = "inline-block";
          toggle.textContent = "Show less";
          toggle.setAttribute("aria-expanded", "true");
        }
      }
    } else {
      // fewer than MIN_VISIBLE: show all and hide toggle
      matching.forEach((c) => showCard(c));
      if (toggle) toggle.style.display = "none";
    }

    // Hide non-matching cards (do this after showing matching to avoid transient gaps)
    formCards.forEach((card) => {
      if (matching.indexOf(card) === -1) hideCard(card);
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      // reset to collapsed view when filter changes
      collapsed = true;
      applyCollapsedView();
    });
  });

  if (toggle) {
    toggle.addEventListener("click", () => {
      collapsed = !collapsed;
      applyCollapsedView();
    });
  }

  // Add ripple effect to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // create ripple
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const circle = document.createElement("span");
      circle.className = "ripple";
      circle.style.width = circle.style.height = size + "px";
      circle.style.left = e.clientX - rect.left - size / 2 + "px";
      circle.style.top = e.clientY - rect.top - size / 2 + "px";
      this.appendChild(circle);
      // remove after animation
      setTimeout(() => circle.remove(), 650);
    });
  });

  // Initialize - show all then apply collapse so transitions work
  formCards.forEach((c) => showCard(c));
  applyCollapsedView();
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
