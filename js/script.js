$(document).ready(function(){

  $('#menu').click(function(){
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load',function(){
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');
  });

  // portfolio filter: GSAP Flip rearranges the cards smoothly

  gsap.registerPlugin(Flip);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const boxes = gsap.utils.toArray('.portfolio .image-container .box');

  $('.portfolio .button-container .btn').click(function(){

    let filter = $(this).attr('data-filter');

    $(this).addClass('active').siblings().removeClass('active');

    const state = Flip.getState(boxes);

    boxes.forEach(box => {
      box.style.display = (filter == 'all' || box.classList.contains(filter)) ? '' : 'none';
    });

    Flip.from(state, {
      duration: reduceMotion ? 0 : 0.7,
      ease: 'power3.inOut',
      scale: true,
      absolute: true,
      stagger: 0.05,
      onEnter: els => gsap.fromTo(els, {opacity: 0, scale: 0.8}, {opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)'}),
      onLeave: els => gsap.to(els, {opacity: 0, scale: 0.8, duration: 0.4, ease: 'power2.in'}),
    });

  });

  // subtle 3D tilt on project images

  if(!reduceMotion && window.matchMedia('(hover: hover)').matches){

    boxes.forEach(box => {

      const img = box.querySelector('img');
      gsap.set(box, {transformPerspective: 800});

      const rotateX = gsap.quickTo(box, 'rotationX', {duration: 0.5, ease: 'power3.out'});
      const rotateY = gsap.quickTo(box, 'rotationY', {duration: 0.5, ease: 'power3.out'});
      const imgX = gsap.quickTo(img, 'x', {duration: 0.5, ease: 'power3.out'});
      const imgY = gsap.quickTo(img, 'y', {duration: 0.5, ease: 'power3.out'});

      box.addEventListener('mousemove', e => {
        const rect = box.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY(px * 12);
        rotateX(-py * 12);
        imgX(px * -10);
        imgY(py * -10);
      });

      box.addEventListener('mouseleave', () => {
        rotateX(0); rotateY(0); imgX(0); imgY(0);
      });

    });

  }

  $('#theme-toggler').click(function(){
    $(this).toggleClass('fa-sun');
    $('body').toggleClass('dark-theme');
  });

  // smooth scrolling 

  $('a[href*="#"]').on('click',function(e){

    e.preventDefault();

    $('html, body').animate({

      scrollTop : $($(this).attr('href')).offset().top,

    },
      500,
      'linear'
    );

  });

});