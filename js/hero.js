/* ==========================================================
   IEEE Student Branch EPN — Portada (visor)
   · Fotos en bucle (js/config.js → portada): cada una se ve
     `intervalo` ms, con fundido cruzado y un acercamiento lento
     (CSS), para que la portada se sienta como un video.
   · La primera foto ya está en el HTML (es el LCP). Las demás se
     crean después del evento load y se descargan de a una: siempre
     solo la siguiente, para no gastar datos de golpe.
   · Sin botón de pausa. Para compensarlo:
       - con prefers-reduced-motion queda fija la primera foto
         (si la preferencia cambia, se aplica al vuelo);
       - se pausa cuando la portada casi no se ve, en otra vista o
         con la pestaña oculta;
       - con ahorro de datos (Save-Data) no se cargan más fotos.
   · Respaldo del efecto de scroll para navegadores sin CSS
     scroll-driven animations: fija --p (0 → 1) con rAF pasivo.
   ========================================================== */
(function () {
  var D = window.IEEE_EPN || {};
  var cfg = (D.config && D.config.portada) || {};
  var hero = document.getElementById('hero');
  if (!hero) return;
  var media = document.getElementById('visor-media');
  var first = document.getElementById('visor-poster');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reducedData = window.matchMedia('(prefers-reduced-data: reduce)');
  var saveData = (navigator.connection && navigator.connection.saveData) || reducedData.matches;
  var names = cfg.fotos || [];
  var every = Math.max(cfg.intervalo || 6000, 2500);
  var slides = first ? [first] : [];
  var current = 0, timer = null, inView = true, started = false;
  var BASE = 'assets/img/portada/';

  /* 1. Fotos en bucle */
  function make(i) {                      // crea (y empieza a descargar) la foto i
    if (slides[i]) return slides[i];
    var img = document.createElement('img');
    img.className = 'visor-slide';
    img.alt = ''; img.decoding = 'async';
    img.width = 1600; img.height = 900;
    img.sizes = '100vw';
    img.srcset = BASE + names[i] + '-960.webp 960w, ' + BASE + names[i] + '-1600.webp 1600w';
    img.src = BASE + names[i] + '-1600.webp';
    media.appendChild(img);
    slides[i] = img;
    return img;
  }
  function ready(img) { return img.complete && img.naturalWidth > 0; }
  function canRun() { return started && names.length > 1 && inView && !document.hidden && !reduce.matches && !saveData; }
  function step() {
    timer = null;
    if (!canRun()) return;
    var next = (current + 1) % names.length;
    var img = make(next);
    if (!ready(img)) {                    // aún descargando: espera sin saltarse la foto
      img.addEventListener('load', schedule, { once: true });
      img.addEventListener('error', function () { names.splice(next, 1); slides.splice(next, 1); schedule(); }, { once: true });
      return;
    }
    slides[current].classList.remove('is-on');
    img.classList.add('is-on');
    current = next;
    make((current + 1) % names.length);   // descarga la siguiente mientras se ve esta
    schedule();
  }
  function schedule() {
    if (timer || !canRun()) return;
    timer = setTimeout(step, every);
  }
  function sync() {
    if (canRun()) { hero.classList.remove('is-paused'); schedule(); }
    else { clearTimeout(timer); timer = null; hero.classList.add('is-paused'); }
  }
  function start() {
    started = true;
    if (canRun()) make(1);
    sync();
  }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });

  /* La preferencia de movimiento puede cambiar con la página abierta: con "reducir", vuelve a la primera foto */
  var onReduce = function () {
    if (reduce.matches && slides[current] && current !== 0) { slides[current].classList.remove('is-on'); slides[0].classList.add('is-on'); current = 0; }
    sync();
  };
  if (reduce.addEventListener) reduce.addEventListener('change', onReduce); else if (reduce.addListener) reduce.addListener(onReduce);

  /* Pausa cuando la portada casi no se ve, en otra vista (la portada queda oculta) o con la pestaña oculta */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      inView = e[0].isIntersecting && e[0].intersectionRatio >= 0.25;
      sync();
    }, { threshold: [0, 0.25] }).observe(hero);
  }
  document.addEventListener('visibilitychange', sync);

  /* 2. Respaldo del efecto de scroll */
  var supportsSDA = window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()');
  if (!supportsSDA) {
    document.documentElement.classList.add('no-sda');
    var ticking = false;
    var update = function () {
      ticking = false;
      if (reduce.matches || !hero.offsetParent) { hero.style.setProperty('--p', 0); return; }
      var p = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.85), 0), 1);
      hero.style.setProperty('--p', p.toFixed(3));
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    document.addEventListener('ieee:view', update);
    update();
  }
})();
