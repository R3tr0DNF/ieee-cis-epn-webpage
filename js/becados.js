/* ==========================================================
   IEEE Student Branch EPN — Plantilla única de becados
   Lee js/data/becados.js y dibuja la lista de la página
   "Directiva y becados". No contiene datos.
   · Solo publica registros con consentimiento.datos === true.
   · Solo muestra la foto con consentimiento.foto === true.
   · Sin registros publicables: estado vacío. Con MOSTRAR_PENDIENTES,
     además tres tarjetas de muestra marcadas PENDIENTE.
   · Todo el texto entra con textContent (nunca innerHTML).
   ========================================================== */
(function () {
  var D = window.IEEE_EPN || {};
  var list = document.getElementById('becados-list');
  var empty = document.getElementById('becados-empty');
  var note = document.getElementById('becados-note');
  if (!list) return;
  var all = Array.isArray(D.becados) ? D.becados : [];
  var showPending = (D.config || {}).MOSTRAR_PENDIENTES !== false;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function pending(text) { return el('span', 'pending', text || 'Pendiente'); }
  function clean(v) { return (v == null ? '' : String(v)).trim(); }
  function safeUrl(u) { return /^https?:\/\//i.test(clean(u)) ? clean(u) : ''; }
  function initials(name) {
    return clean(name).split(/\s+/).map(function (w) { var m = w.match(/\p{L}/u); return m ? m[0].toUpperCase() : ''; })
      .filter(Boolean).slice(0, 2).join('');
  }
  function publishable(b) {
    return b && b.consentimiento && b.consentimiento.datos === true && clean(b.nombre);
  }

  /* La plantilla: una tarjeta por becado (o una muestra si b es null) */
  function card(b) {
    var sample = !b;
    var li = el('li', 'person becado' + (sample ? ' is-sample' : ''));

    var media;
    if (!sample && b.consentimiento.foto === true && clean(b.foto)) {
      media = el('img', 'becado-photo');
      media.src = clean(b.foto);
      media.alt = 'Foto de ' + clean(b.nombre);
      media.width = 480; media.height = 600;
      media.loading = 'lazy'; media.decoding = 'async';
    } else if (!sample) {
      media = el('div', 'becado-initials', initials(b.nombre));
      media.setAttribute('aria-hidden', 'true');
    } else {
      media = el('div', 'ph');
      media.setAttribute('role', 'img');
      media.setAttribute('aria-label', 'Espacio para la foto de un becado');
      media.appendChild(pending('Foto con autorización'));
    }
    li.appendChild(media);

    var role = el('span', 'role mono');
    if (sample || !clean(b.programa)) role.appendChild(pending('Programa o beca IEEE'));
    else role.textContent = clean(b.programa);
    li.appendChild(role);

    li.appendChild(el('h3', null, sample ? 'Nombre pendiente' : clean(b.nombre)));

    var meta = el('p', 'becado-meta');
    if (sample) { meta.appendChild(pending('Carrera')); meta.appendChild(document.createTextNode(' ')); meta.appendChild(pending('Año')); }
    else {
      var parts = [clean(b.carrera), clean(b.anio)].filter(Boolean);
      if (parts.length) meta.textContent = parts.join(' · ');
      else meta.appendChild(pending('Carrera y año'));
    }
    li.appendChild(meta);

    var url = sample ? '' : safeUrl(b.enlace);
    if (url) {
      var a = el('a', 'link-arrow');
      a.href = url;
      a.appendChild(el('span', null, 'Más información'));
      var arrow = el('span', 'arrow', '→'); arrow.setAttribute('aria-hidden', 'true');
      a.appendChild(arrow);
      a.setAttribute('aria-label', 'Más información sobre la beca de ' + clean(b.nombre));
      li.appendChild(a);
    }
    return li;
  }

  var ready = all.filter(publishable).sort(function (a, b) { return (Number(b.anio) || 0) - (Number(a.anio) || 0); });
  ready.forEach(function (b) { list.appendChild(card(b)); });

  if (!ready.length) {
    if (empty) empty.hidden = false;
    if (showPending) { for (var i = 0; i < 3; i++) list.appendChild(card(null)); }
  }
  if (!list.children.length) list.hidden = true;

  /* Aviso interno (solo con pendientes visibles): registros retenidos por falta de autorización */
  var held = all.length - ready.length;
  if (note && showPending && held > 0) {
    note.appendChild(pending(held === 1 ? '1 registro sin autorización: no se publica' : held + ' registros sin autorización: no se publican'));
    note.hidden = false;
  }
})();
