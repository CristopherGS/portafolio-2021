/* ==========================================================
   Traducción español / inglés con diccionario propio.
   El HTML está escrito en español; este archivo lo pasa a inglés
   (y de vuelta) buscando cada texto y atributo en el diccionario.
   ========================================================== */

window.I18N = (function () {
    // español → inglés. Las claves se comparan sin importar espacios.
    const DICT = {
        // cabecera
        'Cristopher Guerra · Desarrollador fullstack, apps iOS y Android en Guatemala': 'Cristopher Guerra · Full-stack developer, iOS & Android apps in Guatemala',
        'Cristopher Guerra, desarrollador fullstack en Guatemala. Webs, apps iOS y Android, APIs y automatización de procesos para empresas. Software en producción para más de 500 mil usuarios. Disponible como freelance.': 'Cristopher Guerra, full-stack developer in Guatemala. Websites, iOS and Android apps, APIs and process automation for businesses. Production software serving more than 500,000 users. Available for freelance work.',
        'Cristopher Guerra · Desarrollador fullstack freelance': 'Cristopher Guerra · Freelance full-stack developer',
        'Webs, apps iOS y Android y automatización de procesos, con experiencia en software para más de 500 mil usuarios.': 'Websites, iOS and Android apps and process automation, with experience building software for more than 500,000 users.',

        // navegación y carga
        'Saltar al contenido': 'Skip to content',
        '> conectando con el servidor…': '> connecting to the server…',
        'Ir al inicio': 'Go to top',
        'Secciones': 'Sections',
        'Sobre mí': 'About',
        'Servicios': 'Services',
        'Experiencia': 'Experience',
        'Proyectos': 'Projects',
        'Contacto': 'Contact',

        // rutas de la barra
        '/sobre-mi': '/about',
        '/resultados': '/results',
        '/servicios': '/services',
        '/proyectos': '/projects',
        '/experiencia': '/experience',
        '/certificaciones': '/certifications',
        '/contacto': '/contact',

        // portada
        'Cristopher Guerra, desarrollador fullstack freelance en Guatemala': 'Cristopher Guerra, freelance full-stack developer in Guatemala',
        '200 OK · Disponible para empleo y freelance': '200 OK · Available for hire and freelance',
        'Convierto procesos complejos en software que la gente usa todos los días: webs, apps iOS y Android y automatización de procesos, con 4+ años en producción para más de 500 mil usuarios.': 'I turn complex processes into software people use every day: websites, iOS and Android apps and process automation, with 4+ years in production serving more than 500,000 users.',
        'Cotizar mi proyecto': 'Get a quote',
        'Descargar CV': 'Download CV',
        'mueve el cursor · baja': 'move the cursor · scroll',

        // sobre mí
        'GET /sobre-mi': 'GET /about',
        'Hola, soy Cristopher. Desde 2022 construyo software en producción a escala nacional en la Contraloría General de Cuentas de Guatemala: APIs en Java y Spring Boot, sistemas en Angular, apps nativas en Swift y Kotlin, y bases de datos Oracle. Lo llevo de punta a punta, hasta publicarlo en la App Store. Ahora también tomo proyectos freelance a medida.': 'Hi, I’m Cristopher. Since 2022 I’ve been building production software at national scale for Guatemala’s Comptroller General’s Office: APIs in Java and Spring Boot, systems in Angular, native apps in Swift and Kotlin, and Oracle databases. I take it end to end, all the way to the App Store. I also take on custom freelance projects.',
        'Foto de Cristopher Guerra': 'Photo of Cristopher Guerra',

        // cifras
        'Resultados': 'Results',
        'X-Usuarios-Atendidos': 'X-Users-Served',
        'solo Contraloría GT en Android': 'Contraloría GT on Android alone',
        'X-Apps-Publicadas': 'X-Published-Apps',
        'en App Store y Google Play': 'on the App Store and Google Play',
        'X-Años-En-Produccion': 'X-Years-In-Production',
        'al extender un sistema legado de 20+ años': 'while extending a 20+ year-old legacy system',

        // servicios
        'GET /servicios · freelance': 'GET /services · freelance',
        'Tu idea, construida de punta a punta': 'Your idea, built end to end',
        'Un solo desarrollador que entiende todo el sistema: base de datos, API, interfaz y publicación. Menos intermediarios, decisiones más rápidas y alguien que responde por el resultado.': 'One developer who understands the whole system: database, API, interface and release. Fewer middlemen, faster decisions and someone accountable for the result.',
        '/movil': '/mobile',
        '/automatizacion': '/automation',
        'Sitios web a medida': 'Custom websites',
        'Webs corporativas, landing pages y portafolios rápidos, preparados para aparecer en Google y fáciles de mantener.': 'Corporate sites, landing pages and fast portfolios, built to show up on Google and easy to maintain.',
        'Aplicaciones web': 'Web applications',
        'Sistemas internos, paneles y plataformas con usuarios, roles y reportes. Lo que hoy haces en hojas de cálculo, en una app.': 'Internal systems, dashboards and platforms with users, roles and reports. What you do in spreadsheets today, in an app.',
        'Apps iOS y Android': 'iOS & Android apps',
        'Apps nativas en Swift y Kotlin para tus clientes o tu equipo, desde el diseño hasta la publicación en App Store y Google Play.': 'Native apps in Swift and Kotlin for your customers or your team, from design to release on the App Store and Google Play.',
        'APIs y bases de datos': 'APIs & databases',
        'Bases de datos bien diseñadas y APIs que conectan tus sistemas entre sí, con buen rendimiento desde el primer día.': 'Well-designed databases and APIs that connect your systems, performing well from day one.',
        'Automatización de procesos': 'Process automation',
        'Formularios, correos, avisos, reportes e integraciones entre sistemas que trabajan solos. El formulario de contacto de esta página es un ejemplo en vivo.': 'Forms, emails, alerts, reports and system integrations that run on their own. The contact form on this page is a live example.',
        'Cómo trabajamos': 'How we work',
        'Conversamos': 'We talk',
        'Una llamada para entender tu problema y lo que necesitas lograr.': 'A call to understand your problem and what you need to achieve.',
        'Propuesta': 'Proposal',
        'Alcance, tiempos y costo por escrito, antes de empezar.': 'Scope, timeline and cost in writing, before we start.',
        'Desarrollo': 'Development',
        'Avances frecuentes que puedes probar y comentar.': 'Frequent updates you can try and comment on.',
        'Entrega': 'Delivery',
        'Lo publicamos, te explico cómo usarlo y quedo para soporte.': 'We launch it, I show you how to use it and I stay on for support.',

        // stack
        'Consulta: seleccionar capa y tecnologías desde stack': 'Query: select layer and technologies from stack',
        'SELECT capa, tecnologias FROM stack WHERE en_produccion = 1;': 'SELECT layer, technologies FROM stack WHERE in_production = 1;',
        'Tecnologías por capa': 'Technologies by layer',
        'capa': 'layer',
        'tecnologias': 'technologies',
        'movil': 'mobile',
        'datos': 'data',
        'integraciones': 'integrations',
        'seguridad': 'security',
        'automatizacion': 'automation',
        'equipo': 'team',
        'Java · Spring Boot · Java EE · APIs REST · Maven': 'Java · Spring Boot · Java EE · REST APIs · Maven',
        'Swift · SwiftUI · Kotlin · desarrollo Android (SETESA) · apps nativas en App Store y Google Play': 'Swift · SwiftUI · Kotlin · Android development (SETESA) · native apps on the App Store and Google Play',
        'Biometría RENAP · pagos NeoNet / VisaNet': 'RENAP biometrics · NeoNet / VisaNet payments',
        'Desarrollo de software seguro · certificación UVG de 50 horas': 'Secure software development · 50-hour UVG certification',
        'Webhooks · integraciones entre sistemas · correos y avisos automáticos': 'Webhooks · system integrations · automated emails and alerts',
        'Levantamiento de requerimientos · presentaciones a dirección · Scrum · arquitectura limpia · Git': 'Requirements gathering · presentations to leadership · Scrum · clean architecture · Git',

        // proyectos
        'GET /proyectos · 7 resultados': 'GET /projects · 7 results',
        'Proyec': 'Proj',
        'tos': 'ects',
        'Apps, módulos y sistemas en producción en la Contraloría General de Cuentas, con sus boletines oficiales. Desliza para verlos.': 'Apps, modules and systems in production at Guatemala’s Comptroller General’s Office, with their official bulletins. Scroll to see them.',
        'Abrir': 'Open',
        '{ "nativa": ["iOS · Swift", "Android · Kotlin"] }': '{ "native": ["iOS · Swift", "Android · Kotlin"] }',
        '{ "módulo": "móvil", "app": "Contraloría GT" }': '{ "module": "mobile", "app": "Contraloría GT" }',
        '{ "tipo": "integración", "con": ["NeoNet", "VisaNet"] }': '{ "type": "integration", "with": ["NeoNet", "VisaNet"] }',
        '{ "tipo": "sistemas internos" }': '{ "type": "internal systems" }',
        'App oficial de la Contraloría General de Cuentas para servidores públicos: registro, actualización de datos y verificación facial. Nativa en iOS (Swift) y Android (Kotlin), con más de 500 mil descargas solo en Android.': 'Official app of the Comptroller General’s Office for public servants: registration, data updates and facial verification. Native on iOS (Swift) and Android (Kotlin), with more than 500,000 downloads on Android alone.',
        'App para los colaboradores de la institución, nativa en iOS (Swift) y Android (Kotlin), construida y publicada de punta a punta en las dos tiendas.': 'App for the institution’s staff, native on iOS (Swift) and Android (Kotlin), built and published end to end on both stores.',
        'Primer registro con SIREFA': 'First registration with SIREFA',
        '> verificación facial SIREFA': '> SIREFA facial verification',
        '< 200 · registro creado': '< 200 · registration created',
        'Módulo móvil para que cada servidor público haga su primer registro de datos desde el celular, validando su identidad con reconocimiento facial (SIREFA).': 'Mobile module that lets every public servant complete their first data registration from their phone, verifying their identity with facial recognition (SIREFA).',
        'Boletín: primer registro ↗': 'Bulletin: first registration ↗',
        'Boletín: lanzamiento SIREFA ↗': 'Bulletin: SIREFA launch ↗',
        'Boletín: verificación facial ↗': 'Bulletin: facial verification ↗',
        'Actualización de datos': 'Data updates',
        '> enero 2025': '> January 2025',
        '< 465,000 actualizaciones': '< 465,000 updates',
        'Módulo móvil para la actualización anual de datos de los servidores públicos. Solo en enero de 2025 registró 465 mil actualizaciones.': 'Mobile module for public servants’ yearly data update. In January 2025 alone it recorded 465,000 updates.',
        'Boletín: 465 mil actualizaciones ↗': 'Bulletin: 465,000 updates ↗',
        'Boletín: dudas sobre SIREFA ↗': 'Bulletin: SIREFA questions ↗',
        'Bitácora electrónica móvil': 'Mobile electronic logbook',
        '> avance físico registrado': '> physical progress recorded',
        '< 200 · bitácora al día': '< 200 · logbook up to date',
        'Módulo móvil de la bitácora electrónica de obra pública: registro y seguimiento de avances físicos y técnicos de los proyectos, desde el celular.': 'Mobile module for the public works electronic logbook: recording and tracking the physical and technical progress of projects from a phone.',
        'Boletín: transparencia en obra pública ↗': 'Bulletin: public works transparency ↗',
        'Boletín: módulo de bitácoras ↗': 'Bulletin: logbook module ↗',
        'Pagos en línea': 'Online payments',
        '< NeoNet · aprobado': '< NeoNet · approved',
        '< VisaNet · aprobado': '< VisaNet · approved',
        'Pago de gestiones de la Contraloría con tarjeta, integrado con NeoNet y VisaNet.': 'Card payments for the Comptroller’s Office procedures, integrated with NeoNet and VisaNet.',
        'Página oficial de pagos ↗': 'Official payments page ↗',
        'Sistemas internos': 'Internal systems',
        '> finiquitos · 20+ años en uso': '> settlements · 20+ years in use',
        '> nuevos módulos desplegados': '> new modules deployed',
        'Sistemas que usa la institución por dentro, como el de finiquitos: lo extendí sin interrumpir el servicio de un sistema crítico con más de 20 años en uso.': 'Systems the institution uses internally, such as the settlements system: I extended it without interrupting a critical system that has been in use for more than 20 years.',
        'Uso interno, sin enlace público': 'Internal use, no public link',
        'Más en GitHub →': 'More on GitHub →',

        // experiencia
        'GET /experiencia': 'GET /experience',
        'Descargar mi CV': 'Download my CV',
        '2022 – hoy': '2022 – present',
        'Desarrollador fullstack · Contraloría General de Cuentas': 'Full-stack developer · Comptroller General’s Office',
        'Apps nativas Contraloría GT y Colaborador CGC (Swift y Kotlin) y sus módulos móviles: primer registro con reconocimiento facial SIREFA, actualización de datos y bitácora electrónica. Pagos en línea con NeoNet y VisaNet, sistemas internos en Angular y Java EE / Spring Boot para más de 500 mil usuarios, reportes en Power BI. Equipo Scrum de 5 personas.': 'Native apps Contraloría GT and Colaborador CGC (Swift and Kotlin) and their mobile modules: first registration with SIREFA facial recognition, data updates and the electronic logbook. Online payments with NeoNet and VisaNet, internal systems in Angular and Java EE / Spring Boot for more than 500,000 users, Power BI reports. 5-person Scrum team.',
        'Proyectos a medida': 'Custom projects',
        'Webs, apps móviles y automatización de procesos para empresas que necesitan software hecho a su medida.': 'Websites, mobile apps and process automation for businesses that need software built to fit.',
        '2018 – en curso': '2018 – ongoing',
        'Ingeniería en Informática y Sistemas · Universidad Rafael Landívar': 'Computer Science and Systems Engineering · Universidad Rafael Landívar',
        'Formación en ingeniería de software, bases de datos y sistemas.': 'Coursework in software engineering, databases and systems.',
        'Certificación': 'Certification',
        '343 horas de formación en desarrollo back-end.': '343 hours of back-end development training.',

        // certificaciones
        'GET /certificaciones': 'GET /certifications',
        'Certificaciones': 'Certifications',
        'Formación reciente que respalda lo que construyo: seguridad desde el diseño y desarrollo Android.': 'Recent training behind what I build: security by design and Android development.',
        'cert-01 · seguridad': 'cert-01 · security',
        'Certificación en Software Seguro': 'Secure Software Certification',
        '50 horas': '50 hours',
        '29 de septiembre de 2025': 'September 29, 2025',
        'Código A-000158': 'Code A-000158',
        'Certificado de Software Seguro de la Universidad del Valle de Guatemala': 'Secure Software certificate from Universidad del Valle de Guatemala',
        'Desarrollo de aplicaciones Android': 'Android app development',
        '32 horas': '32 hours',
        '17 de noviembre de 2025': 'November 17, 2025',
        'Diploma de SETESA en desarrollo de aplicaciones Android': 'SETESA diploma in Android app development',
        'Ver certificado (PDF) ↗': 'View certificate (PDF) ↗',

        // contacto
        'Disponible para proyectos freelance · Webs · Apps iOS y Android · APIs · Automatización de procesos ·': 'Available for freelance projects · Websites · iOS & Android apps · APIs · Process automation ·',
        'POST /contacto': 'POST /contact',
        '¿Hablamos?': 'Let’s talk',
        'Cuéntame qué necesitas y te respondo el mismo día. Este formulario es una automatización de procesos en vivo: mira cada paso mientras se envía.': 'Tell me what you need and I’ll reply the same day. This form is a live process automation: watch each step as it’s sent.',
        'correo': 'email',
        'Escríbeme por WhatsApp': 'Message me on WhatsApp',
        'Descargar CV en PDF': 'Download CV as PDF',
        'nombre': 'name',
        'Tu nombre': 'Your name',
        'tu@empresa.com': 'you@company.com',
        'tipo de proyecto': 'project type',
        'Elige una opción': 'Choose an option',
        'Sitio web': 'Website',
        'Aplicación web': 'Web application',
        'API o base de datos': 'API or database',
        'App iOS o Android': 'iOS or Android app',
        'Otro': 'Other',
        'presupuesto aproximado': 'approximate budget',
        'Aún no lo sé': 'Not sure yet',
        'Menos de US$500': 'Under US$500',
        'US$500 a US$1,500': 'US$500 to US$1,500',
        'US$1,500 a US$5,000': 'US$1,500 to US$5,000',
        'Más de US$5,000': 'Over US$5,000',
        'mensaje': 'message',
        '¿Qué necesitas construir o automatizar?': 'What do you need to build or automate?',
        'Enviar mensaje': 'Send message',
        'Validar datos y filtrar spam': 'Validate data and filter spam',
        'Registrar tu solicitud': 'Log your request',
        'Avisar a Cristopher al celular': 'Notify Cristopher’s phone',
        'Enviarte un correo de confirmación': 'Send you a confirmation email',
        '200 OK · Mensaje recibido': '200 OK · Message received',
        'Hecho con GSAP · Connection: close': 'Made with GSAP · Connection: close',

        // aviso de cookies
        'Aviso de cookies': 'Cookie notice',
        'Uso cookies de analítica para saber cuántas personas visitan el sitio. No guardo datos personales.': 'I use analytics cookies to know how many people visit the site. I don’t store any personal data.',
        'Rechazar': 'Decline',
        'Aceptar': 'Accept'
    };

    // textos que arma el JavaScript
    const MSG = {
        es: {
            'theme.toDark': 'Cambiar a modo oscuro',
            'theme.toLight': 'Cambiar a modo claro',
            'lang.switch': 'Cambiar el idioma a inglés',
            'form.invalid': 'Revisa los campos marcados en naranja.',
            'form.sending': 'Enviando…',
            'form.retry': 'Intentar de nuevo',
            'form.sent': 'Mensaje enviado',
            'form.thanks': '¡Gracias! Recibí tu mensaje y te respondo pronto a tu correo.',
            'form.error': 'No se pudo enviar. Escríbeme a <a href="mailto:guerracristofer@gmail.com">mi correo</a> o por <a href="https://wa.me/50246842943" target="_blank" rel="noopener">WhatsApp</a>.'
        },
        en: {
            'theme.toDark': 'Switch to dark mode',
            'theme.toLight': 'Switch to light mode',
            'lang.switch': 'Switch language to Spanish',
            'form.invalid': 'Please check the fields marked in orange.',
            'form.sending': 'Sending…',
            'form.retry': 'Try again',
            'form.sent': 'Message sent',
            'form.thanks': 'Thanks! I got your message and will reply to your email soon.',
            'form.error': 'It couldn’t be sent. Write to <a href="mailto:guerracristofer@gmail.com">my email</a> or on <a href="https://wa.me/50246842943" target="_blank" rel="noopener">WhatsApp</a>.'
        }
    };

    const norm = s => s.replace(/\s+/g, ' ').trim();
    const TO_EN = new Map(), TO_ES = new Map();
    Object.entries(DICT).forEach(([es, en]) => { TO_EN.set(norm(es), en); TO_ES.set(norm(en), es); });

    const ATTRS = ['alt', 'placeholder', 'aria-label', 'data-cursor', 'data-path', 'data-q'];

    // conserva los espacios de los extremos del texto original
    function swap(str, map) {
        const v = map.get(norm(str));
        if (v == null) return null;
        return str.match(/^\s*/)[0] + v + str.match(/\s*$/)[0];
    }

    let lang = 'es';

    function translate(root = document.body) {
        const map = lang === 'en' ? TO_EN : TO_ES;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: n => n.parentElement && n.parentElement.closest('script, style, .bar__route')
                ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
        });
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            const v = swap(n.nodeValue, map);
            if (v != null) n.nodeValue = v;
        }
        const els = [root, ...root.querySelectorAll(ATTRS.map(a => `[${a}]`).join(','))];
        els.forEach(el => ATTRS.forEach(a => {
            if (!el.hasAttribute || !el.hasAttribute(a)) return;
            const v = swap(el.getAttribute(a), map);
            if (v != null) el.setAttribute(a, v);
        }));
    }

    function apply(next) {
        lang = next === 'en' ? 'en' : 'es';
        const map = lang === 'en' ? TO_EN : TO_ES;
        document.documentElement.lang = lang;
        const title = swap(document.title, map);
        if (title) document.title = title;
        document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"]').forEach(m => {
            const v = swap(m.content, map);
            if (v) m.content = v;
        });
        const loc = document.querySelector('meta[property="og:locale"]');
        if (loc) loc.content = lang === 'en' ? 'en_US' : 'es_GT';
        translate(document.body);
    }

    // primera visita: el idioma del navegador; después, la elección guardada
    let saved = null;
    try { saved = localStorage.getItem('idioma'); } catch (e) { }
    const first = saved === 'es' || saved === 'en'
        ? saved
        : ((navigator.languages && navigator.languages[0]) || navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
    if (first === 'en') apply('en');

    return {
        get lang() { return lang; },
        apply,
        translate,
        t: key => MSG[lang][key] || MSG.es[key] || key
    };
})();
