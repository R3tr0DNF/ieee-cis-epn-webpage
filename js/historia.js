/* Historia: línea de tiempo de reconocimientos (lee js/data/historia.js)
   · Celular y tableta: una columna con la línea a la izquierda (flujo normal, sin cálculos).
   · Escritorio (≥ 900 px): dos columnas alternadas a los lados de una línea central.
     Cada momento empieza un poco más abajo que el anterior (escalonado), así el orden
     cronológico se lee de arriba abajo aunque las tarjetas tengan altos distintos.
   · Filtros: botones con aria-pressed (como los de Oportunidades) y conteo en role="status".
   · Las fotos se amplían en un <dialog> nativo: atrapa el foco, cierra con Esc y lo devuelve. */
(function () {
  var D = window.IEEE_EPN || {};
  var tl = document.getElementById('tl');
  var data = (Array.isArray(D.historia) ? D.historia : []).filter(function (m) { return m && m.publicar !== false; });
  if (!tl || !data.length) return;

  var filtersBox = document.getElementById('tl-filters');
  var count = document.getElementById('tl-count');
  var page = document.getElementById('historia');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var wide = window.matchMedia('(min-width: 900px)');

  /* Alcance geográfico (no siempre lo otorga IEEE: la Mención de 2008 es del Concejo de Quito) */
  var AMBITO = { regional: 'Región 9', nacional: 'Ecuador', rama: 'EPN' };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function clean(v) { return (v == null ? '' : String(v)).trim(); }
  /* Solo rutas propias de imágenes (nunca javascript:, data: ni otros sitios), aunque los datos sean nuestros */
  function safeSrc(s) { s = clean(s); return /^assets\/img\/[\w\-\/.]+\.(webp|jpe?g|png)$/i.test(s) && s.indexOf('..') < 0 ? s : ''; }

  /* ---------- Ampliar fotos ---------- */
  var lb = null, lbImg = null, lbCap = null;
  function lightbox() {
    if (lb) return lb;
    if (typeof HTMLDialogElement !== 'function') return null;   // navegadores muy antiguos: sin ampliación
    lb = el('dialog', 'tl-lightbox');
    lb.setAttribute('aria-label', 'Foto ampliada');
    var fig = el('figure', 'tl-lb-fig');
    lbImg = el('img', 'tl-lb-img');
    lbImg.alt = '';
    lbCap = el('figcaption', 'tl-lb-cap');
    var close = el('button', 'tl-lb-close');
    close.type = 'button';
    close.setAttribute('aria-label', 'Cerrar la foto ampliada');
    close.appendChild(el('span', null, '×')).setAttribute('aria-hidden', 'true');
    close.addEventListener('click', function () { lb.close(); });
    fig.appendChild(lbImg); fig.appendChild(lbCap);
    lb.appendChild(close); lb.appendChild(fig);
    /* Clic fuera de la foto (en el fondo del diálogo) también cierra */
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === fig) lb.close(); });
    lb.addEventListener('close', function () { lbImg.removeAttribute('src'); document.documentElement.classList.remove('tl-lb-open'); });
    document.body.appendChild(lb);
    return lb;
  }
  function openPhoto(foto, titulo) {
    var d = lightbox();
    if (!d) return;
    lbImg.src = foto.src;
    lbImg.alt = foto.alt;
    lbImg.width = foto.w; lbImg.height = foto.h;
    lbCap.textContent = titulo ? titulo + ' · ' + foto.alt : foto.alt;
    document.documentElement.classList.add('tl-lb-open');
    d.showModal();
  }

  /* ---------- Momentos ---------- */
  var entries = data.map(function (m, i) {
    var li = el('li', 'tl-item' + (m.tipo === 'reconocimiento' ? ' is-award' : ''));
    var id = clean(m.id);
    if (/^[a-z0-9-]+$/i.test(id)) li.id = id;

    li.appendChild(el('span', 'tl-dot')).setAttribute('aria-hidden', 'true');

    var head = el('div', 'tl-head');
    var year = el('p', 'tl-year', clean(m.anio));
    head.appendChild(year);
    var date = el('p', 'tl-date mono');
    var iso = clean(m.iso);
    if (/^\d{4}(-\d{2}){0,2}$/.test(iso)) { var t = el('time', null, clean(m.fecha)); t.setAttribute('datetime', iso); date.appendChild(t); }
    else date.textContent = clean(m.fecha);
    head.appendChild(date);
    li.appendChild(head);

    var card = el('article', 'tl-card');
    var titleId = 'tl-t-' + i;
    card.setAttribute('aria-labelledby', titleId);

    var fotos = (m.fotos || []).map(function (f) {
      return { src: safeSrc(f.src), w: +f.w || 4, h: +f.h || 3, alt: clean(f.alt) };
    }).filter(function (f) { return f.src && f.alt; });
    if (fotos.length) {
      var gal = el('div', 'tl-gal n' + Math.min(fotos.length, 3));
      fotos.forEach(function (f) {
        var b = el('button', 'tl-zoom');
        b.type = 'button';
        var img = el('img');
        img.src = f.src; img.alt = f.alt; img.width = f.w; img.height = f.h;
        img.loading = 'lazy'; img.decoding = 'async';
        b.appendChild(img);
        b.appendChild(el('span', 'sr-only', ' (ampliar foto)'));
        b.addEventListener('click', function () { openPhoto(f, clean(m.titulo)); });
        gal.appendChild(b);
      });
      card.appendChild(gal);
    }

    var body = el('div', 'tl-body');
    var meta = el('p', 'tl-meta');
    meta.appendChild(el('span', 'tl-tag', clean(m.etiqueta)));
    if (AMBITO[m.ambito]) meta.appendChild(el('span', 'tl-scope mono', AMBITO[m.ambito]));
    body.appendChild(meta);
    var h3 = el('h3', 'tl-title', clean(m.titulo));
    h3.id = titleId;
    body.appendChild(h3);
    if (clean(m.lugar)) body.appendChild(el('p', 'tl-place', clean(m.lugar)));
    if (clean(m.desc)) body.appendChild(el('p', 'tl-desc', clean(m.desc)));
    if (clean(m.nota)) {
      var note = el('p', 'tl-note');
      note.appendChild(el('span', 'tl-note-k mono', 'Nota'));
      note.appendChild(document.createTextNode(' ' + clean(m.nota)));
      body.appendChild(note);
    }
    card.appendChild(body);
    li.appendChild(card);
    tl.appendChild(li);

    return { m: m, li: li, year: year, anio: clean(m.anio) };
  });

  /* ---------- Cifras de la cabecera ---------- */
  var sum = function (k) { return data.reduce(function (s, m) { return s + (+m[k] || 0); }, 0); };
  var years = data.map(function (m) { return +clean(m.iso).slice(0, 4); }).filter(function (y) { return y > 1900; });
  var stats = {
    momentos: data.length,
    premios: sum('premios'),
    primeros: sum('primeros'),
    desde: years.length ? Math.min.apply(null, years) : '',
    hasta: years.length ? Math.max.apply(null, years) : ''
  };
  [].forEach.call(document.querySelectorAll('[data-hist]'), function (b) {
    var v = stats[b.getAttribute('data-hist')];
    if (v !== '' && v != null) b.textContent = v;
  });

  /* ---------- Distribución ---------- */
  var GAP = 40, STAGGER = 96;
  function layout() {
    var shown = entries.filter(function (e) { return !e.li.hidden; });
    /* El año se muestra solo en el primer momento visible de cada año */
    var last = null;
    shown.forEach(function (e) {
      e.year.hidden = e.anio === last;
      e.li.classList.toggle('has-year', !e.year.hidden);   // el marcador se alinea con el año o con la fecha
      last = e.anio;
    });

    if (!wide.matches) {
      tl.classList.remove('is-two');
      tl.style.removeProperty('height');
      entries.forEach(function (e) { e.li.style.removeProperty('top'); e.li.classList.remove('is-left', 'is-right'); });
      return;
    }
    if (!tl.offsetParent) return;          // vista oculta: se distribuye al mostrarse
    tl.classList.add('is-two');
    var bottom = { L: 0, R: 0 }, lastTop = -Infinity;
    shown.forEach(function (e, i) {
      var side = i % 2 ? 'R' : 'L';
      e.li.classList.toggle('is-left', side === 'L');
      e.li.classList.toggle('is-right', side === 'R');
      var top = Math.max(bottom[side], lastTop + STAGGER);
      e.li.style.top = top + 'px';
      lastTop = top;
      bottom[side] = top + e.li.offsetHeight + GAP;
    });
    tl.style.height = Math.max(bottom.L, bottom.R, 0) + 'px';
  }
  /* Recalcular agrupando ráfagas (redimensionar, cargas de fuentes e imágenes) */
  var timer = null;
  function schedule() { clearTimeout(timer); timer = setTimeout(layout, 60); }
  window.addEventListener('resize', schedule);
  if (wide.addEventListener) wide.addEventListener('change', schedule);
  /* router.js muestra la vista y luego avisa: aquí ya tiene tamaño, se distribuye de inmediato */
  document.addEventListener('ieee:view', function (e) { if (e.detail === 'historia') layout(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  tl.querySelectorAll('img').forEach(function (img) { img.addEventListener('load', schedule, { once: true }); });

  /* ---------- Entrada al aparecer (una vez) ---------- */
  if ('IntersectionObserver' in window && !reduce.matches) {
    tl.classList.add('will-reveal');
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    entries.forEach(function (e) { io.observe(e.li); });
  }

  /* ---------- Filtros ---------- */
  var FILTROS = [
    { key: '',               label: 'Todo',                      test: function () { return true; } },
    { key: 'reconocimiento', label: 'Reconocimientos',           test: function (m) { return m.tipo === 'reconocimiento'; } },
    { key: 'regional',       label: 'Región 9', full: 'IEEE Región 9, Latinoamérica', test: function (m) { return m.ambito === 'regional'; } },
    { key: 'nacional',       label: 'Ecuador',  full: 'en Ecuador',                   test: function (m) { return m.ambito === 'nacional'; } },
    { key: 'hito',           label: 'Eventos y participaciones', test: function (m) { return m.tipo === 'hito'; } }
  ];
  var chips = [];
  function plural(n) { return n === 1 ? '1 momento' : n + ' momentos'; }
  function apply(f) {
    var shown = 0;
    entries.forEach(function (e) {
      var ok = f.test(e.m);
      e.li.hidden = !ok;
      if (ok) shown++;
    });
    if (count) count.textContent = f.key ? 'Mostrando ' + plural(shown) + ' de ' + data.length : plural(data.length) + ' en total';
    layout();
  }
  if (filtersBox) {
    FILTROS.forEach(function (f) {
      var n = data.filter(f.test).length;
      if (!n) return;
      var b = el('button', 'tl-chip');
      b.type = 'button';
      b.setAttribute('aria-pressed', f.key === '' ? 'true' : 'false');
      b.appendChild(el('span', null, f.label));
      if (f.full) b.appendChild(el('span', 'sr-only', ' (' + f.full + ')'));
      b.appendChild(el('span', 'tl-chip-n', String(n)));
      b.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
        apply(f);
      });
      filtersBox.appendChild(b);
      chips.push(b);
    });
    filtersBox.hidden = false;
  }

  apply(FILTROS[0]);
  if (page && page.classList.contains('active')) layout();
})();
