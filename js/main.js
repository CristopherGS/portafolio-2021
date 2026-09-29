/* ==========================================================
   Animaciones del portafolio · GSAP + ScrollTrigger + Lenis
   ========================================================== */

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ---------- scroll suave ---------- */
let lenis = null;
if (!reduced) {
    lenis = new Lenis({ lerp: 0.1, autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
}

// los enlaces internos usan el scroll suave
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { duration: 1.4 });
        else target.scrollIntoView();
    });
});

/* ---------- arranque cuando las fuentes están listas ---------- */
Promise.all([
    document.fonts.load('900 100px Archivo'),
    document.fonts.load('700 12px "JetBrains Mono"')
]).catch(() => { }).then(init);

function init() {
    const packets = Packets.create(document.querySelector('.hero__canvas'), { static: reduced });

    if (reduced) { routeIndicator(); staticState(); return; }

    intro(packets);
    heroScroll(packets);
    about();
    stack();
    work();
    path();
    contact();
    magnetic();
    hideBarOnScroll();
    routeIndicator(); // al final: así sus posiciones ya cuentan los pins

    ScrollTrigger.refresh();
}

/* ---------- barra: la "ruta" cambia con cada sección ---------- */
function routeIndicator() {
    const bar = document.querySelector('.bar');
    const method = bar.querySelector('.bar__method');
    const path = bar.querySelector('.bar__path');
    const darkSections = ['stack', 'proyectos'];

    document.querySelectorAll('[data-path]').forEach(sec => {
        ScrollTrigger.create({
            trigger: sec,
            start: 'top 40px',
            end: 'bottom 40px',
            onToggle: self => {
                if (!self.isActive) return;
                bar.classList.toggle('is-dark', darkSections.includes(sec.id));
                if (reduced) {
                    method.textContent = sec.dataset.method;
                    path.textContent = sec.dataset.path;
                    return;
                }
                gsap.to(method, { duration: 0.4, scrambleText: { text: sec.dataset.method, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', speed: 0.6 } });
                gsap.to(path, { duration: 0.6, scrambleText: { text: sec.dataset.path, chars: '/_-*abcdefghijklmnopqrstuvwxyz', speed: 0.6 } });
            }
        });
    });
}

/* ---------- intro: el nombre se arma ---------- */
function intro(packets) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(packets.state, { assemble: 1, duration: 2.6, ease: 'power2.inOut' })
        .from('.bar > *', { y: -20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.6)
        .from('.hero__meta > *', { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 1.2)
        .from('.hero__req', { duration: 1, scrambleText: { text: '', chars: '01', speed: 0.4 } }, 1.2)
        .from('.hero__lead', { y: 30, autoAlpha: 0, duration: 1 }, 1.6)
        .from('.hero__actions > *', { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 1.8)
        .from('.hero__hint', { autoAlpha: 0, duration: 1 }, 2.4);
}

/* ---------- portada al hacer scroll: los paquetes se dispersan ---------- */
function heroScroll(packets) {
    gsap.timeline({
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    })
        .to(packets.state, { scatter: 1, ease: 'power1.in' }, 0)
        .to('.hero__foot, .hero__meta', { y: -120, autoAlpha: 0, ease: 'none' }, 0)
        .to('.hero__hint', { autoAlpha: 0, duration: 0.2 }, 0);
}

/* ---------- sobre mí: el texto se "enciende" palabra por palabra ---------- */
function about() {
    const split = SplitText.create('.about__text', { type: 'words', wordsClass: 'word' });
    const mm = gsap.matchMedia();

    mm.add('(min-width: 821px)', () => {
        const tl = gsap.timeline({
            scrollTrigger: { trigger: '.about', start: 'top top', end: '+=140%', pin: true, scrub: 0.6 }
        });
        tl.to(split.words, { opacity: 1, stagger: 0.1, ease: 'none' }, 0)
            .fromTo('.about__photo img',
                { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.25 },
                { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.05, ease: 'power2.out', duration: split.words.length * 0.05 }, 0);
    });

    mm.add('(max-width: 820px)', () => {
        gsap.to(split.words, {
            opacity: 1, stagger: 0.1, ease: 'none',
            scrollTrigger: { trigger: '.about__text', start: 'top 80%', end: 'bottom 50%', scrub: true }
        });
        gsap.from('.about__photo img', {
            clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.about__photo', start: 'top 85%' }
        });
    });
}

/* ---------- stack: se escribe la consulta y llegan las filas ---------- */
function stack() {
    const typed = document.querySelector('.stack__typed');
    const full = typed.textContent;
    typed.textContent = '';
    const rows = gsap.utils.toArray('.row');
    gsap.set(rows, { autoAlpha: 0, y: 24 });
    gsap.set('.stack__foot', { autoAlpha: 0 });

    const tl = gsap.timeline({
        paused: true,
        scrollTrigger: { trigger: '.stack', start: 'top 60%', once: true, onEnter: () => tl.play() }
    });

    const chars = { n: 0 };
    tl.to(chars, {
        n: full.length, duration: full.length * 0.028, ease: 'none',
        onUpdate: () => { typed.textContent = full.slice(0, Math.round(chars.n)); }
    })
        .addLabel('rows', '+=0.25')
        .to(rows, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' }, 'rows');

    rows.forEach((row, i) => {
        const lvl = +row.dataset.level;
        const num = row.querySelector('.row__num');
        const bar = row.querySelector('.row__bar');
        const obj = { v: 0 };
        tl.to(obj, {
            v: lvl, duration: 1.2, ease: 'power3.out',
            onUpdate: () => {
                num.textContent = Math.round(obj.v);
                bar.style.setProperty('--lvl', obj.v / 100);
            }
        }, `rows+=${0.15 + i * 0.07}`);
    });
    tl.to('.stack__foot', { autoAlpha: 0.75, duration: 0.5 });
}

/* ---------- proyectos: scroll horizontal ---------- */
function work() {
    const section = document.querySelector('.work');
    const track = document.querySelector('.work__track');
    const title = SplitText.create('.work__title', { type: 'chars', mask: 'chars' });
    const mm = gsap.matchMedia();

    mm.add('(min-width: 821px)', () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const scroll = gsap.to(track, {
            x: () => -distance(),
            ease: 'none', // obligatorio para containerAnimation
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => '+=' + distance(),
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        gsap.from(title.chars, {
            yPercent: 110, duration: 1, stagger: 0.04, ease: 'power4.out',
            scrollTrigger: { trigger: section, start: 'top 60%' }
        });

        gsap.utils.toArray('.card').forEach(card => {
            const media = card.querySelector('.card__media');
            const img = card.querySelector('img');
            gsap.fromTo(media,
                { clipPath: 'inset(0% 100% 0% 0% round 6px)' },
                {
                    clipPath: 'inset(0% 0% 0% 0% round 6px)', ease: 'none',
                    scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left 95%', end: 'left 45%', scrub: true }
                });
            // paralaje de la captura dentro del marco
            gsap.fromTo(img, { xPercent: 0 }, {
                xPercent: -16, ease: 'none',
                scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true }
            });
            gsap.from(card.querySelectorAll('.card__body > *'), {
                y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left 60%', toggleActions: 'play none none reverse' }
            });
        });
    });

    mm.add('(max-width: 820px)', () => {
        gsap.from(title.chars, {
            yPercent: 110, duration: 1, stagger: 0.04, ease: 'power4.out',
            scrollTrigger: { trigger: '.work__title', start: 'top 85%' }
        });
        gsap.utils.toArray('.card, .work__more').forEach(el => {
            gsap.from(el, {
                y: 60, autoAlpha: 0, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            });
        });
    });
}

/* ---------- trayectoria: la línea se dibuja con el scroll ---------- */
function path() {
    gsap.from('.path__title', {
        xPercent: -8, autoAlpha: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.path__title', start: 'top 85%' }
    });
    gsap.fromTo('.path__rail', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.path__body', start: 'top 70%', end: 'bottom 70%', scrub: true }
    });
    gsap.utils.toArray('.step').forEach(step => {
        gsap.from(step, {
            x: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 72%', toggleActions: 'play none none reverse' }
        });
    });
}

/* ---------- contacto ---------- */
function contact() {
    // marquesina infinita que acelera con la velocidad del scroll
    const loop = gsap.to('.marquee__inner', { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
    if (lenis) {
        lenis.on('scroll', ({ velocity }) => {
            const boost = 1 + Math.min(Math.abs(velocity) / 6, 5);
            gsap.to(loop, { timeScale: velocity < 0 ? -boost : boost, duration: 0.3, overwrite: true });
        });
    }

    const title = SplitText.create('.contact__title', { type: 'chars', mask: 'chars' });
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.contact__inner', start: 'top 75%' } });
    tl.from(title.chars, { yPercent: 110, duration: 1, stagger: 0.05, ease: 'power4.out' })
        .from('.contact__mail', { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.contact__list li', { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.4');
}

/* ---------- la barra se esconde al bajar y vuelve al subir ---------- */
function hideBarOnScroll() {
    const bar = document.querySelector('.bar');
    const hero = document.querySelector('.hero');
    ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: self => {
            const pastHero = self.scroll() > hero.offsetHeight * 0.6;
            gsap.to(bar, { yPercent: pastHero && self.direction === 1 ? -110 : 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        }
    });
}

/* ---------- botones magnéticos ---------- */
function magnetic() {
    if (!finePointer) return;
    document.querySelectorAll('.magnetic').forEach(el => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
        el.addEventListener('pointermove', e => {
            const b = el.getBoundingClientRect();
            xTo((e.clientX - b.left - b.width / 2) * 0.3);
            yTo((e.clientY - b.top - b.height / 2) * 0.4);
        });
        el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
}

/* ---------- movimiento reducido: todo visible, sin animar ---------- */
function staticState() {
    document.querySelectorAll('.row').forEach(row => {
        row.querySelector('.row__bar').style.setProperty('--lvl', row.dataset.level / 100);
    });
}
