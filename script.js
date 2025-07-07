//chinh toc do cua video
window.addEventListener("load", function () {
  const video = document.querySelector(".video-bg");
  video.playbackRate = 0.8;
});

// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: false,
    mirror: false,
    easing: "ease-in-out",
  });

  // Variables
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");
  const skillBars = document.querySelectorAll(".skill-progress");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const contactForm = document.getElementById("contactForm");

  // Activate sections and handle navigation
  function activateSection() {
    // Get current scroll position
    const scrollY = window.pageYOffset;

    // Loop through sections to determine which one is in view
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      // Check if section is in view
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Add active class to section
        section.classList.add("active");

        // Update navigation links
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });

    // Change header style on scroll
    if (scrollY > 100) {
      header.classList.add("scroll-header");
    } else {
      header.classList.remove("scroll-header");
    }
  }

  // Activate first section by default
  sections[0].classList.add("active");

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Activate skills bars animation when skills section is in view
  const activateSkillBars = () => {
    const skillsSection = document.getElementById("skills");
    const skillsSectionTop = skillsSection.offsetTop;
    const skillsSectionHeight = skillsSection.offsetHeight;
    const scrollY = window.pageYOffset;

    if (
      scrollY > skillsSectionTop - 300 &&
      scrollY < skillsSectionTop + skillsSectionHeight
    ) {
      skillBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress");
        bar.style.width = `${progress}%`;
      });
    }
  };

  // Filter projects
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Get filter value
      const filterValue = btn.getAttribute("data-filter");

      // Filter projects
      projectCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 200);
        } else if (card.getAttribute("data-category") === filterValue) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 200);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 500);
        }
      });
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Simulate form submission (replace with actual form submission)
      const submitBtn = document.querySelector(".submit-btn");
      const btnText = document.querySelector(".btn-text");
      const btnIcon = document.querySelector(".btn-icon i");

      // Change button state
      btnText.textContent = "Sending...";
      btnIcon.className = "fas fa-spinner fa-spin";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Show success message
        btnText.textContent = "Message Sent!";
        btnIcon.className = "fas fa-check";
        submitBtn.style.backgroundColor = "#28a745";

        // Reset button after 3 seconds
        setTimeout(() => {
          btnText.textContent = "Send Message";
          btnIcon.className = "fas fa-paper-plane";
          submitBtn.style.backgroundColor = "";
          submitBtn.disabled = false;
        }, 3000);
      }, 2000);
    });
  }

  // Parallax effect for background
  //   window.addEventListener("scroll", function () {
  //     const scrollPosition = window.pageYOffset;
  //     const videoBg = document.querySelector(".video-bg");

  //     if (videoBg) {
  //       videoBg.style.transform = `translateY(${scrollPosition * 0.2}px)`;
  //     }
  //   });

  // Cursor effects
  const cursor = document.createElement("div");
  const cursorDot = document.createElement("div");
  cursor.className = "cursor";
  cursorDot.className = "cursor-dot";
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;
  let speed = 0.2;
  let dotSpeed = 0.5;

  function animate() {
    // Smooth cursor following
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    // Dot follows more quickly
    dotX += (mouseX - dotX) * dotSpeed;
    dotY += (mouseY - dotY) * dotSpeed;

    // Apply positions
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    cursorDot.style.left = dotX + "px";
    cursorDot.style.top = dotY + "px";

    requestAnimationFrame(animate);
  }

  // Track mouse position
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hide default cursor over interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, .project-card, .skill-icon"
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-active");
      cursorDot.classList.add("cursor-dot-active");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-active");
      cursorDot.classList.remove("cursor-dot-active");
    });
  });

  // Add parallax effect to profile image
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    document.addEventListener("mousemove", function (e) {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      profileImage.style.transform = `perspective(1000px) rotateY(${
        mouseX * 5
      }deg) rotateX(${-mouseY * 5}deg)`;
    });
  }

  // Glitch effect for section titles
  const sectionTitles = document.querySelectorAll(".section-title");

  sectionTitles.forEach((title) => {
    title.addEventListener("mouseover", function () {
      title.classList.add("glitch-effect");
      setTimeout(() => {
        title.classList.remove("glitch-effect");
      }, 1000);
    });
  });

  // Text scramble effect for project titles
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = "";
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="scramble-char">${char}</span>`;
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // Apply text scramble effect to project titles
  const projectTitles = document.querySelectorAll(".project-info h3");

  projectTitles.forEach((title) => {
    const originalText = title.textContent;

    title.addEventListener("mouseenter", function () {
      const fx = new TextScramble(title);
      fx.setText(originalText);
    });
  });

  // Particle background for home section
  const createParticles = () => {
    const homeSection = document.getElementById("home");

    if (homeSection) {
      const particlesContainer = document.createElement("div");
      particlesContainer.className = "particles-container";
      homeSection.appendChild(particlesContainer);

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        // Random size
        const size = Math.random() * 5 + 1;

        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;

        // Random animation duration
        const duration = Math.random() * 20 + 10;

        // Apply styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);
      }
    }
  };

  // Initialize particles
  createParticles();

  // Add event listeners for scroll events
  window.addEventListener("scroll", activateSection);
  window.addEventListener("scroll", activateSkillBars);

  // Initial calls
  activateSection();
  activateSkillBars();
  animate(); // Start cursor animation

  // Preloader
  window.addEventListener("load", function () {
    const preloader = document.createElement("div");
    preloader.className = "preloader";
    preloader.innerHTML = `
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
            <p>Loading...</p>
        `;
    document.body.appendChild(preloader);

    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1500);
  });

  // Add the CSS for dynamic elements
  const dynamicStyles = document.createElement("style");
  dynamicStyles.innerHTML = `
        .cursor {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            mix-blend-mode: difference;
            transition: width 0.3s, height 0.3s;
        }
        
        .cursor-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 10000;
        }
        
        .cursor-active {
            width: 60px;
            height: 60px;
            background-color: rgba(0, 123, 255, 0.2);
        }
        
        .cursor-dot-active {
            width: 4px;
            height: 4px;
        }
        
        .glitch-effect {
            animation: glitchEffect 0.5s linear both;
        }
        
        @keyframes glitchEffect {
            0% { transform: translate(0); }
            20% { transform: translate(-5px, 5px); }
            40% { transform: translate(-5px, -5px); }
            60% { transform: translate(5px, 5px); }
            80% { transform: translate(5px, -5px); }
            100% { transform: translate(0); }
        }
        
        .scramble-char {
            color: var(--primary-color);
        }
        
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            background-color: var(--primary-color);
            border-radius: 50%;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-100px) rotate(180deg); }
            100% { transform: translateY(0) rotate(360deg); }
        }
        
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #111;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s;
        }
        
        .preloader p {
            color: var(--light-color);
            margin-top: 20px;
            font-size: 1.2rem;
        }
        
        .spinner {
            width: 60px;
            height: 60px;
            position: relative;
        }
        
        .double-bounce1, .double-bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: var(--primary-color);
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;
            animation: bounce 2s infinite ease-in-out;
        }
        
        .double-bounce2 {
            animation-delay: -1s;
        }
        
        @keyframes bounce {
            0%, 100% { transform: scale(0); }
            50% { transform: scale(1); }
        }
    `;

  document.head.appendChild(dynamicStyles);
});

//mail service
(function () {
  emailjs.init("3zOu3o6Jf21sH9qJ_");
})();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_ttjhj3j", "template_9zm5g3t", this).then(
      function () {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
      },
      function (error) {
        alert("Failed to send message. Error: " + JSON.stringify(error));
      }
    );
  });
