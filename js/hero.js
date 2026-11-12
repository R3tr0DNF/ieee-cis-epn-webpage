/* ==========================================================
   IEEE Student Branch EPN — Portada (visor)
   · Video de fondo (js/config.js): muted, loop, playsinline,
     autoplay y póster. Se agrega después del evento load, así no
     compite con el LCP (el LCP es el póster, que ya está en el HTML).
   · Sin botón de pausa. Para compensarlo:
       - con prefers-reduced-motion solo se ve el póster (el video
         ni se descarga; si la preferencia cambia, se aplica al vuelo);
       - se pausa cuando la portada casi no se ve o la pestaña está oculta;
       - con ahorro de datos (Save-Data) no se carga.
   · Respaldo del efecto de scroll para navegadores sin CSS
     scroll-driven animations: fija --p (0 → 1) con rAF pasivo.
   ========================================================== */
(function () {
  var D = window.IEEE_EPN || {};
  var cfg = (D.config && D.config.video) || {};
  var hero = document.getElementById('hero');
  if (!hero) return;
  var media = document.getElementById('visor-media');
  var posterImg = document.getElementById('visor-poster');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reducedData = window.matchMedia('(prefers-reduced-data: reduce)');
  var saveData = (navigator.connection && navigator.connection.saveData) || reducedData.matches;
  var video = null, inView = true, loaded = false;

  /* 1. Video */
  function canPlay() { return video && inView && !document.hidden && !reduce.matches; }
  function sync() {
    if (!video) return;
    if (canPlay()) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
    else video.pause();
  }
  function loadVideo() {
    if (video || reduce.matches) return;
    video = document.createElement('video');
    video.className = 'visor-video';
    video.muted = true; video.defaultMuted = true; video.loop = true; video.autoplay = true; video.playsInline = true;
    ['muted', 'loop', 'autoplay', 'playsinline'].forEach(function (a) { video.setAttribute(a, ''); });
    video.setAttribute('aria-hidden', 'true');
    video.setAttribute('tabindex', '-1');
    video.preload = 'auto';
    var poster = (posterImg && posterImg.currentSrc) || cfg.poster;   // la misma imagen ya descargada
    if (poster) video.poster = poster;
    [[cfg.webm, 'video/webm'], [cfg.mp4, 'video/mp4']].forEach(function (s) {
      if (!s[0]) return;
      var src = document.createElement('source'); src.src = s[0]; src.type = s[1]; video.appendChild(src);
    });
    video.addEventListener('playing', function () { hero.classList.add('has-video'); }, { once: true });
    video.addEventListener('error', function () { removeVideo(); }, true);   // queda el póster
    media.appendChild(video);
    sync();
  }
  function removeVideo() {
    if (!video) return;
    video.pause(); video.removeAttribute('src'); video.remove(); video = null;
    hero.classList.remove('has-video');
  }
  function start() {
    loaded = true;
    if (!(cfg.webm || cfg.mp4) || saveData || reduce.matches) return;
    ('requestIdleCallback' in window) ? requestIdleCallback(loadVideo, { timeout: 2000 }) : setTimeout(loadVideo, 300);
  }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });

  /* La preferencia de movimiento puede cambiar con la página abierta */
  var onReduce = function () { if (reduce.matches) removeVideo(); else if (loaded) start(); };
  if (reduce.addEventListener) reduce.addEventListener('change', onReduce); else if (reduce.addListener) reduce.addListener(onReduce);

  /* Pausa cuando la portada casi no se ve (el video ya se desvaneció),
     en otra vista (la portada queda oculta) o con la pestaña oculta */
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
