(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header scroll state
  var header = document.getElementById("siteHeader");
  function onScrollHeader() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // Bio read-more toggle
  var bioToggle = document.getElementById("bioToggle");
  var bioMore = document.getElementById("bioMore");
  if (bioToggle && bioMore) {
    bioToggle.addEventListener("click", function () {
      var isOpen = bioMore.classList.toggle("open");
      bioToggle.classList.toggle("open", isOpen);
      bioToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      bioToggle.firstChild.textContent = isOpen ? "Show Less " : "Read Full Profile ";
    });
  }

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // Video showcase: play only while in view
  var videoCards = document.querySelectorAll(".video-card[data-video]");
  if ("IntersectionObserver" in window) {
    var videoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target.querySelector("video");
          if (!video) return;
          if (entry.isIntersecting) {
            video.play().catch(function () {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );
    videoCards.forEach(function (card) { videoObserver.observe(card); });
  }

  // Mute/unmute toggle per video
  document.querySelectorAll("[data-mute-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".video-card");
      var video = card ? card.querySelector("video") : null;
      if (!video) return;
      video.muted = !video.muted;
      btn.classList.toggle("unmuted", !video.muted);
    });
  });

})();
