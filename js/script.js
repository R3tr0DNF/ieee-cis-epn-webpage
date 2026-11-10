/* ==========================================================
   IEEE Student Branch EPN — Navegación y comportamiento general
   · Pestañas por hash (#inicio, #capitulos, …), derivadas del HTML
   · Encabezado transparente sobre la portada y sólido al bajar
   · Menú móvil accesible (Esc, clic fuera, foco)
   · Animaciones de entrada con IntersectionObserver
   · Formulario de contacto con validación por campo
   ========================================================== */
(function () {
  var root = document.documentElement;
  var body = document.body;
  var pages = [].slice.call(document.querySelectorAll('main > .page'));
  var tabs = pages.map(function (p) { return p.id; });
  var menu = document.getElementById('menu');
  var burger = document.getElementById('burger');
  var header = document.getElementById('top');
  var current = null;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------- Menú móvil ---------- */
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    body.classList.toggle('menu-open', open);
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) setMenu(false);
  });

  /* ---------- Pestañas ---------- */
  function show(id, focus) {
    if (tabs.indexOf(id) < 0) id = 'inicio';
    var changed = id !== current;
    current = id;
    pages.forEach(function (p) { p.classList.toggle('active', p.id === id); });
    document.querySelectorAll('[data-tab]').forEach(function (a) {
      if (!a.closest('nav')) return;
      if (a.dataset.tab === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var page = document.getElementById(id);
    document.title = (page.dataset.title || 'Inicio') + ' | IEEE Student Branch EPN';
    body.classList.toggle('is-home', id === 'inicio');
    setMenu(false);
    window.scrollTo(0, 0);
    if (focus) {
      var h1 = page.querySelector('h1');
      (h1 || document.getElementById('contenido')).focus({ preventScroll: true });
    }
    if (changed) document.dispatchEvent(new CustomEvent('ieee:tab', { detail: id }));
    onScroll();
  }
  window.addEventListener('hashchange', function () {
    var id = location.hash.slice(1) || 'inicio'; // "atrás" hasta la URL sin hash = Inicio
    if (tabs.indexOf(id) < 0) return; // anclas internas (skip link, #sobre-nosotros) no cambian de pestaña
    show(id, true);
  });

  /* Los h1 de cada pestaña reciben el foco al cambiar (lectores de pantalla) */
  pages.forEach(function (p) { var h = p.querySelector('h1'); if (h) h.setAttribute('tabindex', '-1'); });

  /* ---------- Estado del encabezado ---------- */
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 24);
    var hero = document.getElementById('hero');
    var overHero = body.classList.contains('is-home') && hero && y < hero.offsetHeight - header.offsetHeight - 8;
    header.classList.toggle('over-hero', !!overHero);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  /* Altura real del encabezado → variable CSS (scroll-padding, espaciado) */
  function measure() { root.style.setProperty('--header-h', header.offsetHeight + 'px'); }
  window.addEventListener('resize', measure);
  measure();

  /* ---------- Animaciones de entrada ---------- */
  var io = 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .08 })
    : null;
  function observeReveals() {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (n) {
      if (io) io.observe(n); else n.classList.add('is-visible');
    });
  }
  document.addEventListener('ieee:content-ready', observeReveals);
  observeReveals();

  /* ---------- Formulario de contacto ---------- */
  var RAMA_EMAIL = 'rama.ieee@epn.edu.ec'; // PENDIENTE: confirmar el correo oficial de la rama
  var form = document.getElementById('form');
  var msg = document.getElementById('form-msg');
  var MESSAGES = {
    nombre: 'Escribe tu nombre completo.',
    email: 'Escribe un correo válido, por ejemplo nombre@epn.edu.ec.',
    asunto: 'Indica el asunto del mensaje.',
    mensaje: 'Escribe tu mensaje.'
  };
  function fieldError(input) {
    var err = document.getElementById(input.id + '-err');
    var bad = !input.checkValidity();
    input.setAttribute('aria-invalid', bad ? 'true' : 'false');
    if (err) err.textContent = bad ? MESSAGES[input.id] : '';
    return bad;
  }
  if (form) {
    form.querySelectorAll('input,textarea').forEach(function (i) {
      /* Se valida al enviar y luego en vivo mientras se corrige. No se valida en "blur":
         el mensaje desplazaría el botón justo cuando la persona intenta pulsarlo. */
      i.addEventListener('input', function () { if (i.getAttribute('aria-invalid') === 'true') fieldError(i); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      form.querySelectorAll('input,textarea').forEach(function (i) { if (fieldError(i) && !first) first = i; });
      if (first) {
        msg.className = 'form-msg is-error';
        msg.textContent = 'Revisa los campos marcados.';
        first.focus();
        return;
      }
      var f = form;
      var text = 'Nombre: ' + f.nombre.value + '\nCorreo: ' + f.email.value + '\n\n' + f.mensaje.value;
      location.href = 'mailto:' + RAMA_EMAIL + '?subject=' + encodeURIComponent(f.asunto.value) + '&body=' + encodeURIComponent(text);
      msg.className = 'form-msg';
      msg.innerHTML = '';
      msg.appendChild(document.createTextNode('Intentamos abrir tu aplicación de correo. Si no se abrió, escríbenos directamente a '));
      var b = document.createElement('b'); b.textContent = RAMA_EMAIL; msg.appendChild(b);
      msg.appendChild(document.createTextNode('.'));
    });
  }

  /* Botón "copiar correo" */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.dataset.copy, label = b.textContent;
      function done() { b.textContent = 'Copiado ✓'; setTimeout(function () { b.textContent = label; }, 1800); }
      if (navigator.clipboard) navigator.clipboard.writeText(v).then(done, function () {});
      else { var t = document.createElement('textarea'); t.value = v; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (x) {} t.remove(); }
    });
  });

  /* Año del pie de página */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  show(location.hash.slice(1), false);
})();
