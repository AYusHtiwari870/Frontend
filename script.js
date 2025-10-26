document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.nav-links a[href^="#"], a.btn-primary[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  var video = document.querySelector(".video-container video");
  var overlay = document.querySelector(".play-overlay");
  function togglePlay() {
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  }
  if (overlay && video) {
    overlay.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    video.addEventListener("play", function () {
      overlay.style.display = "none";
    });
    video.addEventListener("pause", function () {
      overlay.style.display = "flex";
    });
  }

  var subForm = document.querySelector(".subscribe-form");
  if (subForm) {
    var emailInput = subForm.querySelector('input[type="email"], input[name="email"]') || subForm.querySelector("input");
    var status = document.createElement("div");
    status.style.marginTop = "10px";
    status.style.fontSize = "14px";
    subForm.appendChild(status);
    subForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = (emailInput && emailInput.value || "").trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (!ok) {
        status.textContent = "Please enter a valid email.";
        status.style.color = "#d33";
        return;
      }
      status.textContent = "Subscribed! Check your inbox.";
      status.style.color = "#2b8cff";
      if (emailInput) emailInput.value = "";
    });
  }

  var contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var inputs = contactForm.querySelectorAll("input, textarea");
      var valid = true;
      inputs.forEach(function (el) {
        if (el.hasAttribute("required") && !el.value.trim()) valid = false;
        if (el.type === "email" && el.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) valid = false;
      });
      if (!valid) {
        alert("Please complete the form correctly.");
        return;
      }
      alert("Thanks! We’ll get back to you soon.");
      inputs.forEach(function (el) { el.value = ""; });
    });
  }

  var dots = document.querySelectorAll(".carousel-dots .dot");
  var slides = document.querySelectorAll(".testimonial");
  function showSlide(i) {
    slides.forEach(function (s, idx) { s.style.display = idx === i ? "block" : "none"; });
    dots.forEach(function (d, idx) { d.classList.toggle("active", idx === i); });
    current = i;
  }
  var current = 0;
  if (slides.length) {
    slides.forEach(function (s, idx) { s.style.display = idx === 0 ? "block" : "none"; });
  }
  if (dots.length && slides.length) {
    dots.forEach(function (dot, idx) {
      dot.addEventListener("click", function () { showSlide(idx); });
    });
    setInterval(function () {
      var next = (current + 1) % slides.length;
      showSlide(next);
    }, 6000);
  }

  var ioTargets = document.querySelectorAll(".feature-item, .organize-section, .prototype, .partners, .pricing-section, .contact, .testimonials");
  if ("IntersectionObserver" in window && ioTargets.length) {
    ioTargets.forEach(function (el) { el.style.opacity = "0"; el.style.transform = "translateY(20px)"; el.style.transition = "opacity .6s ease, transform .6s ease"; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    ioTargets.forEach(function (el) { io.observe(el); });
  }
});
