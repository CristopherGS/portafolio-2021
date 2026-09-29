/* ==========================================================
   Portada: el nombre armado con "paquetes" de caracteres.
   Cada punto del texto es un carácter que se aleja del cursor
   y vuelve a su sitio. `scatter` (0–1) lo controla GSAP al hacer scroll.
   ========================================================== */

window.Packets = (function () {
    const GLYPHS = '01{}[]<>/;=*$#SELECTFROMWHEREJOIN'.split('');
    const COLORS = { ink: '#0B0D12', cobalt: '#2437FF' };

    function create(canvas, opts) {
        const ctx = canvas.getContext('2d');
        const state = { scatter: 0, assemble: 0 }; // intro: assemble 0→1 · scroll: scatter 0→1
        const mouse = { x: -9999, y: -9999 };
        let particles = [];
        let w = 0, h = 0, dpr = 1, cell = 10, raf = 0, running = false, ghost = null;

        function lines() {
            // en pantallas angostas y altas el nombre se parte en tres líneas
            return w < 600 ? ['CRIS', 'TOPHER', 'GUERRA'] : ['CRISTOPHER', 'GUERRA'];
        }

        function build() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth; h = canvas.clientHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            cell = w < 600 ? 5 : w < 1100 ? 8 : 10;

            // dibujamos el texto en un canvas fuera de pantalla y lo muestreamos
            const off = document.createElement('canvas');
            off.width = w; off.height = h;
            const o = off.getContext('2d');
            const ls = lines();
            let size = w * 0.16;
            o.textAlign = 'center';
            o.textBaseline = 'middle';
            const setFont = () => {
                o.font = `900 ${size}px Archivo, sans-serif`;
                if ('fontStretch' in o) o.fontStretch = 'expanded';
            };
            setFont();
            // ajustamos el tamaño para que la línea más larga ocupe ~92% del ancho
            const widest = Math.max(...ls.map(l => o.measureText(l).width));
            size = size * (w * 0.92) / widest;
            size = Math.min(size, h * 0.3);
            setFont();

            const lineH = size * (ls.length > 2 ? 1 : 0.9);
            const top = h * 0.5 - (lineH * (ls.length - 1)) / 2;
            o.fillStyle = '#000';
            ls.forEach((l, i) => o.fillText(l, w / 2, top + i * lineH));

            const data = o.getImageData(0, 0, w, h).data;
            ghost = off; // el texto sólido, muy tenue, ayuda a leer el nombre
            particles = [];
            for (let y = 0; y < h; y += cell) {
                for (let x = 0; x < w; x += cell) {
                    if (data[(y * w + x) * 4 + 3] > 128) {
                        const ang = Math.random() * Math.PI * 2;
                        const dist = Math.max(w, h) * (0.3 + Math.random() * 0.7);
                        particles.push({
                            hx: x, hy: y,                         // posición final
                            sx: w / 2 + Math.cos(ang) * dist,     // posición dispersa
                            sy: h / 2 + Math.sin(ang) * dist,
                            x: 0, y: 0, vx: 0, vy: 0,
                            g: GLYPHS[(Math.random() * GLYPHS.length) | 0],
                            hot: Math.random() < 0.06,            // algunos en cobalto
                            d: Math.random()                      // retraso individual
                        });
                        const p = particles[particles.length - 1];
                        // antes de la intro nacen dispersos; si ya se armó, nacen en su sitio
                        p.x = state.assemble >= 1 ? p.hx : p.sx;
                        p.y = state.assemble >= 1 ? p.hy : p.sy;
                    }
                }
            }
            ctx.font = `700 ${cell * 1.3}px "JetBrains Mono", monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        }

        function frame() {
            ctx.clearRect(0, 0, w, h);
            const r = Math.max(90, w * 0.08), r2 = r * r;
            const a = state.assemble, s = state.scatter;

            const ga = 0.06 * Math.max(0, (a - 0.6) / 0.4) * (1 - s);
            if (ghost && ga > 0) {
                ctx.globalAlpha = ga;
                ctx.drawImage(ghost, 0, 0, w, h);
            }

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                // progreso individual de la intro, escalonado
                const t = Math.min(1, Math.max(0, (a - p.d * 0.5) / 0.5));
                const e = 1 - Math.pow(1 - t, 3);
                // destino: mezcla entre posición dispersa y final, y la dispersión del scroll
                const k = e * (1 - s);
                let tx = p.sx + (p.hx - p.sx) * k;
                let ty = p.sy + (p.hy - p.sy) * k;

                // repulsión del cursor
                const dx = p.x - mouse.x, dy = p.y - mouse.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < r2) {
                    const f = (1 - d2 / r2) * 7;
                    const d = Math.sqrt(d2) || 1;
                    p.vx += (dx / d) * f; p.vy += (dy / d) * f;
                    if (Math.random() < 0.08) p.g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
                }
                // resorte hacia el destino
                p.vx += (tx - p.x) * 0.08; p.vy += (ty - p.y) * 0.08;
                p.vx *= 0.78; p.vy *= 0.78;
                p.x += p.vx; p.y += p.vy;

                ctx.globalAlpha = 0.25 + 0.75 * e;
                ctx.fillStyle = p.hot ? COLORS.cobalt : COLORS.ink;
                ctx.fillText(p.g, p.x, p.y);
            }
            ctx.globalAlpha = 1;
            if (running) raf = requestAnimationFrame(frame);
        }

        function start() { if (!running) { running = true; raf = requestAnimationFrame(frame); } }
        function stop() { running = false; cancelAnimationFrame(raf); }

        // solo dibujamos mientras la portada es visible
        if (!(opts && opts.static)) {
            new IntersectionObserver(([en]) => en.isIntersecting ? start() : stop()).observe(canvas);
        }

        if (!(opts && opts.static)) canvas.parentElement.addEventListener('pointermove', e => {
            const b = canvas.getBoundingClientRect();
            mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top;
        });
        canvas.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

        let rt;
        window.addEventListener('resize', () => {
            clearTimeout(rt);
            rt = setTimeout(() => { if (canvas.clientWidth !== w) { build(); if (!running) frame(); } }, 150);
        });

        if (opts && opts.static) state.assemble = 1;
        build();
        frame();
        return { state, build, start, stop };
    }

    return { create };
})();
