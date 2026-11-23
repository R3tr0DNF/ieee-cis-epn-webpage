/* Oportunidades IEEE: tarjetas y filtros (lee js/data/oportunidades.js) */
(function () {
  var D = window.IEEE_EPN || {};
  var data = D.oportunidades;
  var grid = document.getElementById('opp-grid');
  if (!grid || !data || !Array.isArray(data.items)) return;

  var tools = document.getElementById('opp-tools');
  var q = document.getElementById('opp-q');
  var selEstado = document.getElementById('opp-estado');
  var selCat = document.getElementById('opp-cat');
  var socsBox = document.getElementById('opp-socs');
  var count = document.getElementById('opp-count');
  var clearBtns = [].slice.call(document.querySelectorAll('[data-opp-clear]'));
  var empty = document.getElementById('opp-empty');
  var readout = document.getElementById('opp-readout');

  var SOCS = data.sociedades || {};
  var chapters = Array.isArray(D.chapters) ? D.chapters : [];
  var CATS = {
    beca: 'Becas y viajes', premio: 'Premios', fondos: 'Financiamiento', mentoria: 'Mentorías',
    evento: 'Congresos y charlas', programa: 'Programas y voluntariado', formacion: 'Formación'
  };
  var ESTADOS = { activa: 'Activas', proxima: 'Próximas', permanente: 'Permanentes o continuas', cerrada: 'Cerradas', confirmar: 'Por confirmar' };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function clean(v) { return (v == null ? '' : String(v)).trim(); }
  function fold(s) {   // búsqueda sin tildes ni mayúsculas
    s = clean(s).toLowerCase();
    return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s;
  }
  function safeUrl(u) {
    u = clean(u);
    return /^https:\/\/[^\s"'<>]+$/i.test(u) ? u : '';
  }
  function safeEmail(e) {
    e = clean(e);
    return /^[^\s@<>"']+@[^\s@<>"']+\.[a-z]{2,}$/i.test(e) ? e : '';
  }
  /* Estado de la hoja → grupo del filtro y etiqueta visible */
  function estadoDe(texto) {
    var t = fold(texto);
    if (!t) return { key: 'confirmar', label: 'Por confirmar' };
    if (/^(activ|abiert)/.test(t)) return { key: 'activa', label: 'Activa' };
    if (/^cerrad/.test(t)) return { key: 'cerrada', label: 'Cerrada' };
    if (/^permanente/.test(t)) return { key: 'permanente', label: 'Permanente' };
    if (/^continua/.test(t)) return { key: 'permanente', label: 'Continua' };
    if (/^proxim/.test(t)) return { key: 'proxima', label: 'Próxima' };
    if (/disponible/.test(t)) return { key: 'proxima', label: clean(texto) };
    return { key: 'confirmar', label: clean(texto) };
  }
  function chapterOf(id) {
    for (var i = 0; i < chapters.length; i++) if (chapters[i].id === id) return chapters[i];
    return null;
  }
  /* Enlace externo: pestaña nueva y aviso para lectores de pantalla */
  function extLink(url, text, cls) {
    var a = el('a', cls || 'opp-ext');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.appendChild(el('span', null, text));
    var arrow = el('span', 'arrow', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    a.appendChild(arrow);
    a.appendChild(el('span', 'sr-only', ' (se abre en una pestaña nueva)'));
    return a;
  }
  function textBlock(label, value) {
    var wrap = el('div', 'opp-block');
    wrap.appendChild(el('h4', 'opp-block-h mono', label));
    if (Array.isArray(value)) {
      var ul = el('ul', 'opp-list');
      value.forEach(function (v) { if (clean(v)) ul.appendChild(el('li', null, clean(v))); });
      wrap.appendChild(ul);
    } else if (value && value.nodeType) {
      wrap.appendChild(value);
    } else {
      wrap.appendChild(el('p', null, clean(value)));
    }
    return wrap;
  }

  /* Filtro por sociedad (orden de la hoja) */
  var socKeys = [];
  data.items.forEach(function (it) { if (SOCS[it.soc] && socKeys.indexOf(it.soc) < 0) socKeys.push(it.soc); });

  /* ---------- Tarjetas ---------- */
  var cards = [];
  var totals = { activa: 0, proxima: 0, permanente: 0, cerrada: 0, confirmar: 0 };
  var perSoc = {}, perCat = {};
  data.items.forEach(function (it, i) {
    var soc = SOCS[it.soc];
    if (!soc || !clean(it.nombre)) return;
    var est = estadoDe(it.estado);
    totals[est.key]++;
    perSoc[it.soc] = (perSoc[it.soc] || 0) + 1;
    if (CATS[it.cat]) perCat[it.cat] = (perCat[it.cat] || 0) + 1;

    var li = el('li', 'opp is-' + est.key);
    var art = el('article', 'opp-card');
    var hid = 'opp-h-' + i;
    art.setAttribute('aria-labelledby', hid);

    /* Medio: foto de una edición anterior o logo del capítulo de la rama */
    var media = el('div', 'opp-media');
    var cap = soc.capitulo ? chapterOf(soc.capitulo) : null;
    var photo = it.img && clean(it.img.src);
    if (photo) {
      media.classList.add('has-photo');
      var im = el('img', 'opp-photo');
      im.loading = 'lazy';                       // antes de src
      im.decoding = 'async';
      im.sizes = '(max-width: 760px) calc(100vw - 32px), (max-width: 1100px) 46vw, 380px';
      im.srcset = photo + '-640.webp 640w, ' + photo + '-960.webp 960w';
      im.src = photo + '-640.webp';
      im.width = 640; im.height = 400;
      im.alt = clean(it.img.alt);
      media.appendChild(im);
      if (clean(it.img.nota)) media.appendChild(el('span', 'opp-photo-note mono', clean(it.img.nota)));
    } else if (cap && cap.logo && cap.logo.src) {
      var lg = el('img', 'opp-logo');
      lg.loading = 'lazy';
      lg.decoding = 'async';
      lg.src = cap.logo.src;
      if (cap.logo.src2x) lg.srcset = cap.logo.src + ' 1x, ' + cap.logo.src2x + ' 2x';
      lg.width = cap.logo.width; lg.height = cap.logo.height;
      lg.alt = '';                               // decorativo: la sociedad se nombra en el texto
      if (cap.logo.formato === 'cuadrado') lg.classList.add('is-square');
      media.appendChild(lg);
    } else {
      media.classList.add('is-text');
      media.appendChild(el('span', 'opp-media-sig', soc.siglas));
      media.appendChild(el('span', 'opp-media-name', soc.nombre));
      media.setAttribute('aria-hidden', 'true');
    }
    var pill = el('span', 'opp-state', est.label);
    media.appendChild(pill);
    art.appendChild(media);

    var body = el('div', 'opp-body');
    var meta = el('p', 'opp-meta mono');
    var socTag = el('span', 'opp-soc', soc.siglas);
    socTag.title = soc.nombre;
    meta.appendChild(socTag);
    if (clean(it.tipo)) meta.appendChild(el('span', null, clean(it.tipo)));
    body.appendChild(meta);

    var h = el('h3', 'opp-title', clean(it.nombre));
    h.id = hid;
    body.appendChild(h);
    if (clean(it.desc)) body.appendChild(el('p', 'opp-desc', clean(it.desc)));

    /* Datos clave */
    var facts = el('dl', 'opp-facts');
    function fact(k, v) {
      if (!clean(v)) return;
      var row = el('div');
      row.appendChild(el('dt', null, k));
      row.appendChild(el('dd', null, clean(v)));
      facts.appendChild(row);
    }
    fact('Dirigido a', it.dirigido);
    fact('Apertura', it.apertura);
    fact('Cierre', it.cierre);
    fact('Modalidad', it.modalidad);
    if (facts.children.length) body.appendChild(facts);

    /* Detalle desplegable (nativo: teclado y lector de pantalla sin JS extra) */
    var more = el('details', 'opp-more');
    var sum = el('summary', null);
    sum.appendChild(el('span', null, 'Beneficios, requisitos y más'));
    more.appendChild(sum);
    var inner = el('div', 'opp-more-body');
    var extra = el('dl', 'opp-facts is-compact');
    [['Alcance', it.alcance], ['Frecuencia', it.frecuencia], ['Estado 2026 (hoja)', clean(it.estado) || 'Sin dato en la hoja']].forEach(function (p) {
      if (!clean(p[1])) return;
      var row = el('div');
      row.appendChild(el('dt', null, p[0]));
      row.appendChild(el('dd', null, clean(p[1])));
      extra.appendChild(row);
    });
    if (extra.children.length) inner.appendChild(extra);
    var ben = Array.isArray(it.beneficios) ? it.beneficios.filter(clean) : clean(it.beneficios);
    if (ben && ben.length) inner.appendChild(textBlock('Beneficios', ben));
    var reqUrl = safeUrl(it.requisitosUrl);
    if (clean(it.requisitos) || reqUrl) {
      var reqWrap = el('div');
      if (clean(it.requisitos)) reqWrap.appendChild(el('p', null, clean(it.requisitos)));
      if (reqUrl) reqWrap.appendChild(extLink(reqUrl, 'Ver requisitos'));
      inner.appendChild(textBlock('Requisitos', reqWrap));
    }
    if (clean(it.recomendacion)) {
      var tip = textBlock('Recomendación', it.recomendacion);
      tip.classList.add('opp-tip');
      inner.appendChild(tip);
    }
    var contacts = (it.contacto || []).map(function (c) {
      if (!c) return null;
      var u = safeUrl(c.url), m = safeEmail(c.email);
      if (u) return extLink(u, clean(c.label) || u.replace(/^https:\/\//, ''));
      if (m) {
        var a = el('a', 'opp-mail', m);
        a.href = 'mailto:' + m;
        var box = el('span', null);
        box.appendChild(a);
        if (clean(c.label)) box.appendChild(document.createTextNode(' (' + clean(c.label) + ')'));
        return box;
      }
      return clean(c.text) ? el('span', null, clean(c.text)) : null;
    }).filter(Boolean);
    if (contacts.length) {
      var cl = el('ul', 'opp-contacts');
      contacts.forEach(function (n) { var x = el('li'); x.appendChild(n); cl.appendChild(x); });
      inner.appendChild(textBlock('Contacto e información', cl));
    }
    more.appendChild(inner);
    if (inner.children.length) body.appendChild(more);

    /* Acciones */
    var foot = el('div', 'opp-foot');
    var link = safeUrl(it.link);
    if (link) foot.appendChild(extLink(link, 'Ir a la convocatoria', 'btn btn-gold btn-sm opp-go'));
    else foot.appendChild(el('span', 'opp-nolink', 'Próximamente se habilitarán las postulaciones'));
    if (cap) {
      var ca = el('a', 'event-chapter', 'Capítulo ' + (cap.siglas || []).join('/'));
      ca.href = '/capitulos/' + cap.id;
      ca.title = 'Capítulo de la rama relacionado';
      foot.appendChild(ca);
    }
    body.appendChild(foot);

    art.appendChild(body);
    li.appendChild(art);
    grid.appendChild(li);

    cards.push({
      li: li, soc: it.soc, cat: it.cat, estado: est.key,
      text: fold([it.nombre, soc.siglas, soc.nombre, it.tipo, CATS[it.cat], it.alcance, it.dirigido, it.desc,
        Array.isArray(it.beneficios) ? it.beneficios.join(' ') : it.beneficios, it.requisitos, it.recomendacion].join(' '))
    });
  });
  if (!cards.length) return;

  /* ---------- Cifras de la cabecera ---------- */
  if (readout) {
    var values = { total: cards.length, socs: socKeys.length, activas: totals.activa, permanentes: totals.permanente };
    readout.querySelectorAll('[data-opp]').forEach(function (b) {
      var v = values[b.getAttribute('data-opp')];
      if (v != null) b.textContent = v;
    });
  }

  /* ---------- Filtros ---------- */
  function option(sel, value, text) { var o = el('option', null, text); o.value = value; sel.appendChild(o); }
  option(selEstado, '', 'Todos los estados');
  Object.keys(ESTADOS).forEach(function (k) { if (totals[k]) option(selEstado, k, ESTADOS[k] + ' (' + totals[k] + ')'); });
  option(selCat, '', 'Todos los tipos');
  Object.keys(CATS).forEach(function (k) { if (perCat[k]) option(selCat, k, CATS[k] + ' (' + perCat[k] + ')'); });

  var state = { q: '', estado: '', cat: '', soc: '' };
  var chips = [];
  function chip(key, label, full, n) {
    var b = el('button', 'opp-chip');
    b.type = 'button';
    b.setAttribute('data-soc', key);
    b.setAttribute('aria-pressed', key === '' ? 'true' : 'false');
    b.appendChild(el('span', null, label));
    if (full) b.appendChild(el('span', 'sr-only', ' (' + full + ')'));
    b.appendChild(el('span', 'opp-chip-n', String(n)));
    b.addEventListener('click', function () {
      state.soc = key;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
      apply();
    });
    socsBox.appendChild(b);
    chips.push(b);
  }
  chip('', 'Todas', 'todas las sociedades', cards.length);
  socKeys.forEach(function (k) { chip(k, SOCS[k].siglas, SOCS[k].nombre, perSoc[k] || 0); });

  function plural(n) { return n === 1 ? '1 oportunidad' : n + ' oportunidades'; }
  var announce = null;
  function apply() {
    var terms = fold(state.q).split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (c) {
      var ok = (!state.soc || c.soc === state.soc) && (!state.cat || c.cat === state.cat) && (!state.estado || c.estado === state.estado) &&
        terms.every(function (t) { return c.text.indexOf(t) >= 0; });
      c.li.hidden = !ok;
      if (ok) shown++;
    });
    var filtered = !!(state.q.trim() || state.soc || state.cat || state.estado);
    clearBtns.forEach(function (b) { b.hidden = !filtered; });
    if (empty) empty.hidden = shown > 0;
    /* El texto se escribe un instante después para que el lector de pantalla no lo lea en cada tecla */
    clearTimeout(announce);
    announce = setTimeout(function () {
      count.textContent = filtered ? 'Mostrando ' + plural(shown) + ' de ' + cards.length : plural(cards.length) + ' en total';
    }, filtered ? 350 : 0);
  }

  var typing = null;
  q.addEventListener('input', function () {
    clearTimeout(typing);
    typing = setTimeout(function () { state.q = q.value; apply(); }, 120);
  });
  q.addEventListener('search', function () { state.q = q.value; apply(); });   // la "x" del campo de búsqueda
  selEstado.addEventListener('change', function () { state.estado = selEstado.value; apply(); });
  selCat.addEventListener('change', function () { state.cat = selCat.value; apply(); });
  clearBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      state = { q: '', estado: '', cat: '', soc: '' };
      q.value = ''; selEstado.value = ''; selCat.value = '';
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-soc') === '' ? 'true' : 'false'); });
      apply();
      q.focus();
    });
  });
  var form = document.getElementById('opp-form');
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); clearTimeout(typing); state.q = q.value; apply(); });

  if (tools) tools.hidden = false;
  apply();
})();
