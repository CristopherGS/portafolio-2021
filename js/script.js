$(document).ready(function () {
  const revealItems = [
    '.home .content',
    '.home .image',
    '.about .row .box',
    '.about .download',
    '.portfolio .image-container .box',
    '.contact .box-container .box',
  ];

  const revealElements = document.querySelectorAll(revealItems.join(','));
  revealElements.forEach((element, index) => {
    element.classList.add('reveal');
    if (
      element.matches('.about .row .box, .portfolio .image-container .box, .contact .box-container .box')
    ) {
      element.style.setProperty('--delay', `${index * 90}ms`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => observer.observe(element));

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });

  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');
  });

  $('.portfolio .button-container .btn').click(function () {
    $('.portfolio .button-container .btn').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).attr('data-filter');

    if (filter === 'all') {
      $('.portfolio .image-container .box').show('400');
    } else {
      $('.portfolio .image-container .box').not('.' + filter).hide('200');
      $('.portfolio .image-container .box').filter('.' + filter).show('400');
    }
  });

  $('#theme-toggler').click(function () {
    $(this).toggleClass('fa-sun');
    $('body').toggleClass('dark-theme');
  });

  $('a[href*="#"]').on('click', function (e) {
    const target = $($(this).attr('href'));
    if (!target.length) return;

    e.preventDefault();

    $('html, body').animate(
      {
        scrollTop: target.offset().top,
      },
      650,
      'linear'
    );
  });
});
