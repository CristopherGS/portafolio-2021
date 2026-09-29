// intro animada de la portada con GSAP + SplitText

(function(){

  var root = document.documentElement;

  // si GSAP no cargó (sin red, CDN caído), mostramos la portada tal cual
  if(!window.gsap || !window.SplitText){
    root.classList.remove('js-intro');
    return;
  }

  gsap.registerPlugin(SplitText);

  var mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', function(){

    var img = document.querySelector('.home .image img');
    var curtain = document.querySelector('.home .image .photo-curtain');

    var hello = SplitText.create('.home .content .hello', { type: 'chars' });
    var name = SplitText.create('.home .content h3', { type: 'words, chars', mask: 'chars' });
    var text = SplitText.create('.home .content p', { type: 'lines', mask: 'lines' });

    root.classList.add('is-intro');
    gsap.set(['#menu', '#theme-toggler', '.home .image', '.home .content'], { autoAlpha: 1 });
    root.classList.remove('js-intro');

    // la imagen empieza oculta tras la cortina
    gsap.set(img, { clipPath: 'inset(100% 0% 0% 0%)' });

    var tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: function(){
        root.classList.remove('is-intro');
        gsap.set(['#menu', '#theme-toggler', img], { clearProps: 'transform' });
        gsap.set(img, { clearProps: 'clipPath' });
      }
    });

    // foto: cortina de color que sube, revela la imagen y se retira
    tl.fromTo(curtain, { scaleY: 0, transformOrigin: '50% 100%' },
        { scaleY: 1, duration: 0.6, ease: 'power3.inOut' })
      .set(img, { clipPath: 'inset(0% 0% 0% 0%)' })
      .from(img, { scale: 1.15, duration: 1.4, ease: 'power3.out' }, '>')
      .to(curtain, { scaleY: 0, transformOrigin: '50% 0%', duration: 0.7, ease: 'power3.inOut' }, '<')

    // saludo: letras que caen con rebote
      .from(hello.chars, {
        yPercent: -120, rotation: function(){ return gsap.utils.random(-40, 40); },
        autoAlpha: 0, duration: 0.8, ease: 'back.out(2.5)', stagger: 0.06
      }, 0.3)

    // nombre: cada letra sale de su máscara
      .from(name.chars, {
        yPercent: 110, duration: 0.9, stagger: 0.025
      }, '-=0.4')

    // párrafo por líneas
      .from(text.lines, {
        yPercent: 100, duration: 0.8, stagger: 0.08
      }, '-=0.6')

      .from('.home .content .btn', {
        y: 30, autoAlpha: 0, duration: 0.6, ease: 'back.out(1.7)'
      }, '-=0.5')

      .from(['#menu', '#theme-toggler'], {
        scale: 0, rotation: -180, duration: 0.6, ease: 'back.out(2)', stagger: 0.1
      }, '-=0.6');

    return function(){
      hello.revert();
      name.revert();
      text.revert();
      root.classList.remove('is-intro');
    };
  });

  // con reduced-motion no hay intro: la portada queda visible desde el inicio
  mm.add('(prefers-reduced-motion: reduce)', function(){
    root.classList.remove('js-intro');
  });

})();
