/* ==========================================================
   IEEE Student Branch EPN — Sección "Capítulos y grupos"
   Genera las tarjetas, los filtros y la franja de siglas de
   Inicio a partir de js/data/capitulos.js. No contiene datos.
   ========================================================== */
(function () {
  var D = window.IEEE_EPN || {};
  var items = D.capitulos || [];
  var tipos = D.tiposCapitulo || {};
  var showTodo = D.MOSTRAR_PENDIENTES !== false;

  var IG_ICON =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function card(c, i) {
    var art = el('article', 'chap reveal');
    art.dataset.tipo = c.tipo;
    art.style.setProperty('--i', i % 6);
    art.setAttribute('aria-labelledby', 'chap-' + c.id);

    var pending = [];

    /* Logotipo (o monograma provisional con la sigla) */
    var logo = el('div', 'chap-logo');
    if (c.logo) {
      var img = el('img');
      img.src = c.logo;
      img.alt = 'Logotipo de IEEE ' + c.nombre;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 72; img.height = 72;
      logo.appendChild(img);
    } else {
      logo.classList.add('is-placeholder');
      logo.setAttribute('aria-hidden', 'true');
      logo.textContent = c.sigla.length > 6 ? c.sigla.slice(0, 2) : c.sigla;
      if (logo.textContent.length > 4) logo.classList.add('is-long');
      pending.push('logo');
    }

    var head = el('div', 'chap-head');
    head.appendChild(logo);
    var tag = el('span', 'chap-type', tipos[c.tipo] || '');
    head.appendChild(tag);
    art.appendChild(head);

    var h = el('h2', 'chap-sigla', c.sigla);
    h.id = 'chap-' + c.id;
    art.appendChild(h);
    art.appendChild(el('p', 'chap-name', 'IEEE ' + c.nombre));

    var desc = el('p', 'chap-desc', c.descripcion || c.area);
    art.appendChild(desc);
    if (!c.descripcion) pending.push('descripción');

    var foot = el('div', 'chap-foot');
    if (c.instagram) {
      var a = el('a', 'chap-ig');
      a.href = c.instagram;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = IG_ICON + '<span>Instagram</span>';
      a.setAttribute('aria-label', 'Instagram de IEEE ' + c.sigla + ' EPN (se abre en una pestaña nueva)');
      foot.appendChild(a);
    } else {
      var s = el('span', 'chap-ig is-disabled');
      s.innerHTML = IG_ICON + '<span>Instagram</span>';
      s.setAttribute('aria-label', 'Instagram de ' + c.sigla + ': enlace pendiente');
      foot.appendChild(s);
      pending.push('Instagram');
    }
    if (showTodo && pending.length) {
      foot.appendChild(el('span', 'todo chap-todo', 'Pendiente: ' + pending.join(' · ')));
    }
    art.appendChild(foot);
    return art;
  }

  /* ---- Tarjetas y filtros ---- */
  var grid = document.getElementById('chap-grid');
  if (grid) {
    var frag = document.createDocumentFragment();
    items.forEach(function (c, i) { frag.appendChild(card(c, i)); });
    grid.appendChild(frag);

    var count = document.getElementById('chap-count');
    if (count) count.textContent = items.length;

    var bar = document.getElementById('chap-filters');
    if (bar) {
      var used = {};
      items.forEach(function (c) { used[c.tipo] = (used[c.tipo] || 0) + 1; });
      var opts = [['todos', 'Todos', items.length]];
      Object.keys(tipos).forEach(function (k) { if (used[k]) opts.push([k, tipos[k], used[k]]); });

      opts.forEach(function (o, idx) {
        var b = el('button', 'chip');
        b.type = 'button';
        b.dataset.filter = o[0];
        b.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
        b.innerHTML = '<span></span><small></small>';
        b.firstChild.textContent = o[1];
        b.lastChild.textContent = o[2];
        bar.appendChild(b);
      });

      var live = document.getElementById('chap-live');
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-filter]');
        if (!b) return;
        var f = b.dataset.filter, n = 0;
        bar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        grid.querySelectorAll('.chap').forEach(function (c) {
          var on = f === 'todos' || c.dataset.tipo === f;
          c.hidden = !on;
          if (on) { n++; c.classList.add('is-visible'); }
        });
        if (live) live.textContent = 'Mostrando ' + n + (n === 1 ? ' agrupación' : ' agrupaciones');
      });
    }
  }

  /* ---- Franja de siglas en Inicio (enlaza a la sección) ---- */
  var strip = document.getElementById('chap-strip');
  if (strip) {
    items.forEach(function (c) {
      var a = el('a', 'strip-item', c.sigla);
      a.href = '#capitulos';
      a.dataset.tab = 'capitulos';
      a.title = 'IEEE ' + c.nombre;
      strip.appendChild(a);
    });
  }

  document.dispatchEvent(new CustomEvent('ieee:content-ready'));
})();
