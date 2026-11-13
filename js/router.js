/* ==========================================================
   IEEE Student Branch EPN — Navegación
   · Vistas por ruta limpia (History API, sin #): /, /capitulos,
     /capitulos/<id>, /iniciativas, /directiva, /contacto. El botón
     "atrás" funciona. Los enlaces antiguos con # (#capitulos…) se
     convierten a la ruta nueva. En GitHub Pages, 404.html guarda la
     ruta pedida y vuelve a "/", donde se restaura (ver al final).
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
  function parse(path) {
    var parts = (path || '').replace(/^[#\/]+/, '').replace(/\/+$/, '').split('/');
    return { page: parts[0] || 'inicio', sub: parts[1] || '' };
  }
  function pathFor(id) { return id === 'inicio' ? '/' : '/' + id; }
  /* Abierto como archivo (file://) no hay rutas de servidor: se navega con # (#capitulos/cis) */
  var FILE = location.protocol === 'file:';
  function currentRoute() { return parse(FILE ? location.hash : location.pathname); }
  var canonical = document.querySelector('link[rel="canonical"]');
  function show(route, fromNav) {
    var id = ids.indexOf(route.page) >= 0 ? route.page : 'inicio';
    var page = document.getElementById(id);
    if (id !== current) {
      pages.forEach(function (p) { p.classList.toggle('active', p === page); });
      menu.querySelectorAll('ul a').forEach(function (a) {
        if (a.getAttribute('href') === pathFor(id)) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
      document.title = page.dataset.title || document.title;
      if (canonical) canonical.setAttribute('href', 'https://ieee-epn.org' + pathFor(id));
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

  /* Enlaces internos: rutas de vista sin recargar; anclas (#contenido) dentro de la página */
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (href.charAt(0) === '#') {                       // ancla interna (enlace para saltar)
      var t = document.getElementById(href.slice(1));
      if (!t) return;
      e.preventDefault();
      reveal(600);
      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
      t.scrollIntoView({ block: 'start' });
      t.focus({ preventScroll: true });
      return;
    }
    if (href.charAt(0) !== '/' || href.charAt(1) === '/') return;   // externos, mailto:, etc.
    var r = parse(href);
    if (href !== '/' && ids.indexOf(r.page) < 0) return;           // archivos (sitemap.xml…)
    e.preventDefault();
    var url = FILE ? (href === '/' ? location.pathname : '#' + href.slice(1)) : href;
    if (FILE ? url !== location.hash : url !== location.pathname) history.pushState(null, '', url);
    show(r, true);
  });
  window.addEventListener('popstate', function () { show(currentRoute(), true); });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* Ruta inicial: 1) la que guardó 404.html, 2) un enlace antiguo con #, 3) la ruta actual */
  if (FILE) { show(currentRoute(), false); return; }
  var start = location.pathname;
  try {
    var saved = sessionStorage.getItem('ieee-epn-ruta');
    if (saved) { sessionStorage.removeItem('ieee-epn-ruta'); start = saved; }
  } catch (e) {}
  var legacy = parse(location.hash);
  if (location.hash && ids.indexOf(legacy.page) >= 0) start = pathFor(legacy.page) + (legacy.sub ? '/' + legacy.sub : '');
  var first = parse(start);
  if (ids.indexOf(first.page) < 0) { first = parse('/'); start = '/'; }
  if (start !== location.pathname || location.hash) history.replaceState(null, '', start + location.search);
  show(first, false);
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
