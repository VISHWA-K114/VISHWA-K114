/* ============================================
   VISHWA K — Portfolio Scripts (Premium Rebuild)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Reveal (Intersection Observer) ----
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ---- Navbar scroll shadow ----
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }


  // ---- Mobile nav toggle (with accessibility) ----
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ---- Custom cursor dot (desktop only) ----
  const cursorDot = document.querySelector('.cursor-dot');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.matchMedia('(pointer: fine)').matches && cursorDot && !prefersReducedMotion) {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top  = dotY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Enlarge on hovering interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card, .capability-card, .exploration-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%,-50%) scale(2.5)';
        cursorDot.style.opacity = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorDot.style.opacity = '0.6';
      });
    });
  }


  // ---- Contact form handling ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const btn = form.querySelector('.btn-submit');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;

        // Re-enable after 4s (Formspree will redirect on success)
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.disabled = false;
        }, 4000);
      }
    });
  }


  // ---- Process Timeline — stagger on reveal ----
  const processSteps = document.querySelectorAll('.process-step');
  const processObserver = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      processSteps.forEach((step, i) => {
        setTimeout(() => {
          step.style.opacity = '1';
          step.style.transform = 'translateY(0)';
        }, i * 120);
      });
      processObserver.disconnect();
    }
  }, { threshold: 0.2 });

  const processTimeline = document.querySelector('.process-timeline');
  if (processTimeline) {
    processSteps.forEach(step => {
      step.style.opacity = '0';
      step.style.transform = 'translateY(20px)';
      step.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
    });
    processObserver.observe(processTimeline);
  }


  // ---- Numbers counter animation (fact cards) ----
  function animateCounter(el) {
    const raw = el.textContent.trim();
    const isPlus = raw.endsWith('+');
    const rawNum = parseFloat(raw);
    if (isNaN(rawNum) || rawNum > 2100) return; // skip years like 2027

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * rawNum);
      el.textContent = current + (isPlus ? '+' : '');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const factObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fact-number').forEach(animateCounter);
        factObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const factCard = document.querySelector('.fact-card');
  if (factCard && !prefersReducedMotion) {
    factObserver.observe(factCard);
  }

});
