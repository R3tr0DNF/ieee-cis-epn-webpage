"""Páginas de sección para buscadores y sitemap.xml, a partir de index.html.

GitHub Pages sirve /capitulos desde capitulos.html (con estado 200 y sin cambiar la URL).
Sin estos archivos, /capitulos, /eventos… responden 404 y Google no las indexa.
Cada página es una copia de index.html con:
  · <title>, descripción, canonical y og:url/og:title/og:description de esa sección
    (salen de data-title y data-description de su <section> en index.html);
  · esa sección marcada como activa (se ve bien aun antes de que cargue el JavaScript);
  · sin el bloque WebSite (el nombre del sitio va solo en la portada, como pide Google).
Los <script> en línea no cambian, así que los hashes de la CSP siguen valiendo.

Uso (desde la raíz del repositorio), después de CADA cambio en index.html:
    python scripts/generar-paginas.py           regenera las páginas y sitemap.xml
    python scripts/generar-paginas.py --check   solo comprueba que estén al día (no escribe)
"""
import io
import os
import re
import sys

SITE = 'https://ieee-epn.org'
SECCIONES = ['capitulos', 'eventos', 'directiva', 'contacto', 'desarrolladores']
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AVISO = ('<!-- GENERADO por scripts/generar-paginas.py a partir de index.html. No lo edites a mano:\n'
         '     cambia index.html y vuelve a ejecutar el script. -->\n')


def leer(nombre):
    with io.open(os.path.join(RAIZ, nombre), encoding='utf-8', newline='') as f:
        return f.read()


def reemplazar(html, patron, nuevo, nombre):
    resultado, n = re.subn(patron, nuevo, html, count=1, flags=re.S)
    if n != 1:
        sys.exit('No se encontró ' + nombre + ' en index.html: revisa el script.')
    return resultado


def pagina(base, sid):
    m = re.search(r'<section class="page[^"]*" id="' + sid + r'"[^>]*?data-title="([^"]*)"\s+data-description="([^"]*)"', base, re.S)
    if not m:
        sys.exit('No se encontró la sección #' + sid + ' (con data-title y data-description) en index.html.')
    titulo, desc = m.group(1), m.group(2)
    url = SITE + '/' + sid
    h = base
    h = reemplazar(h, r'<title>[^<]*</title>', lambda _: '<title>' + titulo + '</title>', '<title>')
    h = reemplazar(h, r'(<meta name="description" content=")[^"]*', lambda k: k.group(1) + desc, 'meta description')
    h = reemplazar(h, r'(<link rel="canonical" href=")[^"]*', lambda k: k.group(1) + url, 'canonical')
    h = reemplazar(h, r'(<meta property="og:url" content=")[^"]*', lambda k: k.group(1) + url, 'og:url')
    h = reemplazar(h, r'(<meta property="og:title" content=")[^"]*', lambda k: k.group(1) + titulo, 'og:title')
    h = reemplazar(h, r'(<meta property="og:description" content=")[^"]*', lambda k: k.group(1) + desc, 'og:description')
    h = reemplazar(h, r'[ \t]*<!-- Nombre del sitio para Google[^\n]*\n[ \t]*<script type="application/ld\+json">\s*\{[^<]*?"@type": "WebSite".*?</script>\n',
                   '', 'bloque WebSite')
    h = reemplazar(h, r'<section class="page active" id="inicio"', '<section class="page" id="inicio"', 'sección inicio activa')
    h = reemplazar(h, r'<section class="page" id="' + sid + '"', '<section class="page active" id="' + sid + '"', 'sección #' + sid)
    h = reemplazar(h, r'<!DOCTYPE html>\r?\n', lambda k: k.group(0) + AVISO, 'DOCTYPE')
    return h


def sitemap():
    urls = [SITE + '/'] + [SITE + '/' + s for s in SECCIONES]
    filas = ''.join('  <url>\n    <loc>' + u + '</loc>\n  </url>\n' for u in urls)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<!-- GENERADO por scripts/generar-paginas.py. Las secciones existen como capitulos.html, eventos.html…\n'
            '     (GitHub Pages las sirve en /capitulos, /eventos… con estado 200). -->\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + filas + '</urlset>\n')


def main():
    check = '--check' in sys.argv
    base = leer('index.html')
    salidas = {s + '.html': pagina(base, s) for s in SECCIONES}
    salidas['sitemap.xml'] = sitemap()
    desactualizados = []
    for nombre, contenido in salidas.items():
        ruta = os.path.join(RAIZ, nombre)
        actual = leer(nombre) if os.path.exists(ruta) else None
        if actual == contenido:
            continue
        desactualizados.append(nombre)
        if not check:
            with io.open(ruta, 'w', encoding='utf-8', newline='') as f:
                f.write(contenido)
    if check:
        if desactualizados:
            sys.exit('Desactualizados (ejecuta python scripts/generar-paginas.py): ' + ', '.join(desactualizados))
        print('Todo al día: ' + ', '.join(salidas))
    else:
        print(('Actualizados: ' + ', '.join(desactualizados)) if desactualizados else 'Nada que cambiar.')


if __name__ == '__main__':
    main()
