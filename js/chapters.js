/* ==========================================================
   IEEE Student Branch EPN — Plantilla única de capítulos
   Lee js/data/chapters.js y dibuja: el tablero (página Capítulos),
   el índice de Inicio y las opciones del formulario. No contiene datos.
   ========================================================== */
(function () {
  var D = window.IEEE_EPN || {};
  var chapters = D.chapters || [];
  var areas = D.areas || [];
  var tipos = D.tipos || {};
  var cfg = D.config || {};

  if (cfg.MOSTRAR_PENDIENTES !== false) document.documentElement.classList.add('show-pending');

  /* Marca de Instagram (Simple Icons, CC0) */
  var IG = 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function pending(text) { return el('span', 'pending', text || 'Pendiente'); }
  function handle(url) {
    var m = /instagram\.com\/([^/?#]+)/.exec(url || '');
    return m ? '@' + m[1] : url;
  }
  function byArea(id) { return chapters.filter(function (c) { return c.area === id; }); }
  function isWide(c) { return c.tipo === 'conjunto' || (c.logo && c.logo.formato === 'ancho'); }

  /* Conteos que se muestran en la página (siempre salen de la data) */
  var counts = {
    chapters: chapters.length,
    areas: areas.filter(function (a) { return byArea(a.id).length; }).length,
    joint: chapters.filter(function (c) { return c.tipo === 'conjunto'; }).length
  };
  document.querySelectorAll('[data-count]').forEach(function (n) {
    if (counts[n.dataset.count] != null) n.textContent = counts[n.dataset.count];
  });

  /* Un módulo del tablero */
  function moduleFor(c, i) {
    var art = el('article', 'module will-enter' + (isWide(c) ? ' is-wide' : ''));
    art.id = 'cap-' + c.id;
    art.style.setProperty('--i', i);
    art.setAttribute('aria-labelledby', 'cap-' + c.id + '-h');

    var top = el('div', 'module-top');
    top.appendChild(el('span', 'mono', tipos[c.tipo] || ''));
    art.appendChild(top);

    var logo = el('div', 'module-logo');
    if (c.logo) {
      var pic = document.createElement('picture');
      var s = document.createElement('source');
      s.type = 'image/webp';
      s.srcset = c.logo.src + ' 1x' + (c.logo.src2x ? ', ' + c.logo.src2x + ' 2x' : '');
      pic.appendChild(s);
      var img = el('img');
      img.src = c.logo.png || c.logo.src;
      img.alt = 'Logotipo del capítulo ' + c.siglas.join(', ') + ' de la EPN';
      img.width = c.logo.width; img.height = c.logo.height;
      img.loading = 'lazy'; img.decoding = 'async';
      pic.appendChild(img);
      logo.appendChild(pic);
    } else {
      logo.classList.add('is-missing');
      logo.appendChild(el('span', null, c.siglas.join(' · ')));
      logo.appendChild(pending('Logo pendiente'));
    }
    art.appendChild(logo);

    var h = el('h3');
    h.id = 'cap-' + c.id + '-h';
    c.siglas.forEach(function (s, k) {
      if (k) h.appendChild(el('span', 'sep', '/'));
      h.appendChild(document.createTextNode(s));
    });
    art.appendChild(h);

    var soc = el('ul', 'societies');
    soc.setAttribute('role', 'list');
    c.sociedades.forEach(function (s) { soc.appendChild(el('li', null, s)); });
    art.appendChild(soc);

    var p = el('p', 'scope');
    if (c.descripcion) p.textContent = c.descripcion;
    else {
      p.appendChild(el('b', null, 'Área IEEE: '));
      p.appendChild(document.createTextNode(c.alcance + ' '));
      p.appendChild(pending('Descripción del capítulo'));
    }
    art.appendChild(p);

    var port = el('div', 'module-port');
    if (c.instagram) {
      var a = el('a', 'ig-link');
      a.href = c.instagram;
      a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="' + IG + '"/></svg>';
      var t = el('span', null, handle(c.instagram));
      a.appendChild(t);
      a.setAttribute('aria-label', 'Instagram del capítulo ' + c.siglas.join(', ') + ': ' + handle(c.instagram));
      port.appendChild(a);
    } else {
      port.appendChild(pending('Instagram pendiente'));
    }
    art.appendChild(port);
    return art;
  }

  /* Tablero: un bloque por área, con jerarquía por tamaño de módulo */
  var board = document.getElementById('chapter-board');
  if (board) {
    var n = 0;
    areas.forEach(function (a, ai) {
      var list = byArea(a.id);
      if (!list.length) return;
      list.sort(function (x, y) { return isWide(y) - isWide(x); });
      var sec = el('section', 'area');
      sec.id = 'area-' + a.id;
      sec.setAttribute('aria-labelledby', 'area-' + a.id + '-h');
      var head = el('div', 'area-head');
      head.appendChild(el('span', 'mono', 'Área ' + (ai + 1) + ' de ' + counts.areas));
      var h2 = el('h2', null, a.titulo);
      h2.id = 'area-' + a.id + '-h';
      head.appendChild(h2);
      head.appendChild(el('p', null, list.length + (list.length === 1 ? ' capítulo o grupo' : ' capítulos y grupos')));
      sec.appendChild(head);
      var grid = el('div', 'modules');
      list.forEach(function (c) { grid.appendChild(moduleFor(c, n++ % 6)); });
      sec.appendChild(grid);
      board.appendChild(sec);
    });

    /* Entrada escalonada al aparecer (una vez). Sin IntersectionObserver o con
       movimiento reducido, los módulos se muestran de inmediato. */
    var mods = board.querySelectorAll('.module');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduce) {
      mods.forEach(function (m) { m.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -5% 0px' });
      mods.forEach(function (m) { io.observe(m); });
    }
  }

  /* Franja de logos de Inicio
     · Orden: el de las áreas (y dentro de cada área, el de la data).
     · Tamaño por ÁREA VISUAL EQUIVALENTE: cada logo ocupa la misma superficie, así un logo
       muy ancho (WIE, ComSoc) no domina y uno casi cuadrado (SIGHT) no se pierde.
       alto = --s / √proporción (en CSS); aquí solo se pasa la proporción --r = ancho / alto.
     · Versión blanca para el modo oscuro: mismo nombre con "-white" (cis-480.webp → cis-white-480.webp),
       o logo.blanco / logo.blanco2x en la data si se quiere otra ruta. */
  var index = document.getElementById('chapter-index');
  if (index) {
    var ordered = [];
    areas.forEach(function (a) { ordered = ordered.concat(byArea(a.id)); });
    chapters.forEach(function (c) { if (ordered.indexOf(c) < 0) ordered.push(c); });

    function logoImg(cls, src, src2x, c, alt) {
      var img = el('img', cls);
      img.src = src;
      if (src2x) img.srcset = src + ' 1x, ' + src2x + ' 2x';
      img.width = c.logo.width; img.height = c.logo.height;
      img.alt = alt; img.loading = 'lazy'; img.decoding = 'async';
      return img;
    }
    ordered.forEach(function (c, i) {
      var item = el('li', 'logo-item');
      item.style.setProperty('--i', i);
      var link = el('a', 'logo-link');
      link.href = '/capitulos/' + c.id;
      var name = c.siglas.join(' / ') + ': ' + c.sociedades.join(', ');
      if (c.logo) {
        item.style.setProperty('--r', (c.logo.width / c.logo.height).toFixed(3));
        var white = c.logo.blanco || c.logo.src.replace(/-(\d+)\.webp$/, '-white-$1.webp');
        var white2x = c.logo.blanco2x || (c.logo.src2x ? c.logo.src2x.replace(/-(\d+)\.webp$/, '-white-$1.webp') : '');
        link.appendChild(logoImg('logo-color', c.logo.src, c.logo.src2x, c, name));
        link.appendChild(logoImg('logo-white', white, white2x, c, ''));   // decorativa: el nombre ya está en la de color
      } else {
        link.classList.add('is-text');
        link.textContent = c.siglas.join(' / ');
        link.setAttribute('aria-label', name);
      }
      item.appendChild(link);
      index.appendChild(item);
    });

    stripScroller(document.getElementById('chapter-strip'));
  }

  /* Desplazamiento de la franja
     · Con mouse: al acercar el cursor a un extremo (zona de 18 % del ancho, mínimo 90 px) la franja
       avanza sola hacia ese lado; más rápido cuanto más cerca del borde. Al salir, se detiene.
     · Flechas a los lados para quien prefiera hacer clic; en pantallas táctiles se desliza con el dedo.
     · Con teclado, cada logo es un enlace: al enfocarlo el navegador lo trae a la vista.
     · Sin desbordamiento (pantallas muy anchas) los logos se centran y no hay flechas ni desplazamiento. */
  function stripScroller(strip) {
    if (!strip) return;
    var vp = strip.querySelector('.logo-viewport');
    var prev = strip.querySelector('.strip-nav.prev');
    var next = strip.querySelector('.strip-nav.next');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    var speed = 0, raf = 0;

    function update() {
      var max = vp.scrollWidth - vp.clientWidth;
      var over = max > 2;
      strip.classList.toggle('is-overflowing', over);
      strip.classList.toggle('at-start', !over || vp.scrollLeft <= 2);
      strip.classList.toggle('at-end', !over || vp.scrollLeft >= max - 2);
    }
    function loop() {
      if (!speed) { raf = 0; return; }
      vp.scrollLeft += speed;
      update();
      raf = requestAnimationFrame(loop);
    }
    function setSpeed(v) {
      speed = v;
      if (speed && !raf) raf = requestAnimationFrame(loop);
    }
    vp.addEventListener('mousemove', function (e) {
      if (!fine.matches || !strip.classList.contains('is-overflowing')) return;
      var r = vp.getBoundingClientRect();
      var zone = Math.max(90, r.width * 0.18);
      var x = e.clientX - r.left;
      var max = reduce.matches ? 6 : 14;                 // px por cuadro
      if (x < zone) setSpeed(-max * Math.pow(1 - x / zone, 1.5));
      else if (x > r.width - zone) setSpeed(max * Math.pow(1 - (r.width - x) / zone, 1.5));
      else setSpeed(0);
    });
    vp.addEventListener('mouseleave', function () { setSpeed(0); });
    vp.addEventListener('scroll', update, { passive: true });
    function page(dir) { vp.scrollBy({ left: dir * vp.clientWidth * 0.7, behavior: reduce.matches ? 'auto' : 'smooth' }); }
    prev.addEventListener('click', function () { page(-1); });
    next.addEventListener('click', function () { page(1); });
    window.addEventListener('resize', update);
    document.addEventListener('ieee:view', function () { requestAnimationFrame(update); });
    strip.querySelectorAll('img').forEach(function (img) { img.addEventListener('load', update); });
    update();

    /* "Se van mostrando": aparición escalonada al entrar en pantalla (sin efecto con movimiento reducido) */
    if ('IntersectionObserver' in window && !reduce.matches) {
      strip.classList.add('will-reveal');
      var io = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { strip.classList.add('is-revealed'); io.disconnect(); }
      }, { threshold: 0.2 });
      io.observe(strip);
    }
  }

  /* Opciones del formulario */
  var sel = document.getElementById('f-capitulo');
  if (sel) {
    chapters.forEach(function (c) {
      var o = el('option', null, c.siglas.join(' / '));
      o.value = c.siglas.join(' / ');
      sel.appendChild(o);
    });
  }
})();
