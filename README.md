# IEEE Student Branch EPN — Sitio web

Sitio oficial de la Rama Estudiantil IEEE de la Escuela Politécnica Nacional (Quito, Ecuador).
HTML, CSS y JavaScript sin framework ni compilación. Concepto visual: **"Visor"**.

## Ejecutar

```bash
cd ieee-cis-epn-webpage
python3 -m http.server 8000        # abrir http://localhost:8000
```

Las vistas usan rutas limpias sin `#` (`/capitulos`, `/directiva`…), así que el sitio se abre desde la raíz de un servidor, no con doble clic en `index.html`. En local, recargar una ruta interna da 404 (el servidor de Python no usa `404.html` ni sirve `capitulos.html` en `/capitulos`): entra por `/` y navega.

## Estructura

```
index.html                  todas las vistas: /, /capitulos, /eventos, /directiva, /contacto y /desarrolladores (solo desde el pie) (<base href="/">); CSP en <meta>
capitulos.html, eventos.html, directiva.html, contacto.html, desarrolladores.html
                            copias de index.html para buscadores (GENERADAS: no se editan a mano, ver "SEO de las vistas internas")
scripts/generar-paginas.py  genera esas copias y sitemap.xml a partir de index.html (no se publica)
entregables/                memoria técnica en PDF (no se publica)
404.html                    GitHub Pages: guarda la ruta pedida (/capitulos/cis…) y vuelve a /, donde router.js la restaura
CNAME                       dominio de GitHub Pages (ieee-epn.org)
_config.yml                 Jekyll de GitHub Pages: deja fuera de la publicación README.md, el análisis .md, .claude/, scripts/ y entregables/
robots.txt, sitemap.xml     SEO (el sitemap lo genera scripts/generar-paginas.py)
css/tokens.css              tokens: color (temas claro y oscuro), tipografía, espaciado, radios, movimiento, fuentes
css/base.css                reset, tipografía, foco, utilidades, etiqueta PENDIENTE
css/layout.css              meta-navegación IEEE, encabezado, navegación, páginas, pie
css/components.css          botones, visor (firma), módulos de capítulo, formulario, redes
css/pages.css               secciones de cada vista y responsive
js/config.js                configuración: pendientes visibles, fotos de la portada, formulario
js/data/chapters.js         DATOS de capítulos y grupos (único archivo a editar para esa sección)
js/chapters.js              plantilla única: tablero, índice de Inicio y opciones del formulario
js/data/becados.js          DATOS de las becas IEEE: un objeto por congreso, con sus becados (fuente: LACAP 2026.docx)
js/becados.js               vitrina "Becados" de Inicio: línea de tiempo (pestañas ARIA) + panel con foto y nombres
js/router.js                vistas por ruta (History API, sin #; acepta enlaces antiguos con #), título, descripción y canonical, encabezado (sólido / se oculta al bajar), menú móvil, botón de tema
js/hero.js                  fotos de la portada en bucle (carga de a una, pausa fuera de pantalla) y respaldo del efecto de scroll
js/form.js                  validación accesible y envío del formulario
assets/fonts/               Open Sans + IBM Plex Mono (OFL), alojadas en el sitio
assets/img/brand/           logos optimizados (WebP 1x/2x + PNG), IEEE Master Brand, favicon
assets/img/brand/source/    archivos originales de marca (PNG y SVG), no se cargan en la página
assets/img/chapters/        logos de capítulos (WebP 480/960 + PNG 480, recortados al contenido)
assets/img/directiva/       fotos de la directiva (WebP 480 × 600, 4:5)
assets/img/becados/         foto de cada congreso con becados (16:10, WebP 640 y 960 px; solo recorte, sin edición)
assets/img/rama/            foto grupal de la rama (2:1, WebP 800/1120 + JPG). Sin uso desde que Inicio muestra los becados; se conserva
assets/img/globe-ecuador.svg  globo estático del pie (Natural Earth, dominio público)
assets/img/og-image.jpg     imagen al compartir el enlace
assets/img/desarrolladores/ fotos de los desarrolladores del sitio (4:5, fondo transparente, WebP 480 y 720 px)
assets/img/eventos/         imágenes de los eventos destacados (4:5, WebP 480 y 960 px)
assets/img/portada/         fotos de la portada en bucle (16:9, WebP 640, 960, 1200 y 1600 px)
```

## Tareas frecuentes

**Agregar o editar un capítulo.** En `js/data/chapters.js`, copia un objeto del arreglo `chapters` y cambia sus valores. El tablero, el índice de Inicio y el formulario se actualizan solos. El conteo oficial (12 capítulos técnicos, 2 councils y 2 grupos de afinidad) también sale de ahí: cada sociedad de un capítulo cuenta como capítulo técnico, salvo las que llevan «Council» en el nombre (RFID, TEC), y los recuadros de tipo `afinidad` o `sight` (WIE, SIGHT) cuentan como grupos de afinidad. No uses el término «grupos técnicos».

**Becados (Inicio).** La sección "01 · Becados" de Inicio la dibuja `js/becados.js` desde `js/data/becados.js`. Cada objeto es un congreso: `id`, `siglas`, `nombre`, `inicio` (AAAA-MM-DD, ordena del más reciente al más antiguo), `fechas` (texto), `lugar`, `organiza`, `capitulo` (id de `js/data/chapters.js`, opcional), `nota` (opcional), `foto` (`src` sin sufijo + `alt`) y `becados` (lista de nombres). Para agregar uno, copia un objeto y pon `publicar: true`. Un nombre incompleto se escribe como `{ nombre: 'Carlos', pendiente: 'apellido' }` y no se publica mientras `MOSTRAR_PENDIENTES` sea `false`. Las cifras de la cabecera (becas, estudiantes distintos y congresos) se calculan solas. La foto va en `assets/img/becados/<id>-640.webp` y `-960.webp`, en 16:10. Publica solo nombres de personas que aceptaron aparecer en el sitio; la rama guarda esa autorización.

**Franja de logos de Inicio.** La sección "Capítulos y grupos" de Inicio muestra los logos a lo ancho (la dibuja `js/chapters.js`). Cada logo ocupa la misma área visual (`--s` en `css/pages.css`: 104 px en escritorio, 72 px en celular; alto = `--s ÷ √(ancho/alto)`), así ninguno domina. Si no caben, la franja se recorre acercando el cursor a un extremo, con las flechas o deslizando en celular. En modo oscuro se usa la versión blanca de cada logo: mismo nombre con `-white` (`cis-white-480.webp`, `cis-white-960.webp`).

**Recuadros de capítulos.** En `/capitulos`, todo el recuadro de un capítulo lleva a su Instagram (campo `instagram` de `js/data/chapters.js`, solo `https://`). No hay un segundo enlace: el enlace visible del pie del recuadro se extiende con su `::after` (`.module.is-link` en `css/components.css`), así el destino es el mismo, hay una sola parada de tabulador y no hace falta JavaScript de clic. No agregues otros enlaces o botones dentro del recuadro: quedarían tapados por esa capa.

**Enlaces externos.** Todo enlace a otro sitio abre en pestaña nueva y no puede tocar esta página: `target="_blank" rel="noopener noreferrer" aria-describedby="nueva-pestana"` (el último avisa a los lectores de pantalla con el texto oculto `#nueva-pestana` del final de `index.html`). Los enlaces internos (`/capitulos`, `#contenido`…) y `mailto:` no llevan `target`.

**Logo de un capítulo.** Exporta el logo en WebP a 480 px y 960 px de ancho (y un PNG de 480 px), guárdalo en `assets/img/chapters/` y completa el campo `logo` (mira el de CIS como ejemplo). Usa `formato: 'ancho'` para logos apaisados y `'cuadrado'` para íconos.

**Desarrolladores oficiales.** Página `/desarrolladores` (sección `#desarrolladores` de `index.html`). No aparece en el menú: solo se llega desde el enlace "Desarrolladores oficiales" del pie, junto a Sitemap, y conserva el encabezado y el menú del sitio.

**Agregar un evento destacado.** En `index.html`, sección `#eventos`, copia un `<li class="event">` y cambia fecha (`datetime` y texto), tipo, nombre, descripción corta, lugar, capítulo (enlace a `/capitulos/<id>`) y enlace a vTools o Instagram. Guarda la imagen en `assets/img/eventos/` en 4:5: `<nombre>-480.webp` (480 × 600) y `<nombre>-960.webp` (960 × 1200). El orden lo decide la rama (hoy el MTT-S BPC Workshop va al centro); si queda una tarjeta sola en la última fila, se centra sola. La ruta antigua `/iniciativas` redirige a `/eventos`.

**Tarjetas de eventos.** Toda la tarjeta (imagen incluida) abre el enlace del evento, el `a.link-arrow` del final ("Ver en vTools / Instagram"), en pestaña nueva. Usa el mismo patrón que los capítulos: el `::after` de ese enlace cubre la tarjeta (`.event` en `css/components.css`), sin JavaScript. La píldora del capítulo (`a.event-chapter`) queda por encima de esa capa y sigue llevando a `/capitulos/<id>` en la misma pestaña. Cada tarjeta tiene, por tanto, dos paradas de tabulador: capítulo y evento. Si agregas otro enlace o botón dentro de la tarjeta, dale `position: relative; z-index: 2` o quedará tapado.

**Fotos de la portada.** La portada muestra fotos que rotan en bucle (fundido y acercamiento lento), en lugar de video. La lista y el tiempo de cada foto están en `js/config.js → portada`. Cada foto va en `assets/img/portada/` en 16:9 y en cuatro tamaños: `<nombre>-640.webp`, `-960.webp`, `-1200.webp` y `-1600.webp` (el navegador elige según la pantalla). La primera también está en `index.html` (`<img id="visor-poster">`, con su `srcset`) porque es el LCP; si cambias la primera, actualiza ahí las rutas. Si falta un archivo, esa foto se salta (con un 404 en la consola). En escritorio la foto llena la portada; en celular o tablet en vertical se ve completa en una franja 16:9 bajo el encabezado, con el texto debajo. No hay botón de pausa (decisión de diseño de la rama). Con "reducir movimiento" o ahorro de datos queda fija la primera foto, y el carrusel se pausa fuera de pantalla o con la pestaña oculta.

Para preparar una foto nueva en 16:9 (ajusta el recorte `crop=ancho:alto:x:y` a la composición):

```bash
ffmpeg -i FOTO.jpg -vf "crop=1600:900:0:0,hqdn3d=1.5:1.5:2.5:2.5,scale=1600:900:flags=lanczos,unsharp=5:5:0.65:3:3:0" -c:v libwebp -quality 80 assets/img/portada/slide-15-1600.webp
for w in 1200 960 640; do ffmpeg -i assets/img/portada/slide-15-1600.webp -vf scale=$w:-2:flags=lanczos -c:v libwebp -quality 80 assets/img/portada/slide-15-$w.webp; done
```

Las fotos verticales se adaptan solo con recorte, encuadre o escala, sin alterar a las personas. Si un recorte 16:9 cortaría a alguien, los costados se completan con un desenfoque de la misma foto, tomado solo de franjas sin personas.

**Tema claro / oscuro.** La página siempre abre en claro (no se usa `prefers-color-scheme`); si el visitante elige oscuro con el botón del encabezado, se recuerda en `localStorage` (clave `ieee-epn-tema`). Los colores de cada tema están en `css/tokens.css` (`[data-theme="light"]` y `[data-theme="dark"]`): cambia ahí el token, no el componente. El script corto del `<head>` aplica el tema antes de pintar; no lo muevas debajo del CSS.

**Encabezado.** Se oculta al bajar y reaparece al subir (`js/router.js`, umbral de 10 px). Siempre visible en la portada o el encabezado de cada vista, con el menú abierto, con foco de teclado dentro y al navegar a una ancla.

**Pie de página.** Mide unos 400 px en escritorio. El tamaño del planeta y del arco de enlaces sale de tres variables en `.site-footer` (`--gr`, `--gx`, `--gap`, en `css/layout.css`). El degradado de transición es `.site-footer::before` y su alto es `--foot-fade` (`css/tokens.css`); la última sección de cada vista necesita al menos ese relleno inferior.

**Marcador de Quito en el planeta.** El punto y la etiqueta "Escuela Politécnica Nacional · Quito" forman un solo enlace (`a.globe-pin`, al final del pie en `index.html`) a la ubicación de la EPN en Google Maps, y se abre en una pestaña nueva. El planeta y el arco de enlaces no reciben clics (`pointer-events: none`), así que solo el marcador y los enlaces responden. `.foot-hero` usa `overflow: clip` para que enfocar el marcador no desplace el pie hacia un lado. Para cambiar el destino, edita el `href` de `a.globe-pin`.

**Formulario.** Crea un formulario en un servicio que acepte `POST` con `FormData` (Formspree, Getform, Basin…) y pega su URL en `js/config.js → form.endpoint`. Sin endpoint, el envío abre el correo del visitante.

**Versión de CSS y JS.** Cloudflare indica a los navegadores guardar CSS, JS e imágenes durante 4 horas. Cada vez que publiques cambios en `css/` o `js/`, cambia el valor `?v=` de los enlaces en `index.html` (por ejemplo `?v=20261116-2`) para que todos reciban la versión nueva al instante. Si reemplazas una imagen con el mismo nombre, purga esa URL en Cloudflare (Caching → Configuration → Custom Purge) o cámbiale el nombre.

**Publicar.** Revisa que `MOSTRAR_PENDIENTES` siga en `false` en `js/config.js` y que el `?v=` haya cambiado.

## Seguridad y despliegue

GitHub Pages no permite cabeceras HTTP propias. Por eso hay dos capas:

**En el código (ya implementado).**
- `Content-Security-Policy` en `<meta>` de `index.html` y `404.html`: solo recursos del mismo sitio, sin `eval` y sin `<object>` ni `<iframe>`. Los `<script>` en línea se autorizan por su hash SHA-256: **si cambias una sola letra de esos scripts, el navegador los bloquea** (el error de la consola muestra el hash nuevo). Para recalcularlos, guarda esto como `csp_hash.py` fuera del repositorio y ejecútalo desde la carpeta del sitio:

  ```python
  import re, hashlib, base64
  for f in ('index.html', '404.html'):
      html = re.sub(r'<!--.*?-->', '', open(f, encoding='utf-8').read().replace('\r\n', '\n'), flags=re.S)
      for s in re.findall(r'<script>(.*?)</script>', html, re.S):
          print(f, "'sha256-" + base64.b64encode(hashlib.sha256(s.encode()).digest()).decode() + "'")
  ```
- Si algún día se llena `form.endpoint` (Formspree u otro), agrega su dominio a `connect-src` y `form-action` en la CSP de `index.html`.
- `<meta name="referrer" content="strict-origin-when-cross-origin">`. Todo el texto de datos entra con `textContent`; no hay `eval` ni dependencias de terceros.
- `_config.yml` evita que se publiquen `README.md` y el análisis `.md`.

**En Cloudflare (manual, no se puede hacer desde el repositorio).**
1. SSL/TLS → Overview: **Full (strict)** (o Full si GitHub Pages aún no emitió el certificado del dominio).
2. SSL/TLS → Edge Certificates: **Always Use HTTPS** activado (hoy `http://ieee-epn.org` responde 200 sin redirigir), **Minimum TLS Version 1.2** y **HSTS** con `max-age` de 6 meses, sin `preload` al principio.
3. Rules → Transform Rules → *Modify Response Header*, para el host `ieee-epn.org`, agregar (Set static):
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY` y `Content-Security-Policy: frame-ancestors 'none'` (una CSP en `<meta>` no puede impedir que otro sitio enmarque la página)
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
4. Comprobar con `curl -sI https://ieee-epn.org/` que aparecen las cabeceras.

**SEO de las vistas internas.** GitHub Pages sirve `/capitulos` desde `capitulos.html` (estado 200, sin cambiar la URL), y lo mismo para `/eventos`, `/directiva`, `/contacto` y `/desarrolladores`. Esas cinco páginas son copias de `index.html` con el título, la descripción, el canonical y el Open Graph de su sección (salen de `data-title` y `data-description` de cada `<section>`) y esa sección ya activa. Así Google puede indexarlas y están en `sitemap.xml`.

**Después de CADA cambio en `index.html`**, desde la raíz del repositorio ejecuta:

```bash
python scripts/generar-paginas.py
```

Eso regenera las cinco páginas y `sitemap.xml`. Haz commit de todo junto. `python scripts/generar-paginas.py --check` solo comprueba que estén al día. Si agregas una vista nueva, súmala a `SECCIONES` en el script. Las rutas de capítulo (`/capitulos/cis`…) y `/iniciativas` siguen pasando por `404.html`.

**Nombre del sitio en Google.** La portada lleva datos `WebSite` (nombre "IEEE Student Branch EPN" y alternativos "IEEE EPN"…) además de `Organization`. Van solo en la portada: el script los quita de las copias. Valídalos en https://validator.schema.org.

## Elementos obligatorios de IEEE (Brand Experience, Global Page Elements)

Meta-navegación (IEEE.org, IEEE *Xplore*®, IEEE Standards, IEEE Spectrum, More Sites · Join IEEE, Donate), identificador del sitio arriba a la izquierda, IEEE Master Brand arriba a la derecha (blanco o negro, ≥ 100 × 33 px, enlazado a ieee.org), y en el pie los enlaces Accessibility, Nondiscrimination Policy, IEEE Ethics Reporting, Terms & Disclosures, IEEE Privacy Policy, Sitemap con el texto de copyright de IEEE.
