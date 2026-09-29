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

  const hasGsap = !!(window.gsap && window.Flip);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const boxes = $('.portfolio .image-container .box').toArray();

  if(hasGsap) gsap.registerPlugin(Flip);

  $('.portfolio .button-container .btn').click(function(){

    let filter = $(this).attr('data-filter');

    $(this).addClass('active').siblings().removeClass('active');

    const state = hasGsap && Flip.getState(boxes);

    boxes.forEach(box => {
      box.style.display = (filter == 'all' || box.classList.contains(filter)) ? '' : 'none';
    });

    if(!hasGsap) return;

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

  if(hasGsap && !reduceMotion && window.matchMedia('(hover: hover)').matches){

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

  // smooth scrolling (lenis + gsap scrolltrigger)

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: !reduceMotion,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function(time){
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  $('a[href^="#"]').on('click',function(e){

    let target = $(this).attr('href');

    if(target.length < 2 || !$(target).length) return;

    e.preventDefault();

    lenis.scrollTo(target, { immediate: reduceMotion });

  });

  // skill bars: fill + percentage counter on scroll

  $('.about .progress').each(function(){

    let label = $(this).find('h3 span');
    let bar = $(this).find('.bar span');
    let percent = parseInt(label.text(), 10) || 0;

    if(reduceMotion){
      bar.css('width', percent + '%');
      return;
    }

    let counter = { value: 0 };
    label.text('0%');

    gsap.timeline({
      scrollTrigger: {
        trigger: this,
        start: 'top 90%',
        once: true,
      },
    })
    .to(bar[0], { width: percent + '%', duration: 1.6, ease: 'power3.out' })
    .to(counter, {
      value: percent,
      duration: 1.6,
      ease: 'power3.out',
      onUpdate: function(){
        label.text(Math.round(counter.value) + '%');
      },
    }, 0);

  });

  // section headings reveal on scroll

  if(!reduceMotion){

    $('.heading').each(function(){

      let spans = $(this).find('span');

      gsap.timeline({
        scrollTrigger: {
          trigger: this,
          start: 'top 85%',
          once: true,
        },
      })
      .fromTo(this, {
        y: 80,
        opacity: 0,
        clipPath: 'inset(0% 0% 100% 0%)',
      }, {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1,
        ease: 'expo.out',
        clearProps: 'clipPath',
      })
      .fromTo(spans, {
        yPercent: 60,
        opacity: 0,
        letterSpacing: '1.5rem',
      }, {
        yPercent: 0,
        opacity: 1,
        letterSpacing: '0rem',
        duration: 1,
        ease: 'power4.out',
        clearProps: 'letterSpacing',
      }, 0.2);

    });

  }

  // layout changes (portfolio filter) move the triggers
  $('.portfolio .button-container .btn').on('click', function(){
    setTimeout(function(){ ScrollTrigger.refresh(); }, 800);
  });

});