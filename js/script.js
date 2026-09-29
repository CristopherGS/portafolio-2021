$(document).ready(function(){

  $('#menu').click(function(){
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load',function(){
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');
  });

  $('.portfolio .button-container .btn').click(function(){

    let filter = $(this).attr('data-filter');

    if(filter == 'all'){
      $('.portfolio .image-container .box').show('400')
    }else{
      $('.portfolio .image-container .box').not('.'+filter).hide('200');
      $('.portfolio .image-container .box').filter('.'+filter).show('400');
    }

  });

  $('#theme-toggler').click(function(){
    $(this).toggleClass('fa-sun');
    $('body').toggleClass('dark-theme');
  });

  // smooth scrolling (lenis + gsap scrolltrigger)

  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    setTimeout(function(){ ScrollTrigger.refresh(); }, 450);
  });

});