/* ==========================================================
   IEEE Student Branch EPN — Portada (hero)
   1. Video de fondo opcional (se activa con data-video-* en
      <div id="hero-media">). Mientras no exista, se dibuja un
      fondo provisional en canvas: ondas de señal y una malla.
   2. Desvanecimiento progresivo de la portada al hacer scroll.
   3. Botón para pausar el movimiento (WCAG 2.2.2) y respeto a
      prefers-reduced-motion.
   ========================================================== */
(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;

  var media = document.getElementById('hero-media');
  var canvas = document.getElementById('hero-canvas');
  var btn = document.getElementById('motion');
  var home = document.getElementById('inicio');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var paused = reduce.matches;
  var inView = true;
  var video = null;

  /* ---------- 1a. Video (si está configurado) ---------- */
  var mp4 = media && media.dataset.videoMp4;
  var webm = media && media.dataset.videoWebm;
  var poster = media && media.dataset.videoPoster;
  var smallScreen = window.matchMedia('(max-width: 640px)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;

  if ((mp4 || webm) && !saveData && !(smallScreen && media.dataset.videoMobile === 'false')) {
    video = document.createElement('video');
    video.className = 'hero-video';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('aria-hidden', 'true');
    video.preload = 'metadata';
    if (poster) video.poster = poster;
    if (webm) { var s1 = document.createElement('source'); s1.src = webm; s1.type = 'video/webm'; video.appendChild(s1); }
    if (mp4) { var s2 = document.createElement('source'); s2.src = mp4; s2.type = 'video/mp4'; video.appendChild(s2); }
    video.addEventListener('loadeddata', function () {
      hero.classList.add('has-video');   // el CSS funde el video sobre el canvas
      stopCanvas();
    });
    video.addEventListener('error', function () { video.remove(); video = null; }, true);
    media.appendChild(video);
    if (!paused) video.play().catch(function () {});
  }

  /* ---------- 1b. Fondo provisional en canvas ---------- */
  var ctx = canvas && canvas.getContext('2d');
  var W = 0, H = 0, t = 0, raf = 0, last = 0;
  var WAVES = [
    { amp: .10, freq: 1.6, speed: .22, y: .62, color: '0,181,226', w: 1.6, a: .55 },
    { amp: .07, freq: 2.4, speed: -.16, y: .66, color: '0,98,155', w: 1.2, a: .7 },
    { amp: .05, freq: 3.6, speed: .30, y: .70, color: '232,119,34', w: 1.1, a: .45 },
    { amp: .12, freq: 1.1, speed: -.10, y: .58, color: '255,255,255', w: .8, a: .18 }
  ];

  function resize() {
    if (!canvas) return false;
    var r = hero.getBoundingClientRect();
    if (!r.width) return false;
    if (r.width === W && r.height === H) return true;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return true;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Malla en perspectiva (horizonte) */
    var hz = H * .56;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,181,226,.10)';
    ctx.beginPath();
    for (var k = -12; k <= 12; k++) {
      ctx.moveTo(W / 2 + k * 18, hz);
      ctx.lineTo(W / 2 + k * W * .12, H);
    }
    var off = (t * 24) % 40;
    for (var j = 0; j < 14; j++) {
      var p = (j * 40 + off) / 560;
      var y = hz + (H - hz) * p * p;
      ctx.moveTo(0, y); ctx.lineTo(W, y);
    }
    ctx.stroke();

    /* Ondas de señal */
    for (var i = 0; i < WAVES.length; i++) {
      var w = WAVES[i];
      ctx.beginPath();
      ctx.lineWidth = w.w;
      ctx.strokeStyle = 'rgba(' + w.color + ',' + w.a + ')';
      for (var x = 0; x <= W; x += 6) {
        var u = x / W;
        var env = Math.sin(Math.PI * u);                        // atenúa en los bordes
        var yy = H * w.y + Math.sin(u * w.freq * 6.283 + t * w.speed * 6.283) * H * w.amp * env
               + Math.sin(u * w.freq * 13.1 - t * .7) * H * .012;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }

    /* Pulsos que viajan por la onda principal */
    var m = WAVES[0];
    for (var q = 0; q < 3; q++) {
      var uu = ((t * .06 + q / 3) % 1);
      var xx = uu * W;
      var env2 = Math.sin(Math.PI * uu);
      var y2 = H * m.y + Math.sin(uu * m.freq * 6.283 + t * m.speed * 6.283) * H * m.amp * env2
             + Math.sin(uu * m.freq * 13.1 - t * .7) * H * .012;
      var g = ctx.createRadialGradient(xx, y2, 0, xx, y2, 18);
      g.addColorStop(0, 'rgba(0,181,226,' + (.9 * env2) + ')');
      g.addColorStop(1, 'rgba(0,181,226,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(xx, y2, 18, 0, 6.283); ctx.fill();
    }
  }

  function frame(now) {
    raf = 0;
    if (!resize()) return;
    var dt = last ? Math.min((now - last) / 1000, .05) : 0;
    last = now;
    t += dt;
    draw();
    if (!paused && inView && !hero.classList.contains('has-video')) raf = requestAnimationFrame(frame);
  }
  function startCanvas() {
    if (!ctx || hero.classList.contains('has-video')) return;
    if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
  }
  function stopCanvas() { if (raf) cancelAnimationFrame(raf); raf = 0; }
  function renderStill() { if (ctx && resize()) draw(); }

  /* ---------- 3. Pausa / reanudación ---------- */
  function setPaused(p) {
    paused = p;
    hero.classList.toggle('paused', p);
    if (btn) {
      btn.setAttribute('aria-pressed', p ? 'true' : 'false');
      btn.setAttribute('aria-label', p ? 'Reanudar animación de fondo' : 'Pausar animación de fondo');
      btn.title = p ? 'Reanudar animación' : 'Pausar animación';
    }
    if (video) { if (p) video.pause(); else video.play().catch(function () {}); }
    if (p) { stopCanvas(); renderStill(); } else startCanvas();
  }
  if (btn) btn.addEventListener('click', function () { setPaused(!paused); });
  if (reduce.addEventListener) reduce.addEventListener('change', function (e) { setPaused(e.matches); });

  /* ---------- 2. Desvanecimiento al hacer scroll ---------- */
  var ticking = false;
  function progress() {
    ticking = false;
    if (!home.classList.contains('active')) return;
    var h = hero.offsetHeight || 1;
    var p = Math.min(Math.max(window.scrollY / (h * .85), 0), 1);
    hero.style.setProperty('--p', p.toFixed(4));
    var gone = p >= 1;
    hero.classList.toggle('is-gone', gone);
    var was = inView;
    inView = !gone;
    if (inView && !was && !paused) startCanvas();
    if (!inView) { stopCanvas(); if (video && !video.paused) video.pause(); }
    else if (video && !paused && video.paused) video.play().catch(function () {});
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(progress); }
  }, { passive: true });
  window.addEventListener('resize', function () { W = H = 0; if (paused) renderStill(); progress(); });

  /* Al volver a la pestaña Inicio (script.js emite este evento) */
  document.addEventListener('ieee:tab', function (e) {
    if (e.detail === 'inicio') { W = H = 0; progress(); if (paused) renderStill(); else startCanvas(); }
    else stopCanvas();
  });
  /* No gastar batería con la pestaña del navegador oculta */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stopCanvas(); if (video) video.pause(); }
    else if (!paused && inView) { startCanvas(); if (video) video.play().catch(function () {}); }
  });

  setPaused(paused);
  progress();
})();
