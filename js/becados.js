/* ==========================================================
   IEEE Student Branch EPN — Becas IEEE (Inicio)
   Lee js/data/becados.js y dibuja la vitrina de becas:
   · Línea de tiempo arriba (pestañas ARIA: flechas ←/→, Inicio, Fin),
     del congreso más reciente al más antiguo.
   · Panel debajo: foto, fechas, lugar, organizador y becados.
   · Lo esencial primero (programa, mes y número de becas); el detalle
     al elegir un programa. Sin reproducción automática.
   · Solo publica programas con publicar === true y nombres completos;
     un nombre con `pendiente` solo se ve con MOSTRAR_PENDIENTES.
   · Todo el texto entra con textContent (nunca innerHTML).
   ========================================================== */
(function () {
  var D = window.IEEE_EPN || {};
  var rail = document.getElementById('becas-tabs');
  var panels = document.getElementById('becas-panels');
  var stats = document.getElementById('becas-stats');
  if (!rail || !panels) return;
  var showPending = (D.config || {}).MOSTRAR_PENDIENTES !== false;
  var chapters = Array.isArray(D.chapters) ? D.chapters : [];
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function clean(v) { return (v == null ? '' : String(v)).trim(); }
  function nameOf(b) { return typeof b === 'string' ? clean(b) : clean(b && b.nombre); }
  function isComplete(b) { return typeof b === 'string' ? !!clean(b) : !!(b && clean(b.nombre) && !b.pendiente); }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  var list = (Array.isArray(D.becas) ? D.becas : [])
    .filter(function (p) { return p && p.publicar === true && clean(p.id) && clean(p.siglas); })
    .map(function (p) {
      var names = (p.becados || []).filter(isComplete).map(nameOf);
      var held = (p.becados || []).filter(function (b) { return !isComplete(b) && nameOf(b); });
      return { p: p, names: names, held: held };
    })
    .filter(function (x) { return x.names.length; })
    .sort(function (a, b) { return clean(b.p.inicio).localeCompare(clean(a.p.inicio)); });

  var section = rail.closest('section');
  if (!list.length) { if (section) section.hidden = true; return; }

  /* Cifras de la cabecera: becas otorgadas, estudiantes distintos y congresos */
  if (stats) {
    var people = {};
    var total = 0;
    list.forEach(function (x) { x.names.forEach(function (n) { total++; people[n.toLocaleLowerCase('es')] = 1; }); });
    var values = { becas: total, personas: Object.keys(people).length, programas: list.length };
    stats.querySelectorAll('[data-stat]').forEach(function (dd) { dd.textContent = values[dd.getAttribute('data-stat')]; });
    stats.hidden = false;
  }

  function chapterLabel(id) {
    for (var i = 0; i < chapters.length; i++) if (chapters[i].id === id) return (chapters[i].siglas || []).join('/');
    return '';
  }
  function monthLabel(iso) {
    var m = /^(\d{4})-(\d{2})/.exec(clean(iso));
    return m ? MESES[Number(m[2]) - 1] + ' ' + m[1] : '';
  }

  var tabs = [];
  list.forEach(function (x, i) {
    var p = x.p, id = clean(p.id);

    /* Pestaña: lo esencial */
    var tab = el('button', 'beca-tab');
    tab.type = 'button';
    tab.id = 'beca-tab-' + id;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', 'beca-panel-' + id);
    tab.appendChild(el('span', 'beca-tab-date mono', monthLabel(p.inicio)));
    tab.appendChild(el('span', 'beca-tab-name', clean(p.siglas)));
    tab.appendChild(el('span', 'beca-tab-count', plural(x.names.length, 'beca', 'becas')));
    rail.appendChild(tab);
    tabs.push(tab);

    /* Panel: el detalle */
    var panel = el('div', 'beca-panel');
    panel.id = 'beca-panel-' + id;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;

    var fig = el('figure', 'frame-visor beca-photo');
    ['tl', 'tr', 'bl', 'br'].forEach(function (c) { fig.appendChild(el('span', 'corner ' + c)); });
    var src = p.foto && clean(p.foto.src);
    if (src) {
      var img = el('img');
      img.loading = 'lazy';   // ANTES de src: asignar src inicia la descarga. Lazy también la primera: está bajo la portada y no debe competir con el LCP
      img.decoding = 'async';
      img.sizes = '(max-width: 900px) calc(100vw - 58px), 640px';   // sizes no admite var(): 2 × 16 px de margen + 26 px del marco
      img.srcset = src + '-640.webp 640w, ' + src + '-960.webp 960w';
      img.src = src + '-960.webp';
      img.width = 960; img.height = 600;
      img.alt = clean(p.foto.alt);
      fig.appendChild(img);
      /* precarga la foto al apuntar o enfocar su pestaña: el cambio se ve sin espera */
      var warm = function () { img.loading = 'eager'; };
      tab.addEventListener('pointerenter', warm, { once: true });
      tab.addEventListener('focus', warm, { once: true });
    }
    panel.appendChild(fig);

    var body = el('div', 'beca-body');
    var meta = el('p', 'beca-meta mono');
    var t = el('time', null, clean(p.fechas));
    if (clean(p.inicio)) t.dateTime = clean(p.inicio);
    meta.appendChild(t);
    if (clean(p.lugar)) meta.appendChild(el('span', null, clean(p.lugar)));
    body.appendChild(meta);

    var h = el('h3', 'beca-title', clean(p.nombre) || clean(p.siglas));
    body.appendChild(h);
    if (clean(p.organiza)) {
      var org = el('p', 'beca-org');
      org.appendChild(el('span', 'mono', 'Organiza'));
      org.appendChild(document.createTextNode(clean(p.organiza)));
      body.appendChild(org);
    }

    var listHead = el('p', 'beca-list-head mono');
    listHead.appendChild(el('span', null, x.names.length === 1 ? 'Becado' : 'Becados'));
    listHead.appendChild(el('span', 'beca-list-n', String(x.names.length)));
    body.appendChild(listHead);
    if (clean(p.nota)) body.appendChild(el('p', 'beca-note', clean(p.nota)));
    var ul = el('ul', 'beca-names' + (x.names.length === 1 ? ' is-single' : x.names.length > 6 ? ' is-many' : ''));
    x.names.forEach(function (n) { ul.appendChild(el('li', null, n)); });
    if (showPending) x.held.forEach(function (b) {
      var li = el('li', null, nameOf(b) + ' ');
      li.appendChild(el('span', 'pending', 'Pendiente: ' + clean(b.pendiente)));
      ul.appendChild(li);
    });
    body.appendChild(ul);

    var cap = clean(p.capitulo), capName = cap && chapterLabel(cap);
    if (capName) {
      var foot = el('p', 'beca-foot');
      foot.appendChild(el('span', null, 'Capítulo de la rama'));
      var a = el('a', 'event-chapter', capName);
      a.href = '/capitulos/' + cap;
      foot.appendChild(a);
      body.appendChild(foot);
    }
    panel.appendChild(body);
    panels.appendChild(panel);
  });

  /* Pestañas: selección automática con el teclado (patrón ARIA "tabs") */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function reveal(tab) {                  // en celular la línea de tiempo se desliza: centra la pestaña elegida sin mover la página
    if (rail.scrollWidth <= rail.clientWidth) return;
    var left = tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: reduce.matches ? 'auto' : 'smooth' });
  }
  function select(i, focus) {
    tabs.forEach(function (tab, j) {
      var on = i === j;
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.tabIndex = on ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tabs[i].focus({ preventScroll: true });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(i, false); reveal(tab); });
    tab.addEventListener('keydown', function (e) {
      var n = tabs.length, to = null;
      if (e.key === 'ArrowRight') to = (i + 1) % n;
      else if (e.key === 'ArrowLeft') to = (i - 1 + n) % n;
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = n - 1;
      if (to === null) return;
      e.preventDefault();
      select(to, true);
      reveal(tabs[to]);
    });
  });
  select(0, false);   // sin reveal(): la primera ya está al inicio y medir aquí forzaría un reflow durante la carga
  rail.closest('.becas-show').classList.add('is-ready');
})();
