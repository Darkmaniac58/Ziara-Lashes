/*Ziara Lashes */

(function() {
  'use strict';

  // === Scroll Progress Bar ===
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }

  // === Navbar Scroll Effect ===
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', function() {
    updateScrollProgress();
    updateNavbar();
  }, { passive: true });

  // === Smooth Scroll for Nav Links ===
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        var navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.remove('open');
      }
    });
  });

  // === Hamburger Menu ===
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // === Tab Switching ===
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tabId = this.getAttribute('data-tab');

      // Deactivate all
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabContents.forEach(function(c) { c.classList.remove('active'); });

      // Activate selected
      this.classList.add('active');
      var target = document.getElementById(tabId);
      if (target) target.classList.add('active');
    });
  });

  // === Testimonial Carousel ===
  var carouselTrack = document.getElementById('carouselTrack');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var dotsContainer = document.getElementById('carouselDots');

  if (carouselTrack) {
    var slides = carouselTrack.querySelectorAll('.testimonial-card');
    var currentSlide = 0;
    var totalSlides = slides.length;
    var autoplayInterval;

    // Create dots
    slides.forEach(function(_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function() {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentSlide = index;
      if (currentSlide < 0) currentSlide = totalSlides - 1;
      if (currentSlide >= totalSlides) currentSlide = 0;

      carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

      // Update dots
      var dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    prevBtn.addEventListener('click', function() {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener('click', function() {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });

    function startAutoplay() {
      autoplayInterval = setInterval(function() {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    startAutoplay();

    // Touch/swipe support
    var startX = 0;
    var endX = 0;

    carouselTrack.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', function(e) {
      endX = e.changedTouches[0].clientX;
      var diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide(currentSlide + 1);
        else goToSlide(currentSlide - 1);
        resetAutoplay();
      }
    }, { passive: true });
  }

  // === Booking Form ===
  var bookingForm = document.getElementById('bookingForm');
  var toast = document.getElementById('toast');
  var toastClose = document.getElementById('toastClose');

  if (bookingForm && toast) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Show success toast
      toast.classList.add('show');

      // Reset form
      bookingForm.reset();

      // Auto-hide after 5 seconds
      setTimeout(function() {
        toast.classList.remove('show');
      }, 5000);
    });

    toastClose.addEventListener('click', function() {
      toast.classList.remove('show');
    });
  }

  // === Scroll Reveal Animations ===
  var revealElements = document.querySelectorAll('.service-card, .gallery-item, .info-card, .value-card, .price-list');

  // Add reveal class
  revealElements.forEach(function(el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function(el) {
    observer.observe(el);
  });

  // === Hero Animation on Load ===
  window.addEventListener('load', function() {
    var heroElements = document.querySelectorAll('.animate-in');
    heroElements.forEach(function(el, i) {
      el.style.animationDelay = (i * 0.12) + 's';
    });
  });

})();
