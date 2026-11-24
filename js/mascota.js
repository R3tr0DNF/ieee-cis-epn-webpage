/* Mascota de la rama: búho en el borde derecho y viaje en avión con destinos
   (marcado al final de index.html, estilos en css/mascota.css, destinos en js/config.js → mascota.destinos).
   · Botones reales; el viaje es role="dialog" con aria-modal, aria-hidden alternado y el resto de la página inert.
   · Al abrir, el foco va al primer destino; Tab no sale del diálogo; Esc, × o clic en el fondo lo cierran.
   · Con "reducir movimiento" no hay animaciones: todo aparece y desaparece al instante. */
(function () {
  var cfg = ((window.IEEE_EPN || {}).config || {}).mascota || {};
  var btn = document.getElementById('mascot');
  var trip = document.getElementById('trip');
  var list = document.getElementById('trip-dests');
  if (!btn || !trip || !list || !Array.isArray(cfg.destinos)) return;

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var OUT_MS = 1000;            // = duración de trip-out en css/mascota.css
  var leaving = null;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function clean(v) { return (v == null ? '' : String(v)).trim(); }

  /* Destino → { url } | { path, id }. Solo https://, #id o rutas propias: nunca javascript:, data:… */
  function parse(t) {
    t = clean(t);
    if (/^https:\/\/[^\s"'<>]+$/i.test(t)) return { url: t };
    var m = /^(\/[a-z0-9\-\/]*)?(?:#([a-z][\w-]*))?$/i.exec(t);
    if (!m || (!m[1] && !m[2])) return null;
    var path = m[1] || '', segs = path.split('/').filter(Boolean);
    return { path: path, id: m[2] || segs[1] || '' };
  }

  var dests = cfg.destinos.map(function (d) { return { d: d, to: parse(d.target) }; })
    .filter(function (x) { return x.to && clean(x.d.place); });
  if (!dests.length) return;

  var buttons = dests.map(function (x) {
    var li = el('li');
    var b = el('button', 'trip-dest');
    b.type = 'button';
    b.appendChild(el('span', 'trip-dest-ic', '📍')).setAttribute('aria-hidden', 'true');
    b.appendChild(el('span', 'trip-dest-place', clean(x.d.place)));
    if (clean(x.d.detail)) b.appendChild(el('span', 'trip-dest-detail', clean(x.d.detail)));
    if (x.to.url) b.appendChild(el('span', 'sr-only', ' (se abre en una pestaña nueva)'));
    b.addEventListener('click', function () { go(x.to); });
    li.appendChild(b);
    list.appendChild(li);
    return b;
  });

  /* ---------- Abrir y cerrar ---------- */
  var inerted = [];
  function setInert(on) {
    if (on) {
      inerted = [].filter.call(document.body.children, function (n) { return n !== trip && !n.inert; });
      inerted.forEach(function (n) { n.inert = true; });
    } else {
      inerted.forEach(function (n) { n.inert = false; });
      inerted = [];
    }
  }
  function isOpen() { return !trip.hidden && !trip.classList.contains('is-leaving'); }

  function open() {
    if (!trip.hidden) return;
    btn.classList.add('is-away');
    btn.setAttribute('aria-expanded', 'true');
    trip.hidden = false;
    trip.setAttribute('aria-hidden', 'false');
    root.classList.add('trip-open');
    setInert(true);
    buttons[0].focus({ preventScroll: true });
  }

  /* after(): qué hacer cuando el avión ya se fue (ir al destino). Sin after, el foco vuelve al búho. */
  function close(after) {
    if (!isOpen()) return;
    trip.classList.add('is-leaving');
    clearTimeout(leaving);
    leaving = setTimeout(function () {
      trip.hidden = true;
      trip.classList.remove('is-leaving');
      trip.setAttribute('aria-hidden', 'true');
      root.classList.remove('trip-open');
      setInert(false);
      btn.classList.remove('is-away');
      btn.setAttribute('aria-expanded', 'false');
      if (after) after(); else btn.focus({ preventScroll: true });
    }, reduce.matches ? 0 : OUT_MS);
  }

  /* ---------- Ir al destino ---------- */
  function highlight(node) {
    node.classList.remove('mascot-target');
    void node.offsetWidth;                       // reinicia la animación si se repite el destino
    node.classList.add('mascot-target');
    setTimeout(function () { node.classList.remove('mascot-target'); }, 2700);
  }
  function arrive(id) {
    var node = id && (document.getElementById(id) || document.getElementById('cap-' + id));
    if (!node || !node.offsetParent && node.getClientRects().length === 0) return;
    var focusTo = node;
    if (node.getAttribute('role') === 'tab') {   // pestaña de Becados: se abre y se resalta todo el bloque
      node.click();
      node = node.closest('.becas-show') || node;
    }
    node.scrollIntoView({ block: 'center', behavior: reduce.matches ? 'auto' : 'smooth' });
    if (!focusTo.matches('button, a[href], input, select, textarea, [tabindex]')) focusTo.setAttribute('tabindex', '-1');
    focusTo.focus({ preventScroll: true });
    highlight(node);
  }
  function go(to) {
    if (to.url) {
      /* Se abre ya, dentro del clic: si se espera al vuelo, el navegador puede bloquear la pestaña nueva */
      window.open(to.url, '_blank', 'noopener,noreferrer');
      close();
      return;
    }
    close(function () {
      if (to.path && to.path !== location.pathname) {
        /* router.js escucha popstate: muestra la vista (y, con /vista/id, baja a ese elemento) */
        history.pushState(null, '', to.path);
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
      }
      /* deja que la vista se pinte antes de medir y desplazar */
      setTimeout(function () { arrive(to.id); }, 60);
    });
  }

  /* ---------- Eventos ---------- */
  btn.addEventListener('click', open);
  [].forEach.call(trip.querySelectorAll('[data-trip-close]'), function (n) {
    n.addEventListener('click', function () { close(); });
  });
  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    var f = [trip.querySelector('.trip-close')].concat(buttons);
    var i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  });

  btn.setAttribute('aria-expanded', 'false');
  btn.hidden = false;
})();
