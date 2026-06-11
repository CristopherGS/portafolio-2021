document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  const menu = document.getElementById('menu');
  const navbar = document.querySelector('.navbar');
  const themeToggler = document.getElementById('theme-toggler');
  const portfolioButtons = document.querySelectorAll('.portfolio .button-container .btn');
  const portfolioItems = document.querySelectorAll('.portfolio .image-container .box');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateSkillBars = (element) => {
    element.querySelectorAll('.bar span[data-width]').forEach((bar) => {
      bar.style.width = bar.dataset.width;
    });
  };

  const showReveal = (element) => {
    element.classList.add('visible');
    animateSkillBars(element);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showReveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach(showReveal);
  }

  const closeMenu = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('nav-toggle');
  };

  menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('nav-toggle');
  });

  window.addEventListener('scroll', closeMenu);
  window.addEventListener('load', closeMenu);

  portfolioButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      portfolioButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      portfolioItems.forEach((item) => {
        const shouldShow = filter === 'all' || item.classList.contains(filter);
        item.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });

  themeToggler.addEventListener('click', () => {
    themeToggler.classList.toggle('fa-sun');
    document.body.classList.toggle('dark-theme');
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');

      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });

      closeMenu();
    });
  });
});
