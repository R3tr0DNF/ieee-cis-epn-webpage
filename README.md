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
index.html                  todas las vistas: /, /capitulos, /eventos, /directiva, /contacto (<base href="/">)
404.html                    GitHub Pages: guarda la ruta pedida (/capitulos/cis…) y vuelve a /, donde router.js la restaura
CNAME                       dominio de GitHub Pages (ieee-epn.org)
robots.txt, sitemap.xml     SEO (PENDIENTE: dominio definitivo)
css/tokens.css              tokens: color (temas claro y oscuro), tipografía, espaciado, radios, movimiento, fuentes
css/base.css                reset, tipografía, foco, utilidades, etiqueta PENDIENTE
css/layout.css              meta-navegación IEEE, encabezado, navegación, páginas, pie
css/components.css          botones, visor (firma), módulos de capítulo, formulario, redes
css/pages.css               secciones de cada vista y responsive
js/config.js                configuración: pendientes visibles, fotos de la portada, formulario
js/data/chapters.js         DATOS de capítulos y grupos (único archivo a editar para esa sección)
js/chapters.js              plantilla única: tablero, índice de Inicio y opciones del formulario
js/data/becados.js          DATOS de becados (agregar un becado = agregar un objeto)
js/becados.js               plantilla única de becados: aplica las autorizaciones y el estado vacío
js/router.js                vistas por ruta (History API, sin #; acepta enlaces antiguos con #), título, descripción y canonical, encabezado (sólido / se oculta al bajar), menú móvil, botón de tema
js/hero.js                  fotos de la portada en bucle (carga de a una, pausa fuera de pantalla) y respaldo del efecto de scroll
js/form.js                  validación accesible y envío del formulario
assets/fonts/               Open Sans + IBM Plex Mono (OFL), alojadas en el sitio
assets/img/brand/           logos optimizados (WebP 1x/2x + PNG), IEEE Master Brand, favicon
assets/img/brand/source/    archivos originales de marca (PNG y SVG), no se cargan en la página
assets/img/chapters/        logos de capítulos (WebP 480/960 + PNG 480, recortados al contenido)
assets/img/directiva/       fotos de la directiva (WebP 480 × 600, 4:5)
assets/img/rama/            foto grupal de la rama en Inicio (2:1, WebP 800/1120 + JPG)
assets/img/globe-ecuador.svg  globo estático del pie (Natural Earth, dominio público)
assets/img/og-image.jpg     imagen al compartir el enlace
assets/img/eventos/         imágenes de los eventos destacados (4:5, WebP 480 y 960 px)
assets/img/portada/         fotos de la portada en bucle (16:9, WebP 960 y 1600 px)
```

## Tareas frecuentes

**Agregar o editar un capítulo.** En `js/data/chapters.js`, copia un objeto del arreglo `chapters` y cambia sus valores. El tablero, el índice de Inicio y el formulario se actualizan solos.

**Agregar un becado.** En `js/data/becados.js`, copia la PLANTILLA y completa `nombre`, `programa` (programa o beca IEEE), `anio`, `carrera`, y opcionalmente `foto` (WebP 4:5, 480 × 600 px, en `assets/img/becados/`) y `enlace` (https://). Solo se publica si `consentimiento.datos` es `true`; la foto, solo si además `consentimiento.foto` es `true`. Guarda la autorización firmada de cada persona.

**Logo de un capítulo.** Exporta el logo en WebP a 480 px y 960 px de ancho (y un PNG de 480 px), guárdalo en `assets/img/chapters/` y completa el campo `logo` (mira el de CIS como ejemplo). Usa `formato: 'ancho'` para logos apaisados y `'cuadrado'` para íconos.

**Agregar un evento destacado.** En `index.html`, sección `#eventos`, copia un `<li class="event">` y cambia fecha (`datetime` y texto), tipo, nombre, descripción corta, lugar, capítulo (enlace a `/capitulos/<id>`) y enlace a vTools o Instagram. Guarda la imagen en `assets/img/eventos/` en 4:5: `<nombre>-480.webp` (480 × 600) y `<nombre>-960.webp` (960 × 1200). Mantén el orden del más reciente al más antiguo. La ruta antigua `/iniciativas` redirige a `/eventos`.

**Fotos de la portada.** La portada muestra fotos que rotan en bucle (fundido y acercamiento lento), en lugar de video. La lista y el tiempo de cada foto están en `js/config.js → portada`. Cada foto va en `assets/img/portada/` en 16:9 y en dos tamaños: `<nombre>-1600.webp` (1600 × 900) y `<nombre>-960.webp` (960 × 540). La primera también está en `index.html` (`<img id="visor-poster">`) porque es el LCP; si cambias la primera, actualiza ahí la ruta. En escritorio la foto llena la portada; en celular o tablet en vertical se ve completa en una franja 16:9 bajo el encabezado, con el texto debajo. Con "reducir movimiento" o ahorro de datos queda fija la primera foto, y el carrusel se pausa fuera de pantalla o con la pestaña oculta.

Para preparar una foto nueva en 16:9 (ajusta el recorte `crop=ancho:alto:x:y` a la composición):

```bash
ffmpeg -i FOTO.jpg -vf "crop=1600:900:0:0,hqdn3d=1.5:1.5:2.5:2.5,scale=1600:900:flags=lanczos,unsharp=5:5:0.65:3:3:0" -c:v libwebp -quality 80 assets/img/portada/slide-15-1600.webp
ffmpeg -i assets/img/portada/slide-15-1600.webp -vf scale=960:-2 -c:v libwebp -quality 78 assets/img/portada/slide-15-960.webp
```

**Tema claro / oscuro.** La página siempre abre en claro (no se usa `prefers-color-scheme`); si el visitante elige oscuro con el botón del encabezado, se recuerda en `localStorage` (clave `ieee-epn-tema`). Los colores de cada tema están en `css/tokens.css` (`[data-theme="light"]` y `[data-theme="dark"]`): cambia ahí el token, no el componente. El script corto del `<head>` aplica el tema antes de pintar; no lo muevas debajo del CSS.

**Encabezado.** Se oculta al bajar y reaparece al subir (`js/router.js`, umbral de 10 px). Siempre visible en la portada o el encabezado de cada vista, con el menú abierto, con foco de teclado dentro y al navegar a una ancla.

**Pie de página.** Mide unos 400 px en escritorio. El tamaño del planeta y del arco de enlaces sale de tres variables en `.site-footer` (`--gr`, `--gx`, `--gap`, en `css/layout.css`). El degradado de transición es `.site-footer::before` y su alto es `--foot-fade` (`css/tokens.css`); la última sección de cada vista necesita al menos ese relleno inferior.

**Formulario.** Crea un formulario en un servicio que acepte `POST` con `FormData` (Formspree, Getform, Basin…) y pega su URL en `js/config.js → form.endpoint`. Sin endpoint, el envío abre el correo del visitante.

**Versión de CSS y JS.** Cloudflare indica a los navegadores guardar CSS y JS durante 4 horas. Cada vez que publiques cambios en `css/` o `js/`, cambia el valor `?v=` de los enlaces en `index.html` (por ejemplo `?v=20261113-1`) para que todos reciban la versión nueva al instante.

**Publicar.** Cambia `MOSTRAR_PENDIENTES` a `false` en `js/config.js`, completa el dominio en `robots.txt`, `sitemap.xml` y las etiquetas `og:` / `canonical` de `index.html`.

## Elementos obligatorios de IEEE (Brand Experience, Global Page Elements)

Meta-navegación (IEEE.org, IEEE *Xplore*®, IEEE Standards, IEEE Spectrum, More Sites · Join IEEE, Donate), identificador del sitio arriba a la izquierda, IEEE Master Brand arriba a la derecha (blanco o negro, ≥ 100 × 33 px, enlazado a ieee.org), y en el pie los enlaces Accessibility, Nondiscrimination Policy, IEEE Ethics Reporting, Terms & Disclosures, IEEE Privacy Policy, Sitemap con el texto de copyright de IEEE.

El informe completo de esta versión (pendientes, datos dudosos, pruebas y autoevaluación) está en `docs/REPORTE.md`.
