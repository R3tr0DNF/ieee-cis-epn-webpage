# IEEE Student Branch EPN — Sitio web

Sitio oficial de la Rama Estudiantil IEEE de la Escuela Politécnica Nacional (Quito, Ecuador).
HTML, CSS y JavaScript sin framework ni compilación. Concepto visual: **"Visor"**.

## Ejecutar

```bash
cd ieee-cis-epn-webpage
python3 -m http.server 8000        # abrir http://localhost:8000
```

Las vistas usan rutas limpias sin `#` (`/capitulos`, `/directiva`…), así que el sitio se abre desde la raíz de un servidor, no con doble clic en `index.html`. En local, recargar una ruta interna da 404 (el servidor de Python no usa `404.html`): entra por `/` y navega.

## Estructura

```
index.html                  todas las vistas: /, /capitulos, /iniciativas, /directiva, /contacto (<base href="/">)
404.html                    GitHub Pages: guarda la ruta pedida (/capitulos/cis…) y vuelve a /, donde router.js la restaura
CNAME                       dominio de GitHub Pages (ieee-epn.org)
robots.txt, sitemap.xml     SEO (PENDIENTE: dominio definitivo)
css/tokens.css              tokens: color (temas claro y oscuro), tipografía, espaciado, radios, movimiento, fuentes
css/base.css                reset, tipografía, foco, utilidades, etiqueta PENDIENTE
css/layout.css              meta-navegación IEEE, encabezado, navegación, páginas, pie
css/components.css          botones, visor (firma), módulos de capítulo, formulario, redes
css/pages.css               secciones de cada vista y responsive
js/config.js                configuración: pendientes visibles, video de la portada, formulario
js/data/chapters.js         DATOS de capítulos y grupos (único archivo a editar para esa sección)
js/chapters.js              plantilla única: tablero, índice de Inicio y opciones del formulario
js/data/becados.js          DATOS de becados (agregar un becado = agregar un objeto)
js/becados.js               plantilla única de becados: aplica las autorizaciones y el estado vacío
js/router.js                vistas por ruta (History API, sin #; acepta enlaces antiguos con #), título, descripción y canonical, encabezado (sólido / se oculta al bajar), menú móvil, botón de tema
js/hero.js                  video de fondo (carga diferida, pausa fuera de pantalla) y respaldo del efecto de scroll
js/form.js                  validación accesible y envío del formulario
assets/fonts/               Open Sans + IBM Plex Mono (OFL), alojadas en el sitio
assets/img/brand/           logos optimizados (WebP 1x/2x + PNG), IEEE Master Brand, favicon
assets/img/brand/source/    archivos originales de marca (PNG y SVG), no se cargan en la página
assets/img/chapters/        logos de capítulos (WebP 480/960 + PNG 480, recortados al contenido)
assets/img/directiva/       fotos de la directiva (WebP 480 × 600, 4:5)
assets/img/rama/            foto grupal de la rama en Inicio (2:1, WebP 800/1120 + JPG)
assets/img/globe-ecuador.svg  globo estático del pie (Natural Earth, dominio público)
assets/img/og-image.jpg     imagen al compartir el enlace
assets/video/               video de la portada (vid1.mp4) y sus pósters WebP de 960 y 1920 px
```

## Tareas frecuentes

**Agregar o editar un capítulo.** En `js/data/chapters.js`, copia un objeto del arreglo `chapters` y cambia sus valores. El tablero, el índice de Inicio y el formulario se actualizan solos.

**Agregar un becado.** En `js/data/becados.js`, copia la PLANTILLA y completa `nombre`, `programa` (programa o beca IEEE), `anio`, `carrera`, y opcionalmente `foto` (WebP 4:5, 480 × 600 px, en `assets/img/becados/`) y `enlace` (https://). Solo se publica si `consentimiento.datos` es `true`; la foto, solo si además `consentimiento.foto` es `true`. Guarda la autorización firmada de cada persona.

**Logo de un capítulo.** Exporta el logo en WebP a 480 px y 960 px de ancho (y un PNG de 480 px), guárdalo en `assets/img/chapters/` y completa el campo `logo` (mira el de CIS como ejemplo). Usa `formato: 'ancho'` para logos apaisados y `'cuadrado'` para íconos.

**Video de la portada.** Fondo en bucle, sin sonido y sin botón de pausa. Se carga después de la página (el LCP es el póster, que ya está en el HTML), se pausa cuando la portada casi no se ve, en otra vista o con la pestaña oculta, y no se carga con movimiento reducido (solo póster) ni con ahorro de datos. Hoy `assets/video/vid1.mp4` pesa 27,9 MB (4K, 17 Mbps) y trae una pista de audio vacía: **conviene optimizarlo** (objetivo < 3 MB). Comandos sugeridos (no se ejecutaron):

```bash
# MP4 H.264 1080p sin audio (compatible con todo)
ffmpeg -i assets/video/vid1.mp4 -an -vf "scale=1920:-2,fps=25" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart assets/video/vid1-1080.mp4
# Si aún pesa más de 3 MB: 720p
ffmpeg -i assets/video/vid1.mp4 -an -vf "scale=1280:-2,fps=25" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart assets/video/vid1-720.mp4
# Opcional, WebM VP9 (más liviano en Chrome/Firefox/Edge)
ffmpeg -i assets/video/vid1.mp4 -an -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 assets/video/vid1.webm
```

Luego escribe las rutas nuevas en `js/config.js → video` (`webm` va primero si existe). Si cambias de video, regenera los pósters (primer cuadro) con los mismos nombres:

```bash
ffmpeg -i NUEVO.mp4 -frames:v 1 -vf scale=960:-2  -quality 62 assets/video/vid1-poster-960.webp
ffmpeg -i NUEVO.mp4 -frames:v 1 -vf scale=1920:-2 -quality 58 assets/video/vid1-poster-1920.webp
```

**Tema claro / oscuro.** La página siempre abre en claro (no se usa `prefers-color-scheme`); si el visitante elige oscuro con el botón del encabezado, se recuerda en `localStorage` (clave `ieee-epn-tema`). Los colores de cada tema están en `css/tokens.css` (`[data-theme="light"]` y `[data-theme="dark"]`): cambia ahí el token, no el componente. El script corto del `<head>` aplica el tema antes de pintar; no lo muevas debajo del CSS.

**Encabezado.** Se oculta al bajar y reaparece al subir (`js/router.js`, umbral de 10 px). Siempre visible en la portada o el encabezado de cada vista, con el menú abierto, con foco de teclado dentro y al navegar a una ancla.

**Pie de página.** Mide unos 400 px en escritorio. El tamaño del planeta y del arco de enlaces sale de tres variables en `.site-footer` (`--gr`, `--gx`, `--gap`, en `css/layout.css`). El degradado de transición es `.site-footer::before` y su alto es `--foot-fade` (`css/tokens.css`); la última sección de cada vista necesita al menos ese relleno inferior.

**Formulario.** Crea un formulario en un servicio que acepte `POST` con `FormData` (Formspree, Getform, Basin…) y pega su URL en `js/config.js → form.endpoint`. Sin endpoint, el envío abre el correo del visitante.

**Publicar.** Cambia `MOSTRAR_PENDIENTES` a `false` en `js/config.js`, completa el dominio en `robots.txt`, `sitemap.xml` y las etiquetas `og:` / `canonical` de `index.html`.

## Elementos obligatorios de IEEE (Brand Experience, Global Page Elements)

Meta-navegación (IEEE.org, IEEE *Xplore*®, IEEE Standards, IEEE Spectrum, More Sites · Join IEEE, Donate), identificador del sitio arriba a la izquierda, IEEE Master Brand arriba a la derecha (blanco o negro, ≥ 100 × 33 px, enlazado a ieee.org), y en el pie los enlaces Accessibility, Nondiscrimination Policy, IEEE Ethics Reporting, Terms & Disclosures, IEEE Privacy Policy, Sitemap con el texto de copyright de IEEE.

El informe completo de esta versión (pendientes, datos dudosos, pruebas y autoevaluación) está en `docs/REPORTE.md`.
