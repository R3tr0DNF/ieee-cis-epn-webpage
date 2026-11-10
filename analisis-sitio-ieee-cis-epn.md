# Análisis del sitio web IEEE CIS EPN

**Documento de revisión de diseño, experiencia de usuario y cumplimiento de bases**
Concurso: *Website Sectional Student Contest 2026 – IEEE Sección Ecuador*
Fecha: 5 de noviembre de 2026

---

## Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Reestructuración del proyecto (aplicada)](#2-reestructuración-del-proyecto-aplicada)
3. [Análisis de diseño desde HCI y experiencia de usuario](#3-análisis-de-diseño-desde-hci-y-experiencia-de-usuario)
4. [Validación contra las bases del concurso](#4-validación-contra-las-bases-del-concurso)
5. [Propuesta de contenido y funcionalidades a agregar](#5-propuesta-de-contenido-y-funcionalidades-a-agregar)
6. [Consideraciones técnicas: framework y alojamiento](#6-consideraciones-técnicas-framework-y-alojamiento)
7. [Plan de acción priorizado](#7-plan-de-acción-priorizado)
8. [Anexo: mediciones de contraste](#anexo-mediciones-de-contraste)

---

## 1. Resumen ejecutivo

El sitio parte de una base sólida. Tiene una identidad visual coherente con la marca IEEE, se adapta bien a móviles, el código está limpio y cuida la accesibilidad (enlace para saltar al contenido, foco del teclado visible, animación que se puede pausar y respeto a la opción de "reducir movimiento" del sistema).

Su principal debilidad no es el diseño sino el **contenido**. Casi todas las secciones siguen marcadas como "Pendiente", y el contenido es justamente el criterio que más pesa en la evaluación (35 de 100 puntos del sitio).

**Hallazgos clave:**

| # | Hallazgo | Impacto |
|---|---|---|
| 1 | El encabezado tapa el título de la sección al abrir un enlace directo o al recargar la página | Alto (comprobado) |
| 2 | La barra superior copia elementos del sitio corporativo de ieee.org ("Cart (0)", "Sign In", "Donate") | Alto, por el riesgo con la regla de "identidad IEEE auténtica" |
| 3 | Hay 6 enlaces que no llevan a ningún lado (`href="#"`) | −6 puntos directos |
| 4 | No está claro si el sitio es de una *rama* o de un *capítulo* | Puede afectar la elegibilidad |
| 5 | El formulario de contacto confirma un envío que puede no haber ocurrido | Medio |
| 6 | Falta el logo oficial | Requisito obligatorio |

---

## 2. Reestructuración del proyecto (aplicada)

El sitio original estaba en un único `index.html` con el CSS y el JavaScript incrustados. Se separó en archivos independientes, como se hace en un proyecto profesional.

### Estructura resultante

```
ieee-cis-epn/
├── index.html          → solo el contenido (HTML)
├── css/
│   └── styles.css      → todos los estilos
├── js/
│   └── main.js         → pestañas, menú móvil, barra superior, animación y formulario
└── assets/
    └── img/            → reservado para el logo oficial y las fotografías
```

### Cambios realizados

1. **CSS a un archivo externo.** El bloque `<style>` completo pasó a `css/styles.css`, conservando los comentarios que separan cada sección.
2. **JavaScript a un archivo externo.** El código pasó a `js/main.js` y se carga con `<script src="js/main.js" defer></script>`. Con `defer`, el script espera a que el HTML termine de cargar, así que el comportamiento es el mismo de antes.
3. **Eliminación de estilos dentro del HTML.** Los cuatro atributos `style="..."` que había en el HTML se convirtieron en clases: `.delay-1`, `.delay-2`, `.lead-tight` y `.body-text`.
4. **Rutas relativas.** Todas las rutas son relativas, así que el sitio funciona en local y también dentro de una subcarpeta del servidor.
5. **Carpeta de recursos.** Se creó `assets/img/` (con un archivo `.gitkeep` para que la carpeta no se pierda en Git).

### Verificación

- Se compararon capturas de la versión original y la nueva, **píxel por píxel**, en las 4 pestañas, a resolución de escritorio (1366 px) y de móvil (390 px). Las **8 comparaciones salieron idénticas**.
- Se probó el menú móvil y el cambio entre pestañas, y no hubo errores de JavaScript en consola.
- Ya no queda ningún estilo dentro del HTML.

> Esta separación es independiente del framework que se elija más adelante: el contenido, el diseño y la lógica ya están separados, así que migrar a cualquier herramienta será más directo.

---

## 3. Análisis de diseño desde HCI y experiencia de usuario

El análisis usa como referencia las **10 heurísticas de usabilidad de Nielsen** y las pautas de accesibilidad **WCAG 2.2**.

### 3.1 Lo que ya funciona bien

| Aspecto | Principio que cumple |
|---|---|
| Enlace "Saltar al contenido" | Accesibilidad (WCAG 2.4.1) |
| Foco del teclado visible (contorno naranja) | Accesibilidad (WCAG 2.4.7) |
| Botón "Pausar animación" y respeto a la opción de reducir movimiento | Control y libertad del usuario (WCAG 2.2.2) |
| Pestaña activa marcada visualmente y con `aria-current` | Visibilidad del estado del sistema |
| El botón "atrás" del navegador funciona entre pestañas | Control y libertad del usuario |
| El título de la pestaña del navegador cambia según la sección | Visibilidad del estado del sistema |
| Paleta limitada y coherente con la marca IEEE | Diseño estético y minimalista |
| Botones con jerarquía clara (principal naranja y secundario con borde) | Reconocer antes que recordar |
| La barra superior se oculta al bajar y reaparece al volver arriba | Más espacio útil para el contenido |
| Diseño adaptable con menú desplegable en móvil | Flexibilidad y eficiencia de uso |

### 3.2 Problemas encontrados

#### Problema 1: el encabezado tapa los títulos (severidad alta, comprobado)

**Qué pasa:** al abrir un enlace directo (por ejemplo `…/#directiva`) o al recargar la página estando en una pestaña, el navegador baja hasta la sección y el encabezado fijo tapa el título.

**Medición:**

| Dispositivo | Posición del título | Borde inferior del encabezado |
|---|---|---|
| Escritorio | 39 px | 75 px |
| Móvil | 64 px | 79 px |

En los dos casos el título queda debajo del encabezado.

**Heurística afectada:** visibilidad del estado del sistema. La persona no ve en qué sección está.

**Por qué importa:** los evaluadores probablemente van a abrir enlaces directos a las secciones, y las bases revisan que "las secciones funcionen".

**Solución propuesta:** agregar `scroll-margin-top` a las secciones, o volver al inicio de la página una vez que termina de cargar.

---

#### Problema 2: la barra superior imita a ieee.org (severidad alta)

**Qué pasa:** la barra gris superior tiene dos partes:

- **Izquierda** (IEEE.org, Xplore, Standards, Spectrum, IEEE Sites): **está bien**. Las plantillas oficiales de IEEE para sitios de ramas y capítulos traen esa misma barra.
- **Derecha** (Join IEEE, Donate, **Cart (0)**, Create Account, Sign In): es la barra del sitio corporativo de ieee.org. En un sitio de rama eso confunde, porque el visitante puede creer que está en ieee.org. Además, "Cart (0)" está escrito a mano y nunca cambia.

**Heurísticas afectadas:**
- *Coincidencia entre el sistema y el mundo real:* el visitante espera que un carrito de compras funcione.
- *Consistencia y estándares:* no es lo que muestran los sitios de otras ramas.
- *Prevención de errores:* "Sign In" lleva a una cuenta que no tiene relación con el sitio de la rama.

**Riesgo frente a las bases:** puede chocar con el requisito de "logos e identidad IEEE auténticos (no insertados artificialmente)".

**Otros detalles:**
- La barra está en inglés y el resto del sitio en español, sin marcar el cambio de idioma (`lang="en"`).
- En móvil la barra desaparece (`display:none`), así que "Join IEEE", la llamada a la acción más valiosa, se pierde justo donde más gente entra.

**Solución propuesta:** dejar solo la parte izquierda y "Join IEEE". Quitar Donate, Cart, Create Account y Sign In. Llevar "Join IEEE" al menú móvil.

---

#### Problema 3: el formulario confirma un envío que puede no haber ocurrido (severidad media)

**Qué pasa:** el formulario usa `mailto:`, que intenta abrir el programa de correo de la computadora. Luego siempre muestra "Se abrió tu aplicación de correo para enviar el mensaje", aunque no se haya abierto nada. Muchas computadoras, sobre todo las de laboratorios, no tienen ningún programa de correo configurado.

**Heurísticas afectadas:** visibilidad del estado del sistema (la retroalimentación es falsa) y ayudar a los usuarios a reconocer y recuperarse de errores.

**Otros detalles:**
- La validación solo muestra un mensaje general. No indica qué campo está mal.
- El correo de destino es un marcador provisional (`correo-rama@ieee.org`).

**Solución propuesta:** usar un servicio que envíe el mensaje de verdad (Formspree, Google Forms, o un backend propio según el framework que se elija). Como alternativa mínima, mostrar el correo con un botón para copiarlo.

---

#### Problema 4: las estadísticas vacías parecen un error (severidad media)

**Qué pasa:** el bloque de cifras muestra "—" en Miembros activos, Voluntarios y Eventos realizados.

**Heurística afectada:** diseño estético y minimalista. Un guion grande en azul se lee como "algo falló al cargar", no como "dato pendiente".

**Solución propuesta:** ocultar el bloque hasta tener los números reales. Cuando estén, se podrían animar al aparecer, respetando la opción de reducir movimiento.

---

#### Problema 5: el texto naranja no alcanza el contraste mínimo (severidad media)

**Qué pasa:** los cargos (Chair, Vice Chair, Voluntario/a) están en naranja `#C25E0A` sobre blanco, con un **contraste de 4,29:1**. WCAG AA pide **4,5:1** para texto normal. El texto mide unos 15 px en negrita, así que no llega a contar como "texto grande" y técnicamente no cumple.

**Solución propuesta:** oscurecer un poco el naranja, por ejemplo a `#B05408`. La diferencia apenas se nota y cumple la norma.

> El resto de los colores sí cumple, con contrastes entre 6:1 y 7,8:1 (ver el [anexo](#anexo-mediciones-de-contraste)).

---

#### Problema 6: jerarquía de títulos incompleta (severidad baja)

**Qué pasa:** solo la pestaña de Inicio tiene `<h1>`. Las demás empiezan con `<h2>`.

**Por qué importa:** cada pestaña funciona como una página distinta. Los lectores de pantalla y los buscadores usan el `<h1>` para identificar el tema principal de cada página.

**Solución propuesta:** cada pestaña debería tener su propio `<h1>`.

---

#### Problema 7: espacios reservados con el formato de imagen equivocado (severidad baja, pero no hay que olvidarlo)

**Qué pasa:** los espacios para fotos son elementos `<div role="img" aria-label="...">`. Sirven como borrador, pero cuando lleguen las fotos reales deben reemplazarse por `<img>` con un texto alternativo (`alt`) que describa la foto. Ejemplo: `alt="Integrantes de la rama durante el taller de redes neuronales, octubre 2026"`. Un `alt="foto"` no sirve.

**Requisito relacionado:** las bases piden expresamente "texto alternativo en imágenes".

---

#### Problema 8: falta el ícono de pestaña y la vista previa al compartir (severidad baja)

**Qué pasa:** el sitio no tiene favicon (el ícono que aparece en la pestaña del navegador) ni etiquetas Open Graph. Cuando alguien comparta el enlace por WhatsApp, Instagram o LinkedIn, va a salir sin imagen ni descripción.

**Solución propuesta:** agregar el favicon y las etiquetas `og:title`, `og:description` y `og:image`.

---

### 3.3 Observaciones de diseño visual

- **Hero:** el título combina texto ligero con negrita ("Inteligencia computacional **al servicio de la humanidad**"), y eso le da una buena jerarquía. La red neuronal dibujada refuerza bien el tema de CIS. En móvil, la red se ve con poca opacidad detrás del texto y no estorba la lectura.
- **Botón "Pausar animación":** es correcto incluirlo por accesibilidad, pero su posición, flotando en la esquina del hero, compite un poco con los botones principales. Podría hacerse más discreto (solo un ícono, con su etiqueta accesible).
- **Tarjetas de la directiva:** las fotos son cuadradas y bastante grandes en escritorio (unos 350 px). Funcionan bien, pero conviene usar fotos con encuadre y fondo parecidos para que el conjunto se vea uniforme.
- **Pie de página:** tiene buena estructura en tres columnas y la línea naranja superior separa bien el contenido. Habría que revisar el aviso legal (ver la sección 4.3).

---

## 4. Validación contra las bases del concurso

### 4.1 Requisitos del sitio web (sección 3 de las bases)

| Requisito | Estado | Observación |
|---|---|---|
| Acceso público mediante una URL válida | ⏳ Pendiente | Depende de la decisión de alojamiento |
| Sección de voluntarios actuales | ⚠️ Parcial | La estructura existe, pero todo el contenido es provisional |
| Sección de iniciativas locales | ⚠️ Parcial | La estructura existe, pero todo el contenido es provisional |
| Sección de directiva | ⚠️ Parcial | La estructura existe, pero todo el contenido es provisional |
| Logos e identidad IEEE auténticos | ❌ No cumple | Hay un espacio vacío en lugar del logo; ver además el problema 2 |
| Sin efectos excesivos ni plantillas de terceros | ✅ Cumple | Código propio y animación sutil que se puede pausar |
| Diseño adaptable a móviles y tabletas | ✅ Cumple | Comprobado a 390 px y 1366 px |
| Enlaces y secciones funcionando | ❌ No cumple | 6 enlaces sin destino y el problema 1 |
| Accesibilidad: contraste | ⚠️ Casi | Solo falla el naranja de los cargos (problema 5) |
| Accesibilidad: texto alternativo | ⏳ Pendiente | Se resuelve al poner las fotos reales (problema 7) |
| Accesibilidad: tipografía legible | ✅ Cumple | IBM Plex Sans a 17 px, interlineado de 1,6 |

### 4.2 Enlaces sin destino

Las bases descuentan **1 punto por cada enlace o sección que no funcione**. Estos son los que hay hoy:

| # | Enlace | Ubicación |
|---|---|---|
| 1 | Instagram | Pie de página |
| 2 | LinkedIn | Pie de página |
| 3 | Facebook | Pie de página |
| 4 | IEEE Sección Ecuador | Pie de página |
| 5 | Ver más detalles (iniciativa 1) | Iniciativas |
| 6 | Ver más detalles (iniciativa 2) | Iniciativas |

**Total de descuento posible hoy: −6 puntos.** Además, "Cart (0)" y "Sign In" llevan a páginas de ieee.org que no tienen nada que ver con la rama.

### 4.3 Elegibilidad: ¿rama o capítulo? (hay que aclararlo)

El sitio se presenta de tres formas distintas:

| Lugar | Texto |
|---|---|
| Encabezado | "IEEE CIS · Rama Estudiantil · Escuela Politécnica Nacional" |
| Descripción (meta) | "Rama Estudiantil IEEE Computational Intelligence Society…" |
| Pie de página | "© 2026 IEEE Student Branch · Escuela Politécnica Nacional" |

En la estructura de IEEE, una sociedad técnica como CIS dentro de una universidad forma un **capítulo estudiantil** (*Student Branch Chapter*). La **rama** es la de la EPN completa. Esto importa por tres razones:

1. **Mínimo de miembros:** las bases piden 12 miembros activos para ramas y 6 para capítulos.
2. **Un solo sitio por rama:** si la Rama Estudiantil IEEE EPN también participa, podría haber conflicto.
3. **Coherencia:** a los evaluadores les va a llamar la atención que el sitio se nombre de tres formas distintas.

**Recomendación:** confirmar con el comité organizador bajo qué figura se inscribe el sitio y usar una sola denominación en todo el sitio.

### 4.4 Criterios de evaluación: dónde está el sitio hoy

| Criterio | Puntos | Situación actual | Prioridad |
|---|---|---|---|
| Contenido y relevancia | 35 | Casi vacío | 🔴 Crítica |
| Diseño y navegación | 25 | Buena base, con los problemas 1 y 2 | 🟡 Media |
| Alineación con la misión de IEEE | 15 | El lema del hero conecta bien; falta explicar qué es IEEE y qué es CIS | 🟡 Media |
| Interactividad y participación | 15 | Solo el formulario `mailto:` | 🔴 Alta |
| Aspectos técnicos y accesibilidad | 10 | Buena base; faltan los problemas 5 a 8 | 🟢 Baja |

### 4.5 Documentos que hay que presentar (sección 8 de las bases)

Esto queda fuera del sitio en sí, pero conviene tenerlo presente:

- [ ] Comprobante de Chair, Counselor/Advisor y Webmaster en vTools Officer Reporting
- [ ] Hoja de cálculo con el mínimo de miembros activos (IEEE OU Analytics)
- [ ] Reporte anual de la rama presentado
- [ ] Fotografía representativa de la rama
- [ ] URL del sitio
- [ ] **Documentación en PDF de máximo 4 páginas** (20 % de la nota final; −5 puntos por cada página adicional)

---

## 5. Propuesta de contenido y funcionalidades a agregar

Las propuestas están ordenadas según el peso de cada criterio en la nota.

### 5.1 Contenido (35 puntos)

| Elemento | Detalle |
|---|---|
| Misión, visión y objetivos | Reemplazar los textos "Pendiente" de Inicio |
| Historia de la rama | Fundación, reapertura y logros |
| Directiva completa | Nombre, cargo, foto, carrera y una breve descripción |
| **Tarjeta del Counselor/Advisor** | Las bases lo exigen para ser elegibles y le da credibilidad al sitio |
| Voluntarios | Con foto, nombre y área en la que colaboran |
| Iniciativas reales | Con fecha, lugar, número de participantes, fotos y resultados |
| Página de detalle de cada iniciativa | Para que "Ver más detalles" lleve a algo real |
| Cifras reales | Miembros, voluntarios y eventos realizados |
| Logros y reconocimientos | Premios, publicaciones y participación en congresos |

### 5.2 Alineación con IEEE (15 puntos)

- Sección "¿Qué es IEEE?" y "¿Qué es CIS?", con la misión de IEEE (*Advancing Technology for Humanity*).
- Beneficios de ser miembro estudiante y un botón "Únete" que lleve a la inscripción oficial.
- Enlace al **Código de Ética de IEEE**.
- Enlaces a IEEE CIS Global, IEEE Sección Ecuador e IEEE Región 9.
- Logos oficiales de IEEE y de CIS, usados según las guías de marca de IEEE (*IEEE Brand Experience*).

### 5.3 Interactividad y participación (15 puntos)

| Funcionalidad | Valor |
|---|---|
| **Calendario de eventos conectado a vTools Events** | Se actualiza solo cuando se crea un evento en vTools; demuestra integración con el ecosistema IEEE |
| Formulario de contacto que envíe de verdad | Corrige el problema 3 |
| Formulario de inscripción o de interés en ser voluntario | Convierte visitas en miembros |
| Redes sociales reales, idealmente mostrando las últimas publicaciones | Contenido que se renueva solo |
| Galería de fotos de eventos | Muestra actividad real |
| Sección de recursos (material de talleres, presentaciones, código) | Da valor al visitante más allá de la información institucional |
| Suscripción a un boletín | Mantiene el contacto con la comunidad |

### 5.4 Aspectos técnicos y accesibilidad (10 puntos)

- Corregir los problemas 1, 5, 6, 7 y 8.
- Agregar una página de error 404 personalizada.
- Agregar metadatos para buscadores y vista previa al compartir.
- Optimizar las imágenes (formato WebP y tamaños adecuados para cada pantalla).
- Revisar el sitio con **Lighthouse** y **WAVE** antes de presentarlo, e incluir los resultados en la documentación.

---

## 6. Consideraciones técnicas: framework y alojamiento

> Las dos decisiones siguen pendientes. Esta sección solo recoge los puntos que conviene tener presentes al decidir.

### 6.1 Framework

Se descartó WordPress por sus limitaciones de diseño y de extensibilidad. La separación ya hecha (HTML, CSS y JS) facilita migrar a cualquier framework. Al elegir, conviene considerar:

- **Facilidad para actualizar el contenido:** las bases valoran el "plan de actualización de contenido". Si las directivas futuras no saben programar, sirve que el contenido viva en archivos simples (Markdown o JSON) o en un CMS ligero, separado del código.
- **Resultado estático o dinámico:** un sitio estático es más rápido, más seguro y más fácil de alojar. Las funciones dinámicas, como el formulario, se pueden resolver con servicios externos.
- **Rutas reales en vez de pestañas:** hoy las secciones se manejan con `#` en la URL. Con un framework, cada sección puede tener su propia URL (`/directiva`, `/iniciativas`). Eso resuelve el problema 1 de raíz y mejora el posicionamiento en buscadores.
- **Continuidad:** que el código sea mantenible por los próximos webmasters de la rama.

### 6.2 Alojamiento

Las bases exigen que el sitio esté **alojado en un dominio oficial de IEEE (ieee.org)**.

El servicio estándar de IEEE para ramas y capítulos (IEEE Entity Web Hosting) ofrece principalmente WordPress y vTools WebInABox. Como se descartó WordPress, conviene consultar pronto con **ewh-webmaster@ieee.org** qué opciones hay para publicar un sitio hecho con un framework propio dentro de un dominio ieee.org. La respuesta puede condicionar la elección del framework.

---

## 7. Plan de acción priorizado

### Fase 1: correcciones rápidas (no dependen del contenido ni del framework)

- [ ] Corregir el encabezado que tapa los títulos (problema 1)
- [ ] Simplificar la barra superior de IEEE (problema 2)
- [ ] Oscurecer el naranja de los cargos (problema 5)
- [ ] Agregar `<h1>` a cada pestaña (problema 6)
- [ ] Ocultar las estadísticas vacías (problema 4)
- [ ] Marcar con `lang="en"` los textos en inglés

### Fase 2: decisiones y verificación

- [ ] Confirmar la figura de inscripción (rama o capítulo) y unificar el nombre en todo el sitio
- [ ] Consultar con IEEE las opciones de alojamiento en ieee.org
- [ ] Elegir el framework
- [ ] Conseguir los logos oficiales de IEEE y de CIS

### Fase 3: contenido

- [ ] Misión, visión, objetivos e historia
- [ ] Directiva completa, con Counselor/Advisor
- [ ] Voluntarios con fotos
- [ ] Iniciativas reales con páginas de detalle
- [ ] Enlaces reales a redes sociales y a IEEE Sección Ecuador
- [ ] Cifras reales

### Fase 4: interactividad

- [ ] Formulario de contacto funcional
- [ ] Calendario conectado a vTools Events
- [ ] Sección "Únete" con los beneficios de ser miembro
- [ ] Galería de eventos

### Fase 5: cierre

- [ ] Favicon y vista previa al compartir
- [ ] Fotos optimizadas y con texto alternativo descriptivo
- [ ] Revisión con Lighthouse y WAVE
- [ ] Revisión final de enlaces (0 enlaces sin destino)
- [ ] Documentación en PDF de 4 páginas como máximo

---

## Anexo: mediciones de contraste

Contraste calculado según la fórmula de WCAG 2.2. El mínimo AA es 4,5:1 para texto normal y 3:1 para texto grande.

| Elemento | Texto | Fondo | Contraste | AA |
|---|---|---|---|---|
| Cargos (Chair, Voluntario/a) | `#C25E0A` | `#FFFFFF` | **4,29:1** | ❌ |
| Texto secundario | `#4A5565` | `#F4F6F9` | 6,98:1 | ✅ |
| Etiqueta "Pendiente" | `#7A3D00` | `#FFF4E5` | 7,74:1 | ✅ |
| Texto de los espacios para fotos | `#46566B` | `#E3E8EF` | 6,08:1 | ✅ |
| Aviso legal del pie de página | `#AEBFD1` | `#002855` | 7,79:1 | ✅ |
| Botón principal | `#1B1000` | `#E87722` | 6,33:1 | ✅ |
| Indicador de la pestaña activa | `#00B5E2` | `#002855` | 6,07:1 | ✅ |
| Cifras de las estadísticas | `#00629B` | `#FFFFFF` | 6,52:1 | ✅ |

---

*Fuentes: bases del Website Sectional Student Contest 2026 (IEEE Sección Ecuador); [IEEE Shared Web Hosting Instructions](https://kb.ieee.org/ewh/kb/ieee-shared-web-hosting-instructions); heurísticas de usabilidad de Jakob Nielsen; WCAG 2.2 (W3C).*
