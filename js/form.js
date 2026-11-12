/* ==========================================================
   IEEE Student Branch EPN — Formulario de contacto
   · Valida al enviar: cada error bajo su campo (aria-invalid +
     aria-describedby) y un resumen con enlaces a los campos.
   · Con config.form.endpoint envía por fetch (FormData) y solo
     confirma si el servicio responde 2xx. Sin endpoint, abre el
     correo del visitante y lo dice tal cual.
   ========================================================== */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var cfg = ((window.IEEE_EPN || {}).config || {}).form || {};
  var summary = document.getElementById('form-summary');
  var status = document.getElementById('form-status');
  var submit = form.querySelector('[type="submit"]');

  var RULES = {
    'f-nombre':  function (v) { return v.trim().length >= 3 ? '' : 'Escribe tu nombre completo.'; },
    'f-correo':  function (v, el) { return el.validity.valid && v.trim() ? '' : 'Escribe un correo válido, por ejemplo nombre@epn.edu.ec.'; },
    'f-mensaje': function (v) { return v.trim().length >= 10 ? '' : 'Escribe un mensaje de al menos 10 caracteres.'; }
  };
  var LABELS = { 'f-nombre': 'Nombre completo', 'f-correo': 'Correo electrónico', 'f-mensaje': 'Mensaje' };

  function check(id) {
    var el = document.getElementById(id);
    var msg = RULES[id](el.value, el);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    document.getElementById(id + '-err').textContent = msg;
    return msg;
  }
  /* Revalida en vivo solo los campos que ya tienen error */
  Object.keys(RULES).forEach(function (id) {
    document.getElementById(id).addEventListener('input', function () {
      if (this.getAttribute('aria-invalid') === 'true') check(id);
    });
  });

  function showSummary(errors) {
    summary.innerHTML = '';
    if (!errors.length) { summary.hidden = true; return; }
    var p = document.createElement('p');
    p.textContent = errors.length === 1 ? 'Hay 1 campo por corregir:' : 'Hay ' + errors.length + ' campos por corregir:';
    var ul = document.createElement('ul');
    errors.forEach(function (e) {
      var li = document.createElement('li'), a = document.createElement('a');
      a.href = '#' + e.id; a.textContent = LABELS[e.id] + ': ' + e.msg;
      a.addEventListener('click', function (ev) { ev.preventDefault(); document.getElementById(e.id).focus(); });
      li.appendChild(a); ul.appendChild(li);
    });
    summary.appendChild(p); summary.appendChild(ul);
    summary.hidden = false;
    summary.focus();
  }

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var errors = [];
    Object.keys(RULES).forEach(function (id) { var m = check(id); if (m) errors.push({ id: id, msg: m }); });
    showSummary(errors);
    if (errors.length) { setStatus(''); return; }
    if (form._gotcha && form._gotcha.value) return;      // trampa para bots

    var data = new FormData(form);
    if (cfg.endpoint) {
      submit.disabled = true;
      setStatus('Enviando…');
      fetch(cfg.endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          setStatus('Mensaje enviado. Te responderemos al correo que dejaste.', 'ok');
        })
        .catch(function () {
          setStatus('No pudimos enviar el mensaje. Tu texto sigue aquí; inténtalo de nuevo o escribe a ' + cfg.email + '.', 'error');
        })
        .then(function () { submit.disabled = false; });
    } else {
      var body = 'Nombre: ' + data.get('nombre') + '\nCorreo: ' + data.get('correo') +
                 (data.get('capitulo') ? '\nCapítulo de interés: ' + data.get('capitulo') : '') + '\n\n' + data.get('mensaje');
      location.href = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent('Contacto desde el sitio de la rama') + '&body=' + encodeURIComponent(body);
      setStatus('Abrimos tu aplicación de correo con el mensaje listo. Si no se abrió, escribe a ' + cfg.email + '.');
    }
  });
})();
