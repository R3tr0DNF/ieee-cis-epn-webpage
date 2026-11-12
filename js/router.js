/* ==========================================================
   IEEE Student Branch EPN — Navegación
   · Vistas por hash: #inicio, #capitulos, #capitulos/<id>,
     #iniciativas, #directiva, #contacto. El botón "atrás" funciona.
   · Título y descripción por vista.
   · Encabezado: transparente sobre la portada, sólido al bajar.
     Se oculta al bajar y reaparece al subir (translateY), con umbral
     anti-parpadeo. Siempre visible en la portada o el encabezado de
     página, con el menú abierto, con foco de teclado dentro y al
     navegar a una ancla.
   · Botón de tema claro/oscuro (al final de este archivo; va aquí y
     no en un archivo propio para no sumar una petición antes del LCP).
   · Menú móvil accesible (Esc, clic fuera, aria-expanded).
   ========================================================== */
(function () {
  var pages = [].slice.call(document.querySelectorAll('main > .page'));
  var ids = pages.map(function (p) { return p.id; });
  var header = document.getElementById('site-header');
  var menu = document.getElementById('menu');
  var toggle = document.getElementById('menu-toggle');
  var metaDesc = document.querySelector('meta[name="description"]');
  var current = null;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* Menú móvil */
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    updateHeader();
  }
  toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
  });

  /* Encabezado: sólido al bajar; oculto al bajar y visible al subir */
  var ticking = false;
  var THRESHOLD = 10;            // px: ignora el temblor del scroll inercial y del rebote en móviles
  var lastY = Math.max(window.scrollY, 0);
  var hidden = false;
  var holdUntil = 0;             // tras navegar a una ancla, el desplazamiento programado no oculta el encabezado
  function setHidden(h) {
    if (h === hidden) return;
    hidden = h;
    header.classList.toggle('is-hidden', h);
  }
  /* Zona superior: la portada (o el encabezado de la vista) menos el alto del encabezado */
  function topZone() {
    var first = document.querySelector('main > .page.active > .hero, main > .page.active > .page-head');
    if (!first) return header.offsetHeight * 2;
    return first.getBoundingClientRect().bottom + window.scrollY - header.offsetHeight;
  }
  function keyboardFocusInside() {      // solo foco de teclado: un clic con el ratón no fija el encabezado
    try { return !!header.querySelector(':focus-visible'); } catch (e) { return header.contains(document.activeElement); }
  }
  function updateHeader() {
    ticking = false;
    var y = Math.max(window.scrollY, 0);
    var open = menu.classList.contains('open');
    header.classList.toggle('is-solid', y > 8 || open);
    if (open || y <= topZone() || Date.now() < holdUntil || keyboardFocusInside()) {
      setHidden(false); lastY = y; return;
    }
    var dy = y - lastY;
    if (Math.abs(dy) < THRESHOLD) return;   // movimiento pequeño: no cambia nada
    setHidden(dy > 0);
    lastY = y;
  }
  function reveal(holdMs) {
    holdUntil = Date.now() + (holdMs || 0);
    setHidden(false);
    lastY = Math.max(window.scrollY, 0);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateHeader); }
  }, { passive: true });
  header.addEventListener('focusin', function () { reveal(0); });

  /* Vistas */
  function parse(hash) {
    var h = (hash || '').replace(/^#/, '');
    var parts = h.split('/');
    return { page: parts[0] || 'inicio', sub: parts[1] || '' };
  }
  function show(route, fromNav) {
    var id = ids.indexOf(route.page) >= 0 ? route.page : 'inicio';
    var page = document.getElementById(id);
    if (id !== current) {
      pages.forEach(function (p) { p.classList.toggle('active', p === page); });
      menu.querySelectorAll('ul a').forEach(function (a) {
        if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
      document.title = page.dataset.title || document.title;
      if (metaDesc && page.dataset.description) metaDesc.setAttribute('content', page.dataset.description);
      current = id;
      document.dispatchEvent(new CustomEvent('ieee:view', { detail: id }));
    }
    setMenu(false);

    reveal(fromNav || route.sub ? 600 : 0);   // navegar a una vista o a una ancla muestra el encabezado y lo mantiene durante el desplazamiento
    var target = route.sub && (document.getElementById('cap-' + route.sub) || document.getElementById(route.sub));
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.scrollIntoView({ block: 'start' });
      target.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
      if (fromNav) {
        var h1 = page.querySelector('h1');
        if (h1) { if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
      }
    }
    updateHeader();
  }

  window.addEventListener('hashchange', function () {
    var r = parse(location.hash);
    if (location.hash && ids.indexOf(r.page) < 0) { reveal(600); return; }   // anclas internas (enlace para saltar)
    show(r, true);
  });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  show(parse(location.hash), false);
})();

/* ==========================================================
   Tema claro / oscuro (botón del encabezado)
   · El tema inicial lo fija el script del <head> antes de pintar:
     siempre "light", salvo que el usuario haya elegido "dark" antes.
     No se consulta prefers-color-scheme (decisión del sitio).
   · El botón cambia el tema, lo guarda en localStorage (con
     try/catch), actualiza <meta name="theme-color">, su etiqueta
     accesible y el texto visible del menú móvil.
   · La transición de colores (≤ 200 ms) solo existe durante el
     cambio (clase .theme-anim) y se omite con movimiento reducido.
   ========================================================== */
(function () {
  var KEY = 'ieee-epn-tema';
  var COLOR = { light: '#00142E', dark: '#020B1F' };   // = --c-meta de cada tema
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var label = btn.querySelector('.theme-label');
  var meta = document.querySelector('meta[name="theme-color"]');
  var timer = null;

  function current() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  /* El botón describe la acción: en claro ofrece "modo oscuro" y al revés.
     El texto visible (menú móvil) está contenido en el nombre accesible. */
  function sync(theme) {
    var next = theme === 'dark' ? 'claro' : 'oscuro';
    btn.setAttribute('aria-label', 'Cambiar a modo ' + next);
    if (label) label.textContent = 'Modo ' + next;
    if (meta) meta.setAttribute('content', COLOR[theme]);
  }

  function apply(theme) {
    root.classList.add('theme-anim');
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY, theme); } catch (e) { /* sin almacenamiento: el cambio vale para esta visita */ }
    sync(theme);
    clearTimeout(timer);
    timer = setTimeout(function () { root.classList.remove('theme-anim'); }, 260);
  }

  sync(current());
  btn.addEventListener('click', function () { apply(current() === 'dark' ? 'light' : 'dark'); });
})();
