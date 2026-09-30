/* Analítica con Firebase, solo si la persona acepta cookies. */
import { firebaseConfig } from "./firebase-config.js";

const KEY = "cookies-ok";
let analytics = null, logEventFn = null;

async function iniciar() {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
    const { getAnalytics, logEvent } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js");
    analytics = getAnalytics(initializeApp(firebaseConfig));
    logEventFn = logEvent;
}

export function track(nombre, params = {}) {
    if (analytics) logEventFn(analytics, nombre, params);
}

// para scripts no-módulo (formulario en main.js)
window.trackEvent = track;

// cualquier enlace con data-track registra un evento al hacer clic
document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-track]");
    if (el) track(el.dataset.track, { link: el.getAttribute("href") || "" });
});

function banner() {
    const b = document.createElement("div");
    b.className = "cookie-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Aviso de cookies");
    b.innerHTML = `<p>Uso cookies de analítica para saber cuántas personas visitan el sitio. No guardo datos personales.</p><div><button type="button" data-c="no">Rechazar</button><button type="button" data-c="si">Aceptar</button></div>`;
    b.addEventListener("click", (e) => {
        const c = e.target.dataset.c;
        if (!c) return;
        try { localStorage.setItem(KEY, c); } catch { }
        b.remove();
        if (c === "si") iniciar();
    });
    document.body.appendChild(b);
    if (window.I18N) window.I18N.translate(b); // el aviso sale en el idioma elegido
}

let pref = null;
try { pref = localStorage.getItem(KEY); } catch { }
if (pref === "si") iniciar();
else if (pref === null) banner();
